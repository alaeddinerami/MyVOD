import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface SearchBarProps {
  value: string; 
  onChangeText: (text: string) => void; 
  placeholder?: string; 
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-gray-800 rounded-full px-4 py-1 shadow-sm w-full">
      <FontAwesome5 name="search" size={20} className="text-gray-500 mr-3" />
      <TextInput
        className="flex-1 text-base text-gray-400"
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}
