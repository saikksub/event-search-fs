# Event based search in file system 
Event based Search for files and directories in file system.

#### Development
```
git clone https://github.com/saikksub/event-search-fs.git
cd event-search-fs
npm install
node test.js
```

#### Install
```
npm install --save event-search-fs
```

```
const Search = require('event-search-fs');
const search = new Search('/Users', '.git');

search.on('result', (data) => {
  console.log(data);
});

search.list();
```

# License
[MIT](https://github.com/electron/electron/blob/master/LICENSE)

# contact
[hello@xplorebits.com](hello@xplorebits.com)