import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthProvider } from "../src/context/AuthContext";
import "./global.css";

export default function RootLayout() {
  
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: true }} />
      </SafeAreaView>
    </AuthProvider>
  );
}
