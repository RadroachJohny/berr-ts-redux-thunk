import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect, useCallback} from "react";

import Navigation from "../Navigation/Navigation";

import {currentBeerElem, getBeerListThunk, beersLoad, reverseSorting} from "../../redux/actions";

import classes from './styles.module.scss';
import sortedList from "../../helpers";
import {IBeer, IState} from "../../redux/types";

const MainTable = () => {
  const dispatch = useDispatch()
  const beers = useSelector((state: IState) => state.beerReducer)
  const page = useSelector((state: IState) => state.navigationReducers.page);
  const sort = useSelector((state: IState) => state.navigationReducers.sort);

  useEffect(() => {
    dispatch(getBeerListThunk(page, sort))
  }, [])

  const currentElemModal = (beer: IBeer) => {
    dispatch(currentBeerElem(beer));
  }


  const dispatchSortedList = () => {
    let newSort
    if (sort === 'ASC') {
      newSort = 'DESC'
    } else {
      newSort = 'ASC'
    }
    dispatch(reverseSorting(newSort));
      const sortedBeer = sortedList(beers, newSort)
      dispatch(beersLoad(sortedBeer));
    }
  ;

  return <div className={classes.container}>
    <div className={classes.mainWrapper}>
      <div className={classes['table-wrapper']}>
        <table className={classes.table}>
          <tr>
            <th>Name</th>
            <th>Tagline</th>
            <th>Photo</th>
            <th onClick={dispatchSortedList}>ABV</th>
          </tr>
          {beers.length && beers.map((beer: any) => {
            return (

              <tr className={classes.row}>
                <td>{beer.name}</td>
                <td>{beer.tagline}</td>
                <td onClick={() => currentElemModal(beer)}><img src={beer.image_url} alt=""/></td>
                <td>{beer.abv}</td>
              </tr>
            )
          })}

        </table>
      </div>
      <Navigation/>
    </div>
  </div>
};

export default MainTable;