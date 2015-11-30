var GameObject = React.createClass ({
  getInitialState: function () {
    return({
      // board: new Minesweeper.Board (2, 1),
      gameOver: false,
      gameWon: false
    });
  },

  // updateGame: function (tile, flagging) {
  //   tile.explore();
  // },

  render: function () {
    return (
      <Board board={this.state.board} updateGame={this.updateGame}>
      </Board>
    );
  }
});


var Board = React.createClass({
  getInitialState: function () {
    return({ 
      board: new Minesweeper.Board (15 , 35) ,
      instructions: {}
    });
  },

  propigate: function (sourcePos) {
      return function (dirs, instruction) {
          return function () {
              var newInstructions = $.extend({}, this.state.instructions);
              dirs.forEach( function (dir) {
                  var recPos = [sourcePos[0] + dir[0], sourcePos[1] + dir[1]]
                  newInstructions[recPos] = instruction;
              });
              this.setState({instructions: newInstructions});
            }.bind(this);
      }.bind(this);
  },

  render: function () {
    return (
          <div className="grid">
            {
              this.state.board.grid.map(function (row, rowIndex) {
               return (
                <div key={"row" + rowIndex}>
                  {
                    row.map(function (tile, tileIndex) {
                     return ( <MS.Tile key={"tile" + tileIndex}
                                                  propigate={this.propigate([rowIndex, tileIndex])}
                                                  instruction={this.state.instructions[[rowIndex, tileIndex]]} />
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
