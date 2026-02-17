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

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPermissionStatus(Notification.permission);
        }
    }, []);

    const saveTokenToSupabase = async (token: string) => {
        if (!user) return;

        const { error } = await supabase
            .from('fcm_tokens')
            .upsert({
                token,
                user_id: user.id
            }, { onConflict: 'token' });

        if (error) {
            console.error("Error saving FCM token:", error);
        } else {
            console.log("FCM token saved to Supabase");
        }
    };

    const requestPermission = async () => {
        try {
            // Check if already denied
            if (Notification.permission === 'denied') {
                toast.error("Notifications Blocked", {
                    description: "Please enable notifications in your browser settings to receive mission alerts.",
                    duration: 5000,
                });
                setPermissionStatus('denied');
                return;
            }

            const permission = await Notification.requestPermission();
            setPermissionStatus(permission);

            if (permission === "granted") {
                toast.success("Mission Alerts Enabled", {
                    description: "You will now receive notifications for checkpoint updates."
                });

                const msg = await messaging();
                if (!msg) return;

                const token = await getToken(msg, {
                    vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
                });

                if (token) {
                    console.log("FCM Token:", token);
                    setFcmToken(token);
                    await saveTokenToSupabase(token);
                }
            } else if (permission === 'denied') {
                toast.error("Notifications Denied", {
                    description: "You won't receive mission alerts. You can change this in your browser settings."
                });
            }
        } catch (error) {
            console.error("An error occurred while retrieving token.", error);
            toast.error("Failed to enable notifications");
        }
    };

    // Listen for foreground messages
    useEffect(() => {
        const setupListener = async () => {
            const msg = await messaging();
            if (!msg) return;

            const unsubscribe = onMessage(msg, (payload) => {
                console.log("Foreground message received:", payload);
                toast(payload.notification?.title || "New Message", {
                    description: payload.notification?.body,
                    action: {
                        label: "View",
                        onClick: () => window.location.href = '/dashboard' // Simple redirect
                    }
                });
            });

            return () => unsubscribe();
        };

        setupListener();
    }, []);

    // Auto-save if permission already granted and user logs in
    useEffect(() => {
        if (permissionStatus === 'granted' && user && !fcmToken) {
            requestPermission();
        }
    }, [user, permissionStatus]); // Dependencies

    return { fcmToken, requestPermission, permissionStatus };
}
