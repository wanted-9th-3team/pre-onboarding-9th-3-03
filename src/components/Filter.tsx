/* eslint-disable react/button-has-type */
import React from 'react'
import { IFiter, IFiterState } from '../Types'

function Filter({ DataBase, setDataBaseState }: IFiter) {
  const [filterState, setFilterState] = React.useState<IFiterState>({
    성북구: true,
    강남구: true,
    노원구: true,
    중랑구: true,
  })

  const checkoboxHandler = (e: any) => {
    const { name, defaultChecked } = e.target
    setFilterState({
      ...filterState,
      [name]: !defaultChecked,
    })
  }

  const filterHandler = () => {
    setDataBaseState(
      DataBase.filter(data => {
        return (
          (filterState.성북구 && data.id === '성북구') ||
          (filterState.강남구 && data.id === '강남구') ||
          (filterState.노원구 && data.id === '노원구') ||
          (filterState.중랑구 && data.id === '중랑구')
        )
      })
    )
  }

  return (
    <>
      <div>
        <input
          type="checkbox"
          name="성북구"
          defaultChecked={filterState.성북구}
          onClick={checkoboxHandler}
        />
        성북구
      </div>
      <div>
        <input
          type="checkbox"
          name="강남구"
          defaultChecked={filterState.강남구}
          onClick={checkoboxHandler}
        />
        강남구
      </div>
      <div>
        <input
          type="checkbox"
          name="노원구"
          defaultChecked={filterState.노원구}
          onClick={checkoboxHandler}
        />
        노원구
      </div>
      <div>
        <input
          type="checkbox"
          name="중랑구"
          defaultChecked={filterState.중랑구}
          onClick={checkoboxHandler}
        />
        중랑구
      </div>
      <button onClick={filterHandler}>확인</button>
    </>
  )
}

export default Filter
