import React from 'react';
import {FormGroup, Label, Input} from 'reactstrap';
import {firebase} from "../firebase";

function createOptions(props){

    let roomList = [];
    let ref = firebase.db.ref("/Rooms/Reservable");

    ref.orderByKey().once('value', function(allFloors) {
        allFloors.forEach( function(floors) {
            floors.forEach( function(rooms) {
                roomList.push(rooms.val().room);
            })
        })
    }).then( () => {
        return (
            roomList.map(
                (num) => {
                    return (
                        <option value={num}>{num}</option>
                    )
                }
            )
        );
    })
}





export function ListItemGenerator(props){
    return(
        <FormGroup id={props.id}>
            <Label id={"label"} for="floorSelect">Floor</Label>
            <Input type="select" id={props.id} onClick={props.onClick} multiple>
                <createOptions />
            </Input>
        </FormGroup>
    );
}