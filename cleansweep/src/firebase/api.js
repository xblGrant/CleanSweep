//User API

import {auth, firebase} from "./index";
import * as routes from "../constants/routes";

// authentication
export const login = (current, email, password, history) => {
    const INITIAL_STATE = {
        email: '',
        password: '',
        error: null,
    };

    auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
            current.setState(() => ({...INITIAL_STATE}));
            history.push(routes.ASSIGNED_ROOMS);  //TODO: redirect to a better page than the same page
        })
        .catch(error => {
            current.setState(byPropKey('error', error));
        });
};
export const passwordUpdate = (current, password) => {
    const INITIAL_STATE = {
        passwordOld: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    };

    auth.doPasswordUpdate(password)
        .then(() => {
            this.setState(() => ({...INITIAL_STATE}));
        })
        .catch(error => {
            this.setState(byPropKey('error', error));
        });
};
export const passwordReset = (current, email) => {
    const INITIAL_STATE = {
        email: '',
        error: null,
    };

    auth.doPasswordReset(email)
        .then(() => {
            this.setState(() => ({...INITIAL_STATE}));
        })
        .catch(error => {
            this.setState(byPropKey('error', error));
        });
};
export const signUp = (current, email, password, userName, history) => {
    const INITIAL_STATE = {
        userName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    };

    auth.doCreateUserWithEmailAndPassword(email, password)
        .then(() => {
            let employeeRef = firebase.db.ref("/Employee/");
            employeeRef.child(firebase.auth.currentUser.uid)
                .set({
                    username: userName,
                    email: email,
                    isAdmin: false
                });

            current.setState(() => ({...INITIAL_STATE}));
            history.push(routes.ASSIGNED_ROOMS); //TODO: push to proper page for after signup/login
        })
        .catch(error => {
            current.setState(byPropKey('error', error));
        });
};

// functions used with react-selectable-fast element
export const getAllEmployees = (current) => {
    let employeeList = [];
    let empRef = firebase.db.ref("/Employee");
    empRef.orderByKey().once('value', function (allEmployees) {
        allEmployees.forEach(function (employee) {
            employeeList.push(
                [employee.val().username,
                    employee.val().email,
                    null,
                    null
                ]
            );
        })
    }).then(() =>
        current.setState({
            employees: employeeList
        })
    );
};
export const getAllRooms = (current) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().guest,
                        assigned,
                        isReservable
                    ]
                );
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            "n/a",
                            assigned,
                            !isReservable
                        ]
                    );
                })
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            })
        )
    });
};
export const getAssignedRooms = (current) => {
    let roomList = [];
    let isReservable = true;
    let user = null;
    let currentUser = firebase.auth.currentUser;
    if (currentUser !== null) {
        user = currentUser.uid;
    }
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (user === room.val().assignedEmployee) {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            true,
                            isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (user === room.val().assignedEmployee) {
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                "n/a",
                                true,
                                !isReservable
                            ]
                        );
                    }
                })
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            }));
    });
};
export const getAvailableRooms = (current) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().isReservable === true) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            assigned,
                            isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        current.setState({
            rooms: roomList
        });
    });
};
export const getInspectRooms = (current) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                // TODO: need to confirm how we determine a room needs to be inspected  (guest = none? & isReservable = false?)
                if (room.val().incident === false && room.val().status === 'Clean') {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            assigned,
                            isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        current.setState({
            rooms: roomList
        });
    });
};
export const getRoomsWithIncidents = (current) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().incident === true) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            assigned,
                            isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().incident === true) {
                        let assigned = (room.val().assignedEmployee !== 'none');
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                "n/a",
                                assigned,
                                !isReservable
                            ]
                        );
                    }
                })
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            }));
    });
};
export const getRoomsWithWakeUpCalls = (current) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().wakeupCall !== 'none') {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            assigned,
                            isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        current.setState({
            rooms: roomList
        });
    });
};
export const getRoomsWithDepartingGuests = (current) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;
    if (mm < 10)
        mm = '0' + mm;

    today = mm + '/' + dd + '/' + yyyy;

    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().departureDate === today) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            assigned,
                            isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        current.setState({
            rooms: roomList
        })
    });
};
export const getAllUnassignedSelectableRooms = (current) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().assignedEmployee === 'none') {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            "n/a",
                            false,
                            !isReservable
                        ]
                    );
                }
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().assignedEmployee === 'none') {
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                "n/a",
                                false,
                                isReservable
                            ]
                        );
                    }
                })
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            })
        )
    });
};
export const getAllUnassignedSelectableRoomsByFloor = (current, floor) => {
    let roomList = [];
    let isReservable = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().assignedEmployee === 'none') {
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        "n/a",
                        false,
                        isReservable
                    ]
                );
            }
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().assignedEmployee === 'none') {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            "n/a",
                            false,
                            !isReservable
                        ]
                    );
                }
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            })
        )
    })
};
export const clearRoomAssignments = (current) => {
    let roomPath;
    let updates = {};
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                roomPath = 'Rooms/' + floors.key.toString() + '/' + allRooms.key.toString() + '/' + room.key.toString() + '/';
                updates[roomPath + 'assignedEmployee'] = "none";
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    roomPath = 'Rooms/' + floors.key.toString() + '/' + allRooms.key.toString() + '/' + room.key.toString() + '/';
                    updates[roomPath + 'assignedEmployee'] = "none";
                })
            })
        }).then(() => {
                firebase.db.ref().update(updates);
                getAllUnassignedSelectableRooms(current);
            }
        );
    })
};

// functions to get list of just room keys
export const getListofAllRooms = (current) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                roomList.push(room.key);
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    roomList.push(room.key);
                })
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            })
        )
    });
};
export const getListofAllRoomsByFloor = (current, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            roomList.push(room.key);
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                roomList.push(room.key);
            })
        }).then(() => {
            current.setState({
                rooms: roomList
            })
        })
    })
};
export const getListofAllReservableRooms = (current) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().guest !== 'none')
                    roomList.push(room.key);
            })
        })
    }).then(() =>
        current.setState({
            rooms: roomList
        })
    )
};
export const getListofAllReservableRoomsByFloor = (current, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().guest !== 'none')
                roomList.push(room.key);
        })
    }).then(() =>
        current.setState({
            rooms: roomList
        })
    )
};
export const getListofAllRoomsNeedInspected = (current) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (!room.val().incident && room.val().status === 'Clean')
                    roomList.push(room.key);
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (!room.val().incident && room.val().status === 'Clean'
                        && room.val().guest === 'none' && !room.val().isReservable)
                        roomList.push(room.key);
                })
            })
        }).then(() =>
            current.setState({
                rooms: roomList
            })
        )
    });
};
export const getListofAllRoomsNeedInspectedByFloor = (current, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (!room.val().incident && room.val().status === 'Clean')
                roomList.push(room.key);
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (!room.val().incident && room.val().status === 'Clean'
                    && room.val().guest === 'none' && !room.val().isReservable)
                    roomList.push(room.key);
            })
        }).then(() => {
            current.setState({
                rooms: roomList
            })
        })
    })
};

// room information
export const getReservableRoomInformation = (current, roomID) => {
    let updates = {};
    let incidentsList = [];
    let hasIncident = false;

    //search reservable rooms to find matching room
    let ReservableRef = firebase.db.ref("/Rooms/Reservable/");
    ReservableRef.orderByKey().once('value', function (allFloors) {
        allFloors.forEach(function (floor) {
            floor.forEach(function (room) {
                if (room.key === roomID) {
                    updates.roomType = 'Reservable';
                    updates.roomID = room.key;
                    updates.floorNum = floor.key;
                    updates.assignedEmployee = room.val().assignedEmployee;
                    updates.departureDate = room.val().departureDate;
                    updates.guest = room.val().guest;
                    updates.isReservable = room.val().isReservable;
                    updates.wakeupCall = room.val().wakeupCall;
                    updates.status = room.val().status;
                    if (room.val().incident)
                        hasIncident = true;
                }
            })
        })
    }).then(() => {
        current.setState(updates);

        if (hasIncident) {
            let IncidentsRef = firebase.db.ref("/Incidents/" + roomID);
            IncidentsRef.orderByKey().startAt("2").once('value', function (room) {
                room.forEach(function (incident) {
                    incidentsList.push(incident.val());
                })
            }).then(() => {
                current.setState({incidents: incidentsList});
            });
        }
    });
};
export const getNonReservableRoomInformation = (current, roomID) => {
    let updates = {};
    let incidentsList = [];
    let hasIncident = false;

    let NonReservableRef = firebase.db.ref("/Rooms/NonReservable/");
    NonReservableRef.orderByKey().once('value', function (allFloors) {
        allFloors.forEach(function (floor) {
            floor.forEach(function (room) {
                if (room.key === roomID) {
                    updates.roomType = 'NonReservable';
                    updates.roomID = room.key;
                    updates.floorNum = floor.key;
                    updates.assignedEmployee = room.val().assignedEmployee;
                    updates.status = room.val().status;
                    if (room.val().incident)
                        hasIncident = true;
                }
            })
        })
    }).then(() => {
        current.setState(updates);

        if (hasIncident) {
            let IncidentsRef = firebase.db.ref("/Incidents/" + roomID);
            IncidentsRef.orderByKey().startAt("2").once('value', function (room) {
                room.forEach(function (incident) {
                    incidentsList.push(incident.val());
                })
            }).then(() => {
                current.setState({incidents: incidentsList});
            });
        }
    });
};

// new room
export const generateNewRoomNumber = (current) => {
    const radix = 10;
    let lastRoom = null;
    let roomRef = firebase.db.ref("/Rooms/Reservable/100");
    roomRef.orderByKey().limitToLast(1).once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            lastRoom = room.key;
        })
    }).then(() => {
        current.setState({
            newRoomNumber: parseInt(lastRoom, radix) + 1
        })
    });
};
export const newRoomFloorSelect = (current, floor) => {
    const radix = 10;
    let lastRoom = null;
    /* Rooms/Reservable is a path in the database e.target.value is the associated floor the user clicks on
    when calling firebase.db.ref, the whole string will get all the rooms on a given floor */
    let floorRef = firebase.db.ref("/Rooms/Reservable/" + floor);

    /* orderByKey orders rooms on the floor alphabetically to avoid issues with asynchronous access to the
    database, need to use once().then() together .once() returns a promise which .then() waits for to execute,
    otherwise newRoomNumber would be set to null because of how asynchronous accessing works snapshot refers to
    the floor, childSnapshot refers to each room on the floor calling val() is necessary to get values out of
    the objects, room is the item that stores the room # once the asynchronous access to the database has
    returned a value, the then() part of the code is called */
    floorRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (room) {
            lastRoom = room.key;
        })
    }).then(() => {
        current.setState({
            newRoomNumber: parseInt(lastRoom, radix) + 1
        })
    });
};

// assign rooms
export const assignRooms = (current) => {
    //TODO: pass in proper parameters, such as room path and selected employee
    // let roomPath, employee;
    // let updates = {};
    // roomPath = 'Rooms/Reservable/100/101/';
    // employee = "Yoyo";
    // updates[roomPath + 'assignedEmployee'] = employee;
    // firebase.db.ref().update(updates);

    //calling getAllRooms gets the system to update the list
    getAllUnassignedSelectableRooms(current);
};

// check in
export const checkInGuest = (current, firstName, lastName, roomPath, roomNum) => {
    let updates = {};
    updates[roomPath + 'guest'] = firstName + " " + lastName;
    firebase.db.ref().update(updates);

    const radix = 10;

    //Adds Guest to guest DB
    //TODO: properly generate the next number for guest, coming up undefined right now
    let lastGuest = null;
    let roomRef = firebase.db.ref("/Guests/");
    roomRef.orderByKey().limitToLast(1).once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            lastGuest = room.key;
        })
    }).then(() => {
        current.setState({
            newGuestNumber: parseInt(lastGuest, radix) + 1
        })
    });
    firebase.db.ref('Guests/' + this.newGuestNumber).set({
        firstName: firstName,
        lastName: lastName,
        room: roomNum
    })
};

// misc
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});
