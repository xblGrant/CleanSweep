import React from 'react';
import { Button, Label, Form } from 'reactstrap';
import { WrappedButton, SignOutButton } from './Buttons';
import { firebase } from "../firebase/index";

class Header extends React.Component{
    constructor(props){
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
            userRef.once('value', function(currentUser) {
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
            button = <WrappedButton id={"headerBtn"} isOutlined={true} link={"/login"} name={"Login"}/>
        } else {
            button = <SignOutButton id={"headerBtn"}/>
        }

        return (
            <div className={"ml-auto"}>
                <Form id={"header"} inline>
                    <Label id={"labelHello"} for={"userLink"} size={"sm"}>Hello,</Label>{' '}
                    <Button id={"userLink"} color={"link"} size={"sm"}>{this.state.user}</Button>
                    <div id={"headerLogin"}>
                        {button}
                    </div>
                </Form>
            </div>
        );
    }
}

Header.defaultProps = {
    isAuthUser: false
};

export default Header;