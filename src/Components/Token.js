import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';

class Token extends Component {

  handleClick = (colIndex) => {
    if (!this.props.winning) {
      this.props.handleClick(colIndex)
    }
  }

  render() {

    let color = ["token"]
    if (this.props.row === 0) {
      color.push("empty")
    } else if (this.props.row === 1) {
      color.push("player1")
    } else if (this.props.row === 2) {
      color.push("player2")
    }

    return (<td className={color.join(" ")} onClick={() => this.handleClick(this.props.colIndex)}></td>);
  }
}

const mapStateToProps = (props) => {
  return {winning: props.Win.winning}
}

export default connect(mapStateToProps, null)(Token);
