import React from "react";
import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import Chef from "./Chef"

// import API mocking utilities from Mock Service Worker
import {rest} from 'msw'
import {setupServer} from 'msw/node'
// the component to test

const user = {
        email: "pedro.linares@systers.xyz",
        password: "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
        roles: {
          "chef": true
},
    id: 4,
    accessToken: "",
};


describe("Kitchen",() =>{
    it("Reders content", ()=>{
        render(<Chef user={user}/>);
        screen.getAllByText(/pedro.linares@systers.xyz/i);
    });
});


const server = setupServer(
    rest.get('http://localhost:8080/orders', (req, res, ctx) => {
      return res(ctx.json(
        [
          { 
            "id": 1,
            "userId": 1,
            "client": "Jude Milhon",
            "products": [
              {
                "qty": 1,
                "product": {
                  "id": 1,
                  "name": "Sandwich de jamón y queso",
                  "price": 1000,
                  "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/sandwich.jpg",
                  "type": "Desayuno",
                  "dateEntry": "2022-03-05 15:14:10"
                }
              },
              {
                "qty": 1,
                "product": {
                  "id": 2,
                  "name": "Café americano",
                  "price": 500,
                  "image": "https://github.com/Laboratoria/bootcamp/tree/main/projects/04-burger-queen-api/resources/images/coffe.jpg",
                  "type": "Desayuno",
                  "dateEntry": "2022-03-05 15:14:10"
                }
              }
            ],
            "status": "done",
            "dataEntry": "2022-03-05 15:00",
            "doneDateTime": "2022-06-14T03:18:16.481Z"
          },
        ]
      ));
    }),    
  )
  
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())
  
  
  test('loads and displays kitchen orders', async () => {
    render(<Chef user={user} logoutFn={()=>{}}/>)
  
    await waitFor(() => screen.findByText("Café americano"));
  })
  
  test('handles server error', async () => {
    server.use(
      rest.get('http://localhost:8080/orders', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    render(<Chef user={user} logoutFn={()=>{}}/>)
    await waitFor(() => screen.findByText(/Error en la consulta de productos/i));
  })

