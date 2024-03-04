import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView>
      <Text className="text-red-500">
        O2pen up App.tsx to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
