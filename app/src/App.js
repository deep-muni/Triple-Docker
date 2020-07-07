import React, {Component} from 'react';
import './App.css';
import Register from "./component/register/register";
import Login from "./component/login/login";
import Status from "./component/status/status";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            user: ''
        }

        this.addUser = this.addUser.bind(this);
    }

    addUser(userEmail){
        this.setState({
            user: userEmail
        })
    }

    render() {
        return (
            <div className="App">
                <Register/>
                <Login update={() => this.invoke.getStatus() } showUser={this.addUser}/>
                <Status ref={instance => { this.invoke = instance; }} user={this.state.user}/>
            </div>
        );
    }
}

export default App;
