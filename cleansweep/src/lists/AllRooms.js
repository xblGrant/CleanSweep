import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class AllRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
       api.getAllRooms(this);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>All Rooms</title>
                    <body className={"background-to-bottom"}></body>
                </Helmet>
                <div id={"loadRooms"}>
                    <Form>
                        <div className={"center"}>
                            <div className={"container text-center"}>
                                <Label className={"center"}>All Rooms</Label>
                            </div>
                            <GroupSelect items={this.state.rooms} onSelectionClear={null} onSelectionFinish={null}/>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AllRooms;