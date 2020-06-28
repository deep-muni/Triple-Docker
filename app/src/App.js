import React from 'react';
import './App.css';
import Register from "./component/register/register";
import Login from "./component/login/login";
import Status from "./component/status/status";

function App() {
  return (
    <div className="App">
        <Register/>
        <Login/>
        <Status/>
    </div>
  );
}

export default App;
