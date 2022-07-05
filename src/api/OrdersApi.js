import axios from "axios";

export default class OrdersApi{

    baseURL = "http://localhost:8080/orders";
    
    constructor(accessToken){
        this.accessToken = accessToken;
    }
    
    getHeaders(){
        return {
            'Content-Type':'application/json', 
            'Authorization': 'Bearer '+this.accessToken
        };
    }
    //crear la orden
    create(order){
        return axios.post(this.baseURL, order, {headers:this.getHeaders()})
            .then(
                (result)=>{                                        
                    return result.data; 
                }
            )
            .catch(
                (error)=>{
                    console.log("Unexpected error: "+error);
                    throw Error("Error en la creación de orden: "+error.message);
                }
            );   
    }
    
    update(order){
        const patchURL = `${this.baseURL}/${order.id}`;
        return axios.patch(patchURL, order, {headers:this.getHeaders()})
            .then(
                (result)=>{                                        
                    return result.data; 
                }
            )
            .catch(
                (error)=>{
                    console.log("Unexpected error: "+error);
                    throw Error("Error en la actualización de producto: "+error.message);
                }
            );   
    }
    
    list(status){
        let listURL = this.baseURL;         
        if(status !== undefined){
            listURL += `?status=${status}`;
        }    
        return axios.get(listURL, {headers:this.getHeaders()})
            .then(
                (result)=>{                                                            
                    return result.data; 
                }
            )
            .catch(
                (error)=>{
                    console.log("Unexpected error: "+error);
                    throw Error("Error en la consulta de productos: "+error.message);
                }
            );  
    }
    
    get(id){
        const getURL = `${this.baseURL}/${id}`;        
        return axios.get(getURL, {headers:this.getHeaders()})
            .then(
                (result)=>{                                        
                    return result.data; 
                }
            )
            .catch(
                (error)=>{
                    console.log("Unexpected error: "+error);
                    throw Error("Error en la consulta de order: "+error.message);
                }
            );   
    }
    
    delete(id){
        const deleteURL = `${this.baseURL}/${id}`;        
        return axios.delete(deleteURL, {headers:this.getHeaders()})
            .then(
                (result)=>{                                        
                    return result.data; 
                }
            )
            .catch(
                (error)=>{
                    console.log("Unexpected error: "+error);
                    throw Error("Error en la elimiación de order: "+error.message);
                }
            );  
    }}