const AppRunner = require('./appRunner.js');
const Users = require('./components/user/users.js');
const User = require('./components/user/user.js');
const Hobbie = require('./components/user/hobbie.js');
const el = require('./el.js');

var app = AppRunner();

const routes = [{
  path: '/users',
  component: Users
}, {
  path: '/users/:id',
  component: User
}, {
  path: '/',
  component: (props) => el('h3', 'Home Page', Hobbie(props), Hobbie(props), Hobbie(props))
}, {
  path: '/about',
  component: (props) => el('h3', 'About Page')
}, {
  path: '/hobbie',
  component: Hobbie
}, {
  path: '/contact',
  component: (props) => el('h3', 'Contact Page')
}, {
  path: '/contact/:id',
  component: (props) => el('h3', 'Contact # ' + props.params.id)
}, ];

routes.forEach((r) => app.registerRoute(r))

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

app.start('root');
