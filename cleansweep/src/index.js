import React from 'react';
import ReactDOM from 'react-dom';
import Login from './Login';
import Help from './Help';
import Function from './Function';
import List from './List';
import Options from './Options';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render
ReactDOM.render(<Login />, document.getElementById('root'));
// ReactDOM.render(<Function />, document.getElementById('root'));
// ReactDOM.render(<List />, document.getElementById('root'));
// ReactDOM.render(<Options />, document.getElementById('root'));
// ReactDOM.render(<Help />, document.getElementById('root'));

registerServiceWorker();