import React, { useState } from 'react';

import {useSelector} from 'react-redux';

import AbvChart from "./components/AbvChart/AbvChart";
import MainTable from './components/Table/MainTable';
import BeerInfoModal from './components/BeerInfoModal/BeerInfoModal';
import Sidebar from './components/Sidebar/Sidebar';

import {IState} from './redux/types';
import classes from "./App.module.scss";


function App() {
  const [showChart, setShowChart] = useState(false);
  const beer = useSelector((state: IState) => state.currentBeerReducer.beerElem);

  const toggleChart = () => {
    setShowChart(prev => !prev)
  }

  return <>
    <div className={classes.container}>
      <MainTable toggleChart={toggleChart}/>
      <Sidebar />
    </div>

    {beer && <BeerInfoModal beer={beer}/>}
    {showChart && <AbvChart toggleChart={toggleChart}/>}
  </>
}

export default App;
