import React, {Component} from 'react';
import './App.css';
import Register from "./component/register/register";
import Login from "./component/login/login";
import Status from "./component/status/status";

class App extends Component{

    render() {
        return (
            <div className="App">
                <Register/>
                <Login update={() => this.invoke.getStatus() }/>
                <Status ref={instance => { this.invoke = instance; }}/>
            </div>
        );
    }
}

export default App;
