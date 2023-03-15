import React from 'react'
import ChartView from './ChartView'
import getChartInfo from '../apis/chartApi'
import mock_data from '../data/mock_data.json'
import { IDataBase, IFiterState } from '../Types'

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

  const [filterState, setFilterState] = React.useState<IFiterState>({
    성북구: true,
    강남구: true,
    노원구: true,
    중랑구: true,
  })

  const filterHandler = () => {
    setDataBaseState(
      DataBase.filter(data => {
        return (
          (filterState.성북구 && data.id === '성북구') ||
          (filterState.강남구 && data.id === '강남구') ||
          (filterState.노원구 && data.id === '노원구') ||
          (filterState.중랑구 && data.id === '중랑구')
        )
      })
    )
  }

  const checkoboxHandler = e => {
    const { name, defaultChecked } = e.target
    setFilterState({
      ...filterState,
      [name]: !defaultChecked,
    })
  }

  return (
    <>
      <ChartView timeData={timeData} areaData={areaData} barData={barData} />

      <div>
        <input
          type="checkbox"
          name="성북구"
          defaultChecked={filterState.성북구}
          onClick={checkoboxHandler}
        />
        <label>성북구</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="강남구"
          defaultChecked={filterState.강남구}
          onClick={checkoboxHandler}
        />
        <label>강남구</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="노원구"
          defaultChecked={filterState.노원구}
          onClick={checkoboxHandler}
        />
        <label>노원구</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="중랑구"
          defaultChecked={filterState.중랑구}
          onClick={checkoboxHandler}
        />
        <label>중랑구</label>
      </div>
      <button onClick={filterHandler}>확인</button>
    </>
  )
}

export default Home
