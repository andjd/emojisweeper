(function (root) {
	"use strict";
	var MS = root.MS = root.MS || {};

	var _ID = 0;

	var _nextID = function() {

		_ID = _ID + 1 ;
		return _ID ;
	};

	var allDirs =  function () { return[
					MS.Constants.N, 
					MS.Constants.S, 
					MS.Constants.E, 
					MS.Constants.W,
					MS.Constants.NE, 
					MS.Constants.SE, 
					MS.Constants.NW, 
					MS.Constants.SW
					]};

	MS.Util = {
		revealTile: function () {
			return {
				id: _nextID(),
				fn: function (tile) {
					if (!tile.state.display) {
						tile.setState({display: true});
						tile.props.addRevealed();
					}
				},
				dirsFn: function (tile) {
					if (tile.state.bombCount === 0  && !tile.state.bomb  && !tile.state.flag) {
						return allDirs();
					} else { return []}
				},
				timeout: 60
			}
		},

		announceBomb: function() {
			return {
				id: _nextID(),
				fn: function (tile) {
					tile.setState({bombCount: tile.state.bombCount + 1});
					tile.props.addBomb();
				},
				dirsFn: function (tile) {
						return allDirs();

				},
				timeout: 0,
				tail: 1
			}
		},

		seedBomb: function() {
			return {
				id: _nextID(),
				fn: function (tile) {
					var b = (!Math.floor(Math.random() * 6))
					if (b && !tile.state.display) {tile.executeAndPropigateInstruction(MS.Util.announceBomb(), function (tile) {
						tile.setState({bomb: true});
					})
				}else{tile.setState({bomb: false})}
				},
				dirsFn: function (tile) {
					return allDirs();

				},
				timeout: 0
			}
		},

	
            
		reset: function () {
			return {
				id: _nextID(),
				fn: function (tile) {
					setTimeout(tile.replaceState.bind(tile, $.extend({}, tile.getInitialState(), {executed: tile.state.executed})), 0);
				},
				dirsFn: function (tile) {
					return [MS.Constants.N, MS.Constants.S, MS.Constants.E, MS.Constants.W]
				},
				timeout: 150,
			}
		},

		victory: function () {
			alert("congrats");
		},

		boom: function () {
			return {
				id: _nextID(),
				fn: function (tile) {
						tile.setState ({over: true});
						// Slows down code unacceptibly
						// $(tile.refs.self.getDOMNode()).effect((Math.floor(Math.random()*2)) ? "bounce" : "shake", "fast");
				},
				dirsFn: function (tile) {
					return [MS.Constants.N, MS.Constants.S, MS.Constants.E, MS.Constants.W]
				},
				timeout: 150
			}

		}
	};


}(this))