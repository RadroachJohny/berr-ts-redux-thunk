import {IBeer} from '../redux/types';

export default function sortedList(beers: IBeer[], sorting: string){
  let sortedBeer;

  if (sorting === 'ASC') {
    sortedBeer = [...beers].sort((a: IBeer, b: IBeer) => {
      return a.abv - b.abv
    });
  } else {
    sortedBeer = [...beers].sort((a: IBeer, b: IBeer) => {
      return b.abv - a.abv
    });
  }

  return sortedBeer
}