# 🤖 플렉시스 pre-onboarding-9th-3-3 과제 제출

<p>
<img alt="Typescript" src="https://img.shields.io/badge/Typescript-v4.9.4-3178C6?style=plastic&logoColor=white%22/%3E"/>
<img alt="React" src="https://img.shields.io/badge/React-v18.2.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img alt="chart.js" src="https://img.shields.io/badge/chart.js-v4.2.1-FF6384?style=plastic&logo=chart.js&logoColor=white"/>
<img alt="Axios" src="https://img.shields.io/badge/axios-v1.3.4-5A29E4?style=plastic&logo=axios&logoColor=white"/>
</p>

## ✍ 설치 및 실행 명령어

To install the necessary dependencies, run the following command:

```
git clone // this repository
cd this file location
npm install
```

To start the development server, run the following command:

```
npm run dev
```

To build the application, run the following command:

```
npm run build
```

To preview the production build, run the following command:

```
npm run preview
```

To run the tests, run the following command:

```
npm run test
```

---

## 배포 사이트

[바로가기](https://wanted-9th-3team.github.io/pre-onboarding-9th-3-03/)

---

## ✨ 발전된 부분

```
1. 과제의 의도를 다 같이 분석하여 과제 수행을 위한 프로젝트 라이브러리 선정 및 폴더 구조를 수립했습니다.
2. 코드 유지 보수를 위해 관심사를 분리(SoC)하며 코드를 작성하려 노력했습니다.
3. 공식 문서를 보면서 프로젝트에 가장 적합한 오픈소스 라이브러리를 선택하였습니다.
4. 각자 구현 한 것들을 PR에 올린 후 코드 리뷰를 심도 있게 진행했습니다.
5. 전에 사용하지 않았던 gh-pages를 이용해 배포 환경을 구축했습니다.
```

## 🎓 Best Practice

### 1. 공통

    a. 각 컴포넌트의 대표 파일 이름을 index.tsx로 통일하여 import문을 간결하게 만들었습니다.
    b. eslint & prettier 설정을 통일하여 혼선을 방지했습니다.

### 2. 그래프

#### chart.js vs apexchart.js 선택이유 [링크](https://maroon-dibble-e23.notion.site/2-Best-practice-f6c58ddee9ba4ff88b07d1e285ace9a0)

|      |                                                                                                                                                                                                                                 chart.js                                                                                                                                                                                                                                 |                                                                                                                                                                                                    apexchart.js                                                                                                                                                                                                     |
| :--: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| 장점 | 1. 가장 유명한 라이브러리이며 일부 팀원이 사용해봤기 때문에 비교적 익숙했다.<br>2. 개발자가 직접 유튜브로 여러가지 기능을 알려줘서 이용하기 수월했다.<br>3. d.ts 파일을 따로 받지 않아도 타입이 설정되어 있어서 좋았다. <br>4. chart.js-adapter-date-fns등 관련 라이브러리가 많아서 좋았다.<br>5. 디자인 관련 옵션이 많아서 커스텀마이징하는데 편리했다.<br>6. Dataset parsing 기능 등 차트데이터를 다루기 용이하다.<br>7. 오픈소스 라이브러리로 부담없이 사용가능 하다. |                                                       1. import시 chart.js와는 다르게 import ApexChart from 'react-apexcharts’만 불러오면 사용이 가능하다.<br>2. 툴바의 차트다운로드 기능 등 기본차트 탬플릿 자체에서 편의기능을 제공한다.<br>3. 툴팁설정시 아이콘이 이쁘다<br>4. 기본적으로 차트를 구현시 + ,- ,줌? 등 여러기능들이 같이 화면에 제공이 된다.                                                       |
| 단점 |                                                                                    1. react 사용자를 위해 react-chartjs-2 라는 라이브러리가 있어서 다행이었지만 관련 문서는 좀 부족한 편이다.<br>2. chartjs-adapter-date-fns 등 관련 라이브러리를 따로 다운받아야해서 번거로웠다.<br>3. types/chart 라이브러리가 있지만 아직 typescript와의 호환성이 부족했다.<br>4. 문서 읽기 힘들다                                                                                    | 1. 공식 문서상 시각적 예시 부족한 편이다.<br>2. 공식문서 이벤트 부분에 event, chartContext, { seriesIndex, dataPointIndex, config}같은 속성들에 대한 설명이 잘 보이지 않았다.<br>3. 필요치 않은 기능들이 기본으로 설정되어 있는 경우 개별적으로 속성을 찾아서 수정해줘야하는 경우가 있다.<br>4. react-apexchart관련 레퍼런스가 다양하지 않다.<br>5. 속성의 설명이 잘되어있지 않아서 무슨 설정인지 헷갈릴 때가 많다. |

### 👩‍⚖️ 결론

    Apex가 다른 라이브러리에 의존하지않고 디자인적인 요소를 많이 갖추고 있지만,
    Chart.js가 러닝 커브가 낮고 커뮤니티가 잘 형성되어 있어서 프로젝트를 진행하면서 만나는 이슈를 더욱 수월하게 해결할 수 있어서
    본 프로젝트에서는 chartjs를 선택하여 best practice를 구현했습니다.

### 3. 데이터 처리 방법

    a. util 폴더에 api통신으로 응답받은 raw 데이터를 차트에 넣을 수 있는 데이터로 처리하는 코드를 분리했습니다.

    b. 커스텀훅을 사용하여 Chart를 그리는 컴포넌트에서 필요한 데이터나 함수만 꺼내서 사용할 수 있도록 코드를 분리했습니다.

    c. 하이라이트 되는 데이터 집합만 다른 색을 입히는 코드를 분리했습니다.

### 4. 주요 로직

a. 그래프

```typescript
return (
  <>
    <Chart
      ref={chartRef}
      type="bar"
      data={data}
      options={options}
      onClick={chartClickHandler}
    />
    <ChartControl
      regionList={regionNameList}
      onClickButton={clickButtonHanlder}
    />
  </>
)
```

b. 툴팁

```typescript
const options: ChartOptions = {
  // 중략
  tooltip: {
    mode: 'index',
    callbacks: {
      beforeBody(tooltipItems) {
        //id 툴팁 표시
        const regionIndex = tooltipItems[0].dataIndex
        return idLists[regionIndex]
      },
    },
  },
  // 중략
}
```

c. 하이라이트

```typescript
// bar 차트와 area 차트에서 선택된 지역의 색깔만 변경하여 새로운
// 배경색 배열을 생성 -> [ [ bar차트 색], [area차트 색] ]
const filteredRegionColorLists = chart.config.data.datasets.map(chartValue => {
  if (chartValue.type === 'bar') {
    const val = chartValue.data.reduce((acc, curr, idx) => {
      if (idLists[idx] === name) {
        return [...acc, COLOR_TEMPLATE.bar.selectedBarColor]
      }
      return [...acc, COLOR_TEMPLATE.bar.nonSelectedBarColor]
    }, [] as string[])
    return val
  }

  const val = chartValue.data.reduce((acc, curr, idx) => {
    if (idLists[idx] === name) {
      return [...acc, COLOR_TEMPLATE.area.selectedAreaColor]
    }
    return [...acc, COLOR_TEMPLATE.area.nonSelectedAreaColor]
  }, [] as string[])
  return val
})

const colorChangeHandler = (colorTable: string[][]) => {
  if (!barDataSet || !areaDataSet) {
    return
  }
  // 커스텀 훅으로 넘어온 색깔 테이블에서 bar 와 area 색 구조 분해
  const [barColorData, areaColorData] = colorTable

  const newBarDataSet = {
    ...barDataSet,
    backgroundColor: barColorData,
  }
  const newAreaDataSet = {
    ...areaDataSet,
    pointBackgroundColor: areaColorData,
  }
  // 새로운 ChartDataset 값으로 state 변경
  setBarDataSet(newBarDataSet)
  setAreaDataSet(newAreaDataSet)
}
```

## 👨‍💻 팀원

---

| [강명훈](https://github.com/michoball) |  [김진영](https://github.com/tbs01215)  | [백유리](https://github.com/BaekYuri)  |
| :------------------------------------: | :-------------------------------------: | :------------------------------------: |
| [안윤경](https://github.com/skyhanull) | [구본아](https://github.com/bona373737) | [김재욱](https://github.com/WooGie911) |

## 📝 구현 요구사항 목록

---

1. 시계열 차트 만들기

   - [x] 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
   - [x] 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
   - [x] Area 그래프의 기준값은 `value_area` 값을 이용해주세요
   - [x] Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
   - [x] 차트의 Y축에 대략적인 수치를 표현해주세요

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
 ┣ 📂apis
 ┃ ┗ 📜chartApi.ts
 ┣ 📂components
 ┃ ┣ 📂ChartControl
 ┃ ┃ ┣ 📜index.module.css
 ┃ ┃ ┗ 📜index.tsx
 ┃ ┗ 📂ChartView
 ┃ ┃ ┗ 📜index.tsx
 ┣ 📂data
 ┃ ┗ 📜mock_data.json
 ┣ 📂hooks
 ┃ ┗ 📜useChartData.tsx
 ┣ 📂utils
 ┃ ┗ 📜util.ts
 ┣ 📜App.css
 ┣ 📜App.tsx
 ┣ 📜Types.ts
 ┣ 📜index.css
 ┣ 📜main.tsx
 ┣ 📜setupTests.ts
 ┗ 📜vite-env.d.ts
```

<details>
<summary>Package.json</summary>
<div>

### Dependencies

- axios: ^1.3.4
- chart.js: ^4.2.1
- chartjs-adapter-date-fns: ^3.0.0
- react: ^18.2.0
- react-chartjs-2: ^5.2.0
- react-dom: ^18.2.0

### DevDependencies

- @testing-library/jest-dom: ^5.16.5
- @testing-library/react: ^14.0.0
- @types/react: ^18.0.28
- @types/react-dom: ^18.0.11
- @typescript-eslint/eslint-plugin: ^5.54.0
- @typescript-eslint/parser: ^5.54.0
- @vitejs/plugin-react: ^3.1.0
- eslint: ^8.35.0
- eslint-config-airbnb: ^19.0.4
- eslint-config-airbnb-typescript: ^17.0.0
- eslint-config-prettier: ^8.6.0
- eslint-plugin-import: ^2.27.5
- eslint-plugin-jsx-a11y: ^6.7.1
- eslint-plugin-prettier: ^4.2.1
- eslint-plugin-react: ^7.32.2
- eslint-plugin-react-hooks: ^4.6.0
- husky: ^8.0.3
- jsdom: ^21.1.0
- prettier: ^2.8.4
- typescript: ^4.9.5
- vite: ^4.1.4
- vitest: ^0.29.2

</div>
</details>
