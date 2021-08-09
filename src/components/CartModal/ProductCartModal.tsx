import React, { useRef } from 'react';
import { useSelector } from 'react-redux';

import TableRow from '../Table/TableRow/TableRow';
import { IBeerElem, IState } from '../../redux/types';

import classes from './styles.module.scss';


const ProductCartModal = (props: {hideModal: ()=> void}) => {
  const overlay = useRef<HTMLDivElement>(null);
  const purchasedBeerList = useSelector((state: IState) => state.addedProductsReducer.purchasedBeerArr);

  const cartIsEmpty = purchasedBeerList.length === 0;

  const closeModal = (e: React.MouseEvent<HTMLElement>) => {
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
						<th className={classes['table-abv']}>Amount</th>
						<th className={classes['table-abv']}>Action</th>
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