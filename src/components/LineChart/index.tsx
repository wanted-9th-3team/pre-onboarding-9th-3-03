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
  const [chartData, setChartData] = useState<any[]>([])
  const labels = Object.keys(chartData)
  const ids = Object.keys(chartData).map(
    (nowDate: any) => chartData[nowDate].id
  )
  const idSet = Array.from(new Set(ids))
  const [clickedID, setClickedId] = useState<any[]>(idSet)
  const chartRef = useRef<ChartJS>(null)
  const changeClickedId = (regionName: string) => {
    const foundIndex = clickedID.findIndex(region => region === regionName)

    if (foundIndex === -1) {
      setClickedId([...clickedID, regionName])
    } else {
      const tempClickedID = [...clickedID]
      tempClickedID.splice(foundIndex, 1)
      setClickedId(tempClickedID)
    }
  }
  const buttonHandler = (e: any) => {
    changeClickedId(e.target.value)
  }
  const chartHandler = (e: any) => {
    const elements = chartRef.current
      ? getElementsAtEvent(chartRef.current, e)
      : []
    if (!elements.length) return
    changeClickedId(ids[elements[0].index])
  }
  const setChart = async () => {
    const result = await getChartInfo()
    if (result) {
      setChartData(result.response)
    }
  }
  function setBGColor(color1: string, color2: string) {
    const bgColor: string[] = []

    ids.forEach(item => {
      if (clickedID.findIndex(id => item === id) !== -1) {
        bgColor.push(color2)
      } else {
        bgColor.push(color1)
      }
    })

    return bgColor
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
    animation: {
      duration: 0,
    },
    stacked: false,
    plugins: {
      tooltip: {
        callbacks: {
          footer,
        },
      },
      colors: {
        forceOverride: true,
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
  const formatData = (label: string[], data: any) => {
    const areaData = {
      type: 'line' as const,
      label: 'area',
      borderColor: 'black',
      backgroundColor: 'yellow',
      borderWidth: 1,
      pointBackgroundColor: setBGColor('red', 'yellow'),
      fill: true,
      data: Object.keys(data).map(nowDate => data[nowDate].value_area),
      yAxisID: 'y-area',
    }
    const barData = {
      type: 'bar' as const,
      label: 'bar',
      borderColor: 'black',
      backgroundColor: setBGColor('black', 'red'),
      borderWidth: 1,
      hoverBorderColor: 'green',
      hoberBorderWidth: 5,
      data: Object.keys(data).map(nowDate => data[nowDate].value_bar),
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
              clickedID.findIndex(item => item === region) === -1
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
