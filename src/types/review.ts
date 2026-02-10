export type Review = {
  id: string;
  placeId: number;
  userId: string;
  userName: string;
  rating: number; // 1 to 5
  content: string;
  images?: string[];
  createdAt: string; // ISO date string
  visitDate?: string; // ISO date string
  likes?: number; // Helpfulness count
};

export type ReviewFormInput = {
  rating: number;
  content: string;
  images?: File[];
  visitDate?: string;
};
