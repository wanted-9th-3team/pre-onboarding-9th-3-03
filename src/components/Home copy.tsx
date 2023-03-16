// import React, { Component, useEffect, useState } from 'react'
// import Chart from 'react-apexcharts'
// import getChartInfo from '../apis/chartApi'
// import filter from '../utils/filter'
// // import styles from './Home.module.css'
// function Home() {
//   const [xAxisData, setXAxisData] = useState<string[]>()
//   const [filterData, setFilterData] = useState<string[]>()
//   const [areaYAxisData, setAreaYAxisData] = useState<number[]>()
//   const [barYAxisData, setBarYAxisData] = useState<number[]>()

//   useEffect(() => {
//     getChartInfo().then(data => {
//       setXAxisData(data.xAxisData)
//       setAreaYAxisData(data.areaYAxisData)
//       setBarYAxisData(data.barYAxisData)
//       setFilterData(data.filterData)
//     })
//   }, [])

//   const option = {
//     chart: {
//       id: 'basic-bar',
//     },
//     xaxis: {
//       categories: xAxisData,
//     },
//     yaxis: [
//       {
//         axisTicks: {
//           show: true,
//         },
//         axisBorder: {
//           // show: true,
//           color: '#008FFB',
//         },
//         min: 0,
//         max: 500,
//         logBase: 10,
//         labels: {
//           style: {
//             colors: '#008FFB',
//           },
//         },
//         title: {
//           text: 'Area',
//           style: {
//             color: '#008FFB',
//           },
//         },
//         tooltip: {
//           enabled: true,
//         },
//       },
//       {
//         seriesName: 'Area',
//         opposite: true,
//         axisTicks: {
//           show: true,
//         },
//         axisBorder: {
//           // show: true,
//           color: '#00E396',
//         },
//         labels: {
//           style: {
//             colors: '#00E396',
//           },
//         },
//         title: {
//           text: 'Bar',
//           style: {
//             color: '#00E396',
//           },
//         },
//       },
//     ],
//     fill: {
//       colors: [filter],
//     },
//   }

//   const series = [
//     {
//       name: 'Area',
//       type: 'area',
//       data: areaYAxisData,
//     },
//     {
//       name: 'Bar',
//       type: 'column',
//       data: barYAxisData,
//     },
//   ]

//   return (
//     <div className="app">
//       <section className="btn_wrap">
//         {filterData &&
//           filterData.map((item, index) => {
//             return <button key={index}>{item}</button>
//           })}
//       </section>

//       <div className="row">
//         <div className="mixed-chart">
//           <Chart
//             options={option}
//             series={series}
//             type="bar"
//             width="1200"
//             height={500}
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home
