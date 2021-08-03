import { IBeerModalElems } from "../types";

const initialState = {
  purchasedBeerArr: [],
}

export default function addedProductsReducer(state = initialState, action: IBeerModalElems ) {
  switch (action.type) {
    case 'ADD_ONE_BEER_TYPE':
    return { purchasedBeerArr: [...state.purchasedBeerArr, action.purchasedBeerArr] };
    case 'REMOVE_ONE_BEER_TYPE':
    return {purchasedBeerArr: action.purchasedBeerArr };
    default:
      return state;
  }
}