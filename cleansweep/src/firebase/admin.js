import * as admin from 'firebase-admin';
let certificate = require('./credential.json');

admin.initializeApp({
    credential: admin.credential.cert(certificate),
    databaseURL: "https://cleansweep-9772a.firebaseio.com"
});

export {
    admin
};
