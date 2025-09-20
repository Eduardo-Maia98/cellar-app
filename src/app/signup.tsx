import { useAuth } from "@/hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as yup from "yup";
import Icon from "../../assets/adaptive-icon.png";


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
    <View className="flex-1 bg-primary px-6">
      <Image className="w-80 h-80 self-center mt-12"
        source={Icon}
        resizeMode="contain"
      />
      <Text className="text-3xl text-white font-bold text-center mb-8">Criar Conta</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <>
            <TextInput
              placeholder="Email"
              className="bg-white border border-gray-300 rounded-xl pl-4 py-3 mb-4"
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
              className="bg-white border border-gray-300 rounded-xl pl-4 py-3 mb-4"
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
        className="bg-secondary py-3 rounded-xl mb-4"
        onPress={handleSubmit(onSubmit)}
      >
        <Text className="text-white text-center font-semibold">Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity className="py-3 rounded-xl" activeOpacity={0.7}>
        <Link
          href="/login"
          asChild
        >
          <Text className="text-white text-center ">Já tenho uma conta</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}