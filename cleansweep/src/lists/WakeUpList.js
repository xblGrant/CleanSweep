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

    // TODO: instead of links for rooms, keep rooms selectable
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
                        <GroupSelect items={this.state.rooms} onSelectionClear={null} onSelectionFinish={null}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default WakeUpList;