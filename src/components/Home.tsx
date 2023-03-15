import React, { Component, useCallback, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import getChartInfo from '../apis/chartApi'
import filter from '../utils/filter'
// import styles from './Home.module.css'
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

  const onClickFilter = useCallback(
    ({ value, seriesIndex, dataPointIndex, w }) => {
      console.log(clickedRegion)
      if (w.config.labels[dataPointIndex] === clickedRegion) {
        return '#D9534F'
      }
    },
    [clickedRegion]
  )

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
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
        stacked: false,
        toolbar: {
          show: false,
        },
        events: {
          dataPointSelection(event, chartContext, config) {
            console.log(config.w.config.labels[config.dataPointIndex])
            setClickedRegion(config.w.config.labels[config.dataPointIndex])
          },
        },
      },
      stroke: {
        width: [0, 2, 5],

        curve: 'smooth',
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
        },
      },
      fill: {
        // colors: [onClickFilter],
      },
      labels: filterData,
      // markers: {
      //   size: 10,
      // },
      xaxis: {
        type: 'category',
        categories: xAxisData,
        tickPlacement: 'between',
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
          // axisBorder: {
          //   show: true,
          //   color: '#028FFB',
          // },
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
          // axisBorder: {
          //   // show: true,
          //   // color: '#00E396',
          // },
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
        custom({ series, seriesIndex, dataPointIndex, w }) {
          return (
            `<div class="arrow_box">` +
            `<div> Bar : ${series[0][dataPointIndex]}</div>` +
            `<div> Area : ${series[1][dataPointIndex]}</div>` +
            `</div>`
          )
        },
        // x: {
        //   show: true,
        //   format: 'yyyy-MM-dd HH:mm:ss',
        //   // formatter: undefined,
        // },
        // y: {
        //   formatter(y) {
        //     return y
        //   },
        // },
      },
      dataLabels: {
        enabled: false,
      },
    },
  }

  return (
    <div className="app">
      <section className="btn_wrap">
        {filter &&
          filter.map((item, index) => {
            return (
              <button key={index} onClickFilter>
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
