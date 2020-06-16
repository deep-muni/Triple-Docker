import React, {Component} from "react";
import axios from "axios";

class Register extends Component {

    async register() {
        await axios.post('http://localhost:3002/register', {
            email: document.getElementById('email').value,
            name: document.getElementById('name').value,
            password: document.getElementById('password').value
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        return (
            <div className="registerBox">
                <form>
                    <input type="email" id="email"/>
                    <input type="name" id="name"/>
                    <input type="password" id="password"/>
                </form>
                <button onClick={this.register}>Register</button>
            </div>
        );
    }
}

export default Register;
