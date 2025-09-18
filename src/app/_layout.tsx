import { AuthProvider } from "@/context/AuthContext";
import { Slot } from "expo-router";
import { PermissionsAndroid } from 'react-native';
import "./global.css";

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const unstable_settings = {
  initialRouteName: "index",
};


export default function RootLayout() {

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}