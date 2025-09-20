import ProductDTO from "@/@types/products";
import ProductCard from "@/components/ProductCard";
import { getFavoritesByEmail, removeFavorite } from "@/firebase/favoriteItem";
import { useAuth } from "@/hooks/useAuth";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function FavoritesScreen() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<ProductDTO[]>([]);

  function fetchFavorites() {
    if (!user?.email) return;

    getFavoritesByEmail(user.email).then((data) => {
      setFavorites(data);
    });
  }

  async function handleUnfavorite(productId: number) {
    if (!user?.email) return;
    await removeFavorite(productId, user.email);
    fetchFavorites();
  }


  useFocusEffect(
    useCallback(() => {
      fetchFavorites()
    }, [])
  )


  if (!favorites.length) return (
    <View className="flex-1 bg-primary p-4 items-center">
      <Text className="text-white">Nenhum favorito encontrado.</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary p-4">
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isFavorited={true}
            onUnfavorite={() => handleUnfavorite(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
