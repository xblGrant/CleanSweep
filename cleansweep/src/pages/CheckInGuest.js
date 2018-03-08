import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import NavigationBar from '../components/NavigationBar';
import WrappedButton from "../components/WrappedButton";
import { ListItemGenerator } from '../components/ListItemGenerator';
import { firebase } from '../firebase/index'

class CheckInGuest extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckIn = this.handleCheckIn.bind(this);
    }

    //TODO: autopopulate room# list for only rooms with guest: "none"

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
                            <ListItemGenerator id="CheckInGuestListItemGenerator"/>
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