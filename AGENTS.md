# UsPetMile (어스펫밀리) Frontend Agent Context

## Stack

- React + Vite + TypeScript
- react-router-dom, axios

## Goal

반려동물 동반 가능 장소(숙소/카페/식당/관광/체험) 포탈 프론트엔드 제작

## Routes

- / : HomePage
- /places : 장소 리스트 (검색/필터/정렬)
- /places/:id : 장소 상세

## UI Rules

- 다크 테마
- src/styles/tokens.css 변수 사용
- 재사용 컴포넌트 분리
- "로딩/빈값/에러" 상태 처리 필수

## Data Model (Place)

- id: number
- title: string
- address: string
- category: "숙소" | "카페" | "식당" | "관광" | "체험"
- petPolicy: "OK" | "NO"
- tags: string[]
- points: string[]
- (추가 예정) images, lat/lng, hours, phone, link, parking, indoor/outdoor

## Coding Rules

- UI는 컴포넌트 단위로 쪼개기
- 타입은 any 금지, 명확히 선언
- API는 services/ 폴더에서만 관리
- 최소 1개 이상 샘플(mock) 데이터 유지
