import { FETCH_FLIGHTS } from "../actions/types";

export default (state = [], action) => {
  switch(action.type) {
    case FETCH_FLIGHTS:
      return [ ...action.payload ]
    default:
      return state
  }
}