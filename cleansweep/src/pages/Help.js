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

        this.state = {
            name: '',
            email: '',
            message: ''
        };

        this.handleHelp = this.handleHelp.bind(this);
        this.handleNameChange = this.handleNameChange(this);
        this.handleEmailChange = this.handleEmailChange(this);
        this.handleMessageChange = this.handleMessageChange(this);
    }

    handleNameChange(e) {
        let roomName = e.target.value;
        this.setState({
            name: roomName
        });
    }

    handleEmailChange(e) {
        let usrEmail = e.target.value;
        this.setState({
            email: usrEmail
        })
    }

    handleMessageChange(e) {
        let usrMessage = e.target.value;
        this.setState({
            message: usrMessage
        })
    }

    handleHelp() {

    }

    render() {
        let isDisabled = this.state.name === '' ||
            this.state.email === '' ||
            this.state.message === '';

        let info = this.state;

        return (
            <div>
                <Helmet>
                    <title>Contact Us</title>
                    <body className={"background-to-bottom"}/>
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6 center"}>
                        <h2 className={"center"}>Contact Us</h2>
                        <Form>
                            <FormGroup row>
                                <div className={"col-sm-12 center"}>
                                    <Label>Name: (required) </Label>
                                    <Input onChange={this.handleNameChange}
                                           value={info.name}
                                           type={"text"}
                                           className={"margin-left-35 width-30"}
                                           id={"contactName"}
                                           autoComplete={'name'}/>
                                </div>
                            </FormGroup>

                            <FormGroup row>
                                <div className={"col-sm-12 center"}>
                                    <Label>Email: (required)</Label>
                                    <Input onChange={this.handleEmailChange}
                                           value={info.email}
                                           type={"text"}
                                           className={"margin-left-35 width-30"}
                                           id={"contactEmail"}
                                           autoComplete={'email'}/>
                                </div>
                            </FormGroup>

                            <FormGroup row>
                                <div className={"col-sm-12 center"}>
                                    <Label>Message: (required)</Label>
                                    <Input onChange={this.handleMessageChange}
                                           value={info.message}
                                           type={"textarea"}
                                           className={"margin-left-35 width-30"}
                                           id={"contactMessage"}
                                           autoComplete={'message'}/>
                                </div>
                            </FormGroup>
                            <br/>
                            <Button disabled={isDisabled}
                                    className={"col-sm-4"}
                                    onClick={this.handleHelp}
                                    color={"primary"}>Send</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;