import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavorites } from '@/context/FavoriteContext';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-900 px-4">
      <Text className="text-2xl font-bold text-white mt-4">My Favorite Movies</Text>

      {favorites.length === 0 ? (
        <Text className="text-gray-400 mt-6 text-center">No favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => router.push(`/film/${item.id}`)}
              className="flex-row items-center bg-gray-800 rounded-lg p-4 my-2"
            >
              <Image source={item.imageUrl} className="w-16 h-16 rounded-md" resizeMode="cover" />
              <View className="ml-4 flex-1">
                <Text className="text-white text-lg font-semibold">{item.title}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(item)}>
                <Icon name="favorite" size={24} color="red" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}
