export default function(currentPlayer = 1, action) {
  if (action.type === 'currentPlayer') {
    let newcurrentPlayer;
    newcurrentPlayer = 3 - currentPlayer
    return newcurrentPlayer
  } else {
    return currentPlayer;
  }
}
