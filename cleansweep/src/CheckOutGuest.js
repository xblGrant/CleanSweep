import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import NavigationBar from './NavigationBar';
import WrappedButton from "./Components";

class CheckOutGuest extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckOut = this.handleCheckOut.bind(this);
    }

    handleCheckOut() {

    }

    render() {
        return (
            <div>
                <head>
                    <title>Check-Out Guest</title>
                </head>
                <div id={"checkOutForm"}>
                    <NavigationBar/>
                    <Form>
                        <FormGroup row>
                            {/*<Label id={"label"} for="roomNum"></Label>*/}
                            <Input type="text" id="roomNum" placeholder={"Room #"}/>
                        </FormGroup>
                        <Button onClick={this.handleCheckOut} color={"primary"} id={"checkOutBtn"}>Check-Out</Button>
                        {' '}
                        <WrappedButton id={"checkOutCancel"} link={"/"} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckOutGuest;