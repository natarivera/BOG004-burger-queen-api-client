import React from "react";
import { Navigate } from "react-router-dom";
import UserTable from "./UserTable";
import Logo from "../components/Logo"
import NameWaiter from "../waiter/NameWaiter";
import "./Admin.css"

export default class Admin extends React.Component {


    render() {
        return <div className="admin">
            {this.props.user && (
                <div>
            <div className="adminHeader">
                <div className="adminLogo">
                    <Logo />
                </div>
                <div className="nameAdmin">
                    <NameWaiter user={this.props.user} />
                </div>                
                <div className="material-symbols-outlined">
                    <button onClick={this.props.logoutFn}>logout</button>
                </div>
            </div>
            <UserTable user={this.props.user} />
            </div>
            )}
            {!this.props.user && (<Navigate to="/" />)}
        </div>

    }
}
