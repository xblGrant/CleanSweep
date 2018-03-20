import React from 'react';
import {Form, Label} from 'reactstrap';
import {firebase} from '../firebase';
import { withRouter } from 'react-router-dom';


class Room extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            roomID: null,
            assignedEmployee : null,
            departureDate : null,
            guest : null,
            incident : null,
            isReservable : null,
            status : null,
            wakeupCall : null
        }
    }



    //when component is passed through react router
    //and the route has a ":" in it,
    //the identifier after it is the parameter.
    //I call the parameter by this.props.match.params.roomid
    //roomid is the explicit name of the identifier after the
    //route in App.js.

    //TODO: GRANT TEST EACH POSSIBLE ROOM ID WITH GIVEN
    // this.props.match.params.roomid
    //reservableRooms, nonreservableRooms, General
    //if not in any of those lists, display error
    componentDidMount() {
        let floorRef = firebase.db.ref("/Rooms/Reservable");
        floorRef.orderByKey().once('value', function(allFloors) {
            allFloors.forEach( function(floor) {
                floor.forEach( function(room) {
                    if (room.val().key !== null){
                        resRoom.push(
                            {
                                roomNum:room.val().key,
                                assignedEmployee:room.val().assignedEmployee,
                                departureDate:room.val().departureDate,
                                guest:room.val().guest,
                                incident:room.val().incident,
                                isReservable:room.val().isReservable,
                                wakeupCall:room.val().wakeupCall
                            }
                        )
                    }
                })
            })
        }).then( () => {
            this.setState({
                reservableRooms: resRoom
            })
        });

        let floorRef = firebase.db.ref("/Rooms/NonReservable");
        floorRef.orderByKey().once('value'), funciton(allFloors) {
            allFLoors.forEach
        }




    }

    //TODO: Display and format corresponding room information
    //TODO: cont... regarding roomID (don't change roomID. it is correct)
    render() {
        return (
            <div id='roomPage'>
                <error>{this.state.roomID}</error>
            </div>
        );
    }
}

export default Room;