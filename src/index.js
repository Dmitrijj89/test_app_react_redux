import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './containers/App';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducers from './store/reducers/rootReducer';
import thunk from 'redux-thunk';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore( rootReducers,
                           composeEnhancers(
                           	 applyMiddleware(thunk)
                           	 ) );

const app = (

	<Provider store={store}>
        <BrowserRouter>

           <App />

       </BrowserRouter>
	</Provider>
	);

ReactDOM.render(app, document.getElementById('root'));

