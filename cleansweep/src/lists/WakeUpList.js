import React from 'react';
import {Link} from 'react-router-dom';
import {Form, Label, FormGroup, Input} from 'reactstrap';
import {CreateFloorOptions} from "../components/Generators";
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";
import * as routes from "../constants/routes";
import * as constant from '../constants/constants';

class WakeUpList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            selectedRooms: null,
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getRoomsWithWakeUpCalls(this);
    }

    handleFloorSelect(e) {
        let floor = e.target.value;
        if (floor === '000') {
            api.getRoomsWithWakeUpCalls(this);
        } else {
            api.getRoomsWithWakeUpCallsByFloor(this, floor);
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Wake-Up Calls</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <div>
                    <Form>
                        <FormGroup>
                            <div className={"col-sm-4 center"}>
                                <Label for="floorSelect">Floor</Label>
                                <Input onClick={this.handleFloorSelect} type="select" id="floorSelect">
                                    <CreateFloorOptions/>
                                </Input>
                            </div>
                        </FormGroup>

                        <FormGroup>
                            <WakeUpComponent rooms={this.state.rooms}/>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

const WakeUpComponent = ({rooms}) => (
    <table className={"container text-center"}>
        <tbody>
        <tr>
            <th>Room</th>
            <th>Date</th>
            <th>Time</th>
        </tr>
        </tbody>
        {((rooms === null)) ? null : rooms.map((room) => (
            <WakeUpElement key={room} room={room}/> ))}
    </table>
);

function WakeUpElement(props) {
    let room = props.room;
    let parts = room[constant.WAKE_UP_CALL].split(' - ');
    let date = parts[0], time = parts[1];

    return (
        <tbody>
        <tr>
            <td>
                <Link to={routes.RESERVABLE_ROOM + room[constant.ROOM]}>
                    {room[constant.ROOM]}</Link>
            </td>
            <td>{date}</td>
            <td>{time}</td>
        </tr>
        </tbody>
    )
}

export default WakeUpList;