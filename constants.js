(function (root) {
	"use strict";
	var MS = root.MS = root.MS || {};

	MS.Constants = {
		HIDDEN_ICONS: ["🌁","🗻","🌋","⛺","🌄","🌇","🌃","🌌"],
		REVEALED_COUNT_ICONS: ["0","1","2️", "3️","4️","5️","6️","7️","8️"],
		BOMB: "💣",
		FLAGGED_DANGER: "❎",
		FLAGGED_QUESTION: "❓",
		EXPLODED_BOMB: "☠",
		REVEALED_EMPTY_ICONS: ["😀","😉","😇","😊","😍","😎","😜","😺"],
		DEAD_ICONS: ["🙁","😣","😫","😵","🙀","🤕"],
		LIFE_ICONS: ["🍄", "🌷", "🌺","🌲","🌿","🌱","🌻","🐿","🐥","🐘"],

		N: [-1, 0],
		E: [0, 1],
		S: [1, 0],
		W: [0, -1],
		NE: [-1, 1],
		NW: [-1, -1],
		SE: [1, 1],
		SW: [1, -1]

	}


}(this))