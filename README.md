# ✈️ 플렉시스 pre-onboarding-9th-2-3 과제 제출

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
</p>

## ✍ 실행 방법

---

```sh
git clone // this repository
cd this file location
npm install
npx vite
```

## 배포 사이트

[바로가기](https://pre-onboarding-9th-2-3.vercel.app/)

## 🎆 발전된 부분

```
1. 초기설계 (데이터 구조 및 폴더구조)를 확실히 했다.
2. 단일 책임 원칙과 개방 폐쇄 원칙을 지키는 클린 코드를 사용하려 노력
3. 페이지와 재사용 가능한 컴포넌트의 역할 분리 - 가독성 증가
4. 기능별 구현 후 PR을 통해 코드 리뷰 후 merge 진행
```

## 🎓 Best Practice

### 1. 공통

    a. Redux slice 관심사 분리
        - trip과 reservation 두개로 나눔

### 2. 메인 페이지

    a. 여행 상품 정보 노출
        - 확장성을 고려하여 axios를 이용해 mock JSON 받아오는 api 작성
        - redux thunk를 이용해 비동기 처리
    b. 필터
        - 필터 로직 재사용을 위해 지역별, 가격별 필터링 함수 별개로 작성
    c. 모달
        - chakra ui내의 모달 컴포넌트를 불러와서 예약 상품 컴포넌트에서 호출

### 3. 예약 페이지

    a. localStorage를 활용한 persistence 유지
    b. 구매수량 변경 가능 및 리스트 삭제 가능
    c. 여행 상품의 총 결제액 계산

### 4. 주요 로직

## 👨‍💻 팀원

---

| [강명훈](https://github.com/michoball) | [김진영](https://github.com/tbs01215)  |  [백유리](https://github.com/BaekYuri)  | [김유신](https://github.com/kysclient) |
| :------------------------------------: | :------------------------------------: | :-------------------------------------: | :------------------------------------: |
| [최명식](https://github.com/mysungsik) | [안윤경](https://github.com/skyhanull) | [구본아](https://github.com/bona373737) | [김재욱](https://github.com/WooGie911) |

## 📝 구현 요구사항 목록

1. 시계열 차트 만들기

   - [x] 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
   - [x] 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
   - [x] Area 그래프의 기준값은 `value_area` 값을 이용해주세요
   - [x] Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
   - [x] 차트의 Y축에 대략적인 수치를 표현해주세요(예시 이미지 참고)

2. 호버 기능 구현

   - [x] 특정 데이터 구역에 마우스 호버시 `id, value_area, value_bar` 데이터를 툴팁 형태로 제공해주세요

3. 필터링 기능 구현

   - [x] 필터링 기능을 구현해주세요, 필터링은 특정 데이터를 하이라이트 하는 방식으로 구현해주세요
   - [x] 필터링 기능은 버튼 형태로 ID값(지역이름)을 이용해주세요
   - [x] 필터링 시 버튼에서 선택한 ID값과 동일한 ID값을 가진 데이터 구역만 하이라이트 처리를 해주세요
   - [x] 특정 데이터 구역을 클릭 시에도 필터링 기능과 동일한 형태로 동일한 ID값을 가진 데이터 구역을 하이라이트해주세요

## 🗂️ 파일구조

```

📦src
┣ 📂api
┃ ┗ 📜tripApi.tsx
┣ 📂components
┃ ┣ 📂filter
┃ ┃ ┗ 📜SelectBox.tsx
┃ ┣ 📂modal
┃ ┃ ┗ 📜CardModal.tsx
┃ ┣ 📂reservation
┃ ┃ ┣ 📜CheckoutItem.tsx
┃ ┃ ┗ 📜ReservationList.tsx
┃ ┣ 📂trip
┃ ┃ ┣ 📜TripCard.tsx
┃ ┃ ┗ 📜TripList.tsx
┃ ┗ 📂ui
┃ ┃ ┗ 📜logo.tsx
┣ 📂data
┃ ┗ 📜mock_data.json
┣ 📂pages
┃ ┣ 📜MainPage.tsx
┃ ┣ 📜NavigationPage.tsx
┃ ┣ 📜NotFoundPage.tsx
┃ ┗ 📜ReservationPage.tsx
┣ 📂store
┃ ┣ 📂reservation
┃ ┃ ┣ 📜reservationSelector.ts
┃ ┃ ┗ 📜reservationSlice.ts
┃ ┣ 📂trip
┃ ┃ ┣ 📜tripSelector.ts
┃ ┃ ┗ 📜tripSlice.ts
┃ ┗ 📜store.ts
┣ 📂utils
┃ ┣ 📜dateConvertor.ts
┃ ┗ 📜localStorage.ts
┣ 📜App.css
┣ 📜App.tsx
┣ 📜Type.ts
┣ 📜index.css
┣ 📜main.tsx
┣ 📜setupTests.ts
┗ 📜vite-env.d.ts


```
