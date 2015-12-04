#Readme:

###Live Version: http://andjd.github.io/mines.js

*Note: Chrome for Windows does not display emoji natively—If the game is not displaying for you, try another browser.*

emojiSweeper is a clone of the classic minesweeper built in JavaScript and React. 

It uses a nifty cascading peer-to-peer paradigm to propigate instructions, allowing for a non-hirearchical code-structure and cool visual effects.  

The board isn't set until the first click, ensuring that players don't fail on the first click.

Controls: click to reveal a tile, right-click to flag a tile as a bomb or unknown.  Flagged tiles can be changed with either right ot left clicks.

###Known Issues:
- [ ] pressing new game multiple times quickly can result in an infinate reset loop.  Solution: disable new game button while reset occurs.
- [ ] game sometimes reports false-positive victories. Solution: refactor winning function to be more robust.

### Features to implement:
- [ ] more awesome animated transitions
- [ ] remaining bomb count
- [ ] additional modes (candlelight, speed)
- [ ] re-sizable board and difficulty setting

