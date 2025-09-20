import { Image, Text, TouchableOpacity, View } from "react-native";

type Props = {
  product: any;
  isFavorited?: boolean;
  onUnfavorite?: () => void;
  onFavorite?: () => void;
}

export default function ProductCard({ product, isFavorited, onUnfavorite, onFavorite }: Props) {


  function handleFavorite() {
    if (isFavorited) {
      if (typeof onUnfavorite === "function")
        onUnfavorite();
    } else {
      if (typeof onFavorite === "function")
        onFavorite();

    }
  }
  return (
    <View className="bg-card rounded-xl shadow p-4 mb-4">
      <Image
        source={{ uri: product.image }}
        className="w-full h-40 mb-2 rounded-lg"
        resizeMode="contain"
      />
      <Text className="text-white text-lg font-bold">{product.title}</Text>
      <Text className="text-gray-300">${product.price}</Text>

      <TouchableOpacity className="bg-secondary mt-2 py-2 rounded-lg" onPress={handleFavorite}>
        <Text className="text-white text-center">{isFavorited ? "Remover dos favoritos" : "Favoritar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

