import React from 'react';
import {createSelectable} from 'react-selectable-fast';

const Label = ({status}) => (
    <div className={"album-label"}>
        <span className={"floatLeft"}> Status: </span> <span className={"floatRight"}>{`${status}`}</span>
        <br/>
    </div>
);

function Album(props){
    let {selectableRef, selected, selecting, roomName, status} = props;
    let classStatus = null;
    if (status === 'Clean'){
        classStatus = 'cleanStatus';
    } else {
        classStatus = 'dirtyStatus';
    }

    return(
    <div ref={selectableRef}
        className={`selectableButtons col-lg-2 col-md-3 rounded item ${selecting && 'selecting'} ${selected && 'selected'} ${classStatus}` + {classStatus}}>
        <h5>{roomName}</h5>
        <Label status={status}/>
    </div>
    )
}
//old const version. function version is better
/*
const Album = ({selectableRef, selected, selecting, roomName, status, assigned, incident, guest}) => (
    <div
        ref={selectableRef}
        className={`item ${selecting && 'selecting'} ${selected && 'selected'} ${status}`}
    >
        <h5>{roomName}</h5>
        <Label status={status}/>
    </div>
);
*/
export default createSelectable(Album);