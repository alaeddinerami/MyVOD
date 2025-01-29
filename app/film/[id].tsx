import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from 'react-native-star-rating-widget';
import CommentSection from '@/components/CommentSection'; 

export default function FilmDetails() {
  const { id } = useLocalSearchParams();

  const film = {
    id,
    title: `Film ${id}`,
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

  return (
    <SafeAreaView className="flex-1 bg-gray-900 ">
      <ScrollView className="px-4">
        <Image
          source={require('@/assets/images/event.jpg')}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />

        <View className="mt-4 ">
          <Text className="text-2xl font-bold text-white">{film.title}</Text>
          <Text className="text-xl font-bold text-yellow-400">
            ⭐ {averageRating.toFixed(1)}
          </Text>
          <Text className="text-white">Film ID: {film.id}</Text>
          <Text className="text-base text-white mt-2">{film.description}</Text>
        </View>


        <View className="mt-4">
          <Text className="text-lg font-semibold text-white">Rate this Film:</Text>
          <StarRating rating={0} onChange={handleRating} starSize={30} />
        </View>

        <CommentSection comments={comments} onAddComment={handleAddComment} />
      </ScrollView>
    </SafeAreaView>
  );
}
