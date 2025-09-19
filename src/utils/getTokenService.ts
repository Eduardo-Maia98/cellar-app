import { getApp } from '@react-native-firebase/app';
import messaging, { getMessaging } from '@react-native-firebase/messaging';
export async function getFcmToken() {
    const authStatus = await getMessaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        const app = getApp();
        const messaging = getMessaging(app);
        const token = await messaging.getToken();
        console.log('FCM Token:', token); 
        return token;
    }
    return null;
}