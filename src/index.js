import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore , applyMiddleware , compose , combineReducers } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import burgerBuilderReducer from './store/reducer/burgerBuilder'
import orderReducer from './store/reducer/order'
import authReducer from './store/reducer/auth'

const reducer = combineReducers({
    burgerBuilder : burgerBuilderReducer,
    order : orderReducer,
    auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer , composeEnhancers( applyMiddleware(thunk)));


const app = (
  <Provider store = { store }>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
