import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import getChartInfo from '../apis/chartApi'

function Home() {
  const [xAxisData, setXAxisData] = useState<string[]>()
  const [filterData, setFilterData] = useState<string[]>()
  const [filter, setFilter] = useState<string[]>()
  const [areaYAxisData, setAreaYAxisData] = useState<number[]>()
  const [barYAxisData, setBarYAxisData] = useState<number[]>()
  const [clickedRegion, setClickedRegion] = useState<string>('')

  useEffect(() => {
    getChartInfo().then(data => {
      setXAxisData(data.xAxisData)
      setAreaYAxisData(data.areaYAxisData)
      setBarYAxisData(data.barYAxisData)
      setFilterData(data.filterData)
      setFilter(data.filter)
    })
  }, [])

  const state = {
    series: [
      {
        name: 'Area',
        type: 'area',
        data: areaYAxisData,
        // color: '#028FFB',
      },
      {
        name: 'Bar',
        type: 'column',
        data: barYAxisData,
        // color: '#00E396',
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        stacked: false,
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: false,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: '#000',
          opacity: 0.35,
        },
        legend: {
          show: true,
          markers: {
            fillColors: ['#028FFB', '#00E396'],
          },
          onItemClick: {
            toggleDataSeries: true,
          },
        },
        events: {
          dataPointSelection(event, chartContext, config) {
            console.log(event)
            // console.log(config.w.config.labels[config.dataPointIndex])
            setClickedRegion(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
      markers: {
        size: 2,
        // colors: ({ value, seriesIndex, dataPointIndex, w }){
        //   if (w.config.labels[dataPointIndex] === clickedRegion) {
        //     return '#e9184b'
        //   }
        //   return '#689642'
        // },

        // colors: 'pink',
        strokeColors: 'red',
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth',
      },
      plotOptions: {
        area: {
          fillTo: 'origin',
        },
        bar: {
          columnWidth: '70%',
        },
      },
      colors: [
        function ({ value, seriesIndex, dataPointIndex, w }) {
          // console.log(w.config.labels[dataPointIndex] === clickedRegion)
          if (w.config.labels[dataPointIndex] === clickedRegion) {
            return '#e9184b'
          }
          return '#028FFB'
        },
      ],
      tooltip: {
        shared: true,
        intersect: false,
        custom({ series, seriesIndex, dataPointIndex, w }) {
          return (
            `<div class="arrow_box">` +
            `<div> Bar : ${series[0][dataPointIndex]}</div>` +
            `<div> Area : ${series[1][dataPointIndex]}</div>` +
            `<div> id : ${w.config.labels[dataPointIndex]}</div>` +
            `</div>`
          )
        },
      },
      dataLabels: {
        enabled: false,
      },
      labels: filterData,
      xaxis: {
        type: 'category',
        categories: xAxisData,
        tickPlacement: 'between',
        labels: {
          formatter(value) {
            return value.slice(10)
          },
        },
      },
      yaxis: [
        {
          seriesName: 'Area',
          opposite: true,
          min: 0,
          max: 300,
          axisTicks: {
            show: true,
          },
          labels: {
            style: {
              colors: '#028FFB',
            },
          },
          title: {
            text: 'Area',
            style: {
              color: '#028FFB',
            },
          },
        },
        {
          seriesName: 'Bar',
          min: 0,
          max: 20000,
          axisTicks: {
            show: true,
          },
          labels: {
            style: {
              colors: '#00E396',
            },
          },
          dataLabels: false,
          title: {
            text: 'Bar',
            style: {
              color: '#00E396',
            },
          },
        },
      ],
    },
  }

  return (
    <div className="app">
      <section className="btn_wrap">
        <button
          type="button"
          onClick={() => {
            setClickedRegion('')
          }}
        >
          전체
        </button>
        {filter &&
          filter.map((item, index) => {
            return (
              <button
                type="button"
                key={item}
                onClick={e => {
                  setClickedRegion(e.target.innerHTML)
                }}
              >
                {item}
              </button>
            )
          })}
      </section>

      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="1200"
            height={500}
          />
        </div>
      </div>
    </div>
  )
}

export default Home
