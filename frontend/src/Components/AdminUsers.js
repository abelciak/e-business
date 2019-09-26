import React, {Component} from 'react';
import Header from "./Header";
import AdminBar from "./AdminBar";
import Footer from "./Footer";
import {NavLink} from "react-router-dom";

class AdminUsers extends Component{

    constructor() {
        super();
        this.state = {
            usersList: []
        };
    }

    componentDidMount() {
        var url = global.url+"/users/all";
        console.log("Request to "+url)
        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'GET',
        })
            .then(results => {
                console.log("Result users: "+results);
                return results.json();
            }).then(results => {
            this.setState({usersList: results})
        })
    }

    userDelete(idUser) {
        const url = global.url+"/users/delete/"+idUser;
        fetch(url, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Access-Control-Allow-Origin': 'http://localhost:3000',
            },
            method: 'DELETE',
        });
    }
    handleUserDelete (idUser) {
        console.log("Get request to delete id "+idUser);
        return event => {
            event.preventDefault();
            this.userDelete(idUser);
            console.log("Delete id "+idUser);
            let filteredArray = this.state.usersList.filter(item => idUser !== item.userID)
            this.setState({usersList: filteredArray})
        }
    }

    render() {

        let users = this.state.usersList.map((user) => {
            return (
                <tbody>
                <tr key={user.userID}>
                    <td>{user.fullname}</td>
                    <td>
                        {user.providerID==="facebook" ? ( <img src="/facebook.png" /> )
                            : user.providerID==="google"? ( <img src="/google.png" /> ) : ""
                        }
                    </td>
                    <td>{user.userID}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="button-details button-red" onClick={this.handleUserDelete(user.userID)}>Usuń</button>
                    </td>
                </tr>
                </tbody>
            )
        });

        return (
            <React.Fragment>
                <div id="container">
                    <Header/>
                    <div id="content">
                        <AdminBar />
                        <div id="side">
                            <div id="side-inner">
                                <h2>Lista użytkowników</h2>
                                <table id='details'>
                                    <thead>
                                    <tr>
                                        <th>Użytkownik</th>
                                        <th>Logowanie</th>
                                        <th>ID użytkownika</th>
                                        <th>E-mail</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    {users}
                                </table>
                            </div>
                        </div>

                    </div>
                    <Footer/>
                </div>
            </React.Fragment>
        );
    };
}

export default AdminUsers;