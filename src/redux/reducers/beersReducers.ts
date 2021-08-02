import {IAction, IBeer} from '../types';

const initialState = {
  beers: [],
}

export default function beerReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'BEERS_LOAD':
      return action.beers
    default:
      return state
  }
}
