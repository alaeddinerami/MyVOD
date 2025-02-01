import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import CommentSection from '@/components/CommentSection';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFavorites } from '@/context/FavoriteContext'; // ✅ Import favorites context

export default function FilmDetails() {
  const { id } = useLocalSearchParams();
  const { favorites, toggleFavorite } = useFavorites(); // ✅ Use global favorites context

  const film = {
    id: Number(id), 
    title: `Film ${id}`,
    imageUrl: require('@/assets/images/event.jpg'), 
    description: 'This is a sample description for the film.',
  };

  const [ratings, setRatings] = useState<number[]>([]);
  const [comments, setComments] = useState<{ id: number; text: string }[]>([]);

  const handleRating = (newRating: number) => {
    setRatings([...ratings, newRating]);
  };

  const averageRating =
    ratings.length > 0
      ? ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length
      : 0;

  const handleAddComment = (comment: string) => {
    setComments([...comments, { id: comments.length + 1, text: comment }]);
  };

  const isFavorite = favorites.some((fav) => fav.id === film.id); // ✅ Check if the film is already a favorite

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView>
        <View className="relative">
          <Image source={film.imageUrl} className="w-full h-72 rounded-lg" resizeMode="cover" />

          {/* ✅ Favorite Button */}
          <TouchableOpacity
            onPress={() => toggleFavorite(film)}
            className="absolute top-4 right-4 bg-gray-800 p-2 rounded-full"
          >
            <Icon name={isFavorite ? 'favorite' : 'favorite-border'} size={28} color={isFavorite ? 'red' : 'white'} />
          </TouchableOpacity>
        </View>

        <View className="mt-4 px-4">
          <Text className="text-2xl font-bold text-white">{film.title}</Text>
          <Text className="text-xl font-bold text-yellow-400">
            ⭐ {averageRating.toFixed(1)}
          </Text>
          <Text className="text-white">Film ID: {film.id}</Text>
          <Text className="text-base text-white mt-2">{film.description}</Text>
        </View>

        <View className="mt-4 px-4">
          <Text className="text-lg font-semibold text-white">Rate this Film:</Text>
          <StarRating rating={0} onChange={handleRating} starSize={30} />
        </View>

        <CommentSection comments={comments} onAddComment={handleAddComment} />
      </ScrollView>
    </SafeAreaView>
  );
}
