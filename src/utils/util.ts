// 지우고 시작 // util이 없으면 폴더 지워도 됨
import { ITripInfo } from '../Types'

const { localStorage } = window

export const getLocalStorageItem = (key: string, defaultValue = null) => {
  const value = localStorage.getItem(key)
  return value ? JSON.parse(value) : defaultValue
}

export const setLocalStorageItem = (key: string, value: ITripInfo[]) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    alert(
      `로컬 스토리지에 저장할 수 없습니다. 데이터 총 용량을 넘었을 수 있습니다. ${error}`
    )
  }
}

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}
