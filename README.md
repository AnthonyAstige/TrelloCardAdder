# TrelloCardAdder

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

ORIGINS="['http://localhost:3001','https://your-static-clone-domain.com']"
```