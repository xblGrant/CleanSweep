import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import { WrappedButton } from "../components/Buttons";
import * as routes from "../constants/routes";

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
                    <Form>
                        <FormGroup row>
                            {/*<Label id={"label"} for="roomNum"></Label>*/}
                            <Input type="text" className={"margin-left-35 width-30"} id={"roomNum"} placeholder={"Room #"}/>
                        </FormGroup>
                        <Button onClick={this.handleCheckOut} color={"primary"} className={"margin-left-35"}>Check-Out</Button>
                        {' '}
                        <WrappedButton link={routes.HOME} name={"Cancel"}/>
                    </Form>
                </div>
            </div>
        );
    }
}

export default CheckOutGuest;