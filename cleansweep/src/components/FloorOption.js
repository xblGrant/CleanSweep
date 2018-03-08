import React from 'react';
import PropTypes from "prop-types";

function Option(props) {
    return(
        <option value={props.floor} onClick={props.onClick}>{props.floor}</option>
    )
}
Option.propTypes = {
    floor: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Option;