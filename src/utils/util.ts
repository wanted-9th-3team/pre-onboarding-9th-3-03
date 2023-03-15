import { TCustomChartData, ITableList } from '../Types'

const convertRawDataToChartData = (
  rawData: ITableList,
  type: 'bar' | 'line'
) => {
  const convertedData = Object.entries(rawData).reduce((acc, curr) => {
    const [key, value] = curr
    return [
      ...acc,
      {
        id: value.id,
        x: key,
        y: type === 'bar' ? value.value_bar : value.value_area,
      },
    ]
  }, [] as TCustomChartData[])

  return {
    type,
    label: type === 'bar' ? 'bar' : 'area',
    data: convertedData,
    fill: type !== 'bar',
    yAxisID: type === 'bar' ? 'y' : 'y2',
  }
}

export default convertRawDataToChartData
