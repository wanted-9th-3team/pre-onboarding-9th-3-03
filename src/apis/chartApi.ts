import axios from 'axios'
import { ITableList } from '../Types'

const getChartInfo = async () => {
  const res = await axios('mock_data.json')

  if (res.status === 200) {
    const { response } = res.data
    return response as ITableList
  }
  return null
}

export default getChartInfo
