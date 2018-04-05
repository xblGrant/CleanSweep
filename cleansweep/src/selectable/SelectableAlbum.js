import React from 'react';
import {createSelectable} from 'react-selectable-fast';

const Label = ({status}) => (
    <div className={"album-label"}>
        <span className={"floatLeft"}> Status: </span> <span className={"floatRight"}>{`${status}`}</span>
        <br/>
    </div>
);

const Album = ({selectableRef, selected, selecting, roomName, status, assigned, incident, guest}) => (
    <div
        ref={selectableRef}
        className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}
    >
        <h5>{roomName}</h5>
        <Label status={status}/>
    </div>
);

export default createSelectable(Album);