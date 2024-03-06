import { ImageBackground, SafeAreaView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface MainLayoutProps {
  children: React.ReactNode;
  center?: boolean;
}
export default function MainLayout({ children, center }: MainLayoutProps) {
  return (
    <Animated.View className="flex-1" entering={FadeIn} exiting={FadeOut}>
      <ImageBackground
        source={require("@assets/bg.jpeg")}
        className={`flex-1  ${center && "items-center justify-center"}`}
      >
        <SafeAreaView>{children}</SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );
}
