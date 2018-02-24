import React from 'react';
import Login from './Login';
import Header from './Header';
import NavigationBar from './NavigationBar';

import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';

function App(){
    return(
        <div>
            <Header />
            <NavigationBar />
            <Login />
        </div>
    )
}

export default App;