import { useEffect, useRef } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

type KakaoMapProps = {
  lat: number;
  lng: number;
  level?: number;
};

export default function KakaoMap({ lat, lng, level = 3 }: KakaoMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if Kakao Map script is loaded
    if (!window.kakao || !window.kakao.maps) {
      // Script not loaded yet.
      // In a real app, we might want to dynamically load the script here if not present.
      // For now, we assume it's in index.html
      return;
    }

    const options = {
      center: new window.kakao.maps.LatLng(lat, lng),
      level: level,
    };

    const map = new window.kakao.maps.Map(mapContainer.current, options);

    // Add marker
    const markerPosition = new window.kakao.maps.LatLng(lat, lng);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, [lat, lng, level]);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px", borderRadius: "0.5rem" }} />;
}
