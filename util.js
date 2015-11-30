(function (root) {
	"use strict";
	var MS = root.MS = root.MS || {};

	var _ID = 0

	var _nextID = function() {

		_ID = _ID + 1 ;
		return _ID ;
	}

	MS.Util = {
		revealTile: function () {
			return {
				id: _nextID(),
				fn: function (tile) {
					tile.setState({display: true});
				},
				dirsFn: function (tile) {
					if (tile.state.bombCount === 0) {
						return [MS.Constants.N, MS.Constants.S, MS.Constants.E, MS.Constants.W]
					} else { return []}
				},
				timeout: 300
			}
		},

		announceBomb: function() {
			return {
				id: _nextID(),
				fn: function (tile) {
					tile.setState({bombCount: tile.state.bombCount + 1});
				},
				dirsFn: function (tile) {
						return [
							MS.Constants.N, 
							MS.Constants.S, 
							MS.Constants.E, 
							MS.Constants.W,
							MS.Constants.NE, 
							MS.Constants.SE, 
							MS.Constants.NW, 
							MS.Constants.SW
						]

				},
				timeout: 0,
				tail: 1
			}
		}

		seedBomb: function() {
			revealTile: function () {
			return {
				id: _nextID(),
				fn: function (tile) {
					var b = (!Math.floor(Math.random() * 5))
					if (b) {tile.executeAndPropigateInstruction(MS.Util.announceBomb(), function (tile) {
						tile.setState({bomb = false})
					})}
					tile.setState({bomb: b});
				},
				dirsFn: function (tile) {
					return [MS.Constants.N, MS.Constants.S, MS.Constants.E, MS.Constants.W]

				},
				timeout: 0
			}
		},
		}
	}


}(this))