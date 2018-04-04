import React from 'react';
import { createSelectable } from 'react-selectable-fast';

const Label = ({ status, incident, guest, assigned }) => (
    <div className={"album-label"}>
        <span className={"floatLeft"}> Status: </span> <span className={"floatRight"}>{`${status}`}</span>
        <br/>
        <span className={"floatLeft"}> Assigned: </span> <span className={"floatRight"}>{`${assigned}`}</span>
        <br/>
        <span className={"floatLeft"}> Incident:</span> <span className={"floatRight"}>{`${incident}`}</span>
        <br/>
        <span className={"floatLeft"}> Guest: </span> <span className={"floatRight"}> {`${guest}`}</span>
    </div>
);

const Album = ({ selectableRef, selected, selecting, roomName, status, assigned, incident, guest}) => (
  <div
      ref={selectableRef}
      className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}
  >
      <h5>{roomName}</h5>
      { (incident !== null && guest !== null) ?
          <Label status={status} assigned={assigned} incident={incident} guest={guest}/> :
          null
      }
  </div>
);

export default createSelectable(Album);