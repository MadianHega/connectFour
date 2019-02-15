import React, {Component} from 'react';
import '../App.css';
import {connect} from 'react-redux';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hallOfFame: [],
      fetchError: false
    };
  }
  componentDidUpdate(prevProps) {
    if (this.props.winning !== prevProps.winning) {
      fetch("http://127.0.0.1:3000/hallOfFame", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: "pseudo=" + this.props.winner + "&date=" + new Date()
      }).then((response) => response.json()).then((data) => {
        if (data.error) {
          console.log("request failed :", data.error);
          this.setState({fetchError: true});
        } else {
          let newHallOfFame = [...data.hallOfFame]
          this.setState({hallOfFame: newHallOfFame});
        }
      }).catch((error) => {
        console.log("request failed :", error)
        this.setState({fetchError: true});
      })

    }
  }

  render() {
    return (<div id="header">
      {
        this.props.winning
          ? (<div>
            <div>Joueur {this.props.winner} à gagné</div>
            {
              this.state.fetchError
                ? (<div>Erreur...impossible d'afficher le tableau des victoires</div>)
                : (<div>
                  {
                    this.state.hallOfFame.map((fame, id) => {
                      return <div key={id}>pseudo: {fame.pseudo} / date: {fame.date}</div>
                    })
                  }
                </div>)
            }
            </div>)
          : (<div>Joueur {this.props.currentPlayer} à vous de jouer!</div>)
      }
      </div>)
  }
}

const mapStateToProps = (props) => {
  return {currentPlayer: props.CurrentPlayer, winning: props.Win.winning, winner: props.Win.winner}
}

export default connect(mapStateToProps, null)(Header);
