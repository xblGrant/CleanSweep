import React from 'react';
import {Form, Label, FormGroup, Input} from 'reactstrap';
import {CreateFloorOptions} from "../components/Generators";
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class AllRooms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getAllRooms(this);
    }

    handleFloorSelect(e) {
        let floor = e.target.value;
        if (floor === '000'){
            api.getAllRooms(this);
        } else {
            api.getAllRoomsByFloor(this, floor);
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>All Rooms</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <div id={"loadRooms"}>
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
                            <div className={"center"}>
                                <div className={"container text-center"}>
                                    <Label className={"center"}>All Rooms</Label>
                                </div>
                                <GroupSelect items={this.state.rooms}/>
                            </div>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AllRooms;