import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCX6lW8cyFrg31yRoqIYxnOhAYxWxwnUZE",
    authDomain: "cleansweep-9772a.firebaseapp.com",
    databaseURL: "https://cleansweep-9772a.firebaseio.com",
    projectId: "cleansweep-9772a",
    storageBucket: "cleansweep-9772a.appspot.com",
    messagingSenderId: "184700733672"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth,
};