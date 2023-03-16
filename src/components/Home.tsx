import styles from './Home.module.css'
import { fetchChartInfo } from '../apis/chartApi'
import ApexCharts from 'react-apexcharts'
import IChartInfo from '../types'
import { useQuery } from 'react-query'

interface IData {
  response: IChartInfo
}
function Home() {
  const { isLoading, data } = useQuery<IData>('chartInfo', fetchChartInfo)

  const valueArea = []
  const valueBar = []

  for (const key in data?.response) {
    if (data && Object.prototype.hasOwnProperty.call(data.response, key)) {
      const date = new Date(key)
      const element = data.response[key]
      // console.log(element.id)
      valueArea.push({ x: date, y: element.value_area, id: element.id })
      valueBar.push({
        x: date,
        y: element.value_bar,
        id: element.id,
      })
    }
  }
  const handleClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    console.log(ev)
  }
  return (
    <>
      <h1 className={styles.homeHeader}>플렉시스</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div onClick={handleClick}>
          <ApexCharts
            height="300"
            width="1100"
            series={[
              {
                name: 'Area',
                data: valueArea,
                type: 'area',
              },
              {
                name: 'bar',
                data: valueBar,
                type: 'bar',
              },
            ]}
            options={{
              colors: ['#2E93fA', '#FF9800'],
              states: {
                active: {
                  allowMultipleDataPointsSelection: true,
                },
              },
              legend: {
                position: 'top',
                show: true,
                // customLegendItems: ['강남', '중랑', '노원', '성북'],
              },
              tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {
                  var data =
                    w.globals.initialSeries[seriesIndex].data[dataPointIndex]

                  return (
                    '<ul>' +
                    '<li><b>날짜</b>: ' +
                    data.x +
                    '</li>' +
                    '<li><b>Number</b>: ' +
                    data.y +
                    '</li>' +
                    '<li><b>id</b>: ' +
                    data.id +
                    '</li>' +
                    '</ul>'
                  )
                },
              },

              theme: { mode: 'dark' },
              chart: {
                toolbar: { show: false },
                selection: { type: 'xy' },
                events: {
                  dataPointSelection(event, chartContext, config) {
                    console.log(chartContext, config)
                  },
                },
              },

              stroke: { curve: 'smooth' },
              yaxis: [
                {
                  seriesName: 'value area',
                  title: {
                    text: 'area',
                    style: {
                      color: '#00E396',
                    },
                  },
                },
                {
                  seriesName: 'value bar',
                  opposite: true,
                  title: {
                    text: 'bar',
                    style: {
                      color: '#FEB019',
                    },
                  },
                },
              ],
            }}
          />
        </div>
      )}
    </>
  )
}

export default Home

/* 1. 시계열 차트 만들기
    - 주어진 JSON 데이터의 `key`값(시간)을 기반으로 시계열 차트를 만들어주세요
    - 하나의 차트안에 Area 형태의 그래프와 Bar 형태의 그래프가 모두 존재하는 복합 그래프로 만들어주세요
    - Area 그래프의 기준값은 `value_area` 값을 이용해주세요
    - Bar 그래프의 기준값은 `value_bar` 값을 이용해주세요
    - 차트의 Y축에 대략적인 수치를 표현해주세요(예시 이미지 참고) */
