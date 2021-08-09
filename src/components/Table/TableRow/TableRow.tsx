import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {IBeerElem, IState} from '../../../redux/types';
import {
  addSingleBeerProduct,
  addToFavouriteList,
  removeFromFavouriteList,
  removeSingleBeerProduct
} from "../../../redux/actions";

import classes from './styles.module.scss';


const TableRow = (props: IBeerElem) => {
  const [inputVal, setInputVal] = useState(1);

  const dispatch = useDispatch();
  const purchasedBeerList = useSelector((state: IState) => state.addedProductsReducer.purchasedBeerArr);
  const favouriteIdArr = useSelector((state: IState) => state.favouritesProductReducer.favouritesArr);

  let inStock = purchasedBeerList.some(elem => elem.id === props.id);
  let inFavs = favouriteIdArr.some(elem => elem.id === props.id);


  const addProduct = () => {
    const purchasingBeerElem = {
      abv: props.abv,
      id: props.id,
      image_url: props.image_url,
      name: props.name,
      tagline: props.tagline,
      quantity: inputVal
    }

    dispatch(addSingleBeerProduct(purchasingBeerElem));
    setInputVal(1);
  }

  const removeItem = () => {
    const filteredArr = purchasedBeerList.filter(elem => elem.id !== props.id);
    dispatch(removeSingleBeerProduct(filteredArr));
  };

  const productAmountNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
  setInputVal(+e.target.value);
  }

  const addToFavourites = () => {
    const favouriteProd = {
      abv: props.abv,
      id: props.id,
      image_url: props.image_url,
      name: props.name,
      tagline: props.tagline,
      quantity: inputVal
    }


    dispatch(addToFavouriteList(favouriteProd))
  };

  const removeFromFavourites = () => {
    dispatch(removeFromFavouriteList(props.id))
  };

  return (
    <tbody>
    <tr className={classes.row}>
      <td>{props.name}</td>
      <td>{props.tagline}</td>
      <td onClick={props.onClick}><img src={props.image_url} alt={props.name}/></td>
      <td>{props.abv}</td>
      {props.quantity && <td>{props.quantity}</td>}
      {!inStock ? <td className={classes.add}>
        <input value={inputVal} onChange={productAmountNumber} min='1' type="number"/>
        <button onClick={addProduct}>buy</button>
      </td> : <td><button onClick={removeItem}>delete</button></td>}

      {props.showFav && <td >{inFavs ? <button onClick={removeFromFavourites}>Remove</button> : <button onClick={addToFavourites}>Add</button>}</td>}

    </tr>
    </tbody>
  )
}


export default TableRow;