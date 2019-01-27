import moment from 'moment'

export const getFormattedTime = (time) => {
  return moment(time).format('LT')
}