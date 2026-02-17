import { NextResponse } from 'next/server';
export const runtime = 'nodejs'; // Force Node.js runtime for firebase-admin compatibility
import { adminMessaging } from '@/lib/firebase-admin';
import { supabaseAdmin } from '@/lib/supabase-admin';

export async function POST(request: Request) {
    try {
        const { title, body } = await request.json();

        // Validate input
        if (!title || !body) {
            return NextResponse.json({ error: 'Missing title or body' }, { status: 400 });
        }

        if (!adminMessaging || !supabaseAdmin) {
            console.error('Admin services not initialized');
            return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
        }

        // 1. Fetch all FCM tokens from Supabase
        // We use the Service Role client to bypass RLS and fetch all tokens
        const { data: tokensData, error: dbError } = await supabaseAdmin
            .from('fcm_tokens')
            .select('token');

        if (dbError) {
            console.error('Error fetching FCM tokens:', dbError);
            return NextResponse.json({ error: 'Database error' }, { status: 500 });
        }

        const tokens = (tokensData as { token: string }[])?.map((t: { token: string }) => t.token) || [];

        if (tokens.length === 0) {
            return NextResponse.json({ message: 'No tokens found' });
        }

        // 2. Send Multicast Message via Firebase Admin
        const message = {
            notification: {
                title,
                body,
            },
            webpush: {
                fcmOptions: {
                    link: 'https://apexai.gdgocghrce.in/dashboard'
                }
            },
            tokens, // Array of device tokens
        };

        const response = await adminMessaging.sendEachForMulticast(message);

        console.log('Successfully sent message:', response);

        if (response.failureCount > 0) {
            const failedTokens: string[] = [];
            response.responses.forEach((resp: any, idx: number) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                }
            });
            console.warn('List of tokens that caused failures: ' + failedTokens);
            // Optional: Clean up invalid tokens from DB here
        }

        return NextResponse.json({
            success: true,
            successCount: response.successCount,
            failureCount: response.failureCount
        });

    } catch (error) {
        console.error('Error sending notification:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
