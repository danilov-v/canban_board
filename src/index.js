import React from 'react';
import { whyDidYouUpdate } from 'why-did-you-update';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { enableBatching } from 'redux-batched-actions';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSageMiddleware from 'redux-saga';
import { page, projects, tasks } from './reducers';
import analytics from './middleware/analytics';
import registerServiceWorker from './registerServiceWorker';
import rootSaga from './sagas';
import App from './App';
import './index.css';

const rootReducer = (state = {}, action) => {
  return {
    page: page(state.page, action),
    projects: projects(state.projects, action),
    tasks: tasks(state.tasks, action),
  };
};

const sagaMiddleware = createSageMiddleware();

const store = createStore(
  enableBatching(rootReducer),
  composeWithDevTools(applyMiddleware(analytics, thunk, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <Provider store={store}>
        <NextApp />
      </Provider>,
      document.getElementById('root'),
    );
  });

  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

// whyDidYouUpdate(React);

registerServiceWorker();
