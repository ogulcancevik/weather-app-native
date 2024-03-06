import api from "./serviceHelper";
import { AutoCompleteResponse } from "../types/AutoComplete";

export const fetchAutoComplete = async (q: string) => {
  if (!q) return [];
  const { data } = await api.get("/search.json", {
    params: { q },
  });
  return data as AutoCompleteResponse[];
};
