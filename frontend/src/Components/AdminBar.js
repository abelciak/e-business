import React, {Component} from 'react';
import {NavLink} from "react-router-dom";

class AdminBar extends Component{
    render(){
        return (
            <div id="nav-bar-admin">
                <ul>
                    <li><NavLink to="/admin/products">Produkty</NavLink></li>
                    <li><NavLink to="/admin/orders">Zamówienia</NavLink></li>
                    <li><NavLink to="/admin/users">Użytkownicy</NavLink></li>
                </ul>
            </div>
        );
    }
}

export default AdminBar;