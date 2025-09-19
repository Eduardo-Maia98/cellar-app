import ProductDTO from "@/@types/products";
import ProductCard from "@/components/ProductCard";
import { getFavoritesByEmail, saveFavorite } from "@/firebase/favoriteItem";
import { useAuth } from "@/hooks/useAuth";

import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const { user } = useAuth();
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchFavorites() {
    setLoading(true);

    const fullData = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
    const favorites = await getFavoritesByEmail(user.email);
    const favoriteIds = favorites.map((fav: ProductDTO) => fav.id);
    const productsFiltered = fullData.filter((product: ProductDTO) => !favoriteIds.includes(product.id));

    setProducts(productsFiltered);
    setLoading(false);
  }




  useFocusEffect(
    useCallback(() => {
      if (user)
        fetchFavorites()
    }, [user])
  )

  if (loading) {
    return <ActivityIndicator className="flex-1" />;
  }

  function handleFavorited(product: ProductDTO) {
    saveFavorite(product.id.toString(), product, user.email);
    setProducts((prev) => prev.filter((p) => p.id !== product.id));
  }

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onFavorite={() => handleFavorited(item)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
