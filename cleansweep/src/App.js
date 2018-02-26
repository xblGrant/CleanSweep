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
            signUpPage: false,
            isLoggedIn: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.toLoginPage = this.toLoginPage.bind(this);
        this.toSignUpPage = this.toSignUpPage.bind(this);
    }

    handleLogin() {
        // handle login here
        this.setState({
            isLoggedIn: true
        });
    }

    handleLogout() {
        // handle logout here
        this.setState({
            isLoggedIn: false
        });
    }

    toLoginPage() {
        this.setState({
            loginPage: true,
            signUpPage: false
        });
    }

    toSignUpPage() {
        this.setState({
            loginPage: false,
            signUpPage: true
        });
    }

    render(){
        const useLoginPage = this.state.loginPage;
        const useSignUpPage = this.state.signUpPage;
        const loggedIn = this.state.isLoggedIn;
        let displayPage;

        if (loggedIn){
            displayPage = null;
        } else if (useLoginPage){
            displayPage = <Login handleLogin={this.handleLogin} toSignUpPage={this.toSignUpPage}/>
        } else if (useSignUpPage){
            displayPage = <SignUp toLoginPage={this.toLoginPage}/>
        }

        return(
            <div>
                <NavigationBar handleLogout={this.handleLogout}  toLoginPage={this.toLoginPage} isLoggedIn={loggedIn}/>
                {displayPage}
            </div>
        )
    }
}

export default App;