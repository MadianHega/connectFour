export default function(win = {winning: false, winner: ""}, action) {
  if (action.type === 'newWinner') {
    let newWin = {...win}
    newWin.winning = true
    newWin.winner = action.winningPlayer
    return newWin;
} else {
    return win;
}
}
