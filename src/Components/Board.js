import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';

import Row from './Row'

const initBoard = (row, col) => {
  let board = []
  for (let r = 0; r < row; r++) {
    board[r] = [];
    for (let c = 0; c < col; c++) {
      board[r][c] = 0;
    }
  }
  return board
}

const searchWin = (board, rowIndex, colIndex, currentPlayer) => {
  var row = board.length
  var col = board[0].length
  var count;
  var shift;

  var newCount = (rowIndex, colIndex, currentPlayer) => {
    if (board[rowIndex][colIndex] === currentPlayer) {
      return count + 1;
    } else {
      return 0
    }
  }

  // Horizontal
  count = 0;
  for (let x = 0; x < col; x++) {
    count = newCount(rowIndex, x, currentPlayer);
    if (count >= 4) {
      return currentPlayer;
    }
  }

  // Vertical
  count = 0;
  for (let y = 0; y < row; y++) {
    count = newCount(y, colIndex, currentPlayer);
    if (count >= 4) {
      return currentPlayer;
    }
  }

  // Diagonal
  count = 0;
  shift = rowIndex - colIndex;
  for (let i = Math.max(shift, 0); i < Math.min(row, col + shift); i++) {
    count = newCount(i, i - shift, currentPlayer);
    if (count >= 4) {
      return currentPlayer;
    }
  }

  // Anti-diagonal
  count = 0;
  shift = rowIndex + colIndex;
  for (let i = Math.max(shift - col + 1, 0); i < Math.min(row, shift + 1); i++) {
    count = newCount(i, shift - i);
    if (count >= 4) {
      return currentPlayer;
    }
  }

}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: initBoard(this.props.row, this.props.col)
    };
  }

  game = (colIndex) => {
    for (let r = 0; r < this.props.row; r++) {
      if (this.state.board[r][colIndex] === 0) {
        let newBoard = [...this.state.board]
        newBoard[r][colIndex] = this.props.currentPlayer
        this.setState({board: newBoard});
        let win = searchWin(this.state.board, r, colIndex, this.props.currentPlayer)
        if (win === 1 || win === 2) {
          this.props.NewWinner(win)
        }
        this.props.CurrentPlayer()
        break
      }
    }
  }

  render() {
    let rowList = this.state.board.map((row, index) => {
      return <Row key={index} row={row} rowIndex={index} handleClick={this.game}/>
    }).reverse()

    return (<table id="board">
      <tbody>
        {rowList}
      </tbody>
    </table>);
  }
}

Board.defaultProps = {
  row: 6,
  col: 7
};

const mapDispatchToProps = (dispatch) => {
  return {
    CurrentPlayer: function(currentPlayer) {
      dispatch({type: 'currentPlayer', currentPlayer: currentPlayer})
    },
    NewWinner: function(winningPlayer) {
      dispatch({type: 'newWinner', winningPlayer: winningPlayer})
    }
  }
}

const mapStateToProps = (props) => {
  return {currentPlayer: props.CurrentPlayer}
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);
