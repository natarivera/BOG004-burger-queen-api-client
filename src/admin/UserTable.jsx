import React, { useEffect, useState, useRef } from "react";
import {UserApi} from "../api/api-utils";


export default function UserTable(props){
    const userAPI = new UserApi(props.user?.accessToken);
    const [users, setUsers] = useState();    
    const [user, setUser] = useState();    
    const [errorMsg, setErrorMsg] = useState(undefined);    
    useEffect(
        ()=>{
            if( users === undefined && errorMsg == undefined){
                userAPI.list().then(
                    (_users)=>{
                        setUsers(_users);
                    }
                )
                .catch(
                    (srvError)=>{
                        setErrorMsg(srvError.message);
                    }
                );
            }            
        }
    );
    
    function showForm(user = {email:'', roles:{}}){
        user.password = '';
        setUser(user);        
    }

    function saveUser(event){
        setUser(undefined);
        //Si esta funcion falla deberiamos hacer algo
        event.preventDefault();
        let promise;
        if(user.id){
            promise = userAPI.update(user)                
        } else {
            promise = userAPI.create(user);
        }
        promise.then(
            (_user)=>{
                setUsers(undefined);
                alert("El usuario ha sido creado correctamente");
            }
        )
        .catch(
            (error)=>{
                setErrorMsg(error.message);
            }
        );
    }

    function deleteUser(user){
        userAPI
            .delete(user.id)
            .then(
                (_)=>{
                    setUsers(undefined);
                    alert("El usuario ha sido eliminado correctamente");
                }
            )
            .catch(
                (error)=>{
                    setErrorMsg(error.message);
                }
            );
    }

    function handleChange(event) {              
        user[event.target.name] = event.target.value;        
        setUser({...user});        
    }

    function handleRoleChange(event) {      
        user.roles[event.target.name] = !user.roles[event.target.name];
        setUser({...user});    
    }

    return(
        <div>
        <table className="userTable">
            <thead>
            <tr>
                <th>id</th>                
                <th style={{minWidth: 800}}>Email</th>                
                <th className="fitwidth">Admin</th>
                <th className="fitwidth">Waiter</th>
                <th className="fitwidth">Chef</th>
                <th><span className="material-symbols-outlined" onClick={()=>showForm()}>person_add</span></th>
            </tr>  
            </thead>
            <tbody>
            {users && users.map(
                user => <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.roles.admin?"X":""}</td>
                    <td>{user.roles.waiter?"X":""}</td>
                    <td>{user.roles.chef?"X":""}</td>
                    <td>
                    <span className="material-symbols-outlined" onClick={()=>showForm(user)}>edit</span>
                    <span className="material-symbols-outlined" onClick={()=>deleteUser(user)}>delete</span>
                    </td>
                </tr>
            )}
            {!users && errorMsg && <tr><td colSpan="5">{errorMsg}</td></tr>}

            </tbody>          
        </table>
        {
            user &&
            <div className="form-popup">
                <div>
                    <h2>{user.id === undefined ? 'Usuario nuevo' : 'Actualizar usuario '+user.id}</h2>
                    <span class="material-symbols-outlined closeBtn" onClick={()=>{setUser(undefined)}}>close</span>
                </div>                 
            <form className="newUserForm" onSubmit={saveUser} autoComplete="off">                
                <input className= "emailInput" type="email" required minLength={7} name="email" value={user.email} placeholder="Ingrese el correo electronico" onChange={handleChange} />
                <input className= "emailInput"type="password" required name="password" minLength={4} value={user.password} placeholder="Ingrese la contraseña" onChange={handleChange} />
                <label><input type="checkbox" name="admin" checked={user.roles.admin?true:false} onChange={handleRoleChange}/>Admin</label>
                <label><input type="checkbox" name="waiter" checked={user.roles.waiter?true:false} onChange={handleRoleChange}/>Waiter</label>
                <label><input type="checkbox" name="chef" checked={user.roles.chef?true:false} onChange={handleRoleChange}/>Chef</label>
                <input className= "btnSave" type="submit" value="Guardar" />                
            </form>
        </div>
        }
        </div>
    );

}