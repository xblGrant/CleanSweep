import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="App">
                <head>
                    <title>Clean Sweep</title>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1"/>

                </head>
                <h2>Login Page</h2>
                <div className="container">
                    <form>
                        <div className="row">
                            <div className="four columns">
                                <label>User Name: </label>
                            </div>
                            <div className="eight columns">
                                <input name="username" id="username"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="four columns">
                                <label>Password: </label>
                            </div>
                            <div className="eight columns">
                                <input name="userpass" id="userpass" type="password"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="twelve columns">
                                <button className="btn btn-default" type="submit">Log In</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
            < /div>
        );
    }
}
export default Login;