import React from 'react';
import PropTypes from 'prop-types';

// Reusable Input Field Component
function InputField(props) {
    InputField.defaultProps = {
        display: "Input: ",
        type: "text"
    };

    return (
        <div className="row">
            <div className="four columns">
                <label>{props.display}</label>
            </div>
            <div className="eight columns">
                <input name={props.id} id={props.id} type={props.type}/>
            </div>
        </div>
    );
}

InputField.propTypes = {
    display: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export { InputField };