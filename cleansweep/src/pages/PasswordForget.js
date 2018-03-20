import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Form, FormGroup, Input} from 'reactstrap';

import {auth} from '../firebase/index';

const PasswordForgetPage = () =>
    <div>
        <h4>Password Forget</h4>
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

        auth.doPasswordReset(email)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        e.preventDefault();
    };

    render() {
        const {
            email,
            error
        } = this.state;

        const isInvalid = email === '';

        return (
            <Form onSubmit={this.onSubmit} id={"pwForgetForm"}>
                {error && <p type={"error"} className={"error"} id={"error"}>{error.message}</p>}
                <FormGroup>
                    <Input
                        id={"emailAddress"}
                        value={this.state.email}
                        onChange={e => this.setState(byPropKey('email', e.target.value))}
                        type={"text"}
                        placeholder={"Email Address"}
                    />
                </FormGroup>
                <Button id={"pwForgetBtn"}
                        color={"primary"}
                        disabled={isInvalid} type={"submit"}>
                    Reset Password
                </Button>
            </Form>
        )
    }
}

const PasswordForgetLink = () =>
    <p className={"margin-left-35"}>
        <Link to={"/pwforget"}>Forgot Password?</Link>
    </p>;

export default PasswordForgetPage;
export {
    PasswordForgetForm,
    PasswordForgetLink
}