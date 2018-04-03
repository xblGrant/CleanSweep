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
            selectedFloor: null,
            areReservableRooms: false
        };

        this.handleInspect = this.handleInspect.bind(this);
        this.handleDecline = this.handleDecline.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleRoomSelect = this.handleRoomSelect.bind(this);

    }

    componentDidMount() {
        api.getListofAllRoomsNeedInspected(this);
    }

    //TODO: if "all" is floor selection, this doesn't work
    handleFloorSelect(e) {
        let floor = e.target.value;
        this.setState({
            selectedFloor: floor
        });

        if (e.target.value === '000')
            api.getListofAllRoomsNeedInspected(this);
        else
            api.getListofAllRoomsNeedInspectedByFloor(this, e.target.value);

        this.setState({
            selectedRoom: null
        })
    }

    handleRoomSelect(e) {
        let room = e.target.value;
        if (room === '') {room = null}

        if (room.charAt(0) >= '0' && room.charAt(0) <= '9') {
            this.setState({areReservableRooms: true});
        }
        else {
            this.setState({areReservableRooms: false});
        }

        this.setState({
            selectedRoom: room
        })
    }

    handleInspect() {
        api.inspectRoom(this);
    }

    handleDecline() {
        // TODO: implement when inspection is declined
        // TODO: should set the room status = dirty, isReservable = false,
    }

    render() {
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
                            <Input onClick={this.handleFloorSelect} type="select" id="floorSelect" multiple>
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

                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button className={"col-sm-4"} onClick={this.handleInspect} color={"primary"}>Approve</Button>
                            <Button className={"col-sm-4"} onClick={this.handleDecline} color={"danger"}>Decline</Button>
                            <Button className={"col-sm-4"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default InspectRoom;