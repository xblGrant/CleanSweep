//User API

import {auth, firebase, secondApp} from "./index";
import * as routes from "../constants/routes";
//secondApp is a second auth instance that should be only used for creation of a new employee while someone is already logged in.

// authentication
export const login = (that, email, password, history) => {
    const INITIAL_STATE = {
        email: '',
        password: '',
        error: null,
    };

    auth.doSignInWithEmailAndPassword(email, password)
        .then(() => {
            that.setState(() => ({...INITIAL_STATE}));
            history.push(routes.ASSIGNED_ROOMS);  //TODO: redirect to a better page than the same page
        })
        .catch(error => {
            that.setState(byPropKey('error', error));
        });
};
export const passwordUpdate = (that, password) => {
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
export const passwordReset = (that, email) => {
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

export const handleNewEmployee = (that, email, password, userName, history) => {
    const INITIAL_STATE = {
        userName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    };

    secondApp.auth().createUserWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
            let employeeRef = firebase.db.ref("/Employee/");
            employeeRef.child(firebaseUser.uid)
                .update({
                    username: userName,
                    email: email,
                    isAdmin: false
                });

            that.setState(() => ({...INITIAL_STATE}));
            secondApp.auth().signOut();
        })
        .catch(error => {
            that.setState(byPropKey('error', error));
        });
};
export const handleNewManager = (that, email, password, userName, history) => {
    const INITIAL_STATE = {
        userName: '',
        email: '',
        passwordOne: '',
        passwordTwo: '',
        error: null,
    };

    secondApp.auth().createUserWithEmailAndPassword(email, password)
        .then((firebaseUser) => {
            let employeeRef = firebase.db.ref("/Employee/");
            employeeRef.child(firebaseUser.uid)
                .update({
                    username: userName,
                    email: email,
                    isAdmin: true
                });

            that.setState(() => ({...INITIAL_STATE}));
            secondApp.auth().signOut();
        })
        .catch(error => {
            that.setState(byPropKey('error', error));
        });
};

export const signUp = (that, email, password, userName, history) => {
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

            that.setState(() => ({...INITIAL_STATE}));
            history.push(routes.ASSIGNED_ROOMS); //TODO: push to proper page for after signup/login
        })
        .catch(error => {
            that.setState(byPropKey('error', error));
        });
};
export const getCurrentUser = () => {
    return firebase.auth.currentUser;
};
export const getCurrentUserName = (that, currentUser) => {
    if (currentUser !== null) {
        let username = null;
        let userRef = firebase.db.ref("/Employee/" + currentUser.uid);
        userRef.once('value', function (currentUser) {
            username = currentUser.val().username;
        }).then(() => {
            that.setState({currentUser: username});
        })
    }
};
export const getCurrentUserIsAdmin = (that) => {
    let currentUser = getCurrentUser();
    if (currentUser != null) {
        let isAdmin = false;
        let userRef = firebase.db.ref("/Employee/" + currentUser.uid);
        userRef.once('value', function (currentUser) {
            isAdmin = currentUser.val().isAdmin;
        }).then(() => {
            that.setState({
                isAdmin: isAdmin,
            });
        })
    }
};
export const getCurrentUserIsAdminRole = (that) => {
    let currentUser = getCurrentUser();
    if (currentUser != null) {
        let isAdmin = false;
        let userRef = firebase.db.ref("/Employee/" + currentUser.uid);
        userRef.once('value', function (currentUser) {
            isAdmin = currentUser.val().isAdmin;
        }).then(() => {
            let role;
            (isAdmin) ? role = "admin" : role = "employee";
                
            that.setState({
                isAdmin: isAdmin,
                role: role
            });
        })
    } else{
        that.setState({
            isAdmin: false,
            role: "guest"
        })
    }
};

// functions used with react-selectable-fast element
export const getAllEmployees = (that) => {
    let employeeList = [[null, null, null]];
    let empRef = firebase.db.ref("/Employee");
    empRef.orderByKey().once('value', function (allEmployees) {
        allEmployees.forEach(function (employee) {
            employeeList.push(
                [employee.key,
                    employee.val().username,
                    employee.val().email,
                ]
            );
        })
    }).then(() =>
        that.setState({
            employees: employeeList
        })
    );
};
export const getAllRooms = (that) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        !isReservableRoom,
                        allRooms.key]
                );
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            isReservableRoom,
                            allRooms.key]
                    );
                })
            })
        }).then(() => {
                that.setState({
                    rooms: roomList
                });
            }
        )
    });
};
export const getAllRoomsByFloor = (that, floor) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            let assigned = (room.val().assignedEmployee !== 'none');
            roomList.push(
                [room.key,
                    room.val().status,
                    room.val().incident,
                    room.val().inspect,
                    room.val().guest,
                    room.val().wakeupCall,
                    assigned,
                    !isReservableRoom,
                    allRooms.key]
            );
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        isReservableRoom,
                        allRooms.key]);
            })
        }).then(() => {
            that.setState({
                rooms: roomList
            })
        })
    })
};
export const getAssignedRooms = (that) => {
    let roomList = [];
    let user = null;
    let isReservableRoom = true;
    let currentUser = firebase.auth.currentUser;
    if (currentUser !== null) {
        user = currentUser.uid;
    }
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (user === room.val().assignedEmployee) {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            true,
                            !isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (user === room.val().assignedEmployee) {
                        roomList.push(
                            [room.key,
                                room.val().status,
                                room.val().incident,
                                room.val().inspect,
                                room.val().guest,
                                room.val().wakeupCall,
                                true,
                                isReservableRoom,
                                allRooms.key]
                        );
                    }
                })
            })
        }).then(() => {
            that.setState({
                rooms: roomList
            })
        });
    });
};
export const getAssignedRoomsByFloor = (that, floor) => {
    let roomList = [];
    let user = null;
    let isReservableRoom = true;
    let currentUser = firebase.auth.currentUser;
    if (currentUser !== null) {
        user = currentUser.uid;
    }
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (user === room.val().assignedEmployee) {
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        true,
                        !isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (user === room.val().assignedEmployee) {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            true,
                            isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        }).then(() => {
            that.setState({
                rooms: roomList
            })
        })
    })
};
export const getAvailableRooms = (that) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().guest === false && room.val().status === 'Clean' && room.val().inspect === false) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        });
    });
};
export const getAvailableRoomsByFloor = (that, floor) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().guest === false && room.val().status === 'Clean' && room.val().inspect === false) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};
export const getInspectRooms = (that) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().inspect === true) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        });
    });
};
export const getInspectRoomsByFloor = (that, floor) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().inspect === true) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        });
    });
};
export const getRoomsWithIncidents = (that) => {
    let roomList = [];
    let isReservableRoom = true;
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
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            isReservableRoom,
                            allRooms.key]
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
                                room.val().guest,
                                room.val().wakeupCall,
                                assigned,
                                !isReservableRoom,
                                allRooms.key]
                        );
                    }
                })
            })
        }).then(() =>
            that.setState({
                rooms: roomList
            }));
    });
};
export const getRoomsWithIncidentsByFloor = (that, floor) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().incident === true) {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().incident === true) {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            !isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        }).then(() =>
            that.setState({
                rooms: roomList
            }));
    });
};
export const getRoomsWithWakeUpCalls = (that) => {
    let roomList = [];
    let RoomDateArr = null;
    let RoomDate = null;
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                //splits the wakeupcall into two pices. 00/00/00 & 00:00 portion
                //parses each section into how many milliseconds passed from 1970 00:00
                //in order for easy testing.
                if (room.val().wakeupCall !== 'none') {
                    RoomDateArr = room.val().wakeupCall.split('-');
                    RoomDate = new Date(RoomDateArr[0] + RoomDateArr[1]);
                    if (Date.parse(RoomDate) < Date.now())
                        firebase.db.ref("/Rooms/Reservable/" + allRooms.key.toString()
                            + "/" + room.key.toString() + "/")
                            .update({
                                wakeupCall: 'none'
                            });
                }
                if (room.val().wakeupCall !== 'none') {
                    let assigned = (room.val().assignedEmployee !== 'none');
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        });
    });
};
export const getRoomsWithWakeUpCallsByFloor = (that, floor) => {
    let roomList = [];
    let RoomDateArr = null;
    let RoomDate = null;
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            //splits the wakeupcall into two pices. 00/00/00 & 00:00 portion
            //parses each section into how many milliseconds passed from 1970 00:00
            //in order for easy testing.
            if (room.val().wakeupCall !== 'none') {
                RoomDateArr = room.val().wakeupCall.split('-');
                RoomDate = new Date(RoomDateArr[0] + RoomDateArr[1]);
                if (Date.parse(RoomDate) < Date.now())
                    firebase.db.ref("/Rooms/Reservable/" + allRooms.key.toString()
                        + "/" + room.key.toString() + "/")
                        .update({
                            wakeupCall: 'none'
                        });
            }
            if (room.val().wakeupCall !== 'none') {
                let assigned = (room.val().assignedEmployee !== 'none');
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        });
    });
};
export const getAllUnassignedSelectableRooms = (that) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().assignedEmployee === 'none') {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            false,
                            !isReservableRoom,
                            allRooms.key]
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
                                room.val().inspect,
                                room.val().guest,
                                room.val().wakeupCall,
                                false,
                                isReservableRoom,
                                allRooms.key]
                        );
                    }
                })
            })
        }).then(() =>
            that.setState({
                rooms: roomList
            })
        )
    });
};
export const getAllUnassignedSelectableRoomsByFloor = (that, floor) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().assignedEmployee === 'none') {
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        false,
                        !isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().assignedEmployee === 'none') {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            false,
                            isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        }).then(() => {
            that.setState({
                rooms: roomList
            })
        })
    })
};
export const clearRoomAssignments = (that) => {
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
                getAllUnassignedSelectableRooms(that);
            }
        );
    })
};
export const getAllReservedRooms = (that) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                let assigned = (room.val().assignedEmployee !== 'none');
                if (room.val().guest === true) {
                    roomList.push(
                        [room.key,
                            room.val().status,
                            room.val().incident,
                            room.val().inspect,
                            room.val().guest,
                            room.val().wakeupCall,
                            assigned,
                            isReservableRoom,
                            allRooms.key]
                    );
                }
            })
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};
export const getAllReservedRoomsByFloor = (that, floor) => {
    let roomList = [];
    let isReservableRoom = true;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            let assigned = (room.val().assignedEmployee !== 'none');
            if (room.val().guest === true) {
                roomList.push(
                    [room.key,
                        room.val().status,
                        room.val().incident,
                        room.val().inspect,
                        room.val().guest,
                        room.val().wakeupCall,
                        assigned,
                        isReservableRoom,
                        allRooms.key]
                );
            }
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};

// functions to get list of just room keys
export const getListofAllRooms = (that) => {
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
            that.setState({
                rooms: roomList
            })
        )
    });
};
export const getListofAllRoomsByFloor = (that, floor) => {
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
            that.setState({
                rooms: roomList
            })
        })
    })
};
export const getListofAllReservableRooms = (that) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                roomList.push(room.key);
            })
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};
export const getListofAllReservableRoomsByFloor = (that, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            roomList.push(room.key);
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        })
    })
};
export const getListofAllNonReservableRooms = (that) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                roomList.push(room.key);
            })
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        })
    });
};
export const getListofAllNonReservableRoomsByFloor = (that, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            roomList.push(room.key);
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        })
    })
};
export const getListofAllReservedRooms = (that) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().guest)
                    roomList.push(room.key);
            })
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};
export const getListofAllReservedRoomsByFloor = (that, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().guest)
                roomList.push(room.key);
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};
export const getListofAllAvailableRooms = (that) => {
    let roomList = [];
    let ref = firebase.db.ref("/Rooms/Reservable");

    ref.orderByKey().once('value', function (allFloors) {
        allFloors.forEach(function (floors) {
            floors.forEach(function (rooms) {
                if (!rooms.val().guest)
                    roomList.push(rooms.key);
            })
        })
    }).then(() => {
        that.setState({
            rooms: roomList
        });
    });
};
export const getListofAllAvailableRoomsByFloor = (that, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (!room.val().guest)
                roomList.push(room.key);
        })
    }).then(() =>
        that.setState({
            rooms: roomList
        })
    )
};
export const makeAllRoomsDirty = (that) => {
    let roomPath;
    let updates = {};
    let roomRef = firebase.db.ref("/Rooms/Reservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                roomPath = 'Rooms/' + floors.key.toString() + '/' + allRooms.key.toString() + '/' + room.key.toString() + '/';
                if (room.val().guest !== false)
                    updates[roomPath + 'status'] = "Dirty";
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/NonReservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    roomPath = 'Rooms/' + floors.key.toString() + '/' + allRooms.key.toString() + '/' + room.key.toString() + '/';
                    updates[roomPath + 'status'] = "Dirty";
                })
            })
        }).then(() => {
                firebase.db.ref().update(updates);
                getAllUnassignedSelectableRooms(that);
            }
        );
    })
};
export const getListofAllRoomsNeedInspected = (that) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().inspect)
                    roomList.push(room.key);
            })
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/");
        roomRef.orderByKey().once('value', function (floors) {
            floors.forEach(function (allRooms) {
                allRooms.forEach(function (room) {
                    if (room.val().inspect)
                        roomList.push(room.key);
                })
            })
        }).then(() =>
            that.setState({
                rooms: roomList
            })
        )
    });
};
export const getListofAllRoomsNeedInspectedByFloor = (that, floor) => {
    let roomList = [];
    let roomRef = firebase.db.ref("/Rooms/NonReservable/" + floor);
    roomRef.orderByKey().once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            if (room.val().inspect)
                roomList.push(room.key);
        })
    }).then(() => {
        roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
        roomRef.orderByKey().once('value', function (allRooms) {
            allRooms.forEach(function (room) {
                if (room.val().inspect)
                    roomList.push(room.key);
            })
        }).then(() => {
            that.setState({
                rooms: roomList
            })
        })
    })
};

// generators
export const getFloorOptions = (that) => {
    let floorList = [0];
    let floorRef = firebase.db.ref("/Rooms/Reservable");
    floorRef.orderByKey().once('value', function (allFloors) {
        allFloors.forEach(function (floor) {
            floorList.push(floor.key);
        })
    }).then(() => {
        that.setState({
            floors: floorList
        })
    });
};

// room information
export const getReservableRoomInformation = (that, roomID) => {
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
                    updates.currentUser = firebase.auth.currentUser.uid;
                    updates.assignedEmployee = room.val().assignedEmployee;
                    updates.guest = room.val().guest;
                    updates.isReservable = room.val().isReservable;
                    updates.wakeupCall = room.val().wakeupCall;
                    updates.status = room.val().status;
                    updates.incident = room.val().incident;
                    updates.inspect = room.val().inspect;
                    if (room.val().incident)
                        hasIncident = true;
                }
            })
        })
    }).then(() => {
        firebase.db.ref("/Employee/" + updates.assignedEmployee).once('value', function (employee) {
            if (updates.assignedEmployee !== "none") {
                updates.assignedEmployeeName = employee.val().username;
            } else {
                updates.assignedEmployeeName = '';
            }
        }).then(() => {
            that.setState(updates);

            if (hasIncident) {
                let IncidentsRef = firebase.db.ref("/Incidents/" + roomID);
                IncidentsRef.orderByKey().once('value', function (room) {
                    room.forEach(function (incident) {
                        incidentsList.push([incident.key, incident.val()]);
                    })
                }).then(() => {
                    that.setState({incidentList: incidentsList});
                });
            }
        });
    });
};
export const getNonReservableRoomInformation = (that, roomID) => {
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
                    updates.currentUser = firebase.auth.currentUser.uid;
                    updates.assignedEmployee = room.val().assignedEmployee;
                    updates.status = room.val().status;
                    updates.incident = room.val().incident;
                    updates.inspect = room.val().inspect;
                    if (room.val().incident)
                        hasIncident = true;
                }
            })
        })
    }).then(() => {
        firebase.db.ref("/Employee/" + updates.assignedEmployee).once('value', function (employee) {
            if (updates.assignedEmployee !== "none") {
                updates.assignedEmployeeName = employee.val().username;
            } else {
                updates.assignedEmployeeName = '';
            }
        }).then(() => {
            that.setState(updates);
            if (hasIncident) {
                let IncidentsRef = firebase.db.ref("/Incidents/" + roomID);
                IncidentsRef.orderByKey().once('value', function (room) {
                    room.forEach(function (incident) {
                        incidentsList.push([incident.key, incident.val()]);
                    })
                }).then(() => {
                    that.setState({incidentList: incidentsList});
                });
            }
        });
    });
};
export const updateIncident = (that, room, incidentKey, comment, isReservableRoom) => {
    let updates = {};
    updates['/Incidents/' + room + '/' + incidentKey] = comment;
    firebase.db.ref().update(updates).then(() => {
        if (isReservableRoom) {
            getReservableRoomInformation(that, room);
        } else {
            getNonReservableRoomInformation(that, room);
        }
    });
};

export const resolveIncident = (that, room, incidentKey, floor, isReservableRoom) => {
    firebase.db.ref('/Incidents/' + room + '/' + incidentKey).remove()
        .then(() => {
            let reference;
            firebase.db.ref('/Incidents/' + room).once('value', function (snapshot) {
                reference = snapshot.val();
            }).then(() => {
                if (reference === null) {
                    if (isReservableRoom) {
                        reservableRoomNoIncidents(that, room, floor);
                    } else {
                        nonReservableRoomNoIncidents(that, room, floor);
                    }
                } else {
                    if (isReservableRoom) {
                        getReservableRoomInformation(that, room);
                    } else {
                        getNonReservableRoomInformation(that, room);
                    }
                }
            });
        });
};
const reservableRoomNoIncidents = (that, room, floor) => {
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        incident: false
    }).then(() => {
        getReservableRoomInformation(that, room);
    });
};
const nonReservableRoomNoIncidents = (that, room, floor) => {
    firebase.db.ref('/Rooms/NonReservable/' + floor + '/' + room).update({
        incident: false
    }).then(() => {
        getNonReservableRoomInformation(that, room);
    });
};

export const addIncidentFromRoomPage = (that, floor, room, comment, areReservableRooms) => {
    let lastIncident = 0;
    let ref = firebase.db.ref('/Incidents/' + room);

    ref.orderByKey().once('value', function (allIncidents) {
        allIncidents.forEach(function (incident) {
            lastIncident = parseInt(incident.key, 10);
        });
    }).then(() => {
        let updates = {};
        let currentIncident = lastIncident + 1;

        updates['/Incidents/' + room + '/' + currentIncident] = comment;
        firebase.db.ref().update(updates);

        if (areReservableRooms)
            addReservableRoomIncidentFromRoomPage(that, floor, room);
        else
            addNonReservableRoomIncidentFromRoomPage(that, room);
    });
};
const addReservableRoomIncidentFromRoomPage = (that, floor, room) => {
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        incident: true,
        status: "Dirty"
    }).then(() => {
        getReservableRoomInformation(that, room);
    })
};
const addNonReservableRoomIncidentFromRoomPage = (that, room) => {
    let floor;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (currentRoom) {
                if (room === currentRoom.key)
                    floor = allRooms.key;
            })
        })
    }).then(() => {
        firebase.db.ref('/Rooms/NonReservable/' + floor + '/' + room).update({
            incident: true,
            status: "Dirty"
        }).then(() => {
            getNonReservableRoomInformation(that, room);
        })
    });


};

export const changeRoomStatus = (that, status, floor, room, assignedEmp, isReservableRoom) => {
    if (isReservableRoom) {
        changeReservableRoomStatus(that, status, floor, room, assignedEmp);
    } else {
        changeNonReservableRoomStatus(that, status, floor, room, assignedEmp);
    }
};
const changeReservableRoomStatus = (that, status, floor, room, assignedEmp) => {
    let needInspected = false;
    let currentEmp = assignedEmp, prevEmp = "none";
    if (status === 'Clean') {
        needInspected = true;
        currentEmp = "none";
        prevEmp = assignedEmp;
    }
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        status: status,
        inspect: needInspected,
        assignedEmployee: currentEmp,
        prevAssignedEmployee: prevEmp,
    }).then(() => {
        getReservableRoomInformation(that, room);
    });
};
const changeNonReservableRoomStatus = (that, status, floor, room, assignedEmp) => {
    let needInspected = false;
    let currentEmp = assignedEmp, prevEmp = "none";
    if (status === 'Clean') {
        needInspected = true;
        currentEmp = "none";
        prevEmp = assignedEmp;
    }
    firebase.db.ref('/Rooms/NonReservable/' + floor + '/' + room).update({
        status: status,
        inspect: needInspected,
        assignedEmployee: currentEmp,
        prevAssignedEmployee: prevEmp,
    }).then(() => {
        getNonReservableRoomInformation(that, room);
    });
};

export const updateWakeUpCallFromRoom = (that, room, floor, date, time) => {
    let updateDate = date + ' - ' + time;
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        wakeupCall: updateDate
    }).then(() => {
        getReservableRoomInformation(that, room);
    })
};
export const clearWakeUpCallFromRoom = (that, room, floor) => {
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        wakeupCall: "none"
    }).then(() => {
        getReservableRoomInformation(that, room);
    })
};

// new room
export const generateNewRoomNumber = (that, floor) => {
    const radix = 10;
    let lastRoom = null;
    let roomRef = firebase.db.ref("/Rooms/Reservable/" + floor);
    roomRef.orderByKey().limitToLast(1).once('value', function (allRooms) {
        allRooms.forEach(function (room) {
            lastRoom = room.key;
        })
    }).then(() => {
        that.setState({
            newRoomNumber: parseInt(lastRoom, radix) + 1
        })
    });
};
export const newRoomFloorSelect = (that, floor) => {
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
        that.setState({
            newRoomNumber: parseInt(lastRoom, radix) + 1
        })
    });
};
export const getNewFloor = (that) => {
    let lastFloor;
    let floorRef = firebase.db.ref("/Rooms/Reservable");
    floorRef.orderByKey().once('value', function (allFloors) {
        allFloors.forEach(function (floor) {
            lastFloor = floor.key;
        })
    }).then(() => {
        let radix = 10;
        let newFloor = parseInt(lastFloor, radix) + 100;
        let newRoom = newFloor + 1;

        that.setState({
            newFloor: newFloor,
            newFloorRoomNum: newRoom
        })
    });
};
export const createNewReservableRoom = (floor, room) => {
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).set({
        assignedEmployee: "none",
        prevAssignedEmployee: "none",
        guest: false,
        incident: false,
        inspect: false,
        isReservable: true,
        status: "Clean",
        wakeupCall: "none"
    });
};
export const createNewNonReservableRoom = (floor, room) => {
    firebase.db.ref('/Rooms/NonReservable/' + floor + '/' + room).set({
        assignedEmployee: "none",
        prevAssignedEmployee: "none",
        incident: false,
        inspect: false,
        status: "Clean",
    });
};

// add wake up call
export const addNewWakeUpCall = (room, floor, date, time) => {
    let updateDate = date + ' - ' + time;
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        wakeupCall: updateDate
    })
};

// add incident
export const addIncident = (floor, room, comment, areReservableRooms) => {
    let lastIncident = 0;
    let ref = firebase.db.ref('/Incidents/' + room);

    ref.orderByKey().once('value', function (allIncidents) {
        allIncidents.forEach(function (incident) {
            lastIncident = parseInt(incident.key, 10);
        });
    }).then(() => {
        let updates = {};
        let currentIncident = lastIncident + 1;
        console.log(currentIncident);

        updates['/Incidents/' + room + '/' + currentIncident] = comment;
        firebase.db.ref().update(updates);

        if (areReservableRooms)
            addReservableRoomIncident(floor, room);
        else
            addNonReservableRoomIncident(room);
    });
};
const addReservableRoomIncident = (floor, room) => {
    firebase.db.ref('/Rooms/Reservable/' + floor + '/' + room).update({
        incident: true,
        status: "Dirty"
    })
};
const addNonReservableRoomIncident = (room) => {
    let floor;
    let roomRef = firebase.db.ref("/Rooms/NonReservable/");
    roomRef.orderByKey().once('value', function (floors) {
        floors.forEach(function (allRooms) {
            allRooms.forEach(function (currentRoom) {
                if (room === currentRoom.key)
                    floor = allRooms.key;
            })
        })
    }).then(() => {
        firebase.db.ref('/Rooms/NonReservable/' + floor + '/' + room).update({
            incident: true,
            status: "Dirty"
        })
    });


};

// assign rooms
export const assignRoom = (room, employee) => {
    (room.isReservableRoom) ?
        assignReservableRoom(room, employee) :
        assignNonReservableRoom(room, employee);
};
const assignReservableRoom = (room, employee) => {
    firebase.db.ref('/Rooms/Reservable/' + room.floor + '/' + room.roomName).update({
        assignedEmployee: employee,
        status: 'Dirty'
    })
};
const assignNonReservableRoom = (room, employee) => {
    firebase.db.ref('/Rooms/NonReservable/' + room.floor + '/' + room.roomName).update({
        assignedEmployee: employee,
        status: 'Dirty'
    })
};

// inspect room
export const inspectRoom = (floor, room, isReservableRoom) => {
    if (floor === '000') {
        if (isReservableRoom)
            inspectReservableRoom(room);
        else
            inspectNonReservableRoom(room);
    }
    else {
        if (isReservableRoom) {
            firebase.db.ref("/Rooms/Reservable/" + floor + "/" + room + "/").update({
                inspect: false,
            });
        }
        else {
            firebase.db.ref("/Rooms/NonReservable/" + floor + "/" + room + "/").update({
                inspect: false,
            });
        }
    }
};
const inspectReservableRoom = (room) => {
    let floor;
    firebase.db.ref("/Rooms/Reservable/").once('value', function (dbFloors) {
        dbFloors.forEach(function (dbAllRooms) {
            dbAllRooms.forEach(function (dbRoom) {
                if (dbRoom.key === room)
                    floor = dbAllRooms.key.toString();
            })
        })
    }).then(() => {
        firebase.db.ref("/Rooms/Reservable/" + floor + "/" + room + "/").update({
            inspect: false
        });
    });
};
const inspectNonReservableRoom = (room) => {
    let floor;
    firebase.db.ref("/Rooms/NonReservable/").once('value', function (dbFloors) {
        dbFloors.forEach(function (dbAllRooms) {
            dbAllRooms.forEach(function (dbRoom) {
                if (dbRoom.key === room) {
                    floor = dbAllRooms.key.toString();
                }
            })
        })
    }).then(() => {
        firebase.db.ref("/Rooms/NonReservable/" + floor + "/" + room + "/").update({
            inspect: false,
        });
    });
};

//decline inspection
export const declineInspectRoom = (floor, room, isReservableRoom) => {
    if (floor === '000') {
        if (isReservableRoom)
            declineReservableRoom(room);
        else
            declineNonReservableRoom(room);
    }
    else {
        if (isReservableRoom)
            declineReservableRoomWithFloor(floor, room);
        else
            declineNonReservableRoomWithFloor(floor, room);
    }
};
const declineReservableRoom = (room) => {
    let floor, assignedEmp;
    firebase.db.ref("/Rooms/Reservable/").once('value', function (dbFloors) {
        dbFloors.forEach(function (dbAllRooms) {
            dbAllRooms.forEach(function (dbRoom) {
                if (dbRoom.key === room) {
                    floor = dbAllRooms.key.toString();
                    assignedEmp = dbRoom.val().prevAssignedEmployee;
                }
            })
        })
    }).then(() => {
        firebase.db.ref("/Rooms/Reservable/" + floor + "/" + room + "/").update({
            inspect: false,
            status: "Dirty",
            isReservable: false,
            assignedEmployee: assignedEmp
        });
    });
};
const declineReservableRoomWithFloor = (floor, room) => {
    let assignedEmp;
    let ref = firebase.db.ref("/Rooms/Reservable/" + floor + "/" + room + "/");
    ref.once('value', function (info) {
        assignedEmp = info.val().prevAssignedEmployee;
    }).then(() => {
        ref.update({
            inspect: false,
            status: "Dirty",
            isReservable: false,
            assignedEmployee: assignedEmp
        });
    })

};
const declineNonReservableRoom = (room) => {
    let floor, assignedEmp;
    firebase.db.ref("/Rooms/NonReservable/").once('value', function (dbFloors) {
        dbFloors.forEach(function (dbAllRooms) {
            dbAllRooms.forEach(function (dbRoom) {
                if (dbRoom.key === room) {
                    floor = dbAllRooms.key.toString();
                    assignedEmp = dbRoom.val().prevAssignedEmployee;
                }
            })
        })
    }).then(() => {
        firebase.db.ref("/Rooms/NonReservable/" + floor + "/" + room + "/").update({
            inspect: false,
            status: "Dirty",
            assignedEmployee: assignedEmp
        });
    });
};
const declineNonReservableRoomWithFloor = (floor, room) => {
    let assignedEmp;
    let ref = firebase.db.ref("/Rooms/NonReservable/" + floor + "/" + room + "/");
    ref.once('value', function (info) {
        assignedEmp = info.val().prevAssignedEmployee;
    }).then(() => {
        ref.update({
            inspect: false,
            status: "Dirty",
            assignedEmployee: assignedEmp
        });
    })

};

// check in/out
export const checkIn = (that, floorNum, roomNum) => {
    firebase.db.ref('/Rooms/Reservable/' + floorNum + '/' + roomNum).update({
        guest: true
    });
};
export const checkOut = (that, floorNum, roomNum) => {
    firebase.db.ref('/Rooms/Reservable/' + floorNum + '/' + roomNum).update({
        guest: false
    })
};

// change role
export const changeRole = (employee, isAdmin) => {
    firebase.db.ref('/Employee/' + employee).update({
       isAdmin: isAdmin
    });
};

// misc
const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});