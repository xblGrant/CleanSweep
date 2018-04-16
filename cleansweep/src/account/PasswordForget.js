import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import * as api from '../firebase/api';
import {Helmet} from "react-helmet";

const PasswordForgetPage = () =>
    <div>
        <Helmet>
            <title>Password Forget</title>
            <body className={"background-to-bottom"}/>
        </Helmet>
        <PasswordForgetForm/>
    </div>;

const byPropKey = (propName, value) => () => ({
    [propName]: value,
});

const INITIAL_STATE = {
    email: '',
    error: null,
};

class PasswordForgetForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (e) => {
        const {email} = this.state;
        api.passwordReset(this, email);
        e.preventDefault();
    };

    render() {
        const {
            email,
            error
        } = this.state;

        const isInvalid = email === '';

        return (
            <div className={"container"}>
                <div className={"center col-sm-6"}>
                    <Form onSubmit={this.onSubmit}>
                        <h4 className={"center"}>Password Forget</h4>
                        {error && <p typeof={"error"} className={"error col-sm-4 center"} id={"error"}>{error.message}</p>}
                        <br/><br/>
                            <div className={"center col-sm-4 col-md-12"}>
                                <FormGroup>
                                    <Input
                                        id={"emailAddress"}
                                        value={this.state.email}
                                        onChange={e => this.setState(byPropKey('email', e.target.value))}
                                        type={"text"}
                                        placeholder={"Email Address"}/>
                                </FormGroup>
                            </div>
                            <Button className={"center"}
                                    color={"primary"}
                                    disabled={isInvalid} type={"submit"}>
                                Reset Password
                            </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

const PasswordForgetLink = () =>
    <p className={"center"}>
        <Link to={"/pwforget"}>Forgot Password?</Link>
    </p>;

export default PasswordForgetPage;
export {
    PasswordForgetForm,
    PasswordForgetLink
}