import React, { useState } from 'react';
import { ScrollView, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper'; // Import Swiper
import { useRouter } from 'expo-router';
import GenreFilter from '@/components/GenreFilter'; // Import GenreFilter
import FilmCard from '@/components/filmCard';

const { width } = Dimensions.get('window');

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
    <SafeAreaView className="flex-1 bg-gray-900">
      <ScrollView className="">

        <View className="mt-4 h-[200px]">
          <Swiper
            showsButtons={false}
            autoplay
            autoplayTimeout={3}
            showsPagination={true}
            paginationStyle={{
              bottom: 10,
              height: 0,
            }}
            dotStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 4,
              marginRight: 4,
            }}
            activeDotStyle={{
              backgroundColor: 'white',
              width: 8,
              height: 8,
              borderRadius: 4,
              marginLeft: 4,
              marginRight: 4,
            }}
          >
            {movies.map((movie) => (
              <TouchableOpacity key={movie.id} onPress={() => router.push(`/film/${movie.id}`)}>
                <View className="relative">
                  <Image
                    source={movie.imageUrl}
                    className="w-full h-60 rounded-lg"
                    resizeMode="cover"
                  />
                  <Text className="absolute bottom-6 left-3 text-white font-bold text-lg">
                    {movie.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </Swiper>

        </View>
          <GenreFilter selectedGenre={selectedGenre} onChange={setSelectedGenre} />

        <View className=' flex-wrap  gap-2 ' >
          <Text className="text-xl font-bold  mb-2 text-white">All Movies</Text>
        <View className='justify-center  flex-row flex-wrap gap-2' >
            {filteredMovies.map((movie) => (
              <FilmCard key={movie.id} film={movie} onPress={() => router.push(`/film/${movie.id}`)} />
            ))}
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
