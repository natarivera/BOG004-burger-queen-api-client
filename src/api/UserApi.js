

import axios from "axios";

export default class UserApi{

    baseURL = "http://localhost:8080/users";
    
    constructor(accessToken){
        this.accessToken = accessToken;
    }
    
    getHeaders(){
        return {
            'Content-Type':'application/json', 
            'Authorization': 'Bearer '+this.accessToken
        };
    }
    //crearel usuario
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
                    throw Error("Error en la creación del usuario: "+error.message);
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
                    throw Error("Error en la actualización del usuario: "+error.message);
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
                    throw Error("Error en la consulta de usuarios: "+error.message);
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
                    throw Error("Error en la consulta de usuario: "+error.message);
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
                    throw Error("Error en la elimiación del usuario: "+error.message);
                }
            );  
    }

}