import React from 'react';
import { WrappedButton } from "../components/Buttons";
import { CreateFloorOptions, CreateRoomOptions } from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import {firebase} from "../firebase";
import * as routes from "../constants/routes";

class InspectRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
        };

        this.handleInspect = this.handleInspect.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/100");
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleFloorSelect(e) {
        let roomList = [];
        let roomRef = firebase.db.ref("/Rooms/Reservable/" + e.target.value);
        roomRef.orderByKey().once('value', function(allRooms) {
            allRooms.forEach( function(room) {
                roomList.push(room.key);
            })
        }).then( () =>
            this.setState({
                rooms: roomList
            })
        )
    }

    handleInspect() {

    }

    render() {
        return (
            <div>
                <head>
                    <title>Inspect Room</title>
                </head>
                <div className={"margin-top-02"}>
                    <Form>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" className="margin-left-35 width-30" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"} for="assignableRoom">Rooms</Label>
                            <Input className={"margin-left-35 width-30"} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="inspectComment">Comment</Label>
                            <Input type="textarea" className={"margin-left-35 width-30"} placeholder={"Enter comment here"}/>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} color={"primary"} className={"margin-left-35"}>Submit</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default InspectRoom;