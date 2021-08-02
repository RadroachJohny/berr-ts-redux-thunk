import {IAction} from '../types';

const initialState = {
  beerElem: null,
}

export default function currentBeerReducer(state = initialState, action: IAction) {
  switch (action.type) {
    case 'BEER_DETAILS':
      return {beerElem: action.beerElem}
    default:
      return state
  }
}