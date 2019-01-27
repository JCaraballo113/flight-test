import axios from 'axios'
import { FETCH_FLIGHTS } from './types'

export const fetchFlights = async (dispatch) => {
  const { data: { flights } } = await axios.get('http://localhost:3000/flights')
  dispatch({ type: FETCH_FLIGHTS, payload: flights})
} 