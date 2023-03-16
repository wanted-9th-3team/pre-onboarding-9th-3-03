import styles from './Home.module.css'
import LineChart from './LineChart'

function Home() {
  return (
    <div className={styles.homeHeader}>
      <LineChart />
    </div>
  )
}

export default Home
