import ApexChart from 'react-apexcharts'
import { useParams } from 'react-router-dom'
import { IChartList } from '../Types'

interface Ifilter {
  id: string
  value_area: number
  value_bar: number
}
interface UseChartDataProps {
  data: IChartList
}
function Chart({ data }: UseChartDataProps) {
  const { id } = useParams()

  // const DataEntries: any[] = data ? Object.entries(data) : []

  // const filterId =
  //   id !== undefined
  //     ? DataEntries.filter(n => n.find((k: any) => k.id === id))
  //     : DataEntries

  const KKK: Ifilter[] = data ? Object.values(data) : []

  // const filtered =
  //   id !== undefined
  //     ? Object.values(KKK).filter(names => names.id === id)
  //     : Object.values(KKK)

  // const colorHandler = () => {
  //   if (!Object.values(KKK).filter(names => names.id === id)) {
  //     return ['Red', 'orange']
  //   }
  //   return ['green', 'blue']
  // }

  // const datalist = [
  //   {
  //     name: '내일의 기온',
  //     type: 'area',
  //     data: fififi,
  //     color: Object.values(KKK).map(names =>
  //       names.id === id ? '#FF0000' : '#02DFDE'
  //     ),
  //   },
  //   {
  //     name: '내일의 기온',
  //     type: 'bar',
  //     data: Object.values(KKK).map(el => el.value_bar),
  //     color: '#41B883',
  //   },
  // ]

  // const color = Object.values(KKK).filter(names => names.id === id)
  //   ? ['blue', 'pink']
  //   : ['#d4526e', '#d4526e']

  // const KKKF = function () {
  //   Object.values(KKK).map(names => (names.id === id ? '#FF0000' : '#02DFDE'))
  // }
  return (
    <div>
      <ApexChart
        series={[
          {
            name: '내일의 기온',
            type: 'area',
            data: Object.values(KKK).map(el => el.value_bar),

            color: id ? 'pink' : 'red',
          },
          {
            name: '내일의 기온',
            type: 'bar',
            data: Object.values(KKK).map(el => el.value_bar),
            color: Object.values(KKK).filter(names => names.id === id)
              ? 'orange'
              : 'red',
          },
        ]}
        options={{
          chart: {
            height: 100,
            width: 100,
          },

          plotOptions: {
            bar: {
              columnWidth: '90%',
              distributed: true,
              borderRadius: 0,
            },
          },
          colors: [
            Object.values(KKK).map(names =>
              names.id === id ? ['#FF0000'] : ['#02DFDE']
            ),
          ],
          stroke: {
            width: [1, 1, 4],
          },
          fill: {
            // colors: Object.values(KKK).map(names => names.id !== id)
            //   ? ['#fff4f4', 'white']
            //   : ['#070707', 'black'],
            // type: 'gradient',
            // opacity: [0.5, 0.2],
            // gradient: {
            //   inverseColors: false,
            //   shade: 'light',
            //   type: 'vertical',
            //   // opacityFrom: 0.85,
            //   // opacityTo: 0.55,
            //   stops: [0, 100, 100, 100],
            // },
          },
          grid: {
            row: {
              colors: ['#f3f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5,
            },
          },
          yaxis: [
            {
              title: {
                text: 'Series A',
              },
              tooltip: {
                enabled: true,
                offsetX: 0,
              },
            },

            {
              opposite: true,
              title: {
                text: 'Series B',
              },
            },
          ],
          xaxis: {
            type: 'category',
            categories: Object.keys(data).map(el => el),
            tickAmount: 10,
            labels: {
              datetimeFormatter: {
                year: 'yyyy',
                month: "MMM 'yy",
                day: 'dd MMM',
                hour: 'HH:mm',
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          legend: {
            horizontalAlign: 'left',
            offsetX: 40,
          },
        }}
      />
    </div>
  )
}

export default Chart
