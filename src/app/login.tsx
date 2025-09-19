import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";


export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("cellar@teste.com");
  const [password, setPassword] = useState("123456");



  const handleLogin = async () => {
    try {
      await signIn(email, password);
      router.replace("/home")
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  return (
    <View className="flex-1 bg-blue justify-center px-6">
      <Text className="text-3xl font-bold text-center mb-8">Login</Text>

      <TextInput
        placeholder="Email"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-4"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        className="border border-gray-300 rounded-xl px-4 py-3 mb-6"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center font-semibold">Entrar</Text>
      </TouchableOpacity>

      <Link href="/signup" className="text-blue-600 text-center">
        Criar uma conta
      </Link>
    </View>
  );
}
