import React, { useContext } from "react";
import { Text, TouchableOpacity } from "react-native";

import { WeatherContext } from "../../contexts/WeatherProvider";

export default function Bar() {
  const { isSearch, setIsSearch } = useContext(WeatherContext);
  return (
    <TouchableOpacity
      className={`items-center mt-7 ${isSearch && "opacity-0"}`}
      onPress={() => setIsSearch(true)}
    >
      <Text className="text-white text-3xl">Search</Text>
    </TouchableOpacity>
  );
}
