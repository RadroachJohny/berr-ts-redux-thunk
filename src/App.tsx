import React, { useEffect } from 'react';

import MainTable from "./components/Table/Table";
import BeerInfoModal from "./components/BeerInfoModal/BeerInfoModal";

import './App.css';
import { useSelector } from "react-redux";



function App() {
    const beer = useSelector((state: any) => state.currentBeerReducer.beerElem);

    return <>
        {!beer && <MainTable/>}
        {beer && <BeerInfoModal {...beer} />}
    </>

}

export default App;
