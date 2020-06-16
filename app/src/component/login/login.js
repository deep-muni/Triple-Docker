import React, {Component} from "react";
import axios from "axios";

class Login extends Component {

    async login() {
        await axios.post('http://localhost:3001/login', {
            email: document.getElementById('email_L').value,
            password: document.getElementById('password_L').value
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div className="loginBox">
                <form>
                    <input type="email" id="email_L"/>
                    <input type="password" id="password_L"/>
                </form>
                <button onClick={this.login}>Login</button>
            </div>
        );
    }
}

export default Login;
