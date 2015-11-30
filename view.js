var GameObject = React.createClass ({
  getInitialState: function () {
    return({
      board: new Minesweeper.Board (10, 15),
      gameOver: false,
      gameWon: false
    });
  },

  updateGame: function (tile, flagging) {
    tile.explore();

  },

  render: function () {
    return (
      <Board board={this.state.board} updateGame={this.updateGame}>

      </Board>
    );
  }
});

var Board = React.createClass({
  render: function () {
    return (
          <div className="grid">
            {
              this.props.board.grid.map(function (row, rowIndex) {
               return (
                <div key={"row" + rowIndex}>
                  {
                    row.map(function (tile, tileIndex) {
                     return ( <Tile key={"tile" + tileIndex}
                                    board={this.props.board}
                                    updateGame={this.props.updateGame}
                                    pos={[rowIndex, tileIndex]} />
                            );
                  }.bind(this))
                  }
                </div>
              );
            }.bind(this))
          }
          </div>
    );
  },
});

var Tile = React.createClass ({
  getInitialState: function () {
    return ({value: "🗻"});
  },



  updateStatus: function (tile) {
    if (tile.flagged) {
      this.setState({value: "🚩"});
    } else if (tile.bombed){
      this.setState({value: "🚩"});
    } else if (tile.explored) {
      this.setState({value: tile.adjacentBombCount()});
    } else {
      this.setState({value: "🗻"});
    }

  },

  handleClick: function () {
    var tile = this.props.board.grid[this.props.pos[0]][this.props.pos[1]];
      this.props.updateGame(tile, false);
      this.updateStatus(tile);
  },

  render: function() {
    return(<span onClick={this.handleClick} className="tile">{this.state.value}</span>);
  },

});

React.render(
  <GameObject />,
  document.getElementById("game-window")
);
