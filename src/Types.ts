export interface IDataBase {
  time: string
  id: string
  value_area: number
  value_bar: number
}

export interface IFiterState {
  성북구: boolean
  강남구: boolean
  노원구: boolean
  중랑구: boolean
}

export interface IMocDataBase {
  id: string
  value_area: number
  value_bar: number
}

export interface IChartData {
  [key: string]: IMocDataBase
}

export interface IFiter {
  DataBase: IDataBase[]
  setDataBaseState: any
}
