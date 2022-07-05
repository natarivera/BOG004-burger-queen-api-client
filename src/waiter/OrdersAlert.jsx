import React, {useEffect, useState, useRef} from "react";
import {OrdersApi} from "../api/api-utils";

export default function OrdersAlert(props){
    const orderAPI = new OrdersApi(props.user?.accessToken);
    const [doneCount, setDoneOrders] = useState();
    const timerID = useRef();
    useEffect(
        ()=>{
            if( doneCount === undefined){
                orderAPI.list("done").then(
                    (_orders)=>{
                        setDoneOrders(_orders.length);
                    }
                )
            }        
            timerID.current = setInterval(()=>{setDoneOrders(undefined)}, 10000);
            return () => {
                clearInterval(timerID.current);
            }
        }

    );

   // 2. doneCount setDoneCount -> 0

    return(
        <div onClick={props.onClick}>
            <div className="material-symbols-outlined">circle_notifications</div>
            <span className="doneCount">{doneCount}</span>
        </div>
        
    );
}