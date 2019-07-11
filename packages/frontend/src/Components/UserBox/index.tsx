import React, { Component } from 'react';
import './style.scss';

import { GoogleLogin, GoogleLogout } from 'react-google-login';

interface Props {

}

interface State {
    authenticated: boolean;
    user?: any;
    token?: string;
}

export default class UserBox extends Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            authenticated: false,
            user: undefined,
            token: undefined
        };
    }

    componentDidMount() {

    }

    onLoginSuccess(response: any) {
        console.log(response);

        fetch('/api/v1/auth/google', {
            method: "POST"
        });
    }

    onLoginFailure(response: any) {
        console.log(response);
    }

    onLogoutSuccess() {
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
                            clientId="720087900394-emhkhqeh8m9nhq1mm07td42iuihbu56i.apps.googleusercontent.com"
                            buttonText="Logout"
                            onLogoutSuccess={this.onLogoutSuccess}
                        />
                    </div>
                }
            </div>
        );
    }
}