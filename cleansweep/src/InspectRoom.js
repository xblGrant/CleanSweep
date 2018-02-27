import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class InspectRoom extends React.Component {
    constructor(props){
        super(props);

        this.handleInspect = this.handleInspect.bind(this);
    }

    handleInspect() {

    }

    render() {
        return (
            <div id={"newCheckInForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Label id={"label"} for="custFName"></Label>
                        <Input type="text" id="custFName" placeholder={"First name"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="custLName"></Label>
                        <Input type="text" id="custLName" placeholder={"Last name"}/>
                    </FormGroup>
                    <FormGroup row>
                        <Label id={"label"} for="roomNum"></Label>
                        <Input type="text" id="roomNum" placeholder={"Room #"} />
                    </FormGroup>
                    <br/>
                    <Button onClick={this.handleCheckIn} color={"primary"} id={"submitNewEmpBtn"}>Submit</Button>
                    {' '}
                    <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                </Form>
            </div>
        );
    }
}

export default InspectRoom;