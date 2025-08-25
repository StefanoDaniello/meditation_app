import React from "react";
import { Text, View } from "react-native";

const Toast = ({ message }: { message: string }) => {
  return (
    <View className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-gray-800 px-6 py-3 rounded-full shadow-lg">
      <Text className="text-white text-sm font-medium">{message}</Text>
    </View>
  );
};
