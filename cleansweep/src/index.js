import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NewEmployee from './NewEmployee';
import NewRoom from './NewRoom';
import SignUp from './SignUp';
import Login from './Login';
import InspectRoom from './InspectRoom';
import CheckInGuest from './CheckInGuest';
import CheckOutGuest from './CheckOutGuest';
import ChangePassword from './ChangePassword';
import AddIncident from './AddIncident';
import Help from './Help';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';



import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';

// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Router>
        <div>
            {/*Home Path*/}
            <Route exact path={"/"} component={App} />

            {/*Access Paths*/}
            <Route path={"/login"} component={Login} />
            <Route path={"/signup"} component={SignUp} />

            {/*File Paths*/}
            <Route path={"/newemployee"} component={NewEmployee} />
            <Route path={"/newroom"} component={NewRoom} />

            {/*Function Paths*/}
            {/*<Route path={"/wakeupcall"} component={WakeUpCall} />*/}
            {<Route path={"/addincident"} component={AddIncident} />}
            {/*<Route path={"/assignrooms"} component={AssignRooms} />*/}
            <Route path={"/inspectroom"} component={InspectRoom} />
            <Route path={"/checkinguest"} component={CheckInGuest} />
            {<Route path={"/checkoutguest"} component={CheckOutGuest} />}

            {/*List Paths*/}
            {/*<Route path={"/assignedrooms"} component={AssignedRooms} />*/}
            {/*<Route path={"/availablerooms"} component={AvailableRooms} />*/}
            {/*<Route path={"/inspections"} component={Inspections} />*/}
            {/*<Route path={"/incidents"} component={Incidents} />*/}
            {/*<Route path={"/wakeuplist"} component={WakeUpList} />*/}
            {/*<Route path={"/departingcustomers"} component={DepartingCustomers} />*/}

            {/*Options Paths*/}
            <Route path={"/changepassword"} component={ChangePassword} />

            {/*Help Path*/}
            {<Route path={"/help"} component={Help} />}
        </div>
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();