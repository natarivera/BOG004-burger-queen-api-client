import React, { useEffect, useState, useRef } from "react";
import {OrdersApi} from "../api/api-utils";




export default function TableOrder(props){
    const orderAPI = new OrdersApi(props.user?.accessToken);
    const [orders, setOrders] = useState();
    const [curDate, setCurDate] = useState(new Date());
    const [errorMsg, setErrorMsg] = useState(undefined);
    const timerID = useRef();
    useEffect(
        ()=>{
            if( orders === undefined && errorMsg == undefined){
                orderAPI.list("done").then(
                    (_orders)=>{
                        setOrders(_orders);
                    }
                )
                .catch(
                    (srvError)=>{
                        setErrorMsg(srvError.message);
                    }
                );
            }        
            timerID.current = setInterval(()=>{setCurDate(new Date())}, 1000);
            return () => {
                clearInterval(timerID.current);
            }
        }

    );

    function markOrderAsServed(order){
        order.status = "served";
        order.doneDateTime = new Date();
        orderAPI.update(order)
            .then(
                (order)=>{
                    setOrders(undefined);
                }
            )
            .catch(
                (error)=>{
                    setErrorMsg(error.message);
                }
            );
    }

    function getTimeDiference(order){
        const now  = curDate;
        const diff = now.getTime() - (new Date(order.dataEntry)).getTime();
        //const secs = diff*1000;
        //const min  = secs/60;
        const diffDate = new Date(diff);        
        //1970-01-15T00:50:34.963Z
        return diffDate.toISOString().substring(11, 19);
    }

    return(
        
        <table className="productTable">
            <thead>
            <tr>
                <th>Mesa</th>                
                <th>Nombre</th>
                <th className="fitwidth">Cant</th>
                <th>Time</th>
                <th>Estado</th>
            </tr>  
            </thead>
            <tbody>
            {orders && orders.map(
                order => Array.from(order.products).map(
                    (item, index) => <tr key={order.id+" "+item.product.id}>
                                {index === 0 && <td rowSpan={order.products.length}>{order.numTable??'1'}</td>}                                
                                <td>{item.product.name}</td>                                
                                <td>{item.qty}</td>
                                {index === 0 && <td rowSpan={order.products.length}>{getTimeDiference(order)}</td>}
                                {index === 0 && <td rowSpan={order.products.length}>
                                    <button className="btn-pending" onClick={()=>markOrderAsServed(order)} >Lista</button>
                                    </td>}
                            </tr>
                )
            )}
            {!orders && errorMsg && <tr><td colSpan="5">{errorMsg}</td></tr>}
            </tbody>          
        </table>
        
    );

}