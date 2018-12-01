(function() {
  var app = new AppRunner();

  const routes = [{
    path: '/users',
    component: Users
  }, {
    path: '/users/:id',
    component: User
  }, {
    path: '/',
    component: (props) => () => el('h3', 'Home Page', Hobbie(props)(), Hobbie(props)(), Hobbie(props)())
  }, {
    path: '/about',
    component: (props) => () => el('h3', 'About Page')
  }, {
    path: '/hobbie',
    component: Hobbie
  }, {
    path: '/contact',
    component: (props) => () => el('h3', 'Contact Page')
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
})();