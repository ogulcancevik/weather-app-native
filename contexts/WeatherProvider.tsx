import MainLayout from "@components/MainLayout";
import { useAssets } from "expo-asset";
import { createContext, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useDebounceCallback } from "usehooks-ts";

import { fetchAutoComplete } from "../services/fetchAutoComplete";
import { fetchCurrentWeather } from "../services/fetchCurrentWeather";
import { AutoCompleteResponse } from "../types/AutoComplete";
import { CurrentWeatherResponse } from "../types/CurrentWeather";

interface WeatherContextProps {
  query: string;
  setQuery: (query: string) => void;
  setDebouncedQuery: (query: string) => void;
  isSearch: boolean;
  setIsSearch: (isSearch: boolean) => void;
  weatherData: {
    data: CurrentWeatherResponse;
    isLoading: boolean;
    isError: boolean;
  };
  selectedCountry: AutoCompleteResponse;
  setSelectedCountry: (country: AutoCompleteResponse) => void;
  autoCompleteData: {
    data: AutoCompleteResponse[];
    isLoading: boolean;
    isFetched: boolean;
  };
}

export const WeatherContext = createContext<WeatherContextProps>(
  {} as WeatherContextProps,
);

export default function WeatherProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [assets] = useAssets([require("@assets/bg.jpeg")]);
  const isAssetLoaded = useMemo(() => assets?.length, [assets]);
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<AutoCompleteResponse>(
    {} as AutoCompleteResponse,
  );
  const setDebouncedQuery = useDebounceCallback(setQuery, 500);

  const {
    data: weatherData,
    isLoading: weatherIsLoading,
    isError: weatherIsError,
  } = useQuery({
    queryKey: ["weather", selectedCountry.name],
    queryFn: () => fetchCurrentWeather(selectedCountry.name),
  });
  const {
    data: autoCompleteData,
    isLoading: autoCompleteIsLoading,
    isFetched: isAutoCompleteFetched,
  } = useQuery({
    queryKey: ["autoComplete", query],
    queryFn: () => fetchAutoComplete(query),
  });
  const values = {
    query,
    setQuery,
    setDebouncedQuery,
    isSearch,
    setIsSearch,
    weatherData: {
      data: weatherData,
      isLoading: weatherIsLoading,
      isError: weatherIsError,
    },
    selectedCountry,
    setSelectedCountry,
    autoCompleteData: {
      data: autoCompleteData,
      isLoading: autoCompleteIsLoading,
      isFetched: isAutoCompleteFetched,
    },
  } as WeatherContextProps;

  return (
    <WeatherContext.Provider value={values}>
      {isAssetLoaded && <MainLayout assets={assets}>{children}</MainLayout>}
    </WeatherContext.Provider>
  );
}
