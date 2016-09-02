# card-dealer
Card dealer service for technical interviews


## Setup
To start just run:
```js
npm install
npm start
```

It listen to requests on port 8080, and it might be changed by using an environment variable,
for example to set it to port `3000`:
```js
NODE_CONFIG='{"hapi":{"connection":{"port":3000}}' npm start
```
## Service methods
The service exposes two public methods:
### POST /deck
Calling this method shuffles a new deck (52 cards). It returns a 36 character token. Decks expire
after 5 minutes without being used, so you should handle that possibility.

### GET /deck/`{TOKEN}`/deal/`{AMOUNT}`
This deals an `{AMOUNT}` of cards for the specified deck `{TOKEN}`. The result is a JSON array containing
objects with “number” and “suit” properties. 
- “number” is a string that can be one of: A, 2, 3, 4, 5, 6, 7, 8, 9, 10, J, Q, K. 
- “suit” is also a string and can be either hearts, diamonds, clubs or spades.

If there aren’t enough cards to deal the amount requested, it will throw a 405 http error.  
If the deck isn’t found (doesn’t exist, or expired) it will throw a 404 http error.

