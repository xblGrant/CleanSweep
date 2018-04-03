import React from 'react';
import {Link} from 'react-router-dom';
import {Form, FormGroup, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";
import * as routes from "../constants/routes";

class WakeUpList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            selectedRooms: null,
        };

        this.handleSelectionClear = this.handleSelectionClear.bind(this);
        this.handleSelectionFinish = this.handleSelectionFinish.bind(this);
    }

    componentDidMount() {
        api.getRoomsWithWakeUpCalls(this);
    }

    handleSelectionFinish = selectedItems => {
        let selectedRooms = [];
        for (let i = 0; i < selectedItems.length; i++)
            selectedRooms[i] = selectedItems[i].props;

        this.setState({selectedRooms: selectedRooms});
    };

    handleSelectionClear() {
        this.setState({selectedRooms: null})
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Wake-Up Calls</title>
                </Helmet>
                <div>
                    <Form>
                        <FormGroup>
                            <div className={"container text-center"}>
                                <Label className={"header"}>Wake-Up Calls by Room</Label>
                            </div>
                            <GroupSelect items={this.state.rooms}
                                         isDisabled={false}
                                         onSelectionClear={this.handleSelectionClear}
                                         onSelectionFinish={this.handleSelectionFinish}/>
                        </FormGroup>
                        <FormGroup>
                            <WakeUpComponent rooms={this.state.selectedRooms}/>
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
            <WakeUpElement room={room}/>  ))}
    </table>
);

function WakeUpElement(props) {
    let room = props.room;
    let parts = room.wakeupcall.split(' - ');
    let date = parts[0], time = parts[1];

    return (
        <tr>
            <td>
                <Link to={routes.RESERVABLE_ROOM + room.roomName}>
                    {room.roomName}</Link>
            </td>
            <td>{date}</td>
            <td>{time}</td>
        </tr>
    )
}

export default WakeUpList;