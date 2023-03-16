import axios from 'axios'

export const getChartInfo = async () => {
  const response = await axios('src/data/mock_data.json')

  if (response.status === 200) {
    const { data } = response
    return data
  }
  return null
}

export const fetchChartInfo = async () => {
  const res = await fetch('src/data/mock_data.json')
  const json = res.json()
  return json
}
