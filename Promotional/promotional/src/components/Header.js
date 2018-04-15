import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Label, Form} from 'reactstrap';
import {WrappedButton, SignOutButton} from './Buttons';
import * as routes from '../constants/routes';
import * as api from '../firebase/api';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: "Guest"
        };
    }

    componentDidMount() {
        let currentUser = api.getCurrentUser();
        api.getCurrentUserName(this, currentUser);
    }

    render() {
        // TODO: Check currently signed in user
        // TODO: Add Logout functionality

        let authorized = this.props.isAuthUser;

        let button;
        if (!authorized) {
            button = <WrappedButton id={"login"} className={"center"} isOutlined={true} link={"/login"} name={"Login"}/>
        } else {
            button = <SignOutButton className={"center"}/>
        }

        return (
            <div className={"ml-auto"}>
                <Form id={"header"} inline>
                    <Label className={"noMargin"} for={"userLink"} size={"sm"}>Hello,</Label>{' '}
                    <Link to={routes.ASSIGNED_ROOMS}>
                        <Button id={"userLink"} className={"center"} color={"link"}
                                size={"sm"}>{this.state.currentUser}</Button>
                    </Link>
                    <div>
                        {button}
                    </div>
                </Form>
            </div>
        )
            ;
    }
}

Header.defaultProps = {
    isAuthUser: false
};

export default Header;