var Board = React.createClass({
  getInitialState: function () {
    var sizeX = 12;
    var sizeY = 15;
    var f = [];
    for(var i = 0; i < sizeY; i++){
      f.push([]);
    }
    var g = [];
    for(var i = 0; i < sizeX; i++){
      g.push(f.slice());
    }
    return({ 
      grid: g,
      instructions: {}
    });
  },

  componentDidMount: function () {
      this.props.setSeedNode(this.refs["tile-00"]);
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
              (this.state.grid).map(function (row, rowIndex) {
               return (
                <div key={"row" + rowIndex} className="row">
                  {
                    row.map(function (tile, tileIndex) {
                     return ( <MS.Tile key={"tile" + tileIndex} 
                                                  ref={ "tile-" + String(rowIndex) + String(tileIndex)}
                                                  propigate={this.propigate([rowIndex, tileIndex])}
                                                  instruction={this.state.instructions[[rowIndex, tileIndex]]} 
                                                  winning={this.props.winning}
                                                  abortWinning={this.props.abortWinning}/>
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
