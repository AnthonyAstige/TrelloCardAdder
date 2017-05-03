# TrelloCardAdder

## GitHub Repository

https://github.com/AnthonyAstige/TrelloCardAdder

## Glitch Configuration

Add something like this to your `.env` file

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
    },

}"

DOMAIN="https://trellocardadder.glitch.me"

ORIGINS="['http://localhost:3001','https://your-static-clone-domain.com']"
```

## Known issues

* Only tested in Chrome and using some ES6 features without a transpiler, so probably breaks in other browsers.
* Provides no means of authentication. Anyone with the live project url can quickly add cards to any projects you've configured.