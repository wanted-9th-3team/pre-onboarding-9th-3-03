export interface ITableInfo {
  id: string
  value_area: number
  value_bar: number
}

export interface ITableList {
  [key: string]: ITableInfo
}
