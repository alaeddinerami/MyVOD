import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
// import StarRating from 'react-native-star-rating-widget';
import CommentSection from '@/components/CommentSection'; 

export default function FilmDetails() {
  const { id } = useLocalSearchParams();

  const film = {
    id,
    title: `Film ${id}`,
    description: 'This is a sample description for the film.',
  };

  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState<{ id: number; text: string }[]>([]);

  const handleAddComment = (comment: string) => {
    setComments([...comments, { id: comments.length + 1, text: comment }]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4">
        <Image
          source={require('@/assets/images/event.jpg')}
          className="w-full h-72 rounded-lg"
          resizeMode="cover"
        />

        <View className="mt-4">
          <Text className="text-2xl font-bold text-gray-900">{film.title}</Text>
          <Text className="text-gray-600">Film ID: {film.id}</Text>
          <Text className="text-base text-gray-700 mt-2">{film.description}</Text>
        </View>

        <View className="mt-4">
          <Text className="text-lg font-semibold text-gray-900">Rate this Film:</Text>
          {/* <StarRating rating={rating} onChange={setRating} starSize={30} /> */}
        </View>

        <CommentSection comments={comments} onAddComment={handleAddComment} />
      </ScrollView>
    </SafeAreaView>
  );
}
