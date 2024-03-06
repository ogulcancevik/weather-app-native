// import Error from "@components/Error";
import MainLayout from "@components/MainLayout";
import { createContext, useState } from "react";
// import { ActivityIndicator } from "react-native";
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
  weatherData: { data: CurrentWeatherResponse; isLoading: boolean };
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
  const [query, setQuery] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<AutoCompleteResponse>(
    {} as AutoCompleteResponse,
  );
  const setDebouncedQuery = useDebounceCallback(setQuery, 500);

  const { data: weatherData, isLoading: weatherIsLoading } = useQuery({
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
    weatherData: { data: weatherData, isLoading: weatherIsLoading },
    setSelectedCountry,
    autoCompleteData: {
      data: autoCompleteData,
      isLoading: autoCompleteIsLoading,
      isFetched: isAutoCompleteFetched,
    },
  } as WeatherContextProps;

  // const RenderApp = () =>
  //   useMemo(() => {
  //     if (!isFetching && !isError) {
  //       return children;
  //     }
  //     if (isFetching && isError) {
  //       return <Error />;
  //     }
  //     return <ActivityIndicator size="large" color="white" />;
  //   }, [isFetching, isError, children]);
  return (
    <WeatherContext.Provider value={values}>
      <MainLayout>
        {/* <RenderApp /> */}
        {children}
      </MainLayout>
    </WeatherContext.Provider>
  );
}
