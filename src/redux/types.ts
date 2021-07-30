export interface IAction {
  beers?: IBeer[],
  page?: number,
  sort?: string,
  type: string,
  beerElem?: IBeer | null,
}

export interface IBeer {
  name: string,
  tagline: string,
  abv: number,
  description: string,
  image_url: string,
  first_brewed: string,
  brewers_tips: string,
}

export interface IState {
  beerReducer: IBeer[],
  currentBeerReducer: ICurrentBeerReducer,
  navigationReducers: INavigationReducers,
}

export interface ICurrentBeerReducer {
  beerElem: IBeer,
}
export interface INavigationReducers {
  page: number,
  sort: string,
}
