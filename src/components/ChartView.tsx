import 'chartjs-adapter-date-fns'
import {
  Chart as ChartJS,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartOptions,
  TimeScale,
  ChartTypeRegistry,
  Point,
  BubbleDataPoint,
} from 'chart.js'
import { Chart, getElementAtEvent } from 'react-chartjs-2'
import { MouseEvent, useRef } from 'react'
import useChartData, { COLOR_TEMPLATE } from '../hooks/useChartData'
import { ITableList, TCustomChartData } from '../Types'
import ChartControl from './ChartControl'

ChartJS.register(
  TimeScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  LineController,
  BarController,
  Filler,
  Title,
  Tooltip,
  Legend
)

interface ChartViewProps {
  chartData: ITableList
}

const options: ChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Chart',
    },
    tooltip: {
      mode: 'index',
      callbacks: {
        beforeBody(tooltipItems) {
          const rawData = tooltipItems[0].raw as TCustomChartData
          return rawData.id
        },
      },
    },
  },
  scales: {
    x: {
      type: 'time',
      time: { unit: 'second' },
    },
    y: { beginAtZero: true, title: { display: true, text: 'Bar' } },
    y2: {
      position: 'right' as const,
      title: { display: true, text: 'Area' },
      max: 200,
    },
  },
  layout: {
    padding: 20,
  },
}

function ChartView({ chartData }: ChartViewProps) {
  const baseChartColor = [
    new Array(100).fill(COLOR_TEMPLATE.bar.barOriginColor),
    new Array(100).fill(COLOR_TEMPLATE.area.areaOriginColor),
  ]

  const regionNameList = [
    ...new Set(Object.values(chartData).map(chart => chart.id)),
  ]

  const chartRef =
    useRef<
      ChartJS<
        keyof ChartTypeRegistry,
        TCustomChartData[] &
          (number | Point | [number, number] | BubbleDataPoint | null)[]
      >
    >(null)

  const { barDataSet, areaDataSet, label, colorChangeHandler } = useChartData({
    data: chartData,
  })

  const data = {
    labels: label,
    datasets: barDataSet && areaDataSet ? [barDataSet, areaDataSet] : [],
  }

  const clickButtonHanlder = (name: string | 'reset') => {
    const { current: chart } = chartRef
    if (!chart) {
      return
    }

    if (name === 'reset') {
      colorChangeHandler(baseChartColor)
      return
    }

    const filteredRegionDataLists = chart.config.data.datasets.map(
      chartValue => {
        if (chartValue.type === 'bar') {
          const val = chartValue.data.reduce((acc, curr) => {
            if (curr.id === name) {
              return [...acc, COLOR_TEMPLATE.bar.selectedBarColor]
            }
            return [...acc, COLOR_TEMPLATE.bar.nonSelectedBarColor]
          }, [] as string[])
          return val
        }

        const val = chartValue.data.reduce((acc, curr) => {
          if (curr.id === name) {
            return [...acc, COLOR_TEMPLATE.area.selectedAreaColor]
          }
          return [...acc, COLOR_TEMPLATE.area.nonSelectedAreaColor]
        }, [] as string[])
        return val
      }
    )

    colorChangeHandler(filteredRegionDataLists)
  }

  const chartClickHandler = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef

    if (!chart) {
      return
    }
    const ChartEventElement = getElementAtEvent(chart, event)
    if (!ChartEventElement.length) return

    const { index } = ChartEventElement[0]
    const clickedRegion = chart.data.datasets[0].data[index]

    if (clickedRegion.id) clickButtonHanlder(clickedRegion.id)
  }

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
}

export default ChartView
