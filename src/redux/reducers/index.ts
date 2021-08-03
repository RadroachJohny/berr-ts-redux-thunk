import { combineReducers } from 'redux'

import beerReducer from './beersReducers';
import navigationReducers from './navigationReducers';
import currentBeerReducer from './currentBeerReducer';
import addedProductsReducer from "./addedProductsReducer";


export default combineReducers({
	beerReducer,
	navigationReducers,
	currentBeerReducer,
	addedProductsReducer
})