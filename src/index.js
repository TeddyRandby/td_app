import React from 'react';
import ReactDOM from 'react-dom';
import './css/styles.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrophy, faUsers, faPlus, faMinus, faCloudUploadAlt, faRedo, faSignOutAlt, faCaretSquareLeft } from '@fortawesome/free-solid-svg-icons'

library.add(faUsers, faTrophy, faPlus, faMinus, faCloudUploadAlt, faRedo, faSignOutAlt, faCaretSquareLeft)
ReactDOM.render(<App />, document.getElementById('root'));

