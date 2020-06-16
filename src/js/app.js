const AppRunner = require('./appRunner.js');
const el = require('./el.js');
const Users = require('./components/user/users.js');
const User = require('./components/user/user.js');
const Hobbie = require('./components/user/hobbie.js');
const Menu = require('./components/menu.js');

var app = new AppRunner();

const routes = [{
  path: '/users',
  component: Users
}, {
  path: '/users/:id',
  component: User
}, {
  path: '/',
  component: (props) => el('div', Menu(props), el('h3', 'Home Page'))
}, {
  path: '/about',
  component: (props) => el('div', Menu(props), el('h3', 'About Page'))
}, {
  path: '/hobbie',
  component: Hobbie
}, {
  path: '/contact',
  component: (props) => el('div', Menu(props), el('h3', 'Contact Page'))
}, {
  path: '/contact/:id',
  component: (props) => el('h3', 'Contact # ' + props.params.id)
}, ];

app.setInitialState({
  users: [{
    id: 1,
    name: 'Test Number 1',
    age: 23,
    url: 'https://goo.gl/wGbPg2'
  }, {
    id: 2,
    name: 'Juan Perez',
    age: 25,
    url: 'https://goo.gl/QBvx8V'
  }, {
    id: 3,
    name: 'Melvin Rodriguez',
    age: 27,
    url: 'https://goo.gl/TcvADS'
  }]
});

app.registerRoutes(routes)
app.start('root');
