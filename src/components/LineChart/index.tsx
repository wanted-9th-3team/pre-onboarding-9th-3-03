import React, { useEffect, useRef, useState } from 'react'
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
  ChartOptions,
} from 'chart.js'
import { Chart, getElementsAtEvent } from 'react-chartjs-2'
import getChartInfo from '../../apis/chartApi'
import ButtonGroup from '../ButtonGroup'
import { IFilterData } from '../../Types'

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Legend,
  Tooltip
)
function LineChart() {
  const [chartData, setChartData] = useState<IFilterData[]>([])
  const labels = chartData.map(data => data.date)
  const ids = chartData.map(data => data.id)
  const idSet = Array.from(new Set(ids))
  const clickedID = useRef<string[]>(idSet)
  const chartRef = useRef<ChartJS>()

  const changeClickedId = (regionName: string) => {
    const foundIndex = clickedID.current.findIndex(
      region => region === regionName
    )

    if (foundIndex === -1) {
      clickedID.current = [...clickedID.current, regionName]
    } else {
      const tempClickedID = [...clickedID.current]
      tempClickedID.splice(foundIndex, 1)
      clickedID.current = tempClickedID
    }
  }

  const changeColor = () => {
    ids.forEach((nowId, idx) => {
      if (clickedID.current.includes(nowId)) {
        chartRef.current.data.datasets[1].backgroundColor[idx] =
          'rgb(234, 84, 85)'
        chartRef.current.data.datasets[0].pointBackgroundColor[idx] =
          'rgb(0, 43, 91)'
      } else {
        chartRef.current.data.datasets[1].backgroundColor[idx] =
          'rgb(249, 219, 187)'
        chartRef.current.data.datasets[0].pointBackgroundColor[idx] =
          'rgb(228, 220, 207)'
      }
    })
    chartRef.current?.update()
  }

  const chartClickHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const elements = chartRef.current
      ? getElementsAtEvent(chartRef.current, e)
      : []
    if (!elements.length) return
    changeClickedId(ids[elements[0].index])
    changeColor()
  }

  const setChart = async () => {
    const result = await getChartInfo()
    if (result) {
      const formatedChartData = Object.keys(result.response).map(date => {
        return {
          date,
          id: result.response[date].id,
          value_area: result.response[date].value_area,
          value_bar: result.response[date].value_bar,
        }
      })

      setChartData(formatedChartData)
    }
  }

  function setBGColor(color: string) {
    return ids.map(() => color)
  }

  const footer = (context: any) => {
    return ids[context[0].parsed.x]
  }

  const options: ChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
    },
    plugins: {
      tooltip: {
        callbacks: {
          footer,
        },
      },
    },
    scales: {
      'y-bar': {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Bar',
        },
      },
      'y-area': {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Area',
        },
        grid: {
          drawOnChartArea: false,
        },
        max: 200,
      },
    },
  }

  const formatData = (label: string[], data: IFilterData[]) => {
    const areaData = {
      type: 'line' as const,
      label: 'Area',
      borderColor: 'rgb(0, 0, 0, 0.7)',
      backgroundColor: 'rgb(78, 110, 129, 0.5)',
      borderWidth: 1,
      pointBackgroundColor: setBGColor('rgb(228, 220, 207)'),
      fill: true,
      data: data.map(nowData => nowData.value_area),
      yAxisID: 'y-area',
    }
    const barData = {
      type: 'bar' as const,
      label: 'Bar',
      borderColor: 'rgb(255, 255, 255, 0.5)',
      backgroundColor: setBGColor('rgb(249, 219, 187)'),
      borderWidth: 1,
      hoverBackgroundColor: 'green',
      data: data.map(nowData => nowData.value_bar),
      yAxisID: 'y-bar',
    }
    return {
      labels: label,
      datasets: [areaData, barData],
    }
  }

  useEffect(() => {
    setChart()
  }, [])

  return chartData ? (
    <>
      <Chart
        datasetIdKey="id"
        ref={chartRef}
        type="bar"
        options={options}
        data={formatData(labels, chartData)}
        onClick={chartClickHandler}
      />
      <ButtonGroup
        idSet={idSet}
        changeClickedId={changeClickedId}
        changeColor={changeColor}
      />
    </>
  ) : null
}

export default LineChart
