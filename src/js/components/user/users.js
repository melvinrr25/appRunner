const el = require('../../el.js');
const User = require('./user.js');
const UserForm = require('./userForm.js');

function Users(props) {
  const users = props.state.users.map((user) => {
    props.params.id = user.id
    return User(props);
  });

  return el("div",
    UserForm(props),
    el("br"),
    el("div",
      ...users)
  );

}

module.exports = Users;