import React, {Component} from "react";
import axios from "axios";

class Status extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
        }

        this.logout = this.logout.bind(this);

    }

    async getStatus() {
        await axios.get('http://localhost:3003/status')
            .then(res => {
                this.setState({
                    users: res.data
                })
            });
    }

    async logout(){
        await axios.get('http://localhost:3003/status/logout')
            .then(res => {
                this.getStatus();
            });
    }

    setStatus(){
        if(this.state.users.length > 0){
            return(
                <div className="status">
                    <p className="head">Welcome!!</p>
                    <p className="user">{this.props.user}</p>
                    <p className="head">Friends Online</p>
                    <ul>
                        {
                            this.state.users.map((user,index) => {
                                if(user.email !== this.props.user){
                                    return <li className="user" key={index}>{user.user_name}</li>
                                }else{
                                    return null;
                                }
                            })
                        }
                    </ul>
                    <button className="submit" onClick={this.logout}>Logout All</button>
                </div>
            )
        }else{
            return null;
        }
    }

    render() {
        return (
            <div className="Box">
                {this.setStatus()}
            </div>
        );
    }
}

export default Status;
