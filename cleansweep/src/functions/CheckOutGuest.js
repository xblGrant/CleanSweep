import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import * as routes from "../constants/routes";
import {Helmet} from "react-helmet";

class CheckOutGuest extends React.Component {
    constructor(props) {
        super(props);

        this.handleCheckOut = this.handleCheckOut.bind(this);
    }

    handleCheckOut() {

    }

    render() {
        return (
            <div className={"container"}>
                <Helmet>
                    <title>Check-Out Guest</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <Form>
                    <FormGroup row>
                        <div className={"col-sm-4 center"}>
                            {/*<Label id={"label"} for="roomNum"></Label>*/}
                            <Input type="text" id={"roomNum"} placeholder={"Room #"}/>
                        </div>
                    </FormGroup>

                    <br/>
                    <div className={"row"}>
                        <div className={"col-sm-5 center"}>
                            <Button className={"col-sm-4"} onClick={this.handleCheckOut} color={"primary"}>Check-Out</Button>
                            <Button className={"col-sm-4"} href={routes.HOME}> Cancel </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CheckOutGuest;