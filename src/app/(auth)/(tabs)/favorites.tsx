import ProductCard from "@/components/ProductCard";
import { AuthContext } from "@/context/AuthContext";
import { getFavoritesByEmail, removeFavorite } from "@/firebase/favoriteItem";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function FavoritesScreen() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<any[]>([]);

  function fetchFavorites() {
    if (!user?.email) return;
  
    getFavoritesByEmail(user.email).then((data) => {
      setFavorites(data);
    });
    console.log('fetch')
  }

  async function handleUnfavorite(productId: string) {
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
    <View className="flex-1 bg-white p-4 items-center">
      <Text>Nenhum favorito encontrado.</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            isFavorited={true}
            onUnfavorite={() => handleUnfavorite(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
