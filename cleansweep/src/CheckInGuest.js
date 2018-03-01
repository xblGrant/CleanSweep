import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckIn = this.handleCheckIn.bind(this);
    }

    handleCheckIn() {

    }

    render() {
        return (
            <div>
                <head>
                    <title>Check-In Guest</title>
                </head>
                <div id={"checkInForm"}>
                    <NavigationBar/>
                    <Form>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custFName"></Label>*/}
                            <Input type="text" id="custFName" placeholder={"First name"}/>
                        </FormGroup>
                        <FormGroup row>
                            {/*<Label id={"label"} for="custLName"></Label>*/}
                            <Input type="text" id="custLName" placeholder={"Last name"}/>
                        </FormGroup>
                        <FormGroup row>
                            {/*<Label id={"label"} for="roomNum"></Label>*/}
                            <Input type="text" id="roomNum" placeholder={"Room #"}/>
                        </FormGroup>
                        <Button onClick={this.handleCheckIn} color={"primary"} id={"checkInBtn"}>Check-In</Button>
                        {' '}
                        <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckInGuest;