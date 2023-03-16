import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import Chart from './Chart'
import { IChartList } from '../Types'

interface UseChartDataProps {
  data: IChartList
}
function Home({ data }: UseChartDataProps) {
  const [name, setName] = useState('')
  const Itmes = data

  /* 필터기능 코드 */
  const JK = Object.values(Itmes).map(el => el.id)
  const GGK = [...new Set(JK)]

  return (
    <div className={styles.content}>
      <h1 className={styles.homeHeader}>ddd</h1>
      {GGK.map(E => (
        <button type="button" key={E} onClick={() => setName(E)}>
          {E}
        </button>
      ))}
      <Link to={`/${name}`}>
        <button type="button">필터</button>
      </Link>
      <Chart data={data} />
    </div>
  )
}

export default Home
// import React, { useEffect, useRef, useState } from 'react'
// import {
//   Chart as ChartJS,
//   LinearScale,
//   CategoryScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Legend,
//   Tooltip,
//   Filler,
// } from 'chart.js'
// import { Chart, getElementsAtEvent } from 'react-chartjs-2'
// import getChartInfo from '../apis/chartApi'

// function Home() {
//   const [chartData, setChartData] = useState([])

//   const setChart = async () => {
//     const result = await getChartInfo()
//     if (result) {
//       setChartData(result.response)
//     }
//   }

//   useEffect(() => {
//     setChart()
//   },[])
//   return <div>a</div>
// }

// export default Home
