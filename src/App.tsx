import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Home from './components/Home'
import './App.css'
import getChartInfo from './apis/chartApi'
import { IChartList } from './Types'

function App() {
  const [apidata, setpidata] = useState<IChartList>({})

  useEffect(() => {
    const apiHandler = async () => {
      const res = await getChartInfo()

      if (res) {
        setpidata(res.response)
      }
    }
    apiHandler()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/:id" element={<Chart apidata={apidata} />} /> */}
        <Route path="/:id" element={<Home data={apidata} />} />
        <Route path="/" element={<Home data={apidata} />} />
      </Routes>

      {/* <Home apidata={apidata} /> */}
    </BrowserRouter>
  )
}

export default App
