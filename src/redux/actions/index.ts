import sortedList from "../../helpers";
import {IBeer} from "../types";

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


export const getBeerListThunk = (currentPage: number, sort: string) => {

  return function (dispatch: any) {
    fetch(`https://api.punkapi.com/v2/beers?page=${currentPage}&per_page=25`)
      .then(res => {
        return res.json()
      },
        error => console.log('An error occurred.', error)
      )
      .then(res => {
        if (!res.length) return
        const sortedBeer = sortedList(res, sort)
        dispatch(beersLoad(sortedBeer))
        dispatch(pageChange(currentPage))
      })
  }
}



