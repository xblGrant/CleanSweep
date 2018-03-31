import React from 'react';
import { createSelectable } from 'react-selectable-fast';

const Label = ({ incident, guest, assigned }) => (
    <div className={"album-label"}>
        Assigned: <span>{`${assigned}`}</span>
        <br/>
        Incident: <span>{`${incident}`}</span>
        <br/>
        Guest: <span>{`${guest}`}</span>
    </div>
);

const Album = ({ selectableRef, selected, selecting, roomName, status, assigned, incident, guest}) => (
  <div
      ref={selectableRef}
      className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}
  >
      <h2>{roomName}</h2>
      <small>{status}</small>
      { (incident !== null && guest !== null) ?
          <Label assigned={assigned} incident={incident} guest={guest}/> :
          null
      }
  </div>
);

export default createSelectable(Album);