import React, {Component} from 'react';

class sidebarProductRow extends Component<{name: string, time: number}> {

  calculateTime(time: number) {
    const sec = Math.floor((time / 1000) % 60);
    const min = Math.floor((time/1000/60) % 60);
    const hours = Math.floor((time/(1000*60*60)) % 24);

    let resTime = '';

    if(hours > 0) {
      resTime += hours + 'hrs';
    }

    if(min > 0) {
      resTime += ' ' + min + 'min';
    }

    if (sec > 0) {
      resTime += ' ' + sec + 'sec'
    } else resTime = time + 'mls'

    return resTime;

  }

  render() {
    return (
    <tr>
      <td>{this.props.name}</td>
      <td>{this.calculateTime(this.props.time)}</td>
    </tr>
    )
  }
}

export default sidebarProductRow;