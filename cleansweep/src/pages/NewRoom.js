import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import NavigationBar from "../components/NavigationBar";
import WrappedButton from "../components/WrappedButton";

class NewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewRoom = this.handleNewRoom.bind(this);
    }

    handleNewRoom() {
        // TODO: handle addition of new room
    }

    render() {
        return (
            <div>
                <head>
                    <title>New Room</title>
                </head>
                <div id={"newRoomForm"}>
                    <NavigationBar/>
                    <Form>
                        <FormGroup row>
                            <Label id={"label"} for="roomNum">
                                New Room
                            </Label>
                            <Input type="text" id="roomNum" placeholder={"*Autopopulate Room Number*"}/>
                        </FormGroup>
                        <FormGroup check>
                            <Label id={"label"} check>
                                <Input type="checkbox" id="isReservable"/>{' '}
                                Reservable
                            </Label>
                        </FormGroup>
                        <br/>
                        <Button onClick={this.handleNewRoom} color={"primary"} id={"submitNewRoomBtn"}>Submit</Button>
                        {' '}
                        <WrappedButton id={"newRoomCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }

}

export default NewRoom;