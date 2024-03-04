import React, { useMemo } from "react";

import PartlyCloudySVG from "../assets/partly-cloudy.svg";
import RainySVG from "../assets/rainy.svg";
import SnowySVG from "../assets/snowy.svg";
import SunnySVG from "../assets/sunny.svg";
import ThunderRainSVG from "../assets/thunder-rain.svg";
import WEATHER_CONDITIONS from "../constants/weatherConditions";

interface WeatherIconProps {
  condition: string | undefined;
}

export default function WeatherIcon({ condition }: WeatherIconProps) {
  const iconName = useMemo(() => {
    const iconName = WEATHER_CONDITIONS.find(
      (weather) => weather.day === condition || weather.night === condition,
    )?.svg;
    return iconName;
  }, [condition]);
  const getIconComponent = (iconName: string | undefined) => {
    switch (iconName) {
      case "sunny":
        return SunnySVG;
      case "partly-cloudy":
        return PartlyCloudySVG;
      case "rainy":
        return RainySVG;
      case "thunder-rain":
        return ThunderRainSVG;
      case "snowy":
        return SnowySVG;
      default:
        return null;
    }
  };
  const IconComponent = useMemo(() => getIconComponent(iconName), [iconName]);
  return IconComponent ? <IconComponent width={200} height={200} /> : null;
}
