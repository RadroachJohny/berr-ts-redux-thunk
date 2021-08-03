import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import classes from './styles.module.scss';
import {IBeerElem} from "../../redux/types";
import TableRow from "../Table/TableRow/TableRow";


const ProductCartModal = (props: any) => {
  const overlay = React.useRef<HTMLDivElement>(null);

  const purchasedBeerList = useSelector((state: any) => state.addedProductsReducer.purchasedBeerArr);

  const cartIsEmpty = purchasedBeerList.length === 0;

  console.log(cartIsEmpty);

  const closeModal = (e: any) => {
    if (e.target === overlay.current) {
      props.hideModal();
    }
  }

  return (
    <div onClick={closeModal} ref={overlay} className={classes.overlay}>
      <div className={classes.cart}>

        {cartIsEmpty && <div className={classes.emptyCart}>Your cart is empty</div>}
        {!cartIsEmpty && <table className={classes.table}>

					<thead>
					<tr>
						<th className={classes['table-name']}>Name</th>
						<th className={classes['table-descr']}>Tagline</th>
						<th className={classes['table-photo']}>Photo</th>
						<th className={classes['table-abv']}>ABV</th>
					</tr>
					</thead>

          {purchasedBeerList.length && purchasedBeerList.map((beer: IBeerElem) => (

            <TableRow
              key={beer.id}
              name={beer.name}
              tagline={beer.tagline}
              image_url={beer.image_url}
              abv={beer.abv}
              id={beer.id}
              quantity={beer.quantity}
            />
          ))}
				</table>}
      </div>
    </div>
  )
}

export default ProductCartModal;