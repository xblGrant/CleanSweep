import React from 'react';
import {Form, Label, FormGroup, Input} from 'reactstrap';
import {CreateFloorOptions} from "../components/Generators";
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class IncidentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };

        this.handleFloorSelect = this.handleFloorSelect.bind(this);
    }

    componentDidMount() {
        api.getRoomsWithIncidents(this);
    }

    handleFloorSelect(e) {
        let floor = e.target.value;
        if (floor === '000') {
            api.getRoomsWithIncidents(this);
        } else {
            api.getRoomsWithIncidentsByFloor(this, floor);
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Incidents</title>
                    <body className={"background-to-bottom"}/>
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
                            <div className={"container text-center"}>
                                <Label className={"header"}>Rooms with Incidents</Label>
                            </div>
                            <GroupSelect items={this.state.rooms}/>
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }
}

export default IncidentList;