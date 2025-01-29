import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { View, Text } from 'react-native';

interface GenreFilterProps {
  selectedGenre: string;
  onChange: (genre: string) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({ selectedGenre, onChange }) => {
  return (
      <View className="bg-gray-800 rounded-full w-52 m-4">
        <RNPickerSelect
        onValueChange={onChange}
        items={[
          { label: 'Alls', value: 'All' },
          { label: 'Sci-Fi', value: 'Sci-Fi' },
          { label: 'Action', value: 'Action' },
          { label: 'Animation', value: 'Animation' },
        ]}
        value={selectedGenre}
        style={{
            inputAndroid: { color: '#ccd', fontSize: 16, paddingVertical: 0 },
            placeholder: { color: '#aaa' },
          }}
        
      />
    </View>
  );
};

export default GenreFilter;
