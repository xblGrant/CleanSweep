import React from 'react';
import Login from './Login';
import NavigationBar from './NavigationBar';

import 'bootstrap/dist/css/bootstrap.css';
import './css/custom.css';

function App(){
    return(
        <div>
            <NavigationBar />
            <Login />
        </div>
    )
}

export default App;