import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class Header extends Component {

    state = {
        fullname: "",
        userID: "",
        providerID: "",
        email: "",
    };

    addUser()   {     fetch(global.url+"/users/add", {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        fullName: this.state.fullname,
        userID: this.state.userID,
        providerID: this.state.providerID,
        email: this.state.email,

    })
    }).then(results => {
        console.log("Add User "+JSON.stringify(results));
        console.log(" Add user parameters, fullname "+this.state.fullname+" userID "+this.state.userID+" providerID "+this.state.providerID+ " email "+this.state.email);
        return results.json();
    }); }

    componentDidMount() {
        // Global URL for backend
        global.url="http://localhost:9000";

        global.userId=0
        global.isAdmin=1

        fetch(global.url+"/user/info", {
            mode: 'cors',
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true
            }
        })
            .then(response => {
                if (response.status === 200) return response.json();
                throw new Error("Failed to authenticate user");
            })
            .then(responseJson => {
                global.userId=responseJson.loginInfo.providerKey
                global.isAdmin=responseJson.isAdmin
                console.log( "Response "+JSON.stringify(responseJson));
                this.setState({
                    fullname: responseJson.fullname,
                    userID: responseJson.loginInfo.providerKey,
                    providerID: responseJson.loginInfo.providerID,
                    email: responseJson.email,
                });

            })
            .catch(error => {
                console.log("No authorization");
                global.userId=0
             });



    }

    render() {
        this.addUser();
        console.log("UserID = "+global.userId+ " isAdmin="+global.isAdmin);
        return (
            <React.Fragment>
                <div id="logo"><h1>
                    Sklep internetowy
                </h1></div>
                <div id="nav-bar">
                    <ul>
                        <li><NavLink to="/">Strona Główna</NavLink></li>

                        {global.userId === 0 ? (
                            <React.Fragment>
                                <li onClick={this._handleSignFacebookInClick}><NavLink to="#"><img src="/facebook.png" /> Zaloguj</NavLink></li>
                                <li onClick={this._handleSignGoogleInClick}><NavLink to="#"><img src="/google.png" /> Zaloguj</NavLink></li>
                            </React.Fragment>

                        )  : (
                            <React.Fragment>
                                <li><NavLink to="/orders">Moje zamówienia</NavLink></li>
                                <li onClick={this._handleLogoutClick}><NavLink to="#">Wyloguj ({this.state.fullname})</NavLink></li>
                            </React.Fragment>

                        ) }

                        {global.userId!==0 && global.isAdmin === 1  ? (
                            <li><NavLink to="/admin/dashboard">Panel Administracyjny</NavLink></li>
                        ) : ""
                        }

                    </ul>
                </div>
            </React.Fragment>
        );
    }
    _handleLogoutClick = () => {
        window.open(global.url+"/signOut", "_self");
        this.props.handleNotAuthenticated();
    };

    _handleSignFacebookInClick = () => {
        window.open(global.url+"/authenticate/facebook", "_self");
    };

    _handleSignGoogleInClick = () => {
        window.open(global.url+"/authenticate/google", "_self");
    };

}

export default Header;