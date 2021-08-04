import React, { Component } from 'react';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import {connect} from "react-redux";
import {IBeer} from "../../redux/types";
import {currentBeerElem} from "../../redux/actions";

import classes from './styles.module.scss';

type AbvState = {
  allBeerArr: IBeer[],
  toggleChart: ()=> void,
  currentBeerElem: (arg0: IBeer)=> void
};

class AbvChart extends Component<AbvState, {arrBeers: IBeer[] | undefined}> {
// class AbvChart extends Component<{allBeerArr: IBeer[], toggleChart: ()=> void, currentBeerElem: (arg0: IBeer)=> void}, {arrBeers: IBeer[] | undefined}> {
  constructor(props: any) {
    super(props);

    this.state = {
      arrBeers: props.allBeerArr
    }
  }

  componentDidUpdate(prevProps:any) {
    if (prevProps.allBeerArr !== this.props.allBeerArr) {
      this.setState({arrBeers: this.props.allBeerArr})
    }
  }

  testFunc(obj: any) {
    console.log(this.props);
  }

  openBeerInfoModal(id:number) {
    console.log(id);
    const chosenBeerElem = this.state.arrBeers && this.state.arrBeers.find(elem => elem.id === +id);
    console.log(this.state.arrBeers);
    console.log(chosenBeerElem);
    if(chosenBeerElem) {
      const cleanBeerElem = {
        name: chosenBeerElem.name,
        tagline: chosenBeerElem!.tagline,
        abv: chosenBeerElem!.abv,
        description: chosenBeerElem!.description,
        image_url: chosenBeerElem!.image_url,
        first_brewed: chosenBeerElem!.first_brewed,
        brewers_tips: chosenBeerElem!.brewers_tips,
        id: chosenBeerElem!.id,
      }
      this.props.currentBeerElem(cleanBeerElem);
    }
  }

  render() {
    return (
      <div className={classes['chart-container']}>
        <div onClick={this.props.toggleChart} className={classes.close}>X</div>
        <div  className={classes['chart-modal']}>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={10}>

            <VictoryBar
              style={{ data: { fill: "#c43a31" } }}
              data={this.state.arrBeers}
              x="id"
              y="abv"

              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onClick: (e:any) => {
                      return [
                        {
                          target: 'data',
                          mutation: (props:any) => {
                            console.log(e.target)
                            console.log(props);
                            this.openBeerInfoModal(props.datum.id);
                          }
                        }
                      ]
                    }
                  }
                }
              ]}
            />

            <VictoryAxis
              // tickValues specifies both the number of ticks and where
              // they are placed on the axis
              // tickValues={[1, 2, 3, 4, 5, 6, 7]}
              // tickFormat={["Product name", "2", "3", "4", "5", "6", "7"]}
            />
            <VictoryAxis
              dependentAxis
              // tickFormat specifies how ticks should be displayed
              tickFormat={(x) => (x)}
            />

            </VictoryChart>
        </div>
      </div>
    )
  }

 }

const mapStateToProps = (state: any) => ({
  allBeerArr: state.beerReducer.beers
})

const mapDispatchToProps = (dispatch: any) => ({
  currentBeerElem: (beerElem: any) => dispatch(currentBeerElem(beerElem)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AbvChart);