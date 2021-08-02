import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect} from 'react';

import Navigation from '../Navigation/Navigation';
import TableRow from './TableRow';

import {currentBeerElem, getBeerListThunk, beersLoad, reverseSorting} from '../../redux/actions';
import {IBeer, IState} from '../../redux/types';
import sortedList from '../../helpers';

import classes from './styles.module.scss';


const MainTable = () => {
  const dispatch = useDispatch()
  const beers = useSelector((state: IState) => state.beerReducer)
  const page = useSelector((state: IState) => state.navigationReducers.page);
  const sort = useSelector((state: IState) => state.navigationReducers.sort);

  useEffect(() => {
    dispatch(getBeerListThunk(page, sort))
  }, [dispatch, page, sort])

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
          <thead>
          <tr>
            <th className={classes['table-name']}>Name</th>
            <th className={classes['table-descr']}>Tagline</th>
            <th className={classes['table-photo']}>Photo</th>
            <th onClick={dispatchSortedList} className={classes['table-abv']}>ABV</th>
          </tr>
          </thead>

          {beers.length && beers.map((beer: IBeer) => (
            <TableRow
              key={beer.id}
              name={beer.name}
              tagline={beer.tagline}
              image_url={beer.image_url}
              abv={beer.abv}
              onClick={() => currentElemModal(beer)}
            />
          ))}
        </table>
      </div>
      <Navigation/>
    </div>
  </div>
};

export default MainTable;