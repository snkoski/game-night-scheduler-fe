import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Application from './Application';

ReactDOM.render(

<Router>
  <Application />
</Router>, document.getElementById('root'));
registerServiceWorker();
