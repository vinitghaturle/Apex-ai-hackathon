import admin from 'firebase-admin';

let isInitialized = false;

if (!admin.apps.length) {
    try {
        if (process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
            });
            isInitialized = true;
            console.log("Firebase Admin Initialized");
        } else {
            console.warn("Missing Firebase Admin credentials. Notifications will not work.");
        }
    } catch (error) {
        console.error("Firebase Admin Initialization Error:", error);
    }
} else {
    isInitialized = true;
}

export const adminAuth = isInitialized ? admin.auth() : null;
export const adminMessaging = isInitialized ? admin.messaging() : null;
export default admin;
