import React, {Component} from 'react';
import '../App.css';

import Token from './Token'

class Row extends Component {

  render() {
    let tokenList = this.props.row.map((row, index) => {
      return <Token key={index} colIndex={index} handleClick={this.props.handleClick} row={row}/>
    })
    return (<tr>{tokenList}</tr>)
  }
}

export default Row;
