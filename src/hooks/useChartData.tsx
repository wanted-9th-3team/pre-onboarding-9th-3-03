import { ChartDataset } from 'chart.js'
import { useCallback, useEffect, useState } from 'react'
import { ITableList } from '../Types'
import convertRawDataToChartData from '../utils/util'

export const COLOR_TEMPLATE = {
  bar: {
    barOriginColor: 'rgba(222, 246, 87, 0.582)',
    nonSelectedBarColor: 'rgba(92, 102, 96, 0.5)',
    selectedBarColor: 'rgba(43, 238, 121, 0.7)',
    hoverBarColor: 'rgba(255, 99, 133, 0.63)',
    barBorderColor: 'rgba(45, 94, 130, 0.582)',
  },
  area: {
    areaOriginColor: 'rgba(133, 99, 255, 0.661)',
    nonSelectedAreaColor: 'rgba(185, 196, 189, 0.5)',
    selectedAreaColor: 'rgb(173, 12, 253)',
    areaBgColor: 'rgba(188, 94, 94, 0.52)',
    pointBgColor: 'rgba(133, 99, 255, 0.661)',
    pointHoverBgColor: 'rgba(53, 235, 126, 0.9)',
  },
}

interface UseChartDataProps {
  data: ITableList
}

function useChartData({ data }: UseChartDataProps) {
  const [label, setLabel] = useState<string[]>([])
  const [barDataSet, setBarDataSet] = useState<ChartDataset>()
  const [areaDataSet, setAreaDataSet] = useState<ChartDataset>()
  const idLists = Object.values(data).map(list => list.id)

  const setLabelData = (rawData: ITableList) => {
    const labelData = Object.keys(rawData)
    labelData.sort((a, b) => Number(new Date(a)) - Number(new Date(b)))
    setLabel(labelData)
  }

  const barDataSettingHandler = useCallback((rawData: ITableList) => {
    const barSets = convertRawDataToChartData(rawData, 'bar')
    const styleWrappedBar: ChartDataset = {
      ...barSets,
      backgroundColor: new Array(100).fill(COLOR_TEMPLATE.bar.barOriginColor),
      borderColor: new Array(100).fill(COLOR_TEMPLATE.bar.barBorderColor),
      borderWidth: 0.8,
      hoverBackgroundColor: COLOR_TEMPLATE.bar.hoverBarColor,
      order: 2,
    }

    setBarDataSet(styleWrappedBar)
  }, [])

  const areaDataSettingHandler = useCallback((rawData: ITableList) => {
    const areaSets = convertRawDataToChartData(rawData, 'line')
    const styleWrappedArea: ChartDataset = {
      ...areaSets,
      backgroundColor: COLOR_TEMPLATE.area.areaBgColor,
      pointBackgroundColor: new Array(100).fill(
        COLOR_TEMPLATE.area.pointBgColor
      ),
      pointHoverBackgroundColor: COLOR_TEMPLATE.area.pointHoverBgColor,
      order: 1,
      pointBorderWidth: 0.8,
      pointBorderColor: 'black',
      pointRadius: 3.5,
    }
    setAreaDataSet(styleWrappedArea)
  }, [])

  const colorChangeHandler = (colorTable: string[][]) => {
    if (!barDataSet || !areaDataSet) {
      return
    }
    const [barColorData, areaColorData] = colorTable

    const newBarDataSet = {
      ...barDataSet,
      backgroundColor: barColorData,
    }
    setBarDataSet(newBarDataSet)

    const newAreaDataSet = {
      ...areaDataSet,
      pointBackgroundColor: areaColorData,
    }
    setAreaDataSet(newAreaDataSet)
  }

  useEffect(() => {
    setLabelData(data)
    areaDataSettingHandler(data)
    barDataSettingHandler(data)
  }, [data, areaDataSettingHandler, barDataSettingHandler])

  return {
    barDataSet,
    areaDataSet,
    label,
    idLists,
    colorChangeHandler,
  }
}

export default useChartData
