import React, { Component } from 'react';
import {connect} from "react-redux";

import SidebarProductRow from './sidebarProductRow/SidebarProductRow';
import {IState, IVisitedArr} from "../../redux/types";

import classes from './styles.module.scss';

type SidebarType = {
  visitedList: IVisitedArr[],
}

class Sidebar extends Component<SidebarType> {
  componentDidUpdate(prevProps: SidebarType ) {
    if (prevProps.visitedList !== this.props.visitedList) {
      this.setState({visitedList: this.props.visitedList})
    }

  }

  render() {
    return (
      <div className={classes['sidebar-wrapper']}>
        <table className={classes.table}>
          <thead><tr>
            <th>Beer name</th>
            <th>Time spent</th>
          </tr></thead>
          <tbody>
          {
            this.props.visitedList.map((elem: IVisitedArr) => (
              <SidebarProductRow name={elem.productName} time={elem.timeSpent} key={Date.now() + Math.random()}/>
            ))
          }

          </tbody>
        </table>
      </div>
    )
  }
}

const MapStateToProps = (state: IState) => ({
  visitedList: state.visitedProductReducer.visitedProdInfo
});

export default connect(MapStateToProps)(Sidebar);