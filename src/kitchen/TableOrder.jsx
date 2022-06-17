import React, { useEffect, useState } from "react";
import {OrdersApi} from "../api/api-utils";




export default function TableOrder(props){
    const orderAPI = new OrdersApi(props.user?.accessToken);
    const [orders, setOrders] = useState();

    useEffect(
        ()=>{
            if( orders === undefined ){
                orderAPI.list("pending").then(
                    (_orders)=>{
                        setOrders(_orders);
                    }
                );
            }            
        }

    );

    function markOrderAsReady(order){
        order.status = "done";
        order.doneDateTime = new Date();
        orderAPI.update(order)
            .then(
                (order)=>{
                    setOrders(undefined);
                }
            )
            .catch(
                (error)=>{
                    //algo
                }
            );
    }

    return(
        
        <table className="productTable">
            <thead>
            <tr>
                <th>Mesa</th>                
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>time</th>
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
                                {index === 0 && <td rowSpan={order.products.length}>{order.dataEntry}</td>}
                                {index === 0 && <td rowSpan={order.products.length}>
                                    <button className="btn-pending" onClick={()=>markOrderAsReady(order)} >Pendiente</button>
                                    </td>}
                            </tr>
                )
            )}
            </tbody>          
        </table>

    );

}