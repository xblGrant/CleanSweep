import React from 'react';
import {Button, Form, FormGroup, Input, Label} from 'reactstrap';
import {CreateRoomOptions} from "../components/Generators";
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
            checkout: false
        };


        this.handleCheckIn = this.handleCheckIn.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleFirstName = this.handleFirstName.bind(this);
        this.handleRoomSelect = this.handleRoomSelect.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
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

        this.setState({
            info
        });
    }

    handleStatus(){
        this.setState({
            checkout: !this.state.checkout
        });
        if(this.state.checkout !== true)
            api.getListofAllUnavailableRooms(this);
        else
            api.getListofAllAvailableRooms(this);
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
        if(this.state.checkout !== true)
            api.checkInGuest(this, firstName, lastName, roomPath, roomNum);
        else
            api.checkOutGuest(this, firstName, lastName, roomPath, roomNum);

        window.location.reload();
    }

    render() {
        return (
            <div className={"container"}>
                <Helmet>
                    <title>Check-In Guest</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <br/>
                <Form>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            {/*<Label id={"label"} for="custFName"></Label>*/}
                            <Input onChange={this.handleFirstName} type="text" id={"custFName"} placeholder={"First name"}/>
                        </div>
                    </FormGroup>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                        {/*<Label id={"label"} for="custLName"></Label>*/}
                        <Input onChange={this.handleLastName} type="text" id={"custLName"} placeholder={"Last name"}/>
                        </div>
                    </FormGroup>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                        <Label for="floorSelect">Rooms</Label>
                            <Input onClick={this.handleRoomSelect} id={'roomOptions'} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </div>
                    </FormGroup>
                    <FormGroup check>
                        <div className={"col-sm-4 center"}>
                            <Label check>
                                <Input onChange={this.handleStatus} type={"checkbox"} id={"checkOut"}/>{' '}
                                Check-Out
                            </Label>
                        </div>
                    </FormGroup>

                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button className={"col-sm-4"} onClick={this.handleCheckIn} color={"primary"}>Update</Button>
                            <Button className={"col-sm-4"} href={routes.HOME} name={"Cancel"}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CheckInGuest;