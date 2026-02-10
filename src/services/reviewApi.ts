import type { Review, ReviewFormInput } from "../types/review";

// Mock data
let reviews: Review[] = [
  {
    id: "r1",
    placeId: 1,
    userId: "user1",
    userName: "멍멍이집사",
    rating: 5,
    content: "사장님이 너무 친절하시고 강아지들이 뛰어놀기 정말 좋아요! 재방문의사 200%입니다.",
    createdAt: "2024-02-01T10:00:00Z",
    visitDate: "2024-01-20",
    likes: 5,
  },
  {
    id: "r2",
    placeId: 1,
    userId: "user2",
    userName: "냥냥펀치",
    rating: 4,
    content: "음식도 맛있고 분위기도 좋습니다. 다만 주차가 조금 불편했어요.",
    createdAt: "2024-02-05T14:30:00Z",
    visitDate: "2024-02-02",
    likes: 2,
  },
];

const MOCK_DELAY = 500;

export async function getReviewsByPlaceId(placeId: number): Promise<Review[]> {
  const useMock = import.meta.env.VITE_USE_MOCK === "true";

  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const placeReviews = reviews.filter((r) => r.placeId === placeId);
        // Sort by newest
        placeReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        resolve(placeReviews);
      }, MOCK_DELAY);
    });
  }

  // Real API implementation would go here
  // const response = await apiClient.get<Review[]>(`/places/${placeId}/reviews`);
  // return response.data;
  return [];
}

export async function createReview(placeId: number, input: ReviewFormInput): Promise<Review> {
  const useMock = import.meta.env.VITE_USE_MOCK === "true";

  if (useMock) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newReview: Review = {
          id: `r${Date.now()}`,
          placeId,
          userId: "current_user", // Mock user
          userName: "나의닉네임",
          rating: input.rating,
          content: input.content,
          createdAt: new Date().toISOString(),
          visitDate: input.visitDate || new Date().toISOString(),
          likes: 0,
          images: [], // Handle images mock upload if needed
        };
        reviews = [newReview, ...reviews];
        resolve(newReview);
      }, MOCK_DELAY);
    });
  }

  // Real API implementation
  // const formData = new FormData();
  // formData.append("rating", input.rating.toString());
  // formData.append("content", input.content);
  // ...
  // const response = await apiClient.post<Review>(`/places/${placeId}/reviews`, formData);
  // return response.data;
  throw new Error("Not implemented");
}
