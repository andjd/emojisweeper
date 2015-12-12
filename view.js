

var GameObject = React.createClass ({
  getInitialState: function () {
    return({
      newDisabled: false,
      bombCount: 0,
      flagCount: 0,
      revealedCount: 0
    });
  },
  componentDidUpdate: function () {
    if (this.won()) {this.state.seedNode.executeAndPropigateInstruction(MS.Util.victory())}
  },

  addBomb: function () {
    this.setState({bombCount: this.state.bombCount + 1});
  },

  addFlag: function () {
    this.setState({flagCount: this.state.flagCount + 1});
  },

  rmFlag: function () {
    this.setState({flagCount: this.state.flagCount - 1});
  },

  addRevealed: function () {
    this.revealed = this.revealed || 0;

    this.setState({revealedCount: ++this.revealed});
  },

  bombCounter: function () {
    if (this.state.bombCount !== 0) {
        return String(this.state.bombCount - this.state.flagCount);
      } else {return "";}
  },

  won: function() {
    return (this.state.revealedCount === 180 - this.state.bombCount)
  },

  setSeedNode: function (seed) {
        this.setState({seedNode: seed});
  },

  resetGame: function () {
    this.setState({bombCount: 0, flagCount: 0, revealedCount: 0, newDisabled: true});
    this.revealed = 0;
    this.state.seedNode.executeAndPropigateInstruction(MS.Util.reset());
    setTimeout(this.setState.bind(this, {newDisabled: false}), 2000);
  },

  render: function () {
    return (
      <div className="game">
          <div>
              <h1>emojiSweeper</h1>
              <span className="bomb-count">{this.bombCounter()}</span>
              <button onClick={this.resetGame} disabled={this.state.newDisabled}>New Game</button>
          </div>
          <Board  
                        addBomb={this.addBomb}
                        addFlag={this.addFlag}
                        rmFlag={this.rmFlag}
                        addRevealed={this.addRevealed}
                        setSeedNode={this.setSeedNode} /> 
      </div>
    );
  }
});





React.render(
  <GameObject />,
  document.getElementById("game-window")
);
