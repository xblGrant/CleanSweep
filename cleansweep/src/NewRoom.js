import React from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import NavigationBar from "./NavigationBar";
import WrappedButton from "./Components";

class NewRoom extends React.Component {
    constructor(props) {
        super(props);

        this.handleNewRoom = this.handleNewRoom.bind(this);
    }

    handleNewRoom() {

    }

    render() {
        return (
            <div id={"newRoomForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        <Label id={"label"} for="roomNum">
                            *Autopopulate Room Number*
                        </Label>
                        <Input type="text" id="roomNum"/>
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
        );
    }

}

export default NewRoom;