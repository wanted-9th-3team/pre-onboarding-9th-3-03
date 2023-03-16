const filter = ({ value, seriesIndex, w }) => {
  if (value < 15000) {
    return '#7E36AF'
  }
  return '#7E366F'
}
export default filter
