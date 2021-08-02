import React from 'react';

import {IBeerElem} from '../../redux/types';

import classes from './styles.module.scss';

const TableRow = (props: IBeerElem) => {
  return (
    <tbody>
    <tr className={classes.row}>
      <td>{props.name}</td>
      <td>{props.tagline}</td>
      <td onClick={props.onClick}><img src={props.image_url} alt={props.name}/></td>
      <td>{props.abv}</td>
    </tr>
    </tbody>
  )
}

export default TableRow;