// 타입 지정 파일 - 수정해서 시작
export interface ITripInfo {
  idx: number
  name: string
  mainImage: string
  description: string
  spaceCategory: string
  price: number
  maximumPurchases: number
  registrationDate: string
}

export interface IDataBase {
  time: string
  id: string
  value_area: number
  value_bar: number
}

export interface IDataType {
  timeData: string[]
  areaData: number[]
  barData: number[]
}

export interface IFiterState {
  성북구: boolean
  강남구: boolean
  노원구: boolean
  중랑구: boolean
}
