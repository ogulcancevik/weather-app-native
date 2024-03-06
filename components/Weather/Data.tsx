import { WeatherContext } from "@contexts/WeatherProvider";
import React, { useContext } from "react";
import { View, Text } from "react-native";

import Icon from "./Icon";

export default function Data() {
  const { weatherData } = useContext(WeatherContext);
  if (!weatherData.isLoading)
    return (
      <View className="mt-12 items-center">
        <Text className="text-white text-2xl text-center font-bold mb-5">
          {weatherData.data?.location.name},{" "}
          {weatherData.data?.location.country}
        </Text>
        <Icon condition={weatherData.data?.current.condition.text} />
        <Text className="text-white text-6xl font-bold mt-5">
          {weatherData.data?.current.temp_c.toFixed(0)}°
        </Text>
        <Text className="text-white text-xl tracking-widest">
          {weatherData.data?.current.condition.text}
        </Text>
      </View>
    );
}
