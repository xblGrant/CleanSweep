import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

export function SignOutButton(props) {
    return (
        <Button id={props.id} outline size={"sm"} className={"noMargin"} onClick={auth.doSignOut}>
            <Link style={{
                textDecoration: 'none',
                color: 'black'
            }} to={routes.LOGIN}>Log-Out</Link>
        </Button>
    )
}

export function WrappedButton(props) {
    if (props.isOutlined){
        return (
            <Button id={props.id} outline size={"sm"}>
                <Link style={{
                    textDecoration: 'none',
                    color: 'black'
                }} to={props.link}>{props.name}</Link>
            </Button>
        );
    } else {
        return (
            <Button id={props.id}>
                <Link style={{
                    textDecoration: 'none',
                    color: 'white'
                }} to={props.link}>{props.name}</Link>
            </Button>
        );
    }
}

WrappedButton.defaultProps = {
  isOutlined: false,
};
WrappedButton.propTypes = {
  isOutlined: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
};