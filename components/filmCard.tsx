import { View, Text, Image } from "react-native";
import React from "react";

const FilmCard = () => {
  return (
    <View className="flex flex-row gap-3 flex-wrap">
      <View className="bg-white h-64 shadow-lg  w-[180px]  mt-4 relative">
        <Image
          source={require('../assets/images/event.jpg')}
          className="h-full w-full  "
          resizeMode="cover"
        />

        <Text className="text-xl absolute font-bold text-white mx-5 bottom-3">Film Title</Text>
      </View>
      <View className="bg-white h-64 shadow-lg  w-[180px]  mt-4 relative">
        <Image
          source={require('../assets/images/event.jpg')}
          className="h-full w-full  "
          resizeMode="cover"
        />

        <Text className="text-xl absolute font-bold text-white mx-5 bottom-3">Film Title</Text>
      </View>
      <View className="bg-white h-64 shadow-lg  w-[180px]  mt-4 relative">
        <Image
          source={require('../assets/images/event.jpg')}
          className="h-full w-full  "
          resizeMode="cover"
        />

        <Text className="text-xl absolute font-bold text-white mx-5 bottom-3">Film Title</Text>
      </View>
      
    </View>
  );
};

export default FilmCard;
