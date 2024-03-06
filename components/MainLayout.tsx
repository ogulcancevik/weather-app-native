import { ImageBackground, SafeAreaView } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface MainLayoutProps {
  assets?: any;
  children: React.ReactNode;
  center?: boolean;
}
export default function MainLayout({
  assets,
  children,
  center,
}: MainLayoutProps) {
  const bg = assets?.[0].uri;
  return (
    <Animated.View className="flex-1" entering={FadeIn} exiting={FadeOut}>
      <ImageBackground
        source={{
          uri: bg,
        }}
        className={`flex-1  ${center && "items-center justify-center"}`}
      >
        <SafeAreaView>{children}</SafeAreaView>
      </ImageBackground>
    </Animated.View>
  );
}
