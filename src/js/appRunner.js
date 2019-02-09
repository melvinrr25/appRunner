function AppRunner() {
  let root = null;
  let state = {};
  let appRoutes = {};
  let props = {};

  function setState(prop, val) {
    state[prop] = val;
    navigate(window.location.hash);
  }

  function navigate(url) {
    history.pushState({}, null, url);
    const app = document.getElementById(root);
    let component = null;
    let routeChecker = router().getRouteData;
    let path = url.split('').splice(1).join(''); // Remove #
    path = path === '/' ? '' : path;
    const route = routeChecker('GET', path, appRoutes);
    if (route.isMatching) {
      component = route.handlers[0];
      let params = route.params;
      app.innerHTML = null;
      props.state = state;
      props.navigate = navigate;
      props.setState = setState;
      let handler = component(props)(params)
      if (isPromise(handler)) {
        handler.then((result) => {
          app.appendChild(result)
        })
      } else {
        app.appendChild(handler)
      }
    } else {
      app.innerHTML = '404 - PAGE NOT FOUND';
    }

  }

  function setInitialState(initialState) {
    state = Object.assign(initialState, state)
  }

  function registerRoute(routeObj) {
    let route = buildRoute(routeObj.path, routeObj.component);
    appRoutes = Object.assign(appRoutes, route);
  }

  function start(id) {
    root = id;
    window.onload = function() {
      navigate(window.location.hash);
    };

    window.addEventListener('hashchange', function() {
      navigate(window.location.hash);
    });
  }

  function buildRoute(path, ...args) {
    if (path[0] === '/') {
      path = path.substring(1, path.length);
    }
    const route = {};
    route['GET|' + path] = args;
    return route
  }

  function router() {
    function getSplitUrl(url) {
      return url.split('/');
    }

    function getSplitRoutes(routes) {
      let eachRoute = r => {
        if (r[0] === '/') {
          return r.substring(1, r.length).split('/');
        }
        return r.split('/');
      };
      return routes.map(eachRoute);
    }

    function prepareUrl(url) {
      if (url[0] === '/') {
        url = url.substring(1, url.length);
      }

      let idx = url.indexOf('?');

      if (idx >= 0) {
        url = url.substring(0, idx);
      }

      return url;
    }

    function byThoseMatchingLenght(splitUrl) {
      return r => r.length === splitUrl.length;
    }

    function byRouteElementMatching(splitUrl) {
      return (routePart, i) => {
        if (routePart === splitUrl[i] || routePart.indexOf(':') >= 0) {
          return true;
        }
        return false;
      }
    }

    function uniqRoute(splitUrl, method, userRoutes) {
      return route => {
        let results = route.map(byRouteElementMatching(splitUrl));
        let key = method + '|' + route.join('/');
        let any = userRoutes[key];

        if (results.indexOf(false) === -1 && any) {
          return route;
        }
      }
    }

    function uniqRoutesList(array) {
      return array.filter((value, index, self) => self.indexOf(value) === index);
    }

    function mapParams(splitUrl, route) {
      let params = {};
      route.forEach((routeEntry, i) => {
        if (routeEntry.indexOf(':') >= 0) {
          params[routeEntry.substring(1, routeEntry.length)] = splitUrl[i]
        }
      });
      return params;
    }

    function separateMethodFromRoutes(routes) {
      return Object.keys(routes).map(key => {
        let idx = key.indexOf('|');
        return key.substring(idx + 1, key.length);
      });
    }

    function buildRouteData(method, route, userRoutes, splitUrl) {
      if (!route) {
        return {
          isMatching: false,
          route: null,
          params: {},
          handlers: []
        }
      }

      let originalRoute = route.join('/');
      let routeKey = method + '|' + originalRoute;
      let handlers = userRoutes[routeKey];

      return {
        isMatching: true,
        route: originalRoute,
        params: mapParams(splitUrl, route),
        handlers: handlers,
      }
    }

    function getRouteData(method, requestPath, userRoutes) {
      let routes = separateMethodFromRoutes(userRoutes);
      let splitRoutes = getSplitRoutes(uniqRoutesList(routes));
      let url = prepareUrl(requestPath);
      let splitUrl = getSplitUrl(url);
      let route = splitRoutes
        .filter(byThoseMatchingLenght(splitUrl))
        .find(uniqRoute(splitUrl, method, userRoutes));
      return buildRouteData(method, route, userRoutes, splitUrl);
    }

    return {
      getRouteData: getRouteData
    }
  }

  return {
    registerRoute: registerRoute,
    setInitialState: setInitialState,
    start: start
  }
}

function isPromise(x) {
  return x.constructor.name.toLowerCase() === 'promise'
}

Node.prototype.attrs = function(attrs) {
  for (const key in attrs) {
    this.setAttribute(key, attrs[key]);
  }
  return this;
};

Node.prototype.props = function(props) {
  this.props = {};
  for (const key in props) {
    this.props[key] = props[key];
  }
  return this;
};

Node.prototype.on = function(eventName, handler) {
  this.addEventListener(eventName, e => {
    return handler(e)
  });
  return this;
};

function handleObject(obj, p, v) {
  if (Object.prototype.toString.call(p) === '[object Object]' && !v) {
    for (const key in p) {
      obj.style[key] = p[key];
    }
  } else {
    obj.style[p] = v;
  }
}

function cssHandler(p, v) {
  if (this instanceof NodeList) {
    this.forEach(function each(node) {
      handleObject(node, p, v);
    });
  } else if (this instanceof Node) {
    handleObject(this, p, v);
  }
  return this;
}

function attrHandler(a, v) {
  if (this instanceof NodeList) {
    this.forEach(function each(node) {
      node.setAttribute(a, v);
    });
  } else if (this instanceof Node) {
    this.setAttribute(a, v);
  }
  return this;
}

function dataHandler(key, val) {
  if (this instanceof NodeList) {
    if (!val) {
      let data = [];
      this.forEach(function(node) {
        data.push(node.dataNode);
      });
      return data;
    }
    this.forEach(function each(node) {
      node.dataNode = node.dataNode || {};
      node.dataNode[key] = val;
    });
  } else if (this instanceof Node) {
    if (!val) {
      return this.dataNode;
    }
    this.dataNode = this.dataNode || {};
    this.dataNode[key] = val;
  }
  return this;
}

function eventHandler(event, handler) {
  if (this instanceof NodeList) {
    this.forEach(function each(node) {
      node.addEventListener(event, handler, false);
    });
  } else if (this instanceof Node) {
    this.addEventListener(event, handler, false);
  }
  return this;
}

Node.prototype.css = cssHandler;
Node.prototype.attr = attrHandler;
Node.prototype.data = dataHandler;
Node.prototype.on = eventHandler;

NodeList.prototype.css = cssHandler;
NodeList.prototype.attr = attrHandler;
NodeList.prototype.data = dataHandler;
NodeList.prototype.on = eventHandler;


module.exports = AppRunner;