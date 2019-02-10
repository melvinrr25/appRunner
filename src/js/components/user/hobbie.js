const el = require('../../el.js');

async function Hobbie(props) {
  var response = await fetch('https://jsonplaceholder.typicode.com/users');
  var data = await response.json();
  var title = el("h3", "This is an awesome framework!").css({ color: '#D25D5D'});
  var users = data.map((user, idx) => el("div", user.email));
  return el("div", title, ...users);
}

module.exports = Hobbie;