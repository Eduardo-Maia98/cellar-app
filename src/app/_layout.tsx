import { AuthProvider } from "@/context/AuthContext";
import { getApp } from "@react-native-firebase/app";
import { getMessaging, onMessage, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import * as NavigationBar from "expo-navigation-bar";
import { Slot } from "expo-router";
import { useEffect } from "react";
import { PermissionsAndroid, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import "./global.css";
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

//import { getFcmToken } from "@/utils/getTokenService";


export const unstable_settings = {
  initialRouteName: "index",
};


export default function RootLayout() {
  const insets = useSafeAreaInsets();
  const app = getApp();
  const messaging = getMessaging(app);

  // Usar apenas em desenvolvimento para pegar o token e testar o envio manual da notificação
  // useEffect(() => {
  //   getFcmToken();
  // }, []);
  useEffect(() => {
    NavigationBar.setButtonStyleAsync("light");
    NavigationBar.setVisibilityAsync("visible");
  }, []);


  useEffect(() => {
    const unsubscribe = onMessage(messaging, async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });
    setBackgroundMessageHandler(messaging, async remoteMessage => {
      console.log('Message handled in the background!', JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  return (
    <AuthProvider>
      
      <StatusBar
        barStyle="light-content"
        animated={true}
        backgroundColor={"#2f306b"}
      />

      <Slot />


    </AuthProvider>
  );
}