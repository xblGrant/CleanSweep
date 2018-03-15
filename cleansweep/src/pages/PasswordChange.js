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
            <Form id={"pwChangeForm"} onSubmit={this.onSubmit}>
                <FormGroup>
                    <Input id={"pwChange"}
                           value={passwordOne}
                           onChange={e => this.setState(byPropKey('passwordOne', e.target.value))}
                           type={"password"}
                           placeholder={"New Password"}
                    />
                </FormGroup>
                <FormGroup>
                    <Input id={"pwChange"}
                           value={passwordTwo}
                           onChange={e => this.setState(byPropKey('passwordTwo', e.target.value))}
                           type={"password"}
                           placeholder={"Confirm New Password"}
                    />
                </FormGroup>
                <Button id={"changePwBtn"}
                        disabled={isInvalid}
                        color={"primary"}
                        type={"submit"}>
                    Reset Password
                </Button>
                {error && <p>{error.message}</p>}
            </Form>
        )
    }
}

export default PasswordChange;