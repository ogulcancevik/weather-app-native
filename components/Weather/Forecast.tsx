import { WeatherContext } from "@contexts/WeatherProvider";
import { Feather } from "@expo/vector-icons";
import { useContext, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery } from "react-query";

import Icon from "./Icon";
import dateToDay from "../../helpers/date/dateToDay";
import { fetchForecast } from "../../services/fetchForecast";
export default function Forecast() {
  const { selectedCountry } = useContext(WeatherContext);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["forecast", selectedCountry.name],
    queryFn: () => fetchForecast(selectedCountry.name),
  });

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log(data);
    }
  }, [data, isError, isLoading]);

  return (
    <View className="mt-6 px-3">
      <View className="flex-row items-center justify-center gap-3">
        <Feather name="calendar" size={24} color="white" />
        <Text className="text-white">Daily forecast</Text>
      </View>
      <FlatList
        horizontal
        className="mt-5"
        data={data}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item) => item.date}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="w-3" />}
        renderItem={({ item }) => (
          <View
            className="items-center rounded-lg p-3 w-28"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <Text className="text-white mb-1">{dateToDay(item.date)}</Text>
            <View className="mb-1">
              <Icon
                width={32}
                height={32}
                condition={item.day.condition.text}
              />
            </View>
            <Text className="text-white text-xs mb-1">
              Min {item.day.maxtemp_c}°C
            </Text>
            <Text className="text-white text-xs mb-1">
              Max {item.day.mintemp_c}°C
            </Text>
          </View>
        )}
      />
    </View>
  );
}
