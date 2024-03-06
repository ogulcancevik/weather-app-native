import api from "./serviceHelper";
import { ForecastResponse } from "../types/Forecast";

export const fetchForecast = async (q = "İzmir") => {
  const { data } = await api.get("/forecast.json", {
    params: { q, days: 10 },
  });
  return data.forecast.forecastday as ForecastResponse[];
};
