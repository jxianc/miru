export const formatDate = (newDate: Date) => {
  const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  }
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const d = newDate
  const year = d.getFullYear()
  const date = d.getDate()
  const monthIndex = d.getMonth()
  const monthName = months[d.getMonth()]
  const dayName = days[d.getDay()] // Thu
  const formatted = `${date} ${monthName}, ${year}`

  var hours = d.getHours()
  var minutes = d.getMinutes()
  var ampm = hours >= 12 ? 'pm' : 'am'
  hours = hours % 12
  hours = hours ? hours : 12 // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes
  var strTime = hours + ':' + minutes + ' ' + ampm

  return { date: formatted.toString(), time: strTime }
}
