import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import rootReducer from './storage'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
const store = createStore(rootReducer)

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <App />
        </Provider>
    </React.Fragment>,
  document.getElementById('root')
);
