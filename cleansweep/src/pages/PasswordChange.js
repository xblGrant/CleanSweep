import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';

import {auth} from '../firebase/index';

const byPropKey = (propName, value) => () => ({
    [propName]: value,
});

const INITIAL_STATE = {
    passwordOld: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class PasswordChange extends React.Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = (e) => {
        const {passwordOne} = this.state;

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState(() => ({...INITIAL_STATE}));
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        e.preventDefault();
    }

    render() {
        const {
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '';

        return (
            <Form className={"margin-top-02"} onSubmit={this.onSubmit}>
                {error && <p type={"error"} className={"error"}>{error.message}</p>}
                <FormGroup>
                    <Input className={"margin-left-35 width-30"}
                           id={"pwChange"}
                           value={passwordOne}
                           onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                           type={"password"}
                           placeholder={"New Password"}
                    />
                </FormGroup>
                <FormGroup>
                    <Input className={"margin-left-35 width-30"}
                           id={"pwChange"}
                           value={passwordTwo}
                           onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                           type={"password"}
                           placeholder={"Confirm New Password"}
                    />
                </FormGroup>
                <Button className={"margin-left-35"}
                        id={"changePwBtn"}
                        disabled={isInvalid}
                        color={"primary"}
                        type={"submit"}>
                    Reset Password
                </Button>
            </Form>
        )
    }
}

export default PasswordChange;