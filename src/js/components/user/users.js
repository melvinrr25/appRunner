const el = require('../../el.js');
const User = require('./user.js');
const UserForm = require('./userForm.js');
const Menu = require('../../components/menu.js');

function Users(props) {
  const users = props.state.users.map((user) => {
    props.params.id = user.id
    return User(props);
  });

  return el("div",
    Menu(props),
    UserForm(props),
    el("br"),
    el("div",
      ...users)
  );

}

module.exports = Users;
