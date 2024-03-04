import api from "./serviceHelper";
import { CurrentWeatherResponse } from "../types/CurrentWeather";

export const fetchCurrentWeather = async (q: string) => {
  const { data } = await api.get("/current.json", {
    params: { q },
  });
  return data as CurrentWeatherResponse;
};
