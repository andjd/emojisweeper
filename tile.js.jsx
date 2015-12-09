(function (root) {
	"use strict";
	var MS = root.MS = root.MS || {};

	MS.Tile = React.createClass({
		getInitialState: function () {
			var  hidden = MS.Constants.HIDDEN_ICONS[Math.floor(Math.random() * MS.Constants.HIDDEN_ICONS.length)];
			var empty = MS.Constants.REVEALED_EMPTY_ICONS[Math.floor(Math.random() * MS.Constants.REVEALED_EMPTY_ICONS.length)];
			var dead = MS.Constants.DEAD_ICONS[Math.floor(Math.random() * MS.Constants.DEAD_ICONS.length)]

			return({bomb: undefined, 
				bombCount: 0,
				flag: false, 
				display: false,
				instruction: false,
				executed: {},
				hidden: hidden,
				empty: empty,
				dead: dead
			})
		},

		shouldComponentUpdate: function (newProps, newState) {
			if (this.state.executed[newProps.instruction]) {return false;}
			return true;
		},

		componentWillReceiveProps: function (newProps) {
			if (newProps.instruction !== this.props.instruction &&
				!this.state.executed[newProps.instruction.id]){
				this.executeAndPropigateInstruction(newProps.instruction);
			}
		},
		
		executeAndPropigateInstruction: function (instruction, alternate) {
			if(alternate) {
				alternate(this);
			} else {
				instruction.fn(this);
			}
			this.state.executed[instruction.id] = true;

			var tail = instruction.tail
			var newTail;
			if (typeof tail ==="undefined" || tail === null || tail > 0) {
				if (tail) {newTail = tail - 1};
			setTimeout(this.props.propigate(instruction.dirsFn(this), $.extend({}, instruction, {tail: newTail} )), instruction.timeout);
			}
		},

		reveal: function () {
			if (this.state.bomb) {
				this.executeAndPropigateInstruction(MS.Util.boom());
			} else {
				this.executeAndPropigateInstruction(MS.Util.revealTile());
			}
		},

		toggleFlag: function () {
			var newFlag ;
			switch (this.state.flag) {
			case "danger":
				newFlag = "question";
				this.props.rmFlag();
				break;
			case "question":
				newFlag = false
				break;
			default:
				newFlag = "danger";
				this.props.addFlag();
				break;
			}

			this.setState({flag: newFlag})
		},

		initialize: function () {
			this.executeAndPropigateInstruction(MS.Util.seedBomb(), function() {
				this.setState({bomb: false});
				setTimeout(this.reveal, 80);
			}.bind(this));
		},

		handleClick: function (e) {

			e.preventDefault();
			if (typeof this.state.bomb === "undefined") {
				this.initialize();
				MS.Util.seedBomb(this);
			}else if (this.state.flag){
				this.toggleFlag();
			} else {
				this.reveal();
			}

		},
		handleRightClick: function (e) {
			e.preventDefault();
			this.toggleFlag();
		},

		render: function () {
			var d;
			if (this.state.over && this.state.bomb) {
				d = MS.Constants.BOMB;
			} else if (this.state.over){
				d = this.state.dead
			}else if (this.state.flag){
				d = (this.state.flag === "danger") ? MS.Constants.FLAGGED_DANGER : MS.Constants.FLAGGED_QUESTION;
			} else if (!this.state.display) {
				d = this.state.hidden;
			} else if (this.state.bomb) { 
				d = MS.Constants.BOMB;
			} else if (this.state.bombCount === 0) {
				d = this.state.empty;
			} else { 
				d = this.state.bombCount;
			}


			return (
				<span   onClick={this.handleClick} 
						onContextMenu={this.handleRightClick} 
						className={"tile " + ((typeof d === "number") ? "t-" + String(d) : "" )}
						>{d}</span>
			);
		}

	});


}(this))