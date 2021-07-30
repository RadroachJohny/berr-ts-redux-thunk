import {IAction} from "../types";

const initialState = {
  page: 1,
  sort: 'ASC'
}

export default function navigationReducers(state = initialState, action: IAction) {
  switch (action.type) {
    case 'PAGE_CHANGE':
      return {...state, page: action.page}
    case 'REVERSE_SORTING':
      return {...state, sort: action.sort}
    default:
      return state
  }
}