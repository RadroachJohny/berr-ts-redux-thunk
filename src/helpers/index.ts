export default function sortedList(beers:any,sortion:string){
  console.log(sortion);
  let sortedBeer;

  if (sortion === 'ASC') {
    sortedBeer = [...beers].sort((a: any, b: any) => {
      return a.abv - b.abv
    });
  } else {
    sortedBeer = [...beers].sort((a: any, b: any) => {
      return b.abv - a.abv
    });
  }

  return sortedBeer
}