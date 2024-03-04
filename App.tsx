import { SafeAreaView, ImageBackground } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";

import Weather from "./components/Weather";

export default function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ImageBackground className="flex-1" source={require("./assets/bg.jpeg")}>
        <SafeAreaView className="flex-1">
          <Weather />
        </SafeAreaView>
      </ImageBackground>
    </QueryClientProvider>
  );
}
