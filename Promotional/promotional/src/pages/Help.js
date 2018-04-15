import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
} from 'reactstrap';
import {Helmet} from "react-helmet";

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

class Help extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            message: ''
        };

        this.handleHelp = this.handleHelp.bind(this);
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
                </Helmet>
                <div className={"container"}>
                    <div className={"col-sm-6  col-md-10 center"}>
                        <h2 className={"center"}>Contact Us</h2>
                        <Form action="https://formspree.io/team6ixsheets@gmail.com"
                              method="POST">
                            { this.state.submitted && <p className={"submission col-sm-4 center"} id={"submitMessage"}>
                                {"E-mail successfully sent."}</p>}
                            <FormGroup row>
                                <div className={"col-sm-12 col-md-6 center"}>
                                    <Label>Name: (required) </Label>
                                    <Input onChange={e => this.setState(byPropKey('name', e.target.value))}
                                           value={info.name}
                                           type={"text"}
                                           className={""}
                                           id={"contactName"}
                                           autoComplete={'name'}
                                            name="Name"/>
                                </div>
                            </FormGroup>

                            <FormGroup row>
                                <div className={"col-sm-12 col-md-6 center"}>
                                    <Label>Email: (required)</Label>
                                    <Input onChange={e => this.setState(byPropKey('email', e.target.value))}
                                           value={info.email}
                                           type={"email"}
                                           className={""}
                                           id={"contactEmail"}
                                           autoComplete={'email'}
                                           name="Email"/>
                                </div>
                            </FormGroup>

                            <FormGroup row>
                                <div className={"col-sm-12 col-md-10 center"}>
                                    <Label>Message: (required)</Label>
                                    <Input onChange={e => this.setState(byPropKey('message', e.target.value))}
                                           value={info.message}
                                           type={"textarea"}
                                           className={""}
                                           id={"contactMessage"}
                                           autoComplete={'message'}
                                           name="Message"/>
                                </div>
                            </FormGroup>

                            <br/>
                            <Button disabled={isDisabled}
                                    className={"col-sm-4"}
                                    type="submit"
                                    color={"primary"}>Send</Button>
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Help;