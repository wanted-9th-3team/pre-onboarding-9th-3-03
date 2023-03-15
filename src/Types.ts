import { ChartDataset, ChartTypeRegistry } from 'chart.js'

export interface ITableInfo {
  id: string
  value_area: number
  value_bar: number
}

export interface ITableList {
  [key: string]: ITableInfo
}

export type TCustomChartData = { id: string; x: string; y: number }

export type TChartDataset = ChartDataset<
  keyof ChartTypeRegistry,
  TCustomChartData[]
>

// export interface IMyChartData {
//   labels: string[]
//   datasets: TChartDataset[]
// }
