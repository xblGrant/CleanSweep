import React from 'react';
import {firebase} from '../firebase';

class Room extends React.Component {
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
        let updates = {validRoom: false};
        let incidentsList = [];
        let hasIncident = false;
        let roomID = this.props.match.params.roomid;

        //search reservable rooms to find matching room
        let ReservableRef = firebase.db.ref("/Rooms/Reservable/");
        ReservableRef.orderByKey().once('value', function (floor) {
            floor.forEach(function (rooms) {
                rooms.forEach(function (room) {
                    if (room.key === roomID) {
                        updates.validRoom = true;
                        updates.roomType = 'Reservable';
                        updates.roomID = room.key;
                        updates.floorNum = floor.key;
                        updates.assignedEmployee = room.val().assignedEmployee;
                        updates.departureDate = room.val().departureDate;
                        updates.guest = room.val().guest;
                        updates.isReservable = room.val().isReservable;
                        updates.wakeupCall = room.val().wakeupCall;
                        updates.status = room.val().status;
                        if (room.val().incident)
                            hasIncident = true;
                    }
                })
            })
        }).then(() => {
            this.setState(updates);

            //search nonreservable to find matching room if updates.validRoom is false
            if (!updates.validRoom) {
                console.log("goes into nonreservable");
                let NonReservableRef = firebase.db.ref("/Rooms/NonReservable/");
                NonReservableRef.orderByKey().once('value', function (floor) {
                    floor.forEach(function (room) {
                        if (room.key === roomID) {
                            updates.validRoom = true;
                            updates.roomType = 'NonReservable';
                            updates.roomID = room.key;
                            updates.floorNum = floor.key;
                            updates.assignedEmployee = room.val().assignedEmployee;
                            updates.status = room.val().status;
                            if (room.val().incident)
                                hasIncident = true;
                        }
                    })
                }).then(() => {
                    this.setState(updates);
                });
            }

            //if updates.hasIncidents
            if (hasIncident) {
                let IncidentsRef = firebase.db.ref("/Incidents/" + roomID);
                IncidentsRef.orderByKey().startAt("2").once('value', function (room) {
                    room.forEach(function (incident) {
                        console.log(incident.val());
                        incidentsList.push(incident.val());
                    })
                }).then(() => {
                    this.setState({incidents: incidentsList});
                });
            }
        });
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
                <p>{this.state.guest}</p>
                <p>{this.state.incidents}</p>
            </div>
        );
    }
}

export default Room;