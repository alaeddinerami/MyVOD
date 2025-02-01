import React, { useState } from 'react';
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import GenreFilter from '@/components/GenreFilter';
import FilmCard from '@/components/filmCard';

export default function HomeScreen() {
  const router = useRouter();
  const [selectedGenre, setSelectedGenre] = useState<string>('All');

  const movies = [
    { id: 1, title: 'Inception', imageUrl: require('@/assets/images/event.jpg'), genre: 'Sci-Fi' },
    { id: 2, title: 'Interstellar', imageUrl: require('@/assets/images/event.jpg'), genre: 'Sci-Fi' },
    { id: 3, title: 'The Dark Knight', imageUrl: require('@/assets/images/event.jpg'), genre: 'Action' },
    { id: 4, title: 'Tenet', imageUrl: require('@/assets/images/event.jpg'), genre: 'Action' },
    { id: 5, title: 'Toy Story', imageUrl: require('@/assets/images/event.jpg'), genre: 'Animation' },
  ];

  const filteredMovies = selectedGenre === 'All'
    ? movies
    : movies.filter((movie) => movie.genre === selectedGenre);
  return (
    <SafeAreaView className="flex-1 ">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Featured Movies Swiper */}
        <View className="h-60 mb-6">
          <Swiper
            showsButtons={false}
            autoplay
            autoplayTimeout={3}
            showsPagination={true}
            paginationStyle={{
              bottom: 10,
            }}
            dotStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 4,
            }}
            activeDotStyle={{
              backgroundColor: '#3b82f6',
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 4,
            }}
          >
            {movies.map((movie) => (
              <TouchableOpacity 
                key={movie.id} 
                onPress={() => router.push(`/film/${movie.id}`)}
                activeOpacity={0.9}
              >
                <View className="relative h-full">
                  <Image
                    source={movie.imageUrl}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                  {/* Gradient Overlay */}
                  <View className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-slate-900/90 to-transparent" />
                  <Text className="absolute bottom-4 left-4 text-white font-bold text-xl tracking-tight">
                    {movie.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>
        </View>

        {/* Genre Filter */}
        <View className="px-4 mb-6">
          <GenreFilter selectedGenre={selectedGenre} onChange={setSelectedGenre} />
        </View>

        {/* Movie Grid */}
        <View className="px-4">
          <Text className="text-2xl font-bold mb-4 text-white">
            {selectedGenre === 'All' ? 'All Movies' : selectedGenre}
          </Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            {filteredMovies.map((movie) => (
              <FilmCard 
                key={movie.id} 
                film={movie} 
                onPress={() => router.push(`/film/${movie.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}