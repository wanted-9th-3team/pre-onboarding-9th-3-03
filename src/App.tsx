import { useEffect, useState } from 'react'
import getChartInfo from './apis/chartApi'
import './App.css'
import ChartView from './components/ChartView'
import { ITableList } from './Types'

function App() {
  const [tableData, setTableData] = useState<ITableList>({})

  const fetchData = async () => {
    const data = await getChartInfo()
    if (data) {
      setTableData(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div
      style={{
        padding: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 className="homeHeader">Flexsys Chart</h1>
      <div style={{ width: '1000px' }}>
        <ChartView chartData={tableData} />
      </div>
    </div>
  )
}

export default App
