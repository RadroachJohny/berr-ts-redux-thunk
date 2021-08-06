import {IVisitedProductReducer} from "../types";

const initialState = {
  visitedProdInfo: []
}

export default function visitedProductReducer(state = initialState, action: IVisitedProductReducer) {
  switch (action.type) {
    case 'ADD_VISITED_PRODUCT_INFO' :
      return { visitedProdInfo: [...state.visitedProdInfo, action.visitedProdInfo] }
    default:
      return state;
  }

}