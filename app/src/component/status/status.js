import React, {Component} from "react";
import axios from "axios";

class Status extends Component {

    constructor(props) {
        super(props);

        this.state = {
            users: [],
        }

    }

    async getStatus() {
        await axios.get('http://localhost:3003/status')
            .then(res => {
                this.setState({
                    users: res.data
                })
            });
    }

    render() {
        return (
            <div className="Box">
                <ul>
                    {
                        this.state.users.map((user,index) => {
                            return <li key={index}>{user.email}</li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default Status;
