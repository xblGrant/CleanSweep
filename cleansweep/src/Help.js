import React from 'react';
import NavigationBar from "./NavigationBar";
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';

class Help extends React.Component {
    constructor(props) {
        super(props);

        this.handleHelp = this.handleHelp.bind(this);
    }

    handleHelp() {

    }

    render() {
        return (
            <div>
                <head>
                    <title>Contact Us</title>
                </head>
                <div id={"helpForm"}>
                    <NavigationBar/>
                    <Form>
                        <h2 align="center">Contact Us</h2>
                        <FormGroup>
                            <Label id={"label"}>Name: (required) </Label>
                            <Input placeholder={"Please enter your name"} type="text" id="contactName" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label id={"label"}>Email: (required)</Label>
                            <Input placeholder={"Please enter your email address"} type="email" id="contactEmail"
                                   required/>
                        </FormGroup>
                        <FormGroup>
                            <Label id={"label"}>Message: (required)</Label>
                            <Input placeholder={"Include all the details you can"} id="contactMessage" required
                                   type="textarea"/>
                        </FormGroup>
                        <Button onClick={this.handleHelp} color={"primary"} id={"SendBtn"}>Send Email</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Help;