import React, { Component, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import getChartInfo from '../apis/chartApi'
import filter from '../utils/filter'
// import styles from './Home.module.css'
function Home() {
  const [xAxisData, setXAxisData] = useState<string[]>()
  const [filterData, setFilterData] = useState<string[]>()
  const [areaYAxisData, setAreaYAxisData] = useState<number[]>()
  const [barYAxisData, setBarYAxisData] = useState<number[]>()

  useEffect(() => {
    getChartInfo().then(data => {
      setXAxisData(data.xAxisData)
      setAreaYAxisData(data.areaYAxisData)
      setBarYAxisData(data.barYAxisData)
      setFilterData(data.filterData)
    })
  }, [])

  const state = {
    series: [
      {
        name: 'Area',
        type: 'area',
        data: areaYAxisData,
      },
      {
        name: 'Bar',
        type: 'column',
        data: barYAxisData,
      },
      {
        name: 'id',
        data: filterData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '50%',
        },
      },
      // fill: {
      //   colors: [
      //     function ({ value, seriesIndex, w }) {
      //       console.log(w.config)
      //       if (value < 55) {
      //         return '#7E36AF'
      //       }
      //       if (value >= 55 && value < 80) {
      //         return '#164666'
      //       }
      //       return '#D9534F'
      //     },
      //   ],
      // },
      labels: xAxisData,
      markers: {
        size: 0,
      },
      xaxis: {
        type: 'datetime',
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
          axisBorder: {
            show: true,
            color: '#e30000',
          },
          labels: {
            style: {
              colors: '#e30000',
            },
          },
          title: {
            text: 'Area',
            style: {
              color: '#e30000',
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
          axisBorder: {
            show: true,
            color: '#00E396',
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
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y) {
            return y
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      chart: {
        toolbar: {
          show: false,
        },
      },
    },
  }

  return (
    <div className="app">
      {/* <section className="btn_wrap">
        {filterData &&
          filterData.map((item, index) => {
            return <button key={index}>{item}</button>
          })}
      </section> */}

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
