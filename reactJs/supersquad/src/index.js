import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';
import { addCharacterByID } from './actions';

const store = createStore(rootReducer);

console.log('store.getState()', store.getState());

store.subscribe(() => console.log('store', store.getState()));
store.dispatch(addCharacterByID(2));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));
