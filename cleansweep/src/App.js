import React from 'react';
import Login from './Login';

class App extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

    render(){
        return(
            <Login handleLogin={this.handleLogin}/>
        );
    }
}

export default App;