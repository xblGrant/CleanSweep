import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Label, Form} from 'reactstrap';
import {WrappedButton, SignOutButton} from './Buttons';
import {firebase} from "../firebase/index";
import * as routes from '../constants/routes';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: "Guest"
        };
    }

    componentDidMount() {
        let currentUser = firebase.auth.currentUser;
        if (currentUser !== null) {
            let username = null;
            let userRef = firebase.db.ref("/Employee/" + currentUser.uid);
            userRef.once('value', function (currentUser) {
                username = currentUser.val().username;
            }).then(() => {
                this.setState({
                    user: username
                })
            })
        }
    }

    render() {
        // TODO: Check currently signed in user
        // TODO: Add Logout functionality

        let authorized = this.props.isAuthUser;

        let button;
        if (!authorized) {
            button = <WrappedButton className={"center"} isOutlined={true} link={"/login"} name={"Login"}
                                    id={"wrappedButton"}/>
        } else {
            button = <SignOutButton className={"center"}/>
        }

        return (
            <div className={"ml-auto"}>
                <Form id={"header"} inline>
                    <Label for={"userLink"} size={"sm"}>Hello,</Label>{' '}
                    <Link to={routes.ASSIGNED_ROOMS}>
                        <Button id={"userLink"} className={"color1 center"} color={"link"}
                                size={"sm"}>{this.state.user}</Button>
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