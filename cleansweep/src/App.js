import React from 'react';
import Login from './Login';
import NavigationBar from './NavigationBar';

import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';
import SignUp from "./Signup";

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loginPage: true,
            signUpPage: false
        };

        this.handleLoginPage = this.handleLoginPage.bind(this);
        this.handleSignUpPage = this.handleSignUpPage.bind(this);
    }

    handleLoginPage() {
        this.setState({
            loginPage: true,
            signUpPage: false
        });
    }

    handleSignUpPage() {
        this.setState({
            loginPage: false,
            signUpPage: true
        });
    }

    render(){
        const loginPageStatus = this.state.loginPage;
        const signUpPageStatus = this.state.signUpPage;
        let entryPage;

        if (loginPageStatus){
            entryPage = <Login handleSignUpPage={this.handleSignUpPage}/>
        } else if (signUpPageStatus){
            entryPage = <SignUp handleLoginPage={this.handleLoginPage}/>
        }

        return(
            <div>
                <NavigationBar handleLoginPage={this.handleLoginPage}/>
                {entryPage}
            </div>
        )
    }
}

export default App;