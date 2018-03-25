import React from 'react';
import {Form, Label} from 'reactstrap';
import GroupSelect from '../selectable/GroupSelect';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

class WakeUpList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        }
    }

    // TODO: instead of links for rooms, keep rooms selectable and display wake up time for room when selected
    componentDidMount() {
        api.getRoomsWithWakeUpCalls(this);
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Wake-Up Calls</title>
                </Helmet>
                <div>
                    <Form>
                        <div className={"container text-center"}>
                            <Label className={"header"}>Wake-Up Calls by Room</Label>
                        </div>
                        <GroupSelect items={this.state.rooms}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default WakeUpList;