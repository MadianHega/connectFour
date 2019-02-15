import React, {Component} from 'react';
import './App.css';

import Board from './Components/Board'
import Header from './Components/Header'

import CurrentPlayer from './Reducers/CurrentPlayer.reduceur';
import Win from './Reducers/Win.reduceur';

import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({CurrentPlayer, Win}));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div id="app">
          <Header/>
          <Board/>
        </div>
      </Provider>);
  }
}

export default App;
