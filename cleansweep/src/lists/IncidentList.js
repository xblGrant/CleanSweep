import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class IncidentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    componentDidMount() {
        api.getRoomsWithIncidents(this);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Incidents</title>
                    <body className={"background-to-bottom"}></body>
                </Helmet>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"}>Rooms with Incidents</Label>
                        </div>
                        <GroupSelect items={this.state.rooms} onSelectionClear={null} onSelectionFinish={null}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default IncidentList;