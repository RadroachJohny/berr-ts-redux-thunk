import sortedList from '../../helpers';
import {IBeer} from '../types';

export const beersLoad = (beers: IBeer[]) => ({
  type: 'BEERS_LOAD',
  beers
})

export const pageChange = (page: number) => ({
  type: 'PAGE_CHANGE',
  page
})

export const currentBeerElem = (beerElem: IBeer | null) => ({
  type: 'BEER_DETAILS',
    beerElem
})

export const reverseSorting = (sort: string) => ({
  type: 'REVERSE_SORTING',
  sort
});

export const fetchingDataStatus = (isFetch: boolean, errorStatus: boolean | null) => ({
  type: 'IS_FETCHING',
  isFetch,
  errorStatus
})

export const removeStatusMessage = () => ({
  type: 'REMOVE_STATUS_MESSAGE',
})

export const addSingleBeerProduct = (purchasedBeerArr: any) => ({
  type: 'ADD_ONE_BEER_TYPE',
  purchasedBeerArr,
})
export const removeSingleBeerProduct = (purchasedBeerArr: any) => ({
  type: 'REMOVE_ONE_BEER_TYPE',
  purchasedBeerArr,
})


export const getBeerListThunk = (currentPage: number, sort: string) => {

  return function (dispatch: any) {

    dispatch(fetchingDataStatus(true, false));


    const getBeerListFromAPI = async() => {
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



