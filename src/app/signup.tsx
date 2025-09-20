import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Digite um e-mail válido.").required("E-mail obrigatório."),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 caracteres.").required("Senha obrigatória."),
});

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      await signUp(data.email, data.password);
      Alert.alert(
        "Sucesso",
        "Conta criada com sucesso!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/home"),
          },
        ],
        { cancelable: false }
      );
    } catch (err: any) {
      Alert.alert("Erro", "");
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-3xl font-bold text-center mb-8">Criar Conta</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
              value={value}
              onChangeText={onChange}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 8 }}>{errors.email.message}</Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Senha"
              className="border border-gray-300 rounded-xl px-4 py-3 mb-1"
              value={value}
              onChangeText={onChange}
              secureTextEntry
            />
            {errors.password && (
              <Text style={{ color: "red", marginBottom: 8 }}>{errors.password.message}</Text>
            )}
          </>
        )}
      />

      <TouchableOpacity
        className="bg-blue-600 py-3 rounded-xl mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center font-semibold">Cadastrar</Text>
      </TouchableOpacity>

      <Link href="/login" className="text-blue-600 text-center">
        Já tenho conta
      </Link>
    </View>
  );
}