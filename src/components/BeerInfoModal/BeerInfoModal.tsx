import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addVisitedProductInfo, currentBeerElem } from '../../redux/actions';
import {IBeer, IVisitedArr, GreetFunction} from '../../redux/types';

import classes from './styles.module.scss';


type BeerInfoModalType = {
    beer: IBeer,
    currentBeerElem: (arg0: null)=> void,
    addVisitedProductInfo: (arg0: IVisitedArr) => void
};

type BeerInfoModalStateType = {
    productName: string | '',
    timeStart: number,
    timeEnd: number,
}


class BeerInfoModal extends Component<BeerInfoModalType, BeerInfoModalStateType> {
    constructor(props: BeerInfoModalType) {
        super(props)

        this.state = {
            productName: '',
            timeStart: 0,
            timeEnd: 0,

        }
    }

    componentDidMount() {
        const timeStart = Date.now();
        this.setState((prevState: BeerInfoModalStateType) => ({
            ...this.state,
            productName: this.props.beer.name,
            timeStart: timeStart,

        }))
    }

    componentWillUnmount() {
        const timeEnd = Date.now();
        const timeDifference = timeEnd - this.state.timeStart;
        this.props.addVisitedProductInfo({productName: this.state.productName, timeSpent: timeDifference});
    }

    closeModal = () => this.props.currentBeerElem(null)


    render() {
        const {name, tagline, abv, description: descr, image_url: picUrl, first_brewed: brewed, brewers_tips: tips} = this.props.beer;

    return (
    <div  className={classes['info-overlay']}>
    <div onClick={this.closeModal} className={classes['info-overlay']}>
        <div className={classes['info-wrapper']}>
            <div className={`${classes['info-content']} ${classes['info__picture-wrapper']}`}>
                {picUrl && <img className={classes['info-picture']} src={picUrl} alt={name}/>}
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
    </div>
    )
    }
};


const mapDispatchToProps = (dispatch: GreetFunction) => ({
    addVisitedProductInfo: (visitedProdInfo: IVisitedArr) => dispatch(addVisitedProductInfo(visitedProdInfo)),
    currentBeerElem: (beerElem: null) => dispatch(currentBeerElem(null)),
});

export default connect(null, mapDispatchToProps)(BeerInfoModal);