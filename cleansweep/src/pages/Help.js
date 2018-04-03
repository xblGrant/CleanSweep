import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import {Helmet} from "react-helmet";

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
                <Helmet>
                    <title>Contact Us</title>
                    <body className={"background-to-bottom"}></body>
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6 center"}>
                        <Form>
                            <h2 className={"center"}>Contact Us</h2>
                            <br/>
                            <FormGroup>
                                <Label>Name: (required) </Label>
                                <Input placeholder={"Please enter your name"} type="text" id="contactName" required/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email: (required)</Label>
                                <Input placeholder={"Please enter your email address"} type="email" id="contactEmail"
                                       required/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Message: (required)</Label>
                                <Input placeholder={"Include all the details you can"} id="contactMessage" required
                                       type="textarea"/>
                            </FormGroup>
                            <br/>
                            <Button className={"col-sm-4"} onClick={this.handleHelp} color={"primary"}>Send Email</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;