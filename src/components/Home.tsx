import React from 'react'
import ChartView from './ChartView'
import getChartInfo from '../apis/chartApi'
import mock_data from '../data/mock_data.json'
import { IDataBase } from '../Types'

function Home() {
  const chartData = mock_data.response
  const timeKeyData = Object.keys(chartData)
  const valueData = Object.values(chartData)

  let DataBase: IDataBase[] = []
  for (let i = 0; i < valueData.length; i++) {
    DataBase.push({
      time: timeKeyData[i],
      id: valueData[i].id,
      value_area: valueData[i].value_area,
      value_bar: valueData[i].value_bar,
    })
  }

  const [dataBaseState, setDataBaseState] =
    React.useState<IDataBase[]>(DataBase)

  const areaData = dataBaseState.map(data => {
    return data.value_area
  })
  const barData = dataBaseState.map(data => {
    return data.value_bar
  })
  const guData = dataBaseState.map(data => {
    return data.id
  })
  const timeData = dataBaseState.map(data => {
    return data.time
  })

  return <ChartView timeData={timeData} areaData={areaData} barData={barData} />
}

export default Home
