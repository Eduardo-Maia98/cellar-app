import { AuthContext } from "@/context/AuthContext";
import { removeFavorite, saveFavorite } from "@/firebase/favoriteItem";
import { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: any;
  isFavorited?: boolean;
  onUnfavorite?: () => void;
  onFavorite?: () => void;
}

export default function ProductCard({ product, isFavorited, onUnfavorite, onFavorite }: Props) {
  const { user } = useContext(AuthContext);

  function handleSaveFavorite() {
    saveFavorite(product.id.toString(), product, user.email);
    if (typeof onFavorite === "function") {
      onFavorite();
    }
  }
  function handleUnfavorite() {
    if (onUnfavorite) {
      onUnfavorite();
    } else {
      removeFavorite(product.id.toString(), user.email);
    }
  }
  function handleFavorite() {
    if (isFavorited) {
      handleUnfavorite();
    } else {
      handleSaveFavorite();
    }
  }
  return (
    <View className="bg-white rounded-xl shadow p-4 mb-4">
      <Image
        source={{ uri: product.image }}
        className="w-full h-40 mb-2 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-lg font-bold">{product.title}</Text>
      <Text className="text-gray-600">${product.price}</Text>

      <TouchableOpacity className="bg-blue-600 mt-2 py-2 rounded-lg" onPress={handleFavorite}>
        <Text className="text-white text-center">{isFavorited ? "Remover dos favoritos" : "Favoritar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

