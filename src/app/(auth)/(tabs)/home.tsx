import ProductCard from "@/components/ProductCard";
import { AuthContext } from "@/context/AuthContext";
import { getFavoritesByEmail } from "@/firebase/favoriteItem";
import { registerForPushNotificationsAsync } from "@/hooks/usePushNotification";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchFavorites() {
    setLoading(true);

    const fullData = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
    const favorites = await getFavoritesByEmail(user.email);
    const favoriteIds = favorites.map((fav) => fav.id);
    const productsFiltered = fullData.filter((product: any) => !favoriteIds.includes(product.id));

    setProducts(productsFiltered);
    setLoading(false);
  }
  useEffect(() => { 
    if(user)
      registerForPushNotificationsAsync()

  }, [user])



  useFocusEffect(
    useCallback(() => {
      if (user)
        fetchFavorites()
    }, [user])
  )

  if (loading) {
    return <ActivityIndicator className="flex-1" />;
  }

  function handleFavorited(productId: string) {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  }

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <ProductCard
            product={item}
            onFavorite={() => handleFavorited(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
