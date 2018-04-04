import React from 'react';
import {Link} from 'react-router-dom';
import {Form, FormGroup} from 'reactstrap';
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
    }

    componentDidMount() {
        api.getRoomsWithWakeUpCalls(this);
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
        <tr>
            <th>Room</th>
            <th>Date</th>
            <th>Time</th>
        </tr>
        {((rooms === null)) ? null : rooms.map((room) => (
            <WakeUpElement room={room}/> ))}
    </table>
);

function WakeUpElement(props) {
    let room = props.room;
    let parts = room[constant.WAKE_UP_CALL].split(' - ');
    let date = parts[0], time = parts[1];

    return (
        <tr>
            <td>
                <Link to={routes.RESERVABLE_ROOM + room[constant.ROOM]}>
                    {room[constant.ROOM]}</Link>
            </td>
            <td>{date}</td>
            <td>{time}</td>
        </tr>
    )
}

export default WakeUpList;