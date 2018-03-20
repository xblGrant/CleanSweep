import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import { AvailableRooms } from '../components/Generators';
import * as routes from "../constants/routes";

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckIn = this.handleCheckIn.bind(this);
    }

    handleCheckIn() {
        //TODO: make sure First name, Last name is valid
        //TODO: if guests (on firebase) does not have current guest,
        //TODO:    then add to firebase.
    }

    render() {
        return (
            <div>
                <head>
                    <title>Check-In Guest</title>
                </head>
                <div>
                    <Form>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custFName"></Label>*/}
                            <Input type="text" className={"margin-left-35 width-30"} id={"custFName"} placeholder={"First name"}/>
                        </FormGroup>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custLName"></Label>*/}
                            <Input type="text" className={"margin-left-35 width-30"} id={"custLName"} placeholder={"Last name"}/>
                        </FormGroup>
                        <FormGroup row>
                            <AvailableRooms className={"margin-left-35 width-30"} id="listItemGenerator"/>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} className={"margin-left-35"} color={"primary"}>Check-In</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckInGuest;