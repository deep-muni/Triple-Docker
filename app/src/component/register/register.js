import React, {Component} from "react";
import axios from "axios";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: {status: false, text: ''},
            name: {status: false, text: ''},
            pass: {status: false, text: ''},
            cpass: {status: false, text: ''},
            main: {status: false, text: ''},
            passCheck: false,
            passPolicy: {
                'lower': {status: false},
                'upper': {status: false},
                'numeric': {status: false},
                'special': {status: false},
                'eight': {status: false}
            }
        };

        this.passCheck = [
            {'id': 'lower', 'error': 'err', 'success': 'err success', 'text': 'At least one lower-case character'},
            {'id': 'upper', 'error': 'err', 'success': 'err success', 'text': 'At least one upper-case character'},
            {'id': 'numeric', 'error': 'err', 'success': 'err success', 'text': 'At least one numeric character'},
            {'id': 'special', 'error': 'err', 'success': 'err success', 'text': 'At least one special character (!@#_)'},
            {'id': 'eight', 'error': 'err', 'success': 'err success', 'text': 'At least eight characters'}
        ];

        this.register = this.register.bind(this);
        this.validSubmit = this.validSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.hasError = this.hasError.bind(this);
        this.checkPolicy = this.checkPolicy.bind(this);
        this.policyNotSatisfied = this.policyNotSatisfied.bind(this);
        this.showPolicy = this.showPolicy.bind(this);
        this.hidePolicy = this.hidePolicy.bind(this);
    }

    async register() {
        await axios.post('http://localhost:3002/register', {
            email: document.getElementById('registerEmail').value,
            name: document.getElementById('registerName').value,
            password: document.getElementById('registerPass').value
        })
            .then(res => {
                this.setState({
                    main : {status: true, text: res.data.message}
                });
                setTimeout(() => {
                    this.setState({
                        main : {status: false, text: ''}
                    });
                },2500);
            });
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
        }else if(this.policyNotSatisfied()){
            this.setState({
                main : {status: true, text: 'Please follow password policy'},
            });
            this.showPolicy();
            setTimeout(() => {
                this.setState({
                    main : {status: false, text: ''}
                });
            },2500);
        }else{
            this.register();
            this.makeEmpty();
            this.setState({
                passPolicy: {
                    'lower': {status: false},
                    'upper': {status: false},
                    'numeric': {status: false},
                    'special': {status: false},
                    'eight': {status: false}
                }
            });
        }
    }

    validate(e) {

        const field = e.target;
        let update = {};
        let update_1 = {};

        switch (e.target.id) {
            case 'registerEmail':
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
            case 'registerName':
                if (field.value === "") {
                    update = {status: true, text: 'Name is required'}
                } else if (field.value.length < 4 || field.value.length > 21) {
                    update = {status: true, text: 'Length between 4 & 21'}
                } else {
                    update = {status: false, text: ''}
                }
                this.setState({
                    name: update
                });
                break;
            case 'registerPass':

                this.checkPolicy(field.value);

                if(field.value === ""){
                    update = {status : true, text :'Password is required'}
                }else{
                    update = {status : false, text : ''}
                }
                if(field.value !== document.getElementById('registerCPass').value){
                    update_1 = {status : true, text :'Password does not match'}
                }
                this.setState({
                    pass: update,
                    cpass: update_1,
                });
                break;
            case 'registerCPass':
                if(field.value === ""){
                    update = {status : true, text :'Confirmed Password is required'}
                }else if(field.value !== document.getElementById('registerPass').value){
                    update = {status : true, text :'Password does not match'}
                }else{
                    update = {status : false, text :''}
                }
                this.setState({
                    cpass: update
                });
                break;
            default:
                break;
        }
    }

    checkBlank(){
        const fields = document.getElementsByClassName('inp_register');
        for(let field of fields){
            if(field.value === ""){
                return true;
            }
        }
        return false;
    }

    hasError(){
        return (this.state.email.status || this.state.name.status || this.state.pass.status ||
            this.state.cpass.status);
    }

    checkPolicy(val){
        this.setState({
            passPolicy: {
                'lower': {status: val.search(/[a-z]/) >= 0},
                'upper': {status: val.search(/[A-Z]/) >= 0},
                'numeric': {status: val.search(/[0-9]/) >= 0},
                'special': {status: val.search(/[!@#_]/) >= 0},
                'eight': {status: val.length > 7}
            }
        });
    }

    policyNotSatisfied(){
        return (!(this.state.passPolicy['lower'].status && this.state.passPolicy['upper'].status &&
                this.state.passPolicy['numeric'].status && this.state.passPolicy['special'].status &&
                this.state.passPolicy['eight'].status)
        );
    }

    showPolicy(){
        this.setState({
            passCheck: true
        });
    }

    hidePolicy(){
        this.setState({
            passCheck: false
        });
    }

    makeEmpty(){
        const fields = document.getElementsByClassName('inp inp_register');
        for(const field of fields){
            field.value = "";
        }
    }

    render() {
        return (
            <div className="Box">
                <form>
                    <div className="input-section">
                        <label htmlFor="registerEmail">Email</label>
                        <input type="email" id="registerEmail" className="inp inp_register"
                               onChange={this.validate}/>
                        {this.state.email.status ? <div className="error">{this.state.email.text}</div> : null}
                    </div>
                    <div className="input-section">
                        <label htmlFor="registerName">Name</label>
                        <input type="email" id="registerName" className="inp inp_register"
                               onChange={this.validate}/>
                        {this.state.name.status ? <div className="error">{this.state.name.text}</div> : null}
                    </div>
                    <div className="input-section">
                        <label htmlFor="registerPass">Password</label>
                        <input type="password" id="registerPass" className="inp inp_register"
                               onChange={this.validate} onFocus={this.showPolicy} onBlur={this.hidePolicy}/>
                        {this.state.pass.status ? <div className="error">{this.state.pass.text}</div> : null}
                        <div className={this.state.passCheck ? "pass-check" : "pass-check hide"}>
                            {
                                this.passCheck.map((item, index) => {
                                    return(
                                        <p key={index} id={item.id}
                                           className={this.state.passPolicy[item.id].status
                                               ? item.success : item.error}>{item.text}</p>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="input-section">
                        <label htmlFor="registerCPass">Confirm Password</label>
                        <input type="password" id="registerCPass" className="inp"
                               onChange={this.validate}/>
                        {this.state.cpass.status ? <div className="error">{this.state.cpass.text}</div> : null}
                    </div>
                </form>
                <div className="input-section">
                    {this.state.main.status ? <div className="submitError">{this.state.main.text}</div> : null}
                    <button className="submit" onClick={this.validSubmit}>Register</button>
                </div>
            </div>
        );
    }
}

export default Register;
