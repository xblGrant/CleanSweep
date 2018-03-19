import React from 'react';
import { createSelectable } from 'react-selectable-fast';

const Label = ({ incident, assignedEmp }) => (
    <div className={"album-label"}>
        Employee: <span>{`${assignedEmp}`}</span>
        <br/>
        Incident: <span>{`${incident}`}</span>
    </div>
);

const Album = ({ selectableRef, selected, selecting, roomNum, status, incident, emp}) => (
  <div
      ref={selectableRef}
      className={`item ${selecting && 'selecting'} ${selected && 'selected'}`}
  >
      <h2>{roomNum}</h2>
      <small>{status}</small>
      <Label incident={incident} assignedEmp={emp}/>
  </div>
);

export default createSelectable(Album);