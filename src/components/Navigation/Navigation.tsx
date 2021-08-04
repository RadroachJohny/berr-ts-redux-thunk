import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { getBeerListThunk} from '../../redux/actions';
import {IState} from '../../redux/types';

const Navigation = ({toggleChart}: {toggleChart: () => void}) => {
  const dispatch = useDispatch();
  const page = useSelector((state: IState) => state.navigationReducers.page);
  const sort = useSelector((state: IState) => state.navigationReducers.sort);

  const nextPage =() => {
    dispatch(getBeerListThunk(page + 1, sort))
  }

  const prevPage =() => {
    if (page !== 1) {
      dispatch(getBeerListThunk(page - 1, sort))
    }
  }

  return (
    <div>
      <button onClick={prevPage}>Prev page</button>
      <span>{page}</span>
      <button onClick={nextPage}>Next page</button>
      <button onClick={toggleChart}>Show Chart</button>
    </div>
  )
};

 export default Navigation;