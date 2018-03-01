import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class CheckOutGuest extends React.Component {
    constructor(props){
        super(props);

        this.handleCheckOut = this.handleCheckOut.bind(this);
    }

    handleCheckOut() {

    }

    render() {
        return (
            <div id={"checkOutForm"}>
                <NavigationBar/>
                <Form>
                    <FormGroup row>
                        {/*<Label id={"label"} for="roomNum"></Label>*/}
                        <Input type="text" id="roomNum" placeholder={"Room #"} />
                    </FormGroup>
                    <Button onClick={this.handleCheckIn} color={"primary"} id={"checkInBtn"}>Check-Out</Button>
                    {' '}
                    <WrappedButton id={"checkInCancel"} link={"/"} name={"Cancel"}/>
                </Form>
            </div>
        );
    }
}

export default CheckOutGuest;