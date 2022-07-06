import User from "../../model/User";

export class AuthApi {
    login(user){
        return new Promise(
            (resolve, reject)=>{
                if(user.email === "admin@gmail.com"){
                    let user = new User();
                    user.email = "admin@gmail.com";
                    user.id = "1";
                    user.roles = {
                        "admin": true
                    };
                    resolve( user );
                }
                reject(new Error("Usuario o contraseña invalidos"));
            }
        );        
    }
}

export class ProductApi {
    list(type){      
        return new Promise(
            (resolve, reject)=>{
                const arrayProducts =[{
                    "id": 2,
                    "name": "Café americano",
                    "price": 5,
                    "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
                    "type": "Desayuno",
                    "dateEntry": "2022-03-05 15:14:10"
                  },
                  {
                    "id": 6,
                    "name": "Hamburguesa simple",
                    "price": 10,
                    "type": "Almuerzo",
                    "dateEntry": "2022-03-05 15:14:10"
                  }
                ];
                resolve(arrayProducts);
            }
        );        
    }
}

export class OrdersApi {
    create(order){
        return new Promise(
            (resolve, reject)=>{
                resolve();
            }
        );
    }
}