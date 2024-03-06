import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useQueryClient } from "react-query";
export default function Error() {
  const queryClient = useQueryClient();
  const retry = () => {
    queryClient.invalidateQueries("weather");
  };
  return (
    <TouchableOpacity onPress={retry}>
      <View className=" items-center justify-center">
        <MaterialIcons name="error" size={50} color="white" />
        <Text className="text-white text-2xl font-bold mt-5 text-center">
          City not found or something went wrong, tap to retry
        </Text>
      </View>
    </TouchableOpacity>
  );
}
