import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Help from '../pages/Help'
import Doc from '../pages/Doc';
import AboutUs from '../pages/AboutUs';
import Home from '../pages/Home';


import 'bootstrap/dist/css/bootstrap.css';
import '../css/custom.css';
import * as routes from '../constants/routes';
import NavigationBar from "./NavigationBar";

function App() {

    return (
        <Router>
            <div>
                <NavigationBar />
                {/*Help Path*/}
                <Route path={routes.HOME} component={Home}/>
                {/*Help Path*/}
                <Route path={routes.ABOUT} component={AboutUs}/>
                {/*Help Path*/}
                <Route path={routes.DOC} component={Doc}/>
                {/*Help Path*/}
                <Route path={routes.HELP} component={Help}/>
            </div>
        </Router>
    );
}

export default (App);