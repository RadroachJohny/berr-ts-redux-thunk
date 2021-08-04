import React, { useState } from 'react';

import {useSelector} from 'react-redux';

import AbvChart from "./components/AbvChart/AbvChart";
import MainTable from './components/Table/MainTable';
import BeerInfoModal from './components/BeerInfoModal/BeerInfoModal';

import {IState} from './redux/types';


function App() {
  const [showChart, setShowChart] = useState(false);
  const beer = useSelector((state: IState) => state.currentBeerReducer.beerElem);

  const toggleChart = () => {
    setShowChart(prev => !prev)
  }
  

  return <>
    <MainTable toggleChart={toggleChart}/>
    {beer && <BeerInfoModal beer={beer}/>}
    {showChart && <AbvChart toggleChart={toggleChart}/>}
  </>
}

export default App;
