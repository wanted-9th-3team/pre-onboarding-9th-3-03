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
} from 'chart.js'
import { Chart, getElementsAtEvent } from 'react-chartjs-2'
import getChartInfo from '../../apis/chartApi'
import styles from './index.module.css'
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
  const chartRef = useRef<ChartJS>(null)
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
        // chartRef.current.data.datasets[1].backgroundColor[idx] = 'red'
        // chartRef.current.data.datasets[0].pointBackgroundColor[idx] = 'blue'
      } else {
        // chartRef.current.data.datasets[1].backgroundColor[idx] = 'black'
        // chartRef.current.data.datasets[0].pointBackgroundColor[idx] = 'red'
      }
    })
    chartRef.current?.update()
  }
  const buttonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeClickedId(e.currentTarget.value)
  }
  const chartHandler = (e: React.MouseEvent<HTMLCanvasElement>) => {
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
  useEffect(() => {
    setChart()
  }, [])
  const footer = (e: any) => {
    return ids[e[0].parsed.x]
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
    },
    stacked: false,
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
      label: 'area',
      borderColor: 'black',
      backgroundColor: 'yellow',
      borderWidth: 1,
      pointBackgroundColor: setBGColor('red'),
      fill: true,
      data: data.map(nowData => nowData.value_area),
      yAxisID: 'y-area',
    }
    const barData = {
      type: 'bar' as const,
      label: 'bar',
      borderColor: 'black',
      backgroundColor: setBGColor('black'),
      borderWidth: 1,
      hoverBorderColor: 'green',
      hoberBorderWidth: 5,
      data: data.map(nowData => nowData.value_bar),
      yAxisID: 'y-bar',
    }
    return {
      labels: label,
      datasets: [areaData, barData],
    }
  }

  return chartData ? (
    <>
      <Chart
        datasetIdKey="id"
        ref={chartRef}
        type="bar"
        options={options}
        data={formatData(labels, chartData)}
        onClick={chartHandler}
      />
      {idSet.map(region => {
        return (
          <button
            type="button"
            className={
              clickedID.current.findIndex(item => item === region) === -1
                ? styles.regionButton
                : styles.regionButtonActive
            }
            onClick={buttonHandler}
            key={region}
            value={region}
          >
            {region}
          </button>
        )
      })}
    </>
  ) : null
}

export default LineChart
