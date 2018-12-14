import React from 'react';

import {withFirebase} from '../Firebase';
import * as ROUTES from '../../constants/routes';
import {compose} from 'recompose'
import {withRouter} from 'react-router-dom';

class SignOutButton extends React.Component{

    render() {
        return (
            <button type="button" onClick={() => this.props.firebase.signOut().then(() => {
                this.props.history.push(ROUTES.LANDING)
            })}>
                Sign Out
            </button>
        );
    }

}

export default compose(withFirebase, withRouter)(SignOutButton);

