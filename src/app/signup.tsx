import { AuthContext } from "@/context/AuthContext";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUpScreen() {
  const { signUp } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl font-bold text-center mb-8">Criar Conta</Text>

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
        onPress={handleSignUp}
      >
        <Text className="text-white text-center font-semibold">Cadastrar</Text>
      </TouchableOpacity>

      <Link href="/login" className="text-blue-600 text-center">
        Já tenho conta
      </Link>
    </View>
  );
}
