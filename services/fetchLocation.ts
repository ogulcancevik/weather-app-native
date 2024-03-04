import api from "./serviceHelper";

export const fetchLocation = async (q: string) => {
  const { data } = await api.get("/search.json", {
    params: { q },
  });
  return data;
};
