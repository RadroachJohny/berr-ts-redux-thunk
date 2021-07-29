const initialState = {
  beers: [],
}

export default function beerReducer(state = initialState, action: any) {
  switch (action.type) {
    case 'BEERS_LOAD':
      return action.beers
    default:
      return state
  }
}