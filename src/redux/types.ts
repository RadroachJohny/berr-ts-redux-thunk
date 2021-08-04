import addedProductsReducer from "./reducers/addedProductsReducer";

export interface IAction {
  beers?: IBeer[],
  page?: number,
  sort?: string,
  type: string,
  beerElem?: IBeer | null,
  isFetch: boolean,
  errorStatus: boolean | string
}

export interface IBeer {
  name: string,
  tagline: string,
  abv: number,
  description: string,
  image_url: string,
  first_brewed: string,
  brewers_tips: string,
  id: number,
}

export interface IBeerElem {
  abv: number,
  id?: number,
  image_url: string,
  name: string,
  quantity?: number,
  tagline: string,
  onClick?: () => void,
}

// export interface purchasedBeerList {
//   IBeerElem
// }

export interface IBeerModalElems {
  type: string,
  purchasedBeerArr: IBeerElem | IBeerElem[],
}

export interface IState {
  beerReducer: { beers: IBeer[], isFetch: boolean, errorStatus: boolean | string },
  currentBeerReducer: ICurrentBeerReducer,
  navigationReducers: INavigationReducers,
  addedProductsReducer: IPurchasedBeer,
}

export interface IPurchasedBeer {
  purchasedBeerArr: IBeerElem[],
}

export interface ICurrentBeerReducer {
  beerElem: IBeer,
}

export interface INavigationReducers {
  page: number,
  sort: string,
}
