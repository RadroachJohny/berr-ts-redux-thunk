import React, { Component } from 'react';

import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme } from 'victory';

import {connect} from "react-redux";
import { IBeer, IState } from "../../redux/types";
import {currentBeerElem} from "../../redux/actions";

import classes from './styles.module.scss';

type AbvState = {
  allBeerArr: IBeer[],
  toggleChart: ()=> void,
  currentBeerElem: (arg0: IBeer)=> void
};

class AbvChart extends Component<AbvState, {arrBeers: IBeer[] | undefined}> {
  constructor(props: AbvState) {
    super(props);

    this.state = {
      arrBeers: props.allBeerArr
    }
  }

  componentDidUpdate(prevProps: AbvState) {
    if (prevProps.allBeerArr !== this.props.allBeerArr) {
      this.setState({arrBeers: this.props.allBeerArr})
    }
  }

  openBeerInfoModal(id:number) {
    const chosenBeerElem = this.state.arrBeers && this.state.arrBeers.find(elem => elem.id === +id);

    if(chosenBeerElem) {
      const {name, tagline, abv, description, image_url, first_brewed, brewers_tips, id} = chosenBeerElem;

      const cleanBeerElem = {
        name,
        tagline,
        abv,
        description,
        image_url,
        first_brewed,
        brewers_tips,
        id
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
                    onClick: (e: any) => {
                      return [
                        {
                          target: 'data',
                          mutation: (props: any) => {
                            this.openBeerInfoModal(props.datum.id);
                          }
                        }
                      ]
                    }
                  }
                }
              ]}
            />

            <VictoryAxis/>
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (x)}
            />

            </VictoryChart>
        </div>
      </div>
    )
  }

 }

const mapStateToProps = (state: IState) => ({
  allBeerArr: state.beerReducer.beers
})

const mapDispatchToProps = (dispatch: (arg0: { type: string; beerElem: IBeer | null; }) => void) => ({
  currentBeerElem: (beerElem: IBeer | null) => dispatch(currentBeerElem(beerElem)),
})


export default connect(mapStateToProps, mapDispatchToProps)(AbvChart);