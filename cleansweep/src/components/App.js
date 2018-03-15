import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Help from '../pages/Help';
import Login from '../pages/Login';
import {SignUp} from '../pages/SignUp';
import NewRoom from '../pages/NewRoom';
import AddWakeUp from '../pages/WakeUpCall';
import ChangeRole from '../pages/ChangeRole';
import AssignRooms from '../pages/AssignRooms';
import InspectRoom from '../pages/InspectRoom';
import NewEmployee from '../pages/NewEmployee';
import AddIncident from '../pages/AddIncident';
import CheckInGuest from '../pages/CheckInGuest';
import CheckOutGuest from '../pages/CheckOutGuest';
import ChangePassword from '../pages/PasswordChange';
import PasswordForgetPage from '../pages/PasswordForget';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/custom.css';
import * as routes from '../constants/routes';
import NavigationBar from "./NavigationBar";

import withAuthentication from './withAuthentication';
function App() {
    return (
        <Router>
            <div>
                <NavigationBar />
                {/*Landing Path*/}
                <Route exact path={routes.LANDING} component={Login}/>

                {/*Access Paths*/}
                <Route path={routes.LOGIN} component={Login}/>
                <Route path={routes.PW_FORGET} component={PasswordForgetPage} />
                <Route path={routes.SIGN_UP} component={SignUp}/>

                {/*File Paths*/}
                <Route path={routes.NEW_EMPLOYEE} component={NewEmployee}/>
                <Route path={routes.NEW_ROOM} component={NewRoom}/>

                {/*Function Paths*/}
                <Route path={routes.WAKE_UP_CALL} component={AddWakeUp}/>
                <Route path={routes.ADD_INCIDENT} component={AddIncident}/>
                <Route path={routes.ASSIGN_ROOMS} component={AssignRooms}/>
                <Route path={routes.INSPECT_ROOM} component={InspectRoom}/>
                <Route path={routes.CHECK_IN_GUEST} component={CheckInGuest}/>
                <Route path={routes.CHECK_OUT_GUEST} component={CheckOutGuest}/>

                {/*List Paths*/}
                {/*<Route path={routes.ALL_ROOMS} component={}/>*/}
                {/*<Route path={routes.ASSIGNED_ROOMS} component={AssignedRooms} />*/}
                {/*<Route path={routes.AVAILABLE_ROOMS} component={AvailableRooms} />*/}
                {/*<Route path={routes.INSPECTIONS} component={Inspections} />*/}
                {/*<Route path={routes.INCIDENTS} component={Incidents} />*/}
                {/*<Route path={routes.WAKE_UP_LIST} component={WakeUpList} />*/}
                {/*<Route path={routes.DEPARTING_GUESTS} component={DepartingCustomers} />*/}

                {/*Options Paths*/}
                <Route path={routes.CHANGE_PW} component={ChangePassword}/>

                {/*Help Path*/}
                <Route path={routes.HELP} component={Help}/>
                <Route path={routes.CHANGE_ROLE} component={ChangeRole}/>
            </div>
        </Router>
    );
}

export default withAuthentication(App);
export { App };