import {IBeerElem} from '../types';

type initialStateType = {
  favouritesArr: IBeerElem[]
}

const initialState:initialStateType = {
  favouritesArr: []
}

export default function favouritesProductReducer(state = initialState, action: {type: string, id: any}) {
  switch (action.type) {
    case 'ADD_TO_FAVOURITE_LIST':
      return {favouritesArr: [...state.favouritesArr, action.id]}
    case 'REMOVE_FROM_FAVOURITE_LIST':
      const filteredFavs = [...state.favouritesArr].filter(elem => elem.id !== action.id);
      return {favouritesArr: [...filteredFavs]}
    default:
      return state
  }
}