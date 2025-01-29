import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilmCard from '@/components/filmCard';
import SearchBar from '@/components/Search';
import { useRouter } from 'expo-router';

export default function Film() {
  const [searchFilm, setSearchFilm] = useState('');
  const router = useRouter();

  const films = [
    { id: 1, title: 'Film 1', imageUrl: '@/assets/images/event.jpg' },
    { id: 2, title: 'Film 2', imageUrl: '@/assets/images/event.jpg' },
    { id: 3, title: 'Film 3', imageUrl: '@/assets/images/event.jpg' },
  ];

  const handleCardPress = (filmId: number) => {
    router.push({ pathname: '/film/[id]', params: { id: filmId.toString() } });
  };

  return (
    <SafeAreaView className="m-3">
      <ScrollView>
        <View>
          <SearchBar
            value={searchFilm}
            onChangeText={(text) => setSearchFilm(text)}
            placeholder="Search for a Movie"
          />
          <Text className="dark:text-white">Searching for: {searchFilm}</Text>
        </View>

        <View className="flex flex-row gap-3 flex-wrap">
          {films.map((film) => (
            <FilmCard key={film.id} film={film} onPress={() => handleCardPress(film.id)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
