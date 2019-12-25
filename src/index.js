import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faUsers } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faTrophy)
ReactDOM.render(<App />, document.getElementById('root'));

