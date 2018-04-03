import React from 'react';
import {CreateFloorOptions, CreateRoomOptions} from "../components/Generators";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";
import * as routes from "../constants/routes";

class AddIncident extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            selectedRoom: null,
            comment: null,
            areReservableRooms: false
        };

        this.handleComment = this.handleComment.bind(this);
        this.handleRoomType = this.handleRoomType.bind(this);
        this.handleRoomSelect = this.handleRoomSelect.bind(this);
        this.handleFloorSelect = this.handleFloorSelect.bind(this);
        this.handleIncident = this.handleIncident.bind(this);
    }

    componentDidMount() {
        api.getListofAllReservableRooms(this);
    }

    handleFloorSelect(e) {
        let {areReservableRooms} = this.state;
        if (!areReservableRooms) {
            if (e.target.value === '000')
                api.getListofAllReservableRooms(this);
            else
                api.getListofAllReservableRoomsByFloor(this, e.target.value);
        } else {
            if (e.target.value === '000')
                api.getListofAllNonReservableRooms(this);
            else
                api.getListofAllNonReservableRoomsByFloor(this, e.target.value);
        }

        this.setState({
            selectedRoom: null
        })
    }

    handleRoomSelect(e) {
        let room = e.target.value;
        if (room === '') {room = null}
        this.setState({
            selectedRoom: room
        })
    }

    handleComment(e) {
        let comment = e.target.value;
        if (comment === '') {comment = null}
        this.setState({
            comment: comment
        })
    }

    handleRoomType() {
        this.setState({
            areReservableRooms: !this.state.areReservableRooms,
            selectedRoom: null
        });

        let {areReservableRooms} = this.state;
        let floor = document.getElementById('floorSelect').value;

        if (areReservableRooms) {
            if (floor === '000')
                api.getListofAllReservableRooms(this);
            else
                api.getListofAllReservableRoomsByFloor(this, floor);
        } else {
            if (floor === '000')
                api.getListofAllNonReservableRooms(this);
            else
                api.getListofAllNonReservableRoomsByFloor(this, floor);
        }
    }

    handleIncident() {
        let {selectedRoom, comment, areReservableRooms} = this.state;
        let floor = Math.floor(selectedRoom / 100) * 100;

        api.addIncident(floor, selectedRoom, comment, !areReservableRooms);
    }

    render() {

        const isDisabled =
            this.state.selectedRoom === null ||
            this.state.comment === null;

        return (
            <div className={"container"}>
                <Helmet>
                    <title>Incident Report</title>
                    <body className={"background-to-bottom"}></body>
                </Helmet>
                <Form>
                    <FormGroup>
                        <div className={"col-sm-4 center"}>
                            <Label for="floorSelect">Floor</Label>
                            <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                <CreateFloorOptions/>
                            </Input>
                        </div>
                    </FormGroup>

                    <FormGroup check>
                        <Label className={"margin-left-35"} check>
                            <Input onChange={this.handleRoomType} type={"checkbox"} id={"isNonReservable"}/>{' '}
                            Non-Reservable Rooms
                        </Label>
                    </FormGroup>

                    <FormGroup>
                        <div className={"col-sm-4 center"}>
                            <Input onClick={this.handleRoomSelect} type="select" multiple>
                                <CreateRoomOptions rooms={this.state.rooms}/>
                            </Input>
                        </div>
                    </FormGroup>

                    <FormGroup>
                        <div className={"col-sm-4 center"}>
                            <Label for="incidentComment">Comment</Label>
                            <Input onChange={this.handleComment} type="textarea" className={"center"}
                                   id="incidentComment"
                                   placeholder={"Enter comment here"}/>
                        </div>
                    </FormGroup>

                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button disabled={isDisabled} onClick={this.handleIncident} className={"col-sm-4"}
                                    color={"primary"}>Add Incident</Button>
                            <Button href={routes.HOME} className={"col-sm-4"}>Cancel</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default AddIncident;