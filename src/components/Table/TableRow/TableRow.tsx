import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import {IBeerElem, IState} from '../../../redux/types';

import {addSingleBeerProduct, removeSingleBeerProduct} from "../../../redux/actions";

import classes from './styles.module.scss';

const TableRow = (props: IBeerElem) => {
  const [inputVal, setInputVal] = useState(1);

  const dispatch = useDispatch();
  const purchasedBeerList = useSelector((state: IState) => state.addedProductsReducer.purchasedBeerArr);

  let inStock = purchasedBeerList.some(elem => elem.id === props.id);

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

  return (
    <tbody>
    <tr className={classes.row}>
      <td>{props.name}</td>
      <td>{props.tagline}</td>
      <td onClick={props.onClick}><img src={props.image_url} alt={props.name}/></td>
      <td>{props.abv}</td>
      {props.quantity && <td>{props.quantity}</td>}
      {!inStock ? <td className={classes.add}>
        <input value={inputVal} onChange={(e: any)=> setInputVal(e.target.value)} min='1' type="number"/>
        <button onClick={addProduct}>buy</button>
      </td> : <button onClick={removeItem}>delete</button>}
    </tr>
    </tbody>
  )
}

export default TableRow;