import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import {CreateRoomOptions, CreateFloorOptions} from '../components/Generators';
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            wakeUpTime: null,
            wakeUpDate: null,
            isDisabled: true,
            selectedRoom: null,
            submitted: false
        };

        this.isSubmitted = this.isSubmitted.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handleSelectedRoom = this.handleSelectedRoom.bind(this);
        this.handleNewWakeUp = this.handleNewWakeUp.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getListofAllReservedRooms(this);
    }

    isSubmitted(val) {
        this.setState({submitted: val});
    }

    handleFloorSelect(e) {
        if (e.target.value === '000')
            api.getListofAllReservedRooms(this);
        else
            api.getListofAllReservedRoomsByFloor(this, e.target.value);
        this.isSubmitted(false);
    }

    handleTime(e) {
        let time = e.target.value;
        if (time === '') {time = null}
        this.setState({ wakeUpTime: time });
        this.isSubmitted(false);
    }

    handleDate(e) {
        let date = e.target.value;
        if (date === '') {date = null}
        this.setState({ wakeUpDate: date });
        this.isSubmitted(false);
    }

    handleSelectedRoom(e) {
        let room = e.target.value;
        if (room === '') {room = null}
        this.setState({ selectedRoom: room });
        this.isSubmitted(false);
    }

    handleNewWakeUp(){
        let {
            selectedRoom,
            wakeUpDate,
            wakeUpTime
        } = this.state;

        let parts = wakeUpDate.split('-');
        let date = parts[1] + '/' + parts[2] + '/' + parts[0];
        let floor = Math.floor(selectedRoom / 100) * 100;

        api.addNewWakeUpCall(selectedRoom, floor, date, wakeUpTime);
        this.isSubmitted(true);
    }

    render() {

        let info = this.state;
        let isDisabled =
            info.wakeUpDate === null ||
            info.wakeUpTime === null ||
            info.selectedRoom === null;

        return (
            <div className={"container"}>
                <Helmet>
                    <title>Add Wake-Up Call</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <div>
                    <Form>
                        { <p className={"submission col-sm-4 center"} id={"submitMessage"}>
                        {"Wake-Up call added successfully"}</p>}
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Floor</Label>
                                <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                <CreateFloorOptions displayAll={false}/>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Rooms</Label>
                                <Input id={"roomOptions"} onClick={this.handleSelectedRoom} type="select" multiple>
                                    <CreateRoomOptions rooms={this.state.rooms}/>
                                </Input>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="wakeUpDate">Date</Label>
                                <Input onChange={this.handleDate} type="date" id="wakeUpDate" placeholder={"date"}/>
                            </div>
                        </FormGroup>
                        <FormGroup row>
                            <div className={"col-sm-4 center"}>
                                <Label for="wakeUpTime">Time</Label>
                                <Input onChange={this.handleTime} type="time" id="wakeUpTime" placeholder={"time"}/>
                            </div>
                        </FormGroup>
                        <br/>
                        <div className={"row"}>
                            <div className={"col-sm-4 center"}>
                                <Button  disabled={isDisabled} onClick={this.handleNewWakeUp} color={"primary"}>Add Call</Button>
                                <Button  href={routes.HOME} name={"Cancel"}>Cancel</Button>
                            </div>
                        </div>
                    </Form>

                </div>
            </div>
        );
    }
}

export default AddWakeUp;