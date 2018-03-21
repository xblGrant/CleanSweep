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
            button = <WrappedButton className={"center"} isOutlined={true} link={"/login"} name={"Login"}/>
        } else {
            button = <SignOutButton className={"center"}/>
        }

        return (
            <div className={"ml-auto"}>
                <Form id={"header"} inline>
                    <Label for={"userLink"} size={"sm"}>Hello,</Label>{' '}
                    <Button id={"userLink"} className={"color1 center"} color={"link"} size={"sm"}>{this.state.user}</Button>
                    <div>
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