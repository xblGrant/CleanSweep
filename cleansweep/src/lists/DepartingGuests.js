import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class DepartingGuests extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };
    }

    componentDidMount() {
        api.getRoomsWithDepartingGuests(this);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Departing Guests</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"}>Rooms with Departing Guests</Label>
                        </div>
                        <GroupSelect items={this.state.rooms} onSelectionClear={null} onSelectionFinish={null}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default DepartingGuests;