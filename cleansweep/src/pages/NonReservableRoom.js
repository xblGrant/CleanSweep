import React from 'react';
import * as api from '../firebase/api';

class NonReservableRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            validRoom: false,
            roomType: null,
            roomID: null,
            floorNum: null,
            assignedEmployee: null,
            incidentList: null,
            status: null,
            incident: null,
            inspect: null,
        }
    }

    //when component is passed through react router
    //and the route has a ":" in it,
    //the identifier after it is the parameter.
    //I call the parameter by this.props.match.params.roomid
    //roomid is the explicit name of the identifier after the
    //route in App.js.
    componentWillMount() {
        api.getNonReservableRoomInformation(this, this.props.match.params.roomid);
    }

    //TODO: Display and format corresponding room information from state
    //TODO: cont... regarding roomID (don't change roomID. it is correct)
    render() {
        return (
            <div className={"container"}>
                <h2 className={"center"}>{this.state.roomID}</h2>
                <h6 className={"center"}>{this.state.status}</h6>
                <p>{"Assigned Employee: " + this.state.assignedEmployee}</p>
                <p>{"Floor: " + this.state.floorNum / 100}</p>
                <p>{"Incident: " + this.state.incident}</p>
                <p>{"Incident List: " + this.state.incidentList}</p>
                <p>{"Needs inspected: " + this.state.inspect}</p>
            </div>
        );
    }
}

export default NonReservableRoom;