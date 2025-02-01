import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface GenreFilterProps {
  selectedGenre: string;
  onChange: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onChange }) => {
  return (
    <View className="px-4 mb-4">
      <View className="flex-row items-center justify-between bg-slate-800 rounded-full px-5 py-2 border border-slate-700">
        <View className="flex-row items-center">
          <Icon name="filter-list" size={18} color="#94a3b8" style={{ marginRight: 8 }} />
          <Text className="text-slate-300 text-sm font-medium">Filter by Genre</Text>
        </View>
        
        <View className="relative">
          <RNPickerSelect
            onValueChange={onChange}
            items={[
              { label: 'All', value: 'All' },
              { label: 'Sci-Fi', value: 'Sci-Fi' },
              { label: 'Action', value: 'Action' },
              { label: 'Animation', value: 'Animation' },
            ]}
            value={selectedGenre}
            placeholder={{}}
            useNativeAndroidPickerStyle={false}
            style={{
              inputIOS: {
                color: 'white',
                fontSize: 14,
                paddingVertical: 4, 
                paddingRight: 25, 
              },
              inputAndroid: {
                color: 'white',
                fontSize: 14,
                paddingVertical: 4, 
                paddingRight: 25, 
              },
              placeholder: {
                color: '#94a3b8',
              },
            }}
            Icon={() => (
              <Icon
                name="arrow-drop-down"
                size={20}
                color="#94a3b8"
                style={{ position: 'absolute', right: 8, top: 8 }}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default GenreFilter;
