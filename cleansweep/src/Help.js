import React from 'react';
import NavigationBar from "./NavigationBar";
import {
    Button,
    Form,
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
                        <title>Contact US</title>
                    </head>
                    <div id={"helpForm"}>
                        <NavigationBar/>
                <Form>
                    <h2 align="center">Contact Us</h2>
                    <div>
                        <Label id={"label"}>
                            Name: (required)
                            <Input placeholder={"Please enter your name"} type="text" id="name" required/>
                        </Label>
                    </div>
                    <div>
                        <Label id={"label"}>
                            Email: (required)
                            <Input placeholder={"Please enter your email address"} type="email" id="email"required/>
                        </Label>
                    </div>
                    <div>
                        <Label id={"label"}>
                            Message: (required)
                            <Input placeholder={"Include all the details you can"} id="message" required></Input>
                        </Label>
                    </div>
                    <div>
                        <Button onClick={this.handleHelp} color={"primary"} id={"SendBtn"}>Send Email</Button>
                    </div>
                </Form>
                    </div>
                </div>
            );
        }
    }

export default Help;