import React from 'react';

function HelloUser(props) {
    return <h1>Hello, {props.name}</h1>;
}

class LogButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {isLoggedIn: false};

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(prevState => ({
            isLoggedIn: !prevState.isLoggedIn
        }));
    }

    render() {
        return(
            <button onClick={this.handleClick}>
                {this.state.isLoggedIn ? 'Login' : 'Logout'}
            </button>
        );
    }
}

// npm install --save react-menu-bar
// need to look into this.