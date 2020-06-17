const AppRunner = require('./appRunner.js');
const el = require('./el.js');
const login = require('./components/login/login.js');
const home = require('./components/home/home.js');
//const Users = require('./components/user/users.js');
//const User = require('./components/user/user.js');
//const Hobbie = require('./components/user/hobbie.js');
//const Menu = require('./components/menu.js');

var app = new AppRunner();

const routes = [{
  path: '/login',
  component: login
}, {
  path: '/',
  component: home,
  auth: true
}, {
  path: '/contact',
  component: (props) => el('h3', 'Contact Page'),
  auth: true
}, ];

//app.setInitialState({});

app.registerRoutes(routes)

app.authorization({
  middleware: function(state){
    return sessionStorage.getItem('token') == '123'
  },
  redirectTo: '/login',
})

app.start('root');
