import axios from 'axios'

const getChartInfo = async () => {
  let response
  const xAxisData: string[] = []
  const areaYAxisData: number[] = []
  const barYAxisData: number[] = []
  const filterData: string[] = []
  const filter: string[] = []

  try {
    response = await axios('mock_data.json')
    response = response.data.response
  } catch (error) {
    throw new Error(error)
  }

  for (let i = 0; i < Object.keys(response).length; i += 1) {
    const key: string = Object.keys(response)[i]
    const areaValue: number = Object.values(response)[i].value_area
    const barValue: number = Object.values(response)[i].value_bar
    const idValue: string = Object.values(response)[i].id

    xAxisData.push(key)
    areaYAxisData.push(areaValue)
    barYAxisData.push(barValue)
    filterData.push(idValue)

    if (!filter.includes(idValue)) {
      filter.push(idValue)
    }
  }

  return {
    xAxisData,
    areaYAxisData,
    barYAxisData,
    filterData,
    filter,
  }
}

export default getChartInfo
