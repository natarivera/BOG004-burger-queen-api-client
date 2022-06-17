import React from "react";
import { Navigate } from "react-router-dom";
import TableOrder from "./TableOrder";
import "./Chef.css"
import Logo from "../components/Logo"
import NameWaiter from "../waiter/NameWaiter";

export default function Chef(props){
  
        return (
        <div className="Chef">
            <div className="ChefHeader">
                <Logo/>
                <NameWaiter user={props.user}/>
                <button className="material-symbols-outlined" onClick={props.logoutFn}>logout</button>  
            </div>            
            {!props.user && (<Navigate to="/" />)}  
            
             <TableOrder user={props.user}/>
             
            
        </div>
        );
}