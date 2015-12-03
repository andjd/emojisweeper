var GameObject = React.createClass ({
  getInitialState: function () {
    return({
      gameOver: false,
      gameWon: false
    });
  },

  winning: function () {
      activeTimeout = setTimeout(this.winnerWinner, 3500);
      this.setState({winning: activeTimeout});
  },

  abortWinning: function () {
    clearTimeout(this.state.winning);
  },

  winnerWinner: function () {
        alert("Congratulations");
  },

  setSeedNode: function (seed) {
        this.setState({seedNode: seed});
  },

  resetGame: function () {
    this.state.seedNode.executeAndPropigateInstruction(MS.Util.reset());
  },

  render: function () {
    return (
      <div className="game">
          <div>
              <h1>emojiSweeper</h1>
              <button onClick={this.resetGame}>New Game</button>
          </div>
          <Board  
                        winning={this.winning}
                        abortWinning={this.abortWinning}
                        setSeedNode={this.setSeedNode} /> 
      </div>
    );
  }
});





React.render(
  <GameObject />,
  document.getElementById("game-window")
);
