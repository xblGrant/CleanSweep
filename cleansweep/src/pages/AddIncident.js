import React from 'react';
import {WrappedButton} from "../components/Buttons";
import {CreateFloorOptions, CreateRoomOptions} from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import {firebase} from "../firebase";
import {Helmet} from "react-helmet";

class AddIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleIncident = this.handleIncident.bind(this);
        this.updateIncident = this.handleIncident.bind(this);
    }

    getAllRooms() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    roomList.push(room.key);
                })
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/Reservable/");
            roomRef.orderByKey().once('value', function (floors) {
                floors.forEach(function (allRooms) {
                    allRooms.forEach(function (room) {
                        roomList.push(room.key);
                    })
                })
            }).then(() =>
                this.setState({
                    rooms: roomList
                })
            )
        });
    }

    getRoomsByFloor(floor) {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                roomList.push(room.key);
            })
        }).then(() => {
            roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
            roomRef.orderByKey().once('value', function (allRooms) {
                allRooms.forEach(function (room) {
                    roomList.push(room.key);
                })
            }).then(() => {
                this.setState({
                    rooms: roomList
                })
            })
        })
    }


    componentDidMount() {
        this.getAllRooms();
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            this.getAllRooms();
        else
            this.getRoomsByFloor(e.target.value);
    }



    handleIncident() {
        //TODO: set these using this.state
        var path, room, commentInput;
        path = 'Rooms/Reservable/100/';
        room = '101';
        commentInput = "stain on rug";

        //This will update the incident field in the actual room
        var updates = {};
        updates[path + room +  '/' + 'incident'] = true;
        firebase.db.ref().update(updates);

        //this will create an instance of the incident in the Incidents part of the db
        firebase.db.ref('Incidents/' + room).set({
            comment: commentInput
        });

    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Incident Report</title>
                </Helmet>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select"
                                   className="margin-left-35 width-30" id="floorSelect">
                                <CreateFloorOptions/>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Input className={"margin-left-35 width-30"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="incidentComment">Comment</Label>
                            <Input type="textarea" className={"margin-left-35 width-30"} id="incidentComment"
                                   placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleIncident} className={"margin-left-35"}
                                color={"primary"}>Submit</Button>
                        {' '}
                        <WrappedButton link={"/"} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddIncident;