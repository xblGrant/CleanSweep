import React from 'react';
import { createSelectable } from 'react-selectable-fast';

const Room = ({ selectableRef, selected, selecting}) => (
    <div ref={selectableRef}>
        ...
    </div>
);

export default createSelectable(Room)