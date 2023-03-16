export interface IValueInfo {
  id: string
  value_area: number
  value_bar: number
}

export interface IChartList {
  [key: string]: IValueInfo
}
