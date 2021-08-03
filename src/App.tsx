import React from 'react';

import {useSelector} from 'react-redux';

import MainTable from './components/Table/Table';
import BeerInfoModal from './components/BeerInfoModal/BeerInfoModal';

import {IState} from './redux/types';

function App() {
  const beer = useSelector((state: IState) => state.currentBeerReducer.beerElem);

  return <>
    <MainTable/>
    {beer && <BeerInfoModal beer={beer}/>}
  </>
}

export default App;
