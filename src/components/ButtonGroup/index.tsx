import React from 'react'
import style from './index.module.css'

function ButtonGroup(props: {
  idSet: string[]
  changeClickedId: (regionName: string) => void
  changeColor: () => void
}) {
  const { idSet, changeClickedId, changeColor } = props
  const buttonClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    changeClickedId(e.currentTarget.value)
    changeColor()
  }
  return (
    <div>
      {idSet.map(region => {
        return (
          <button
            className={style.button}
            type="button"
            onClick={buttonClickHandler}
            value={region}
            id={region}
            key={region}
          >
            {region}
          </button>
        )
      })}
    </div>
  )
}

export default ButtonGroup
