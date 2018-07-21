const Search = require('./lib/index');
const os = require('os');

var name = '.git';

const search = new Search(require('path').join(os.homedir()), name);
search.on('result', (data) => {
  console.log(data);
});

try {
  search.list();
} catch(error) {
  console.log(error);
}
