import './App.css';
import React from "react";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";
import createReducer from "./store/reducers";
import Routes from "./routes";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(createReducer(), composeEnhancers(applyMiddleware(thunk)));

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if ( store.asyncReducers[key] )
  {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
}


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
