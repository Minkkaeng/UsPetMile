import api from "./api";
import { mockPlaces } from "../mocks/places";
import type { Place } from "../types/place";

type PlacesResponse = Place[] | { items: Place[] } | { data: Place[] };

const parsePlaces = (data: PlacesResponse): Place[] => {
  if (Array.isArray(data)) return data;
  if ("items" in data && Array.isArray(data.items)) return data.items;
  if ("data" in data && Array.isArray(data.data)) return data.data;
  return [];
};

export const fetchPlaces = async (): Promise<Place[]> => {
  const useMock = import.meta.env.VITE_USE_MOCK === "true" || !import.meta.env.VITE_API_URL;
  if (useMock) {
    return mockPlaces;
  }

  const endpoint = import.meta.env.VITE_PLACES_ENDPOINT ?? "/places";
  const response = await api.get<PlacesResponse>(endpoint);
  const places = parsePlaces(response.data);
  return places;
};
