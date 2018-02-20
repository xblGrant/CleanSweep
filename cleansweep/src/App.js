import React, {Component} from 'react';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <head>
                    <title>Clean Sweep</title>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link rel="stylesheet" href="assets/css/main.css" />

                </head>
                <h2>Login Page</h2>
                <div class="container">
                    <form>
                        <div class="row">
                            <div class="four columns">
                                <label>User Name: </label>
                            </div>
                            <div class="eight columns">
                                <input name="username" id="username"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="four columns">
                                <label>Password: </label>
                            </div>
                            <div class="eight columns">
                                <input name="userpass" id="userpass" type="password"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="twelve columns">
                                <button class="btn btn-default" type="submit">Log In</button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

export default App;