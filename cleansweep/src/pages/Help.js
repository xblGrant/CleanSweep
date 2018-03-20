import React from 'react';
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
                    <Form>
                        <h2 align="center">Contact Us</h2>
                        <FormGroup>
                            <Label className={"margin-left-35"}>Name: (required) </Label>
                            <Input placeholder={"Please enter your name"} type="text" className={"margin-left-35 width-30"} id="contactName" required/>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"}>Email: (required)</Label>
                            <Input placeholder={"Please enter your email address"} type="email" className={"margin-left-35 width-30"} id="contactEmail"
                                   required/>
                        </FormGroup>
                        <FormGroup>
                            <Label className={"margin-left-35"}>Message: (required)</Label>
                            <Input placeholder={"Include all the details you can"} className={"margin-left-35 width-30"} id="contactMessage" required
                                   type="textarea"/>
                        </FormGroup>
                        <Button onClick={this.handleHelp} color={"primary"} className={"margin-left-35"}>Send Email</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Help;