import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.scss';

import store from './store';
import { getToDoList } from './store/slices/toDoList/reducers';

import Main from './components/main/main';

store.dispatch(getToDoList());

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('root'),
);
