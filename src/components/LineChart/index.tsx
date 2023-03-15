import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
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
import { Chart } from 'react-chartjs-2'
import getChartInfo from '../../apis/chartApi'

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
  const setChart = async () => {
    const result = await getChartInfo()
    if (result) {
      setChartData(result.response)
    }
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
      },
    },
  }
  const formatData = (label: string[], data: any) => {
    const areaData = {
      type: 'line' as const,
      label: 'area',
      borderColor: 'rgb(255, 0, 0)',
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
      borderWidth: 2,
      fill: true,
      data: Object.keys(data).map(nowDate => data[nowDate].value_area),
      yAxisID: 'y-area',
    }
    const barData = {
      type: 'bar' as const,
      label: 'bar',
      borderColor: 'rgb(0, 0, 255)',
      backgroundColor: 'rgba(0, 0, 255)',
      borderWidth: 2,
      data: Object.keys(data).map(nowDate => data[nowDate].value_bar),
      yAxisID: 'y-bar',
    }
    return {
      labels: label,
      datasets: [areaData, barData],
    }
  }

  const chartRef = useRef<ChartJS>(null)

  return chartData ? (
    <Chart
      datasetIdKey="id"
      ref={chartRef}
      type="bar"
      options={options}
      data={formatData(labels, chartData)}
    />
  ) : null
}

export default LineChart
