import * as auth from './auth';
import * as db from './api';
import * as firebase from './firebase';
import * as tempFirebase from 'firebase';

const SecondaryConfig = {
    apiKey: "AIzaSyCX6lW8cyFrg31yRoqIYxnOhAYxWxwnUZE",
    authDomain: "cleansweep-9772a.firebaseapp.com",
    databaseURL: "https://cleansweep-9772a.firebaseio.com"
};

let secondApp = tempFirebase.initializeApp(SecondaryConfig, "Secondary");


export {
    auth,
    db,
    firebase,
    secondApp,
};