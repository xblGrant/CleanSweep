import React from 'react';
import '.assets/css/main.css';

function Login() {
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
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">
                To get started, edit <code>src/App.js</code> and save to reload.
            </p>
        </div>
    );
}

export default LogIn;