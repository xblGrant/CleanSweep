import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class AssignedRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        api.getAssignedRooms(this);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Assigned Rooms</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <div id={"loadRooms"}>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"center"}>Assigned Rooms</Label>
                        </div>
                        <GroupSelect items={this.state.rooms} />
                    </Form>
                </div>
            </div>
        );
    }
}

export default AssignedRooms;