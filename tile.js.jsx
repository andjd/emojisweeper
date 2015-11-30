(function (root) {
	"use strict";
	var MS = root.MS = root.MS || {};

	MS.Tile = React.createClass({
		getInitialState: function () {
			var  hidden = MS.Constants.HIDDEN_ICONS[Math.floor(Math.random() * MS.Constants.HIDDEN_ICONS.length)];
			var empty;

			return({bomb: false, 
				bombCount: 0,
				flag: false, 
				display: false,
				instruction: false,
				executed: {}
			})
		},

		componentWillReceiveProps: function (newProps) {
			if (newProps.instruction !== this.props.instruction &&
				!this.state.executed[newProps.instruction.id]){
				debugger
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
			if (typeof tail ==="undefined" || tail === null || tail > 0) {
				var newTail = null;
				if (tail) {newTail = tail - 1};
			setTimeout(this.props.propigate(instruction.dirsFn(this), $.extend({}, instruction, {tail: newTail} )), instruction.timeout);
			}
		},

		reveal: function () {
			this.executeAndPropigateInstruction(MS.Util.revealTile());
		},

		toggleFlag: function () {
			var newFlag ;
			switch (this.state.flagged) {
			case "danger":
				newFlag = "question";
				break;
			case "question":
				newFlag = false
				break;
			default:
				newFlag = "danger";
				break;
			}

			this.setState({flag: newFlag})
		},

		handleClick: function (e) {
			e.preventDefault()
			if (e.button) {
				this.toggleFlag();
			} else {
				this.reveal();
			}

		},

		render: function () {
			var d;
			if (this.state.flag){
				d = (this.state.flag === "danger") ? MS.Constants.FLAGGED_DANGER : MS.Constants.FLAGGED_QUESTION;
			} else if (!this.state.display) {
				d = MS.Constants.HIDDEN_ICONS[Math.floor(Math.random() * MS.Constants.HIDDEN_ICONS.length)];
			} else { d = "0"}


			return (
				<span onClick={this.handleClick} className="tile">{d}</span>
			);
		}

	});


}(this))