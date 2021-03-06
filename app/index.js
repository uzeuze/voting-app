import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import SignOut from './components/SignOut';
import Poll from './components/Poll';
import NewPoll from './components/NewPoll';
import RequireAuth from './components/RequireAuth';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({ type: AUTH_USER });
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="/dashboard" component={RequireAuth(Dashboard)} />
        <Route path="/signout" component={SignOut} />
        <Route path="/polls/:pollId" component={Poll} />
        <Route path="/new-poll" component={RequireAuth(NewPoll)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
