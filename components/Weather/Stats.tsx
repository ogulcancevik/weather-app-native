import { Feather } from "@expo/vector-icons";
import React, { useCallback, useContext } from "react";
import { View, Text } from "react-native";

import { WEATHER_ICONS } from "../../constants/weatherStats";
import { WeatherContext } from "../../contexts/WeatherProvider";
import dateToHour from "../../helpers/date/dateToHour";

export default function Stats() {
  const { weatherData } = useContext(WeatherContext);

  const weatherStats = useCallback(
    (stat: string) => {
      switch (stat) {
        case "wind":
          return weatherData.data?.current.wind_kph;
        case "droplet":
          return weatherData.data?.current.humidity;
        case "clock":
          return dateToHour(weatherData.data?.location.localtime);
        default:
          return "";
      }
    },
    [weatherData.data, weatherData.isLoading],
  );

  if (!weatherData.isLoading && !weatherData.isError)
    return (
      <View className="mt-6 flex-row justify-between px-16">
        {WEATHER_ICONS.map((stat, index) => (
          <View key={index} className="flex-row items-center gap-1.5">
            <Feather name={stat as any} size={24} color="white" />
            <Text className="text-base text-white font-medium">
              {weatherStats(stat)}
            </Text>
          </View>
        ))}
      </View>
    );
}
