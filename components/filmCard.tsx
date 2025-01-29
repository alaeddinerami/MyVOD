import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

type FilmCardProps = {
  onPress: () => void;
  film: { id: number; title: string; imageUrl: string }; 
};

const FilmCard = ({ onPress, film }: FilmCardProps) => {
  return (
    <TouchableOpacity onPress={() => onPress()} activeOpacity={0.7}>
      <View className="bg-white h-64 shadow-lg w-[180px] mt-4 relative">
        <Image
          source={require('../assets/images/event.jpg')} 
          className="h-full w-full"
          resizeMode="cover"
        />
        <Text className="text-xl absolute font-bold text-white mx-5 bottom-3">
          {film.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default FilmCard;
