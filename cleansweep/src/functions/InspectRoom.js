import React from 'react';
import { CreateFloorOptions, CreateRoomOptions } from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import * as api from '../firebase/api';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class InspectRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            selectedRoom: null,
            selectedFloor: '000',
            areReservableRooms: false,
            submitted: false,
            submissionMessage: ''
        };

        this.isSubmitted = this.isSubmitted.bind(this);
        this.handleInspect = this.handleInspect.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleRoomSelect = this.handleRoomSelect.bind(this);
        this.handleUpdateRooms = this.handleUpdateRooms.bind(this);
    }

    componentDidMount() {
        api.getListofAllRoomsNeedInspected(this);
    }

    isSubmitted(val) {
        this.setState({submitted: val});
    }

    handleFloorSelect(e) {
        let floor = e.target.value;
        this.setState({
            selectedFloor: floor
        });

        if (e.target.value === '000')
            api.getListofAllRoomsNeedInspected(this);
        else
            api.getListofAllRoomsNeedInspectedByFloor(this, e.target.value);

        this.setState({ selectedRoom: null });
        this.isSubmitted(false);
    }

    handleRoomSelect(e) {
        let room = e.target.value;
        if (room === '') {room = null}
        else {
            if (room.charAt(0) >= '0' && room.charAt(0) <= '9') {
                this.setState({areReservableRooms: true});
            }
            else {
                this.setState({areReservableRooms: false});
            }
        }

        this.setState({ selectedRoom: room });
        this.isSubmitted(false);
    }

    handleInspect() {
        api.inspectRoom(this);
        this.setState({ submissionMessage: "Room Approved"});
        this.handleUpdateRooms();
    }

    handleDecline() {
        api.declineInspectRoom(this);
        this.setState({ submissionMessage: "Room Declined"});
        this.handleUpdateRooms();
    }

    handleUpdateRooms() {
        let roomList = this.state.rooms;
        let selectedRoom = this.state.selectedRoom;
        let updatedRoomList = roomList.filter(function(e) {
            return e !== selectedRoom
        });

        this.setState({
            rooms: updatedRoomList,
            submitted: true
        });

        this.isSubmitted(true);
    }

    render() {
        let isDisabled = this.state.selectedRoom === null;

        return (
            <div className="container">
                <Helmet>
                    <title>Inspect Room</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <Form>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                <CreateFloorOptions />
                            </Input>
                        </div>
                    </FormGroup>

                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            <Label for="assignableRoom">Rooms</Label>
                            <Input onClick={this.handleRoomSelect} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </div>
                    </FormGroup>
                    {this.state.submitted && <p className={"submission"} id={"submitMessage"}>
                        {this.state.submissionMessage}</p>}
                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button className={"col-sm-4"} onClick={this.handleInspect} color={"primary"} disabled={isDisabled}>Approve</Button>
                            <Button className={"col-sm-4"} onClick={this.handleDecline} color={"danger"} disabled={isDisabled}>Decline</Button>
                            <Button className={"col-sm-4"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default InspectRoom;