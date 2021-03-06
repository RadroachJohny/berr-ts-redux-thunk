import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Navigation from '../Navigation/Navigation';
import TableRow from './TableRow/TableRow';
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ProductModal from '../CartModal/ProductCartModal';
import FavouriteModal from '../FavouriteModal/FavouriteModal';
import {Button} from '@material-ui/core';

import {currentBeerElem, getBeerListThunk, beersLoad, reverseSorting, removeStatusMessage} from '../../redux/actions';
import { IBeer, IState } from '../../redux/types';
import sortedList from '../../helpers';

import classes from './styles.module.scss';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%'
  },
  successAlert: {
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '200px',
  },
  cartBtn: {
    position: 'absolute',
    bottom: '20%',
    right: '5%',
  },
  favBtn: {
    position: 'absolute',
    bottom: '30%',
    right: '5%',
  }

}));


const MainTable = ({toggleChart} : {toggleChart: () => void}) => {
  const [showCart, setShowCart] = useState(false);
  const [showFavModal, setShowFavModal] = useState(false);
  const dispatch = useDispatch()
  const classUi = useStyles();

  const beers = useSelector((state: IState) => state.beerReducer.beers);
  const page = useSelector((state: IState) => state.navigationReducers.page);
  const sort = useSelector((state: IState) => state.navigationReducers.sort);
  const purchasedBeerList = useSelector((state:  IState) => state.addedProductsReducer.purchasedBeerArr);
  const isFetching = useSelector((state: IState) => state.beerReducer.isFetch);
  const alertStatus = useSelector((state: IState) => state.beerReducer.errorStatus);

  const beersArr = beers.length > 0;

  useEffect(() => {
    dispatch(getBeerListThunk(page, sort))
  }, [page, dispatch, sort])

  useEffect(() => {
    if (alertStatus) {
      const showStatusMessageTimer = setTimeout(() => {
        dispatch(removeStatusMessage())
      }, 2000)

      return () => {
        clearTimeout(showStatusMessageTimer);
      }
    }
  }, [alertStatus, dispatch])

  useEffect(() => {
    if(purchasedBeerList.length === 0 && beers.length && showCart) {
      toggleModal();
    }
  }, [purchasedBeerList])

  const currentElemModal = (beer: IBeer) => {
    dispatch(currentBeerElem(beer));
  }

  const toggleModal = () => {
    setShowCart(prev => !prev)
  }
  const toggleFavouritesModal = () => {
    setShowFavModal(prev => !prev)
  }

  const dispatchSortedList = useCallback(() => {
      let newSort
      if (sort === 'ASC') {
        newSort = 'DESC'
      } else {
        newSort = 'ASC'
      }
      dispatch(reverseSorting(newSort));
      const sortedBeer = sortedList(beers, newSort)
      dispatch(beersLoad(sortedBeer));
    }, [dispatch, beers, sort])
  ;


  return <div className={classes.main}>

    {alertStatus && <div className={classUi.successAlert}>
			<Alert severity="success">This is a success alert ??? check it out!</Alert>
		</div>}

    <div className={classes.mainWrapper}>
      <div className={classes['table-wrapper']}>

        {isFetching && <div className={classUi.root}>
					<CircularProgress/>
				</div>}

        {beersArr && <table className={classes.table}>

					<thead>
					<tr>
						<th className={classes['table-name']}>Name</th>
						<th className={classes['table-descr']}>Tagline</th>
						<th className={classes['table-photo']}>Photo</th>
						<th onClick={dispatchSortedList} className={classes['table-abv']}>ABV</th>
						<th className={classes['table-add']}>Add</th>
						<th className={classes['table-fav']}>Favourite</th>
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
              id={beer.id}
              showFav={true}
            />
          ))}
				</table>}

      </div>

      <Navigation toggleChart={toggleChart}/>
    </div>
    <Button onClick={toggleModal} className={classUi.cartBtn} variant="contained" color="primary">CART</Button>
    <Button onClick={toggleFavouritesModal} className={classUi.favBtn} variant="contained" color="primary">Favourites List</Button>
    {showCart && <ProductModal hideModal={toggleModal}/>}
    {showFavModal && <FavouriteModal hideModal={toggleFavouritesModal}/>}
  </div>
};

export default MainTable;