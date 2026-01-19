export type PlaceCategory = "숙소" | "카페" | "식당" | "관광" | "체험";

export type PlacePolicy = "OK" | "NO";

export type Place = {
  id: number;
  title: string;
  address: string;
  category: PlaceCategory;
  petPolicy: PlacePolicy;
  tags: string[];
  points: string[];
  image?: string;
};
