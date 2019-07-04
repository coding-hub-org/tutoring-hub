import React, { Component } from 'react';
import './UserBox.css';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

class UserBox extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authenticated: false,
            user: undefined,
            token: undefined
        };
    }

    componentDidMount() {

    }

    onLoginSuccess(response) {
        console.log(response);

        fetch('/api/v1/auth/google', {
            method: "POST",
            body: {}
        }).then(response => {
        })
    }

    onLoginFailure(response) {
        console.log(response);
    }

    onLogoutSuccess(response) {
        console.log(response);
    }

    render() {
        return (
            <div className="UserBox-Component">
                {!this.state.authenticated ?
                    <div className="wrapper login">
                        <GoogleLogin
                            clientId="720087900394-emhkhqeh8m9nhq1mm07td42iuihbu56i.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={this.onLoginSuccess}
                            onFailure={this.onLoginFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                    :
                    <div className="wrapper logout">
                        <GoogleLogout
                            buttonText="Logout"
                            onLogoutSuccess={this.onLogoutSuccess}
                        />
                    </div>
                }
            </div>
        );
    }
}
export default UserBox;