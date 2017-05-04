# TrelloCardAdder

## Demo & Explination

First couple minutes of [https://youtu.be/laqYkUJaJYI](https://youtu.be/laqYkUJaJYI)

## GitHub Repository

[https://github.com/AnthonyAstige/TrelloCardAdder](https://github.com/AnthonyAstige/TrelloCardAdder)

## Glitch project

[https://glitch.com/edit/#!/trellocardadder](https://glitch.com/edit/#!/trellocardadder)

## Glitch Configuration

Video setup instructions starts at 2:18 as linked: [https://youtu.be/laqYkUJaJYI?t=2m18s](https://youtu.be/laqYkUJaJYI?t=2m18s)

Remix this project then add something like this to your `.env` file

```
LISTS="{
    't':{
      'name':'Todo list',
      'key':'YOUR-TRELLO-USER-KEY',
      'token':'YOUR-TRELLO-USER-TOKEN',
      'listId':'YOUR-TRELLO-LIST-ID'
    },
    'u':{
      'name':'Urgent items',
      'key':'YOUR-TRELLO-USER-KEY',
      'token':'YOUR-TRELLO-USER-TOKEN',
      'listId':'YOUR-TRELLO-LIST-ID'
    }
}"

DOMAIN="https://trellocardadder.glitch.me"

ORIGINS="['http://localhost:3001','https://your-static-clone-domain.com']"
```

**LISTS** is an object as follows:

* Main object key like 't' or 'u' are the keys you'll hit on your keyboard
    * name: What to show in the interface, ideally the word(s) contain your key
    * key & token: Values from [https://trello.com/app-key](https://trello.com/app-key)
    * listId: Find by navigating to the list you want to add cards to in Trello, adding `.json` to the end, and searching in the source for `listId`

**DOMAIN** should be set to where your glitch project shows when live

**ORIGINS** is only needed if you want to host your own static copy, an empty array will suffice.

## Known issues

* Only tested in Chrome and using some ES6 features without a transpiler, so probably breaks in other browsers.
* Provides no means of authentication. Anyone with the live project url can quickly add cards to any projects you've configured.