import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from 'chart.js'
import { IDataBase } from '../Types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
)

function ChartView({ dataBaseState }: IDataBase[]) {
  const areaData: number[] = dataBaseState.map((data: any) => {
    return data.value_area
  })
  const barData: number[] = dataBaseState.map((data: any) => {
    return data.value_bar
  })

  const timeData: string[] = dataBaseState.map((data: any) => {
    return data.time
  })

  const data = {
    labels: timeData,
    datasets: [
      {
        type: 'line',
        label: 'value_area',
        borderColor: 'rgb(54, 162, 235)',
        borderWidth: 1,
        data: areaData,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: 'value_bar',
        backgroundColor: 'rgb(255, 99, 132)',
        data: barData,
        borderColor: 'red',
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,

    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Area',
          color: 'rgb(54, 162, 235)',
          font: {
            family: 'Comic Sans MS',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Bar',
          color: 'rgb(255, 99, 132)',
          font: {
            family: 'Comic Sans MS',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
          color: 'rgb(99, 255, 138)',
          font: {
            family: 'Comic Sans MS',
            size: 20,
            weight: 'bold',
            lineHeight: 1.2,
          },
          padding: { top: 20, left: 0, right: 0, bottom: 40 },
        },
      },
    },
  }
  return (
    <div style={{ width: '900px' }}>
      <Line type="line" data={data} options={options} />
    </div>
  )
}

export default ChartView
