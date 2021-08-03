import { IAction } from '../types';

const initialState = {
  beers: [],
  isFetch: false,
  errorStatus: false
}

export default function beerReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'BEERS_LOAD':
      return {...state, beers: action.beers, errorStatus: action.errorStatus}
    case 'IS_FETCHING':
      return {...state, isFetch: action.isFetch, errorStatus: action.errorStatus}
    case 'REMOVE_STATUS_MESSAGE':
      return {...state, isFetch: action.isFetch, errorStatus: false}
    default:
      return state
  }
}
