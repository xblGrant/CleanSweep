import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {CreateRoomOptions} from "../components/Generators";
import { WrappedButton } from "../components/Buttons";
import { AvailableRooms } from '../components/Generators';
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            firstName: '',
            lastName: '',
            roomNum: '',
            roomPath: '',
        };

        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleRoomSelect = this.handleRoomSelect.bind(this);
    }

    componentDidMount(){
        api.getListofAllAvailableRooms(this);
    }

    handleFirstName() {
        let firstName = document.getElementById('custFName').value.toString();
        this.setState({
            firstName: firstName
        })
    }
    handleLastName() {
        let lastName = document.getElementById('custLName').value.toString();
        this.setState({
            lastName: lastName
        })
    }
    handleRoomSelect(e) {
        let info = {};
        info.roomNum = e.target.value;
        info.floorNum = Math.round(info.roomNum / 100) * 100;
        info.roomPath = 'Rooms/Reservable/' + info.floorNum + '/' + info.roomNum;

        this.state = info;
    }
    handleCheckIn() {
        //TODO: check if guest is not already checked-in
        //TODO: make sure first and last name fields aren't empty
        //TODO: make sure roomPath and roomNum aren't empty
        //TODO: invalidate check-in button unless all fields are selected/entered. (see login page for example)

        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let roomPath = this.state.roomPath;
        let roomNum = this.state.roomNum;

        api.checkInGuest(this, firstName, lastName, roomPath, roomNum);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Check-In Guest</title>
                </Helmet>
                <div>
                    <Form>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custFName"></Label>*/}
                            <Input onChange={this.handleFirstName} type="text" className={"margin-left-35 width-30"} id={"custFName"} placeholder={"First name"}/>
                        </FormGroup>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custLName"></Label>*/}
                            <Input onChange={this.handleLastName} type="text" className={"margin-left-35 width-30"} id={"custLName"} placeholder={"Last name"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label className={"margin-left-35"} for="floorSelect">Rooms</Label>
                                <Input onClick={this.handleRoomSelect} id={'roomOptions'} className={"margin-left-35 width-30"} type="select" multiple>
                                    <CreateRoomOptions rooms={this.state.rooms}/>
                                </Input>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} className={"margin-left-35"} color={"primary"}>Check-In</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"} id={"wrappedButton"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckInGuest;