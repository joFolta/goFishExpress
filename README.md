# 🎣 Full-Stack Matching Game: Go Fish 🎣

![Preview](/public/images/preview.png)

- Full-stack Web App using **Passport.js**, **Express.js**, **Node.js**, and **MongoDB**
- Some dependencies used: *EJS*, *Body-Parser*  
- **CRUD** functionality: Create ("post"), Read ("get"), Update ("put"), and Delete ("delete")

### Goal:

- Make a 10 card memory game - users are able to select two cards and check if they are a match. If they are a match, they stay flipped. If not, they flip back over. Game is done when all cards are matched and flipped over. Example in references.

### Approach:

- *"Selected"* CSS class for clicked on cards (with **guard clause** to shortcircuit double clicks on same card to prevent counter from increasing)
- Click counter to determine if 2 cards are selected, then...
- CheckMatch function
- If matching, add *"Matched"* class, and set onclick to **null** (prevents further onclicks)
- Use **setTimeout(function(){}, time)** to hide non-matching cards (timed to flip before user clicks third card, while enough time to memorize revealed image)
- **Fisher–Yates/Knuth Shuffle** to randomize cards

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. Open terminal
2. Change directory to 21-savage-demo folder
2. Run `node server.js`
3. In Browser, navigate to `localhost:5000`


### References:

- http://dkmgames.com/memory/pairsrun.php (example game)
- https://www.npmjs.com/package/knuth-shuffle
