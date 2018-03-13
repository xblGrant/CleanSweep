import { db } from './firebase';

//User API

// export const getAvailableRooms = () => {
//     let roomList = [];
//     let ref = db.ref("/Rooms/Reservable");
//
//     ref.orderByKey().once('value', function (allFloors) {
//         allFloors.forEach(function (floor) {
//             floor.forEach(function (rooms) {
//                 if (rooms.val().guest === "none")
//                     roomList.push(rooms.val().room);
//             })
//         })
//     }).then( () => {
//         return roomList
//     });
// };
//
// export const getUnavailableRooms = () => {
//     let roomList = [];
//     let ref = db.ref("/Rooms/Reservable");
//
//     ref.orderByKey().once('value', function(allFloors) {
//         allFloors.forEach( function(floors) {
//             floors.forEach( function(rooms) {
//                 if (rooms.val().guest !== "none")
//                     roomList.push(rooms.val().room);
//             })
//         })
//     }).then( () => {
//         return roomList
//     });
// };
//
// export const doCreateUser = (id, username, email) =>
//   db.ref(`users/${id}`).set({
//     username,
//     email,
//   });
//
// export const onceGetUsers = () =>
//   db.ref('users').once('value');