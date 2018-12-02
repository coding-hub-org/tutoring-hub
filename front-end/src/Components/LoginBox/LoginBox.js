import React, { Component } from 'react';
import './LoginBox.css';
class LoginBox extends Component{
    render(){
        return (
            <div id='login-box'>
                <div id='login-picture'>
                </div>     
                <form id='login-form' action="" method="post">
                    <div id='login-form-title'>
                        <strong>WELCOME TO TUTORING-HUB</strong>
                    </div>
                    <div id='login-form-username'>
                        <input type='text' placeholder="Username" name="username" required></input>
                    </div>
                    <div id='login-form-password'>
                        <input type='password' placeholder="Password" name="password" required></input>
                    </div>
                    <div id='login-form-button'>
                        <button type="submit">
                            <strong>LOGIN</strong>
                        </button>
                    </div>
                </form>
                
            </div>
        );
    }
}
export default LoginBox;