// server.js - where the node app starts

// init project
var express = require('express');
var _ = require('lodash');
var app = express();
const fs = require('fs');

const LISTS = _.mapValues(
  // Read from file
  JSON.parse(process.env.LISTS.replace(/'/g, '"')),
  // Add array key as keyboardShortcut to each list config object
  (val, key) => {
    val.keyboardShortcut = key;
    return val;
  });
const ORIGINS = process.env.ORIGINS && JSON.parse(process.env.ORIGINS.replace(/'/g, '"'));

const Trello = require("trello");

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.setHeader('content-type', 'text/html');
  fs.readFile('views/index.html', 'utf8', (err, content) => {
    // Stupid simple templating
    const postToHtml = _.reduce(LISTS, (acc, curr) => {
      const name = curr.name.replace(new RegExp(curr.keyboardShortcut, 'i'), `[${curr.keyboardShortcut.toUpperCase()}]`);
      return `${acc}<h2 id="${curr.keyboardShortcut}" class="pick">${name}</h2>\n`;
    }, '');
    content = content.replace('{{POSTTO}}', postToHtml);
    response.send(content);
  });
});

app.get("/CONFIG.js", (request, response) => {
  response.setHeader('content-type', 'text/javascript');
  allowOtherOrigins(request, response);
  const config = {
    domain: process.env.DOMAIN,
    LISTS: _.map(LISTS, (item, keyboardShortcut) => {
      return {
        keyboardShortcut: keyboardShortcut,
        listId: item.listId,
        name: item.name
      }
    })
  }
  response.send(`var CONFIG = ${JSON.stringify(config)};`);
})

function allowOtherOrigins(request, response) {
  // Only send single requested origin - http://stackoverflow.com/a/1850482
  const origin = request.get('origin');
  if(ORIGINS && _.includes(ORIGINS, origin)) {
    response.header("Access-Control-Allow-Origin", origin); 
  }
}

app.get("/cards", function (request, response) {
  allowOtherOrigins(request, response)
  response.send(cards);
});

app.post("/addCard", function (request, response) {
  allowOtherOrigins(request, response)

  // Config Trello
  const list = request.query.list;
  const trello = new Trello(LISTS[list].key, LISTS[list].token);
  
  // Grab card info
  var title = request.query.title;
  var description = request.query.description;
  var listId = LISTS[list].listId;

  trello.addCard(title, description, listId, (error, trelloCard) => {
    if (error) {
      console.log('Could not add card:', error);
      response.sendStatus(500);
    } else {
      // Save the card for display in app
      trelloCard.boardName = LISTS[list].name;
      cards.unshift(trelloCard);
      // Only save 3 cards
      if(cards.length > 3) {
        cards.pop();
      }

      // Let client know all good
      response.sendStatus(200);
    }
  });
});

// Simple in-memory store
var cards = [];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});