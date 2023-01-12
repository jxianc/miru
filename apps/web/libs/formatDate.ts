export const formatDate = (newDate: Date) => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const d = newDate
  const year = d.getFullYear()
  const date = d.getDate()
  const monthName = months[d.getMonth()]
  const formatted = `${date} ${monthName}, ${year}`

  var hours = d.getHours()
  var minutes = d.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  const minStr = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minStr + ' ' + ampm

  return { date: formatted.toString(), time: strTime }
}
