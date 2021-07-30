import React from 'react';

import {useDispatch} from "react-redux";
import {currentBeerElem} from "../../redux/actions";

import classes from './styles.module.scss';
import {IBeer} from "../../redux/types";

const BeerInfoModal = (props: IBeer) => {
    const dispatch = useDispatch();

    const {name, tagline, abv, description: descr, image_url: picUrl, first_brewed: brewed, brewers_tips: tips} = props;

    const closeModal = () => {
        dispatch(currentBeerElem(null));
    };

    return (
    <div onClick={closeModal} className={classes['info-overlay']}>
        <div className={classes['info-wrapper']}>
            <div className={`${classes['info-content']} ${classes['info__picture-wrapper']}`}>
                {picUrl && <img className={classes['info-picture']} src={picUrl} alt="Chosen Beer"/>}
                {!picUrl && <p>No picture :( </p>}
            </div>
            <div className={`${classes['info-content']} ${classes.info}`}>
                <p>{name}</p>
                <p>{tagline}</p>
                <p>{abv}</p>
                <p>{descr}</p>
                <p>{brewed}</p>
                <p>{tips}</p>
            </div>
        </div>
    </div>
    )
};

export default BeerInfoModal;