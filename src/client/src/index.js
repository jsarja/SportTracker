import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';
import { loadState, saveState } from './utils/persistData';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducers,
	loadState(),
	composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState(store.getState());
}); 

ReactDOM.render(
	<Provider store={store}>
		<App/>
	</Provider>,
	document.querySelector('#root')
);