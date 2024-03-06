import { CurrentWeatherResponse } from "@types/CurrentWeather";

import api from "./serviceHelper";

export const fetchCurrentWeather = async (q = "İzmir") => {
  const { data } = await api.get("/current.json", {
    params: { q },
  });
  return data as CurrentWeatherResponse;
};
