import React from 'react'
import styles from './ChartControl.module.css'

interface ChartControlProps {
  regionList: string[]
  onClickButton(name: string): void
}

function ChartControl({ regionList, onClickButton }: ChartControlProps) {
  return (
    <div className={styles.buttonGroup}>
      {regionList.map(name => {
        return (
          <button key={name} type="button" onClick={() => onClickButton(name)}>
            {name}
          </button>
        )
      })}
      <button type="button" onClick={() => onClickButton('reset')}>
        reset
      </button>
    </div>
  )
}

export default ChartControl
