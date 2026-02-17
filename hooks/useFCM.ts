"use client";

import { useEffect, useState } from "react";
import { messaging } from "../lib/firebase-config";
import { getToken, onMessage } from "firebase/messaging";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export default function useFCM() {
    const { user } = useAuth();
    const [fcmToken, setFcmToken] = useState<string | null>(null);
    const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>("default");
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPermissionStatus(Notification.permission);
            const savedPref = localStorage.getItem('notifications_enabled');
            setIsEnabled(savedPref !== 'false');
        }
    }, []);

    const saveTokenToSupabase = async (token: string) => {
        if (!user || !isEnabled) return;
        await supabase.from('fcm_tokens').upsert({ token, user_id: user.id }, { onConflict: 'token' });
    };

    const toggleNotifications = async () => {
        if (isEnabled) {
            setIsEnabled(false);
            localStorage.setItem('notifications_enabled', 'false');
            toast.info("Mission Alerts Suspended");
            if (fcmToken) {
                await supabase.from('fcm_tokens').delete().eq('token', fcmToken);
            }
        } else {
            setIsEnabled(true);
            localStorage.setItem('notifications_enabled', 'true');
            await requestPermission();
        }
    };

    const requestPermission = async () => {
        try {
            if (Notification.permission === 'denied') {
                toast.error("Notifications Blocked", { description: "Adjust browser settings to enable." });
                setPermissionStatus('denied');
                return;
            }

            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);

            if (permission === "granted" && isEnabled) {
                const msg = await messaging();
                if (!msg) return;
                const token = await getToken(msg, { vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY });
                if (token) {
                    setFcmToken(token);
                    await saveTokenToSupabase(token);
                }
            }
        } catch (error) {
            console.error("FCM Error:", error);
        }
    };

    useEffect(() => {
        const setupListener = async () => {
            const msg = await messaging();
            if (!msg || !isEnabled) return;

            return onMessage(msg, (payload: any) => {
                toast(payload.notification?.title || "Mission Alert", {
                    description: payload.notification?.body,
                    action: { label: "View", onClick: () => window.location.href = '/dashboard' }
                });
            });
        };
        const cleanup = setupListener();
        return () => { cleanup.then(unsub => unsub?.()) };
    }, [isEnabled]);

    useEffect(() => {
        if (permissionStatus === 'granted' && user && !fcmToken && isEnabled) {
            requestPermission();
        }
    }, [user, permissionStatus, isEnabled]);

    return { fcmToken, requestPermission, permissionStatus, isEnabled, toggleNotifications };
}
