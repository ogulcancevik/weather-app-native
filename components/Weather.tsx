import React, { useState } from "react";
import { View, Text } from "react-native";
import { useQuery } from "react-query";

import WeatherIcon from "./WeatherIcon";
import { fetchCurrentWeather } from "../services/fetchCurrentWeather";

export default function Weather() {
  const [query, setQuery] = useState("İzmir");
  const { data, isLoading } = useQuery({
    queryKey: ["weather", query],
    queryFn: () => fetchCurrentWeather(query),
  });
  if (!isLoading)
    return (
      <View className="items-center mt-12">
        <Text className="text-white text-2xl font-bold mb-5">
          {data?.location.name}, {data?.location.country}
        </Text>
        <WeatherIcon condition={data?.current.condition.text} />
        <Text className="text-white text-6xl font-bold mt-5">
          {data?.current.temp_c.toFixed(0)}°
        </Text>
        <Text className="text-white text-xl tracking-widest">
          {data?.current.condition.text}
        </Text>
      </View>
    );
}
