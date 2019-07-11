import {
  createNavigationReducer,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { fetchMiddleware, configureMergeState } from 'redux-recompose';
import thunk from 'redux-thunk';
import Navigator from '@app/screens';
import reactotron from '@config/ReactotronConfig';

const nav = createNavigationReducer(Navigator);

configureMergeState((state, newContent) => state.merge(newContent));

const reducers = {
  nav
};

const appReducer = combineReducers(reducers);

const rootReducer = (state, action) => appReducer(state, action);

const middlewares = [];
const enhancers = [];

/* ------------- React Navigation Middleware ------------- */
middlewares.push(createReactNavigationReduxMiddleware(state => state.nav));

/* ------------- Thunk Middleware ------------- */
middlewares.push(thunk);

/* ------------- Redux-Recompose Middleware ------------- */
middlewares.push(fetchMiddleware);

/* ------------- Assemble Middleware ------------- */
enhancers.push(applyMiddleware(...middlewares));

enhancers.push(reactotron.createEnhancer());

// in dev mode, we'll create the store through Reactotron
const createAppropriateStore = createStore;
const store = createAppropriateStore(rootReducer, compose(...enhancers));

export default store;
