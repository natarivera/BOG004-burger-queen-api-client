import React from "react";
import { Navigate } from "react-router-dom";
import "./Waiter.css"
import Logo from "../components/Logo";
import Products from "./Products.jsx"
import Summary from "./Summary";
import Customer from "./Customer";
import NameWaiter from "./NameWaiter";
import OrdersAlert from "./OrdersAlert";
import OrdersApi from "../api/OrdersApi";



export default class Waiter extends React.Component {

    constructor(props) {
        super(props);
        this.state = { numTable: undefined, products: new Map(), customer: '', error:undefined };
        this.ordersApi = new OrdersApi(props.user.accessToken);
        this.handleClick = this.handleClick.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.subProduct = this.subProduct.bind(this);
        this.setCustomer = this.setCustomer.bind(this);
        this.sendOrder= this.sendOrder.bind(this);
    }

    handleClick(event) {
        const { id } = event.target.dataset;
        if (id !== undefined) {
            this.setState({ numTable: id });
        }
    }

    addProduct(product) {
        if (this.state.products.has(product.id)) {
            //1.1 Si esta entonces le suma 1 a la cantidad
            const item = this.state.products.get(product.id);
            item.qty += 1;
        } else {
            //1.2 Si no, lo agrega con cantidad 1
            const item = {
                qty: 1,
                product: product
            };
            //lo agregamos al map
            this.state.products.set(product.id, item);
        }
        this.setState({ products: this.state.products });
    }

    subProduct(product) {
        //1.traer el objeto del map
        const item = this.state.products.get(product.id);
        //1.1 Si tiene una cantidad mayor que uno 
        if (item.qty > 1) {
            //1.1.2 restar uno
            item.qty -= 1;
        } else { //1.2 Si no, es = 1               
            //1.2.1 quitarlo del map
            this.state.products.delete(product.id);
        }
        this.setState({ products: this.state.products });
    }

    setCustomer(customer) {
        this.setState({ customer });

    }
    sendOrder(){
        /**
         * 
         *  {
                "id": 1,
                "userId": 1,
                "client": "Jude Milhon",
                "products": [
                    
                ],
                "status": "pending",
                "dataEntry": "2022-03-05 15:00"
                },
         *  */    
        const order = {
            userId: this.props.user.id,
            client: this.state.customer,
            products: Array.from(this.state.products.values()),
            status: "pending",
            dataEntry: new Date(),
        };
        this.ordersApi.create(order)//Tarea hacer el then y el catch
        .then (
            (newOrder)=>{
                console.log(newOrder.id);
            }
        )
        .catch(
            (error)=>{                
                this.setState({error: 'Error creando la orden '+error});
            }
        )
    }

    render() {
        const tablesCount = this.props.tablesCount;
        let arrayTables = [];
        for (var i = 0; i < tablesCount; i++) {
            arrayTables.push(
                <div key={i} data-id={i + 1} className="item-Table">
                    <div data-id={i + 1} className="material-symbols-outlined icon-Table">table_restaurant</div>
                    <div data-id={i + 1}>Mesa {i + 1}</div>
                </div>
            )
        }
        return <div className="Waiter">
            {!this.state.numTable && <Logo />}
            {!this.state.numTable && <div className="table" onClick={this.handleClick.bind(this)}>{arrayTables}</div>}

            {this.state.numTable &&
                <div className="Order">
                    <Logo />
                    <div className="WaiterHeader">
                        <OrdersAlert />
                        <NameWaiter user={this.props.user} />
                    </div>
                    <Customer setCustomer={this.setCustomer} customer={this.state.customer} />
                    <div />
                    <Summary products={this.state.products} addProduct={this.addProduct} user={this.props.user} subProduct={this.subProduct} sendOrder={this.sendOrder}/>
                    <Products numTable={this.state.numTable} addProduct={this.addProduct} user={this.props.user} />
                </div>
            }
            {this.state.error && <div>{this.state.error}</div>}
            {!this.props.user && (<Navigate to="/" />)}     
        </div>
    }
}
