import React, {Component} from "react";
import axios from "axios";

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {status: false, text: ''},
            pass: {status: false, text: ''},
            main: {status: false, text: '', success: false}
        }

        this.login = this.login.bind(this);
        this.validSubmit = this.validSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.hasError = this.hasError.bind(this);
    }

    async login() {

        // const url = 'http://localhost:3001/login';
        const url = 'http://deepmuni.eastus.azurecontainer.io:3001/login';

        await axios.post(url, {
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPass').value
        })
            .then(res => {
                this.setState({
                    main : {status: true, text: res.data.message, success: res.data.status}
                });
                setTimeout(() => {

                    const show = this.state.main.success;
                    this.setState({
                        main : {status: false, text: '', success: false}
                    });

                    if(show){
                        this.props.update();
                        this.props.showUser(document.getElementById('loginEmail').value);
                    }

                    this.makeEmpty();
                },1000);
            });
    }

    validate(e) {

        const field = e.target;
        let update = {};

        switch (e.target.id) {
            case 'loginEmail':
                if (field.value === "") {
                    update = {status: true, text: 'Email is required'}
                } else if (!(/^[a-zA-Z0-9.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(field.value))) {
                    update = {status: true, text: 'Please enter correct email'}
                } else {
                    update = {status: false, text: ''}
                }
                this.setState({
                    email: update
                });
                break;
            case 'loginPass':
                if(field.value === ""){
                    update = {status : true, text :'Password is required'}
                }else{
                    update = {status : false, text : ''}
                }
                this.setState({
                    pass: update,
                });
                break;
            default:
                break;
        }
    }

    validSubmit(){
        if(this.checkBlank()){
            this.setState({
                main : {status: true, text: 'Please fill out empty fields!!'}
            });
            setTimeout(() => {
                this.setState({
                    main : {status: false, text: ''}
                });
            },2500);
        }else if(this.hasError()){
            this.setState({
                main : {status: true, text: 'Please correct the errors!!'}
            });
            setTimeout(() => {
                this.setState({
                    main : {status: false, text: ''}
                });
            },2500);
        }else{
            this.login();
        }
    }

    checkBlank(){
        const fields = document.getElementsByClassName('inp_login');
        for(let field of fields){
            if(field.value === ""){
                return true;
            }
        }
        return false;
    }

    hasError(){
        return (this.state.email.status || this.state.pass.status);
    }

    makeEmpty(){
        const fields = document.getElementsByClassName('inp inp_login');
        for(const field of fields){
            field.value = "";
        }
    }

    render() {
        return (
            <div className="Box">
                <form>
                    <div className="input-section">
                        <label htmlFor="loginEmail">Email</label>
                        <input type="email" id="loginEmail" className="inp inp_login"
                               onChange={this.validate}/>
                        {this.state.email.status ? <div className="error">{this.state.email.text}</div> : null}
                    </div>
                    <div className="input-section">
                        <label htmlFor="loginPass">Password</label>
                        <input type="password" id="loginPass" className="inp inp_login"
                               onChange={this.validate} />
                        {this.state.pass.status ? <div className="error">{this.state.pass.text}</div> : null}
                    </div>
                </form>
                <div className="input-section">
                    {this.state.main.status ? <div className="submitError">{this.state.main.text}</div> : null}
                    <button className="submit" onClick={this.validSubmit}>Login</button>
                </div>
            </div>
        );
    }
}

export default Login;
