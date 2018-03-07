import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import NavigationBar from '../components/NavigationBar';
import WrappedButton from "../components/WrappedButton";

class AddWakeUp extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewWakeUp = this.handleNewWakeUp.bind(this);
    }

    handleNewWakeUp() {
        //TODO: submit new wake up call
    }

    render() {
        return (
            <div>
                <head>
                    <title>Add Wake-Up Call</title>
                </head>
                <div id={"newWakeUpForm"}>
                    <NavigationBar/>
                    <Form>
                        <FormGroup>
                            <Label id={"label"} for="floorSelect">Floor</Label>
                            <Input type="select" className="floorSelect" id="floorSelect" multiple>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="wakeUpRoom">Room</Label>
                            <Input placeholder={"Auto-populate with occupied rooms on given floor"} type="textarea"
                                   id="wakeUpRoom"/>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="wakeUpDate">Date</Label>
                            <Input type="date" id="wakeUpDate" placeholder={"Email"}/>
                        </FormGroup>
                        <FormGroup row>
                            <Label id={"label"} for="wakeUpTime">Time</Label>
                            <Input type="time" id="wakeUpTime" placeholder={"Password"}/>
                        </FormGroup>
                        <Button onClick={this.handleNewWakeUp} color={"primary"}
                                id={"submitNewWakeUpBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"newWakeUpCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default AddWakeUp;