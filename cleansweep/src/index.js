import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import NewEmployee from './NewEmployee';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
        <div>
            <Route exact path="/" component={App} />
            <Route path="/newEmployee" component={NewEmployee} />
        </div>
    </Router>,
    document.getElementById('root')
)
registerServiceWorker();