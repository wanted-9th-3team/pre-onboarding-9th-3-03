import React, { MouseEvent, useRef } from 'react'
import styles from './index.module.css'

interface ChartControlProps {
  regionList: string[]
  onClickButton(name: string): void
}

function ChartControl({ regionList, onClickButton }: ChartControlProps) {
  const divRef = useRef<HTMLDivElement>(null)

  const buttonClickHandler = (
    e: MouseEvent<HTMLButtonElement>,
    name: string | 'reset'
  ) => {
    if (!divRef.current) return
    const target = e.currentTarget

    for (let i = 0; i < divRef.current.childElementCount; i += 1) {
      divRef.current.children[i].classList.remove('clicked')
    }

    if (name === 'reset') {
      onClickButton('reset')
      return
    }

    target.classList.add('clicked')
    onClickButton(name)
  }

  return (
    <div className={styles.buttonGroup} ref={divRef}>
      {regionList.map(name => {
        return (
          <button
            key={name}
            type="button"
            value={name}
            onClick={e => buttonClickHandler(e, name)}
          >
            {name}
          </button>
        )
      })}
      <button
        type="button"
        value="reset"
        onClick={e => buttonClickHandler(e, 'reset')}
      >
        reset
      </button>
    </div>
  )
}

export default ChartControl
