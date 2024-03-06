import Search from "@components/Search";
import Weather from "@components/Weather";
import WeatherProvider from "@contexts/WeatherProvider";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <Search.Bar />
        <Weather.Data />
        <Weather.Stats />
        <Weather.Forecast />
        <Search.Overlay />
      </WeatherProvider>
    </QueryClientProvider>
  );
}
