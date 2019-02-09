const el = require('../../el.js');
const Image = require('../image/image.js');

function User(props) {
  return (params) => {
    const user = props.state.users.find(u => u.id == params.id);
    if (!user) {
      return el('div', 'User not found');
    }

    function removeUserHandler(user) {
      const users = props.state.users;
      const i = users.findIndex(u => u.id == user.id);
      users.splice(i, 1);
      props.setState('users', users);
    };

    const name = el('div', user.name)
      .attrs({
        class: 'name'
      }).css({
        color: 'blue',
        'text-decoration': 'underline',
        cursor: 'pointer',
      }).on('click', () => props.navigate('#/users/' + user.id));

    const age = el('div', user.age).attrs({
      class: 'age'
    });
    const image = Image(props)()
      .attr('src', user.url)
      .css('width', '100px')
      .on('click', () => removeUserHandler(user));

    return el('.User', name, age, image).css({
      'height': '200px'
    });
  }
}

module.exports = User;