import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Help from '../pages/Help'
import Login from '../account/Login';
import {SignUp} from '../account/SignUp';
import NewRoom from '../file/NewRoom';
import ReservableRoom from '../pages/ReservableRoom';
import NonReservableRoom from '../pages/NonReservableRoom';
import AddWakeUp from '../functions/WakeUpCall';
import ChangeRole from '../options/ChangeRole';
import AssignRooms from '../functions/AssignRooms';
import InspectRoom from '../functions/InspectRoom';
import NewEmployee from '../file/NewEmployee';
import AddIncident from '../functions/AddIncident';
import CheckInOut from '../functions/CheckInOut';
import ChangePassword from '../options/PasswordChange';
import PasswordForgetPage from '../account/PasswordForget';
import AllRooms from '../lists/AllRooms';
import AssignedRooms from '../lists/AssignedRooms';
import AvailableRooms from '../lists/AvailableRooms';
import Inspections from '../lists/InspectList';
import Incidents from '../lists/IncidentList';
import WakeUpList from '../lists/WakeUpList';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/custom.css';
import * as routes from '../constants/routes';
import NavigationBar from "./NavigationBar";

import withAuthentication, {RoleBasedAuthorization} from '../auth/withAuthentication';
function App() {

    const Manager = RoleBasedAuthorization(['admin']);
    const Employee = RoleBasedAuthorization(['admin', 'employee']);
    const User = RoleBasedAuthorization(['admin', 'employee', 'guest']);

    return (
        <Router>
            <div>
                <NavigationBar />
                {/*Landing Path*/}
                <Route exact path={routes.LANDING} component={User(Login)}/>

                {/*Generic Room Path*/}
                <Route path={routes.ROUTER_RESERVABLE_ROOM} component={Employee(ReservableRoom)}/>
                <Route path={routes.ROUTER_NON_RESERVABLE_ROOM} component={Employee(NonReservableRoom)}/>

                {/*Access Paths*/}
                <Route path={routes.LOGIN} component={User(Login)}/>
                <Route path={routes.PW_FORGET} component={User(PasswordForgetPage)} />
                <Route path={routes.SIGN_UP} component={User(SignUp)}/>

                {/*File Paths*/}
                <Route path={routes.NEW_EMPLOYEE} component={Manager(NewEmployee)}/>
                <Route path={routes.NEW_ROOM} component={Manager(NewRoom)}/>

                {/*Function Paths*/}
                <Route path={routes.WAKE_UP_CALL} component={Manager(AddWakeUp)}/>
                <Route path={routes.ADD_INCIDENT} component={Employee(AddIncident)}/>
                <Route path={routes.ASSIGN_ROOMS} component={Manager(AssignRooms)}/>
                <Route path={routes.INSPECT_ROOM} component={Manager(InspectRoom)}/>
                <Route path={routes.CHECK_IN_OUT} component={Manager(CheckInOut)}/>

                {/*List Paths*/}
                <Route path={routes.ALL_ROOMS} component={Employee(AllRooms)}/>
                <Route path={routes.ASSIGNED_ROOMS} component={Employee(AssignedRooms)} />
                <Route path={routes.AVAILABLE_ROOMS} component={Manager(AvailableRooms)} />
                <Route path={routes.INSPECTIONS} component={Manager(Inspections)} />
                <Route path={routes.INCIDENTS} component={Employee(Incidents)} />
                <Route path={routes.WAKE_UP_LIST} component={Manager(WakeUpList)} />

                {/*Options Paths*/}
                <Route path={routes.CHANGE_PW} component={Employee(ChangePassword)}/>
                <Route path={routes.CHANGE_ROLE} component={Manager(ChangeRole)}/>

                {/*Help Path*/}
                <Route path={routes.HELP} component={User(Help)}/>
            </div>
        </Router>
    );
}

export default withAuthentication(App);
export { App };