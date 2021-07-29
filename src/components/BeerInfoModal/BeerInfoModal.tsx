import React from 'react';
import classes from './styles.module.scss';

const BeerInfoModal = () => {
    return (
    <div className={classes['info-overlay']}>
        <div className={classes['info-wrapper']}>
            <div className={`${classes['info-content']} ${classes['info__picture-wrapper']}`}>
                <img className={classes['info-picture']} src="https://images.punkapi.com/v2/5.png" alt="Chosen Beer"/>
            </div>
            <div className={`${classes['info-content']} ${classes.info}`}>
                <p>- Name</p>
                <p>- Tagline</p>
                <p>- Photo</p>
                <p>- ABV</p>
                <p>- Description</p>
                <p>- Date first brewed</p>
                <p>- Brewer’s tips</p>
            </div>
        </div>
    </div>
    )
};

export default BeerInfoModal;