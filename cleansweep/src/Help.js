import React from 'react';
import PropTypes from 'prop-types';

class HelpButton extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="twelve columns">
                    {/*<button onClick={this.handleLogin} className="btn btn-default" type="submit">Login</button>*/}
                </div>
            </div>
        );
    }

}

function Help() {
    return (
        <div className="App">
            <head>
                <title>Clean Sweep</title>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </head>
            <h2>Help Page</h2>
            <div className="container">
                {/*<LoginForm />*/}
            </div>
        </div>
    );
}

export default Help;