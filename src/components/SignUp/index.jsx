import React from 'react';

import * as ROUTES from '../../constants/routes';
import {Link, withRouter} from 'react-router-dom';
import {withFirebase} from '../Firebase';
import {compose} from 'recompose'

const SignUp = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

class SignUpFormBase extends React.Component {

    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {

        event.preventDefault();

        const {username, email, passwordOne} = this.state;

        this.props.firebase.createUser(email, passwordOne)
            .then(authUser => {
                console.log(authUser);
                this.setState({...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME)
            })
            .catch(error => {
                console.log(error);
                this.setState({error});
            });

    };

    onChange = event => {

        this.setState({
            [event.target.name]: event.target.value,
        });

    };

    render() {

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>

                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Confirm Password"
                />

                <button type="submit" disabled={isInvalid}>Sign Up</button>

                {error && <p>{error.message}</p>}

            </form>
        );
    }
}

const SignUpForm = compose(
    withRouter,
    withFirebase
)(SignUpFormBase);

const SignUpLink = () => (

    <p>
        Don't have account& <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>

);

export default SignUp;
export {SignUpForm, SignUpLink};

