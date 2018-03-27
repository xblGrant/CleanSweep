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
            departureDate: null,
            guest: null,
            incidents: null,
            isReservable: null,
            status: null,
            wakeupCall: null
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

    componentDidMount() {
        //console.log(this.state);
    }

    //TODO: Display and format corresponding room information from state
    //TODO: cont... regarding roomID (don't change roomID. it is correct)
    render() {
        return (
            <div className={"container"}>
                <p>{this.state.roomID}</p>
                <p>{this.state.floorNum}</p>
                <p>{this.state.incidents}</p>
            </div>
        );
    }
}

export default NonReservableRoom;