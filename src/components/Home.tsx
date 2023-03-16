/* eslint-disable react/button-has-type */
import React from 'react'
import ChartView from './ChartView'
import { IChartData, IDataBase } from '../Types'
import getChartInfo from '../apis/chartApi'
import Filter from './Filter'

function Home() {
  const [chartData, setChartData] = React.useState<IChartData>({})

  const getData = async () => {
    const data = await getChartInfo()
    if (data) {
      setChartData(data.response)
    }
  }

  const timeKeyData = Object.keys(chartData)
  const valueData = Object.values(chartData)

  const DataBase: IDataBase[] = []
  for (let i = 0; i < valueData.length; i += 1) {
    DataBase.push({
      time: timeKeyData[i],
      id: valueData[i].id,
      value_area: valueData[i].value_area,
      value_bar: valueData[i].value_bar,
    })
  }

  const [dataBaseState, setDataBaseState] =
    React.useState<IDataBase[]>(DataBase)

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    setDataBaseState(dataBaseState)
  }, [dataBaseState])

  return (
    <>
      <ChartView dataBaseState={dataBaseState} />
      <Filter DataBase={DataBase} setDataBaseState={setDataBaseState} />
    </>
  )
}

export default Home
