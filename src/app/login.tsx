import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "../../assets/adaptive-icon.png";


export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("cellar@teste.com");
  const [password, setPassword] = useState("123456");

  const [loading, setLoading] = useState(false);


  const handleLogin = async () => {
    if (email.length > 1 && password.length > 1) {
      try {
        setLoading(true);
        await signIn(email, password);
        router.replace("/home")
      } catch (err: any) {
        Alert.alert("Erro", "Usuário ou senha inválidos");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <View className="flex-1 bg-primary px-6">
      <Image className="w-80 h-80 self-center mt-12"
        source={Icon}
        resizeMode="contain"
      />

      <Text className="text-3xl text-white font-bold text-center mb-8">Login</Text>

      <TextInput
        placeholder="Email"
        className="bg-white border border-gray-300 rounded-xl pl-4 py-3 mb-4"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        className="bg-white border border-gray-300 rounded-xl pl-4 py-3 mb-4"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        className="bg-secondary py-3 rounded-xl mb-4"
        onPress={handleLogin}
      >
        {
          loading ?
            <ActivityIndicator color="#FFF" />
            :
            <Text className="text-white text-center font-semibold">Entrar</Text>
        }

      </TouchableOpacity>

      <TouchableOpacity className="py-3 rounded-xl" activeOpacity={0.7}>
        <Link
          href="/signup"
          asChild
        >
          <Text className="text-white text-center ">Criar uma conta</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}
