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

        this.state={
            name: null,
            email: null,
            message: null
        };

        this.handleHelp = this.handleHelp.bind(this);
        this.handleNameChange = this.handleNameChange(this);
        this.handleEmailChange = this.handleEmailChange(this);
        this.handleMessageChange = this.handleMessageChange(this);
    }

    handleNameChange(event) {
        let usrName = event.target.value;
        if (usrName === '') {usrName = null}
        this.setState({
            name: usrName
        })
    }

    handleEmailChange(event){
        let usrEmail = event.target.value;
        if (usrEmail === '') {usrEmail = null}
        this.setState({
            email: usrEmail
        })
    }

    handleMessageChange(event){
        let usrMessage = event.target.value;
        console.log(usrMessage);
        if (usrMessage === '') {usrMessage = null}
        this.setState({
            message: usrMessage
        })
    }

    handleHelp() {

    }

    render() {
        let isDisabled = this.state.name === null ||
            this.state.email === null ||
            this.state.message === null;


        return (
            <div>
                <Helmet>
                    <title>Contact Us</title>
                    <body className={"background-to-bottom"} />
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6 center"}>
                        <Form>
                            <h2 className={"center"}>Contact Us</h2>
                            <br/>
                            <FormGroup>
                                <Label>Name: (required) </Label>
                                <Input onChange={this.handleNameChange}
                                       placeholder={"Please enter your name"}
                                       type="text"
                                       id="contactName"
                                       autoComplete={'name'}/>
                            </FormGroup>

                            <FormGroup>
                                <Label>Email: (required)</Label>
                                <Input onChange={this.handleEmailChange}
                                       placeholder={"Please enter your email address"}
                                       type="email"
                                       id="contactEmail"
                                       autoComplete={'email'}/>
                            </FormGroup>

                            <FormGroup>
                                <Label>Message: (required)</Label>
                                <Input onChange={this.handleMessageChange}
                                       placeholder={"Include all of the details you can"}
                                       id="contactMessage"
                                       type="textarea"/>
                            </FormGroup>
                            <br/>
                            <Button disabled={isDisabled}
                                    className={"col-sm-4"}
                                    onClick={this.handleHelp}
                                    color={"primary"}>Send Email</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;