import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewEmployee from './NewEmployee';
import NewRoom from './NewRoom';
import SignUp from './SignUp';
import Login from './Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
        <div>
            <Route exact path={"/"} component={App} />
            <Route path={"/Login"} component={Login} />
            <Route path={"/SignUp"} component={SignUp} />
            <Route path={"/NewEmployee"} component={NewEmployee} />
            <Route path={"/NewRoom"} component={NewRoom} />
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();