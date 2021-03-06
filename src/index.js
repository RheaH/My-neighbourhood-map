import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
