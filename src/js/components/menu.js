const el = require('../el.js');

function Menu(props){ 
  return el('div.navigation', 
    el('a', 'Home').attrs({href: '#/'}),
    el('a', 'Users').attrs({href: '#/users'}),
    el('a', 'About').attrs({href: '#/about'}),
    el('a', 'Hobbie').attrs({href: '#/hobbie'}),
    el('a', 'Contacts').attrs({href: '#/contact'}),
  )
}


module.exports = Menu
