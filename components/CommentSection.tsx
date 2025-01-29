import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

type Comment = {
  id: number;
  text: string;
};

type CommentSectionProps = {
  comments: Comment[];
  onAddComment: (comment: string) => void;
};

const CommentSection = ({ comments, onAddComment }: CommentSectionProps) => {
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim() !== '') {
      onAddComment(comment);
      setComment('');
    }
  };

  return (
    <View className="mt-6">
      <Text className="text-lg font-semibold text-white">Leave a Comment:</Text>
      <TextInput
        className="border border-red-600 p-3 rounded-lg mt-2 text-gray-400 "
        placeholder="Write your comment..."
        placeholderTextColor="#888"
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity
        className="bg-red-600  mt-3 py-3 rounded-lg items-center"
        onPress={handleAddComment}
      >
        <Text className="text-white font-semibold">Submit Comment</Text>
      </TouchableOpacity>

      <View className="mt-6">
        <Text className="text-lg font-semibold text-white">User Comments:</Text>
        {comments.length === 0 ? (
          <Text className="text-gray-500 mt-2">No comments yet. Be the first to comment!</Text>
        ) : (
          <FlatList
            data={comments}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className=" bg-gray-700 p-3 rounded-lg mt-2">
                <Text className="text-white">{item.text}</Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default CommentSection;
