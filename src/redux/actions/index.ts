import {Dispatch} from "react";

import sortedList from '../../helpers';
import {IBeer, IBeerElem, IVisitedArr} from '../types';


const BEERS_LOAD = 'BEERS_LOAD';
const IS_FETCHING = 'IS_FETCHING';
const PAGE_CHANGE = 'PAGE_CHANGE';

export const beersLoad = (beers: IBeer[]): beersLoad => ({
  type: BEERS_LOAD,
  beers
})

export type beersLoad = {
  type: typeof BEERS_LOAD,
  beers: IBeer[]
}

export const pageChange = (page: number): pageChange => ({
  type: PAGE_CHANGE,
  page
})

export type pageChange = {
  type: 'PAGE_CHANGE',
  page: number
}

export const currentBeerElem = (beerElem: IBeer | null) => ({
  type: 'BEER_DETAILS',
    beerElem
})

export const reverseSorting = (sort: string) => ({
  type: 'REVERSE_SORTING',
  sort
});

export const fetchingDataStatus = (isFetch: boolean, errorStatus: boolean | null): fetchingDataStatus => ({
  type: 'IS_FETCHING',
  isFetch,
  errorStatus
})
export type fetchingDataStatus = {
  type: typeof IS_FETCHING,
  isFetch: boolean,
  errorStatus: boolean | null
}

export const removeStatusMessage = () => ({
  type: 'REMOVE_STATUS_MESSAGE',
})

export const addSingleBeerProduct = (purchasedBeerArr: IBeerElem) => ({
  type: 'ADD_ONE_BEER_TYPE',
  purchasedBeerArr,
})
export const removeSingleBeerProduct = (purchasedBeerArr: IBeerElem[]) => ({
  type: 'REMOVE_ONE_BEER_TYPE',
  purchasedBeerArr,
})

export const addVisitedProductInfo = (visitedProdInfo: IVisitedArr) => ({
  type: 'ADD_VISITED_PRODUCT_INFO',
  visitedProdInfo
})

type ActionsType = fetchingDataStatus | beersLoad | pageChange;

export const getBeerListThunk = (currentPage: number, sort: string) => {
  return function (dispatch: Dispatch<ActionsType>) {

    dispatch(fetchingDataStatus(true, false));

    const getBeerListFromAPI = async () => {
      const request = await fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=25`);
      const response = await request.json();
      return response
    }

    setTimeout(() => {
      getBeerListFromAPI().then(res => {
        if (!res.length) return
        const sortedBeer = sortedList(res, sort)
        dispatch(beersLoad(sortedBeer))
        dispatch(pageChange(currentPage))
        dispatch(fetchingDataStatus(false, true ));
      })
    }, 500)
  }
}



