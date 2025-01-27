
import React from "react";


export default function Summary(props) {
    console.log(props.products + " " + (typeof props.products));


    function calculateTotalPay(){
        
        return Array.from(props.products.values()).reduce((prev, curr)=>prev+(curr.product.price*curr.qty), 0);

    }

    return (
        <div className="Summary">
            <div className="SumProducts">
                {Array.from(props.products.values()).map(item => <div className="childSumary" key={item.product.id}>
                    <button className="material-symbols-outlined " onClick={()=>props.addProduct(item.product)}>add_circle</button>
                    <span>{item.qty}</span>
                    <button className="material-symbols-outlined" onClick={()=>props.subProduct(item.product)}>do_not_disturb_on</button>
                    <span>{item.product.name}</span>
                    <span>${item.product.price * item.qty}</span>
                </div>)}
            </div>
            <button className="totalPay">
                Pagar <span>{calculateTotalPay()}</span>
            </button>
            <div className="btn-send">
                <button className="send" onClick={()=> props.sendOrder()}>Enviar</button>
            </div>
        </div>
    );

}