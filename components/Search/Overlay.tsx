import { WeatherContext } from "@contexts/WeatherProvider";
import { AutoCompleteResponse } from "@types/AutoComplete";
import React, { useContext, useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export default function Overlay() {
  const {
    isSearch,
    setIsSearch,
    setDebouncedQuery,
    setSelectedCountry,
    autoCompleteData,
    query,
  } = useContext(WeatherContext);
  const [autoCompleteList, setAutoCompleteList] = useState<
    AutoCompleteResponse[]
  >([]);
  useEffect(() => {
    if (!autoCompleteData.isLoading && autoCompleteData.data) {
      setAutoCompleteList(autoCompleteData.data);
    }
  }, [autoCompleteData.data, autoCompleteData.isLoading]);
  const handleChange = (e: any) => {
    const query = e.nativeEvent.text;
    setDebouncedQuery(query);
  };
  const onClose = () => {
    setIsSearch(false);
    setAutoCompleteList([]);
  };
  const onPress = async (_e: any, item: AutoCompleteResponse) => {
    setSelectedCountry(item);
    setAutoCompleteList([]);
    setDebouncedQuery("");
    onClose();
  };
  if (isSearch)
    return (
      <Animated.View
        className="absolute h-screen flex-1 bottom-0 top-0 left-0 right-0 z-10 justify-center"
        entering={FadeIn}
        exiting={FadeOut}
      >
        <View
          style={styles.overlay}
          className="absolute h-screen w-full z-10"
          onTouchEnd={onClose}
        />
        <SafeAreaView className="items-center z-20">
          <View className="relative w-full items-center">
            <TextInput
              className="w-3/4 h-14 px-3 rounded-lg mt-10 border-b-2 border-white text-white"
              placeholder="Search a city"
              placeholderTextColor="white"
              onChange={handleChange}
            />
            {query && (
              <Animated.View
                className="absolute w-3/4 mt-24 rounded-lg rounded-t-none px-4 py-1"
                entering={FadeIn}
                exiting={FadeOut}
                style={{
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  display: query ? "flex" : "none",
                }}
              >
                {autoCompleteData.isLoading && (
                  <View className="py-2">
                    <Text className="text-white">Loading...</Text>
                  </View>
                )}
                {!autoCompleteData.data?.length &&
                  autoCompleteData.isFetched && (
                    <View className="py-2">
                      <Text className="text-white">No results found</Text>
                    </View>
                  )}
                {autoCompleteList.map((item) => (
                  <Pressable
                    key={item.id}
                    className="py-2 flex-row gap-2"
                    onPress={(e) => onPress(e, item)}
                  >
                    <Text className="text-white">
                      {item.name}, {item.country}
                    </Text>
                  </Pressable>
                ))}
              </Animated.View>
            )}
          </View>
        </SafeAreaView>
      </Animated.View>
    );
}

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
});
