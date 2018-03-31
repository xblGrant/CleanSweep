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
import CheckInGuest from '../functions/CheckInGuest';
import CheckOutGuest from '../functions/CheckOutGuest';
import ChangePassword from '../options/PasswordChange';
import PasswordForgetPage from '../account/PasswordForget';
import AllRooms from '../lists/AllRooms';
import AssignedRooms from '../lists/AssignedRooms';
import AvailableRooms from '../lists/AvailableRooms';
import Inspections from '../lists/InspectList';
import Incidents from '../lists/IncidentList';
import WakeUpList from '../lists/WakeUpList';
import DepartingGuests from '../lists/DepartingGuests';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/custom.css';
import * as routes from '../constants/routes';
import NavigationBar from "./NavigationBar";

import withAuthentication from '../auth/withAuthentication';
function App() {
    return (
        <Router>
            <div>
                <NavigationBar />
                {/*Landing Path*/}
                <Route exact path={routes.LANDING} component={Login}/>

                {/*Generic Room Path*/}
                <Route path={routes.ROUTER_RESERVABLE_ROOM} component={ReservableRoom}/>
                <Route path={routes.ROUTER_NON_RESERVABLE_ROOM} component={NonReservableRoom}/>

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
                <Route path={routes.ALL_ROOMS} component={AllRooms}/>
                <Route path={routes.ASSIGNED_ROOMS} component={AssignedRooms} />
                <Route path={routes.AVAILABLE_ROOMS} component={AvailableRooms} />
                <Route path={routes.INSPECTIONS} component={Inspections} />
                <Route path={routes.INCIDENTS} component={Incidents} />
                <Route path={routes.WAKE_UP_LIST} component={WakeUpList} />
                <Route path={routes.DEPARTING_GUESTS} component={DepartingGuests} />

                {/*Options Paths*/}
                <Route path={routes.CHANGE_PW} component={ChangePassword}/>
                <Route path={routes.CHANGE_ROLE} component={ChangeRole}/>

                {/*Help Path*/}
                <Route path={routes.HELP} component={Help}/>
            </div>
        </Router>
    );
}

export default withAuthentication(App);
export { App };