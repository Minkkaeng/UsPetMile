import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import AdminHomePage from "../pages/admin/AdminHomePage";
import AdminInquiriesPage from "../pages/admin/AdminInquiriesPage";
import AdminPlaceEditPage from "../pages/admin/AdminPlaceEditPage";
import AdminPlaceFormPage from "../pages/admin/AdminPlaceFormPage";
import AdminPlacesPage from "../pages/admin/AdminPlacesPage";
import FavoritesPage from "../pages/mypage/FavoritesPage";
import MyPage from "../pages/mypage/MyPage";
import ProfilePage from "../pages/mypage/ProfilePage";
import ReviewsPage from "../pages/mypage/ReviewsPage";
import NotFoundPage from "../pages/NotFoundPage";
import PlaceDetailPage from "../pages/PlaceDetailPage";
import PlacesPage from "../pages/PlacesPage";
import SignupPage from "../pages/SignupPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "places", element: <PlacesPage /> },
      { path: "places/:id", element: <PlaceDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignupPage /> },
      { path: "mypage", element: <MyPage /> },
      { path: "mypage/favorites", element: <FavoritesPage /> },
      { path: "mypage/reviews", element: <ReviewsPage /> },
      { path: "mypage/profile", element: <ProfilePage /> },
      { path: "admin", element: <AdminHomePage /> },
      { path: "admin/places", element: <AdminPlacesPage /> },
      { path: "admin/places/new", element: <AdminPlaceFormPage /> },
      { path: "admin/places/:id/edit", element: <AdminPlaceEditPage /> },
      { path: "admin/inquiries", element: <AdminInquiriesPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
