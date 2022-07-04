import React from "react";
import { Navigate } from "react-router-dom";
import TableOrder from "./TableOrder";
import "./Chef.css"
import Logo from "../components/Logo"
import NameWaiter from "../waiter/NameWaiter";
import App from "../App";

export default function Chef(props) {

    return (        
        <div className="Chef">
            {!props.user && (<Navigate to="/" />)}
            
            {props.user && (<div className="ChefHeader">
                <div className="chefLogo">
                    <Logo />
                </div>
                <div className="nameChef">
                    <NameWaiter user={props.user} />
                </div>
                <div className="material-symbols-outlined">
                    <button onClick={props.logoutFn}>logout</button>
                </div>
            </div>)}            
            {props.user && (<TableOrder user={props.user} />)}
        </div>
    );
}