import React from 'react';
import PropTypes from 'prop-types';
import {getCurrentUserIsAdminRole} from "../firebase/api";

import {firebase} from "../firebase/index";

const RoleBasedAuthorization = (allowedRoles) => (WrappedComponent) => {
    return class withRoleAuthorization extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                isAdmin: false,
                role: 'guest'
            }
        }

        componentWillMount() {
            getCurrentUserIsAdminRole(this);
        }

        render() {
            const { role } = this.state;
            if (allowedRoles.includes(role))
                return <WrappedComponent {...this.props}/>
            else
                return <h1>Not Authorized</h1>
        }
    };
};

const withAuthentication = (Component) => {
    class WithAuthentication extends React.Component {
        constructor(props){
            super(props);

            this.state = {
                authUser: null,
            };
        }

        getChildContext() {
            return {
                authUser: this.state.authUser
            };
        }

        componentDidMount(){
            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState(() => ({ authUser }))
                    : this.setState(() => ({ authUser: null }))
            });
        }

        render() {
            return(
                <Component />
            );
        }
    }

    WithAuthentication.childContextTypes = {
        authUser: PropTypes.object,
    };

    return WithAuthentication;
};

export {RoleBasedAuthorization};
export default withAuthentication;