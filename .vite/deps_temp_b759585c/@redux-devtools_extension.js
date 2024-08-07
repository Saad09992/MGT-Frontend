import {
  compose
} from "./chunk-LB5QCOLJ.js";
import "./chunk-ZS7NZCD4.js";

// node_modules/@redux-devtools/extension/lib/esm/developmentOnly.js
function extensionComposeStub() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0)
    return void 0;
  if (typeof funcs[0] === "object")
    return compose;
  return compose(...funcs);
}
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : extensionComposeStub;
var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
  return function(noop) {
    return noop;
  };
};

// node_modules/@redux-devtools/extension/lib/esm/utils/assign.js
var objectKeys = Object.keys || function(obj) {
  const keys = [];
  for (const key in obj) {
    if ({}.hasOwnProperty.call(obj, key))
      keys.push(key);
  }
  return keys;
};
function assign(obj, newKey, newValue) {
  const keys = objectKeys(obj);
  const copy = {};
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i];
    copy[key] = obj[key];
  }
  copy[newKey] = newValue;
  return copy;
}

// node_modules/@redux-devtools/extension/lib/esm/logOnly.js
function enhancer(options) {
  const config = options || {};
  config.features = {
    pause: true,
    export: true,
    test: true
  };
  config.type = "redux";
  if (config.autoPause === void 0)
    config.autoPause = true;
  if (config.latency === void 0)
    config.latency = 500;
  return function(createStore) {
    return function(reducer, preloadedState) {
      const store = createStore(reducer, preloadedState);
      const origDispatch = store.dispatch;
      const devTools = window.__REDUX_DEVTOOLS_EXTENSION__.connect(config);
      devTools.init(store.getState());
      const dispatch = function(action) {
        const r = origDispatch(action);
        devTools.send(action, store.getState());
        return r;
      };
      if (Object.assign)
        return Object.assign(store, {
          dispatch
        });
      return assign(store, "dispatch", dispatch);
    };
  };
}
function composeWithEnhancer(config) {
  return function() {
    return compose(compose(...arguments), enhancer(config));
  };
}
function composeWithDevTools2() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__) {
    if (funcs.length === 0)
      return enhancer();
    if (typeof funcs[0] === "object")
      return composeWithEnhancer(funcs[0]);
    return composeWithEnhancer()(...funcs);
  }
  if (funcs.length === 0)
    return void 0;
  if (typeof funcs[0] === "object")
    return compose;
  return compose(...funcs);
}
var devToolsEnhancer2 = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? enhancer : function() {
  return function(noop) {
    return noop;
  };
};

// node_modules/@redux-devtools/extension/lib/esm/logOnlyInProduction.js
function extensionComposeStub2() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0)
    return void 0;
  if (typeof funcs[0] === "object")
    return compose;
  return compose(...funcs);
}
var composeWithDevTools3 = false ? composeWithDevTools2 : typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : extensionComposeStub2;
var devToolsEnhancer3 = false ? devToolsEnhancer2 : typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
  return function(noop) {
    return noop;
  };
};

// node_modules/@redux-devtools/extension/lib/esm/index.js
function extensionComposeStub3() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0)
    return void 0;
  if (typeof funcs[0] === "object")
    return compose;
  return compose(...funcs);
}
var composeWithDevTools4 = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : extensionComposeStub3;
var devToolsEnhancer4 = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
  return function(noop) {
    return noop;
  };
};
export {
  composeWithDevTools4 as composeWithDevTools,
  composeWithDevTools as composeWithDevToolsDevelopmentOnly,
  composeWithDevTools2 as composeWithDevToolsLogOnly,
  composeWithDevTools3 as composeWithDevToolsLogOnlyInProduction,
  devToolsEnhancer4 as devToolsEnhancer,
  devToolsEnhancer as devToolsEnhancerDevelopmentOnly,
  devToolsEnhancer2 as devToolsEnhancerLogOnly,
  devToolsEnhancer3 as devToolsEnhancerLogOnlyInProduction
};
//# sourceMappingURL=@redux-devtools_extension.js.map
