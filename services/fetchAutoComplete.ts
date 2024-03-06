import { AutoCompleteResponse } from "@types/AutoComplete";

import api from "./serviceHelper";

export const fetchAutoComplete = async (q: string) => {
  if (!q) return [];
  const { data } = await api.get("/search.json", {
    params: { q },
  });
  return data as AutoCompleteResponse[];
};
