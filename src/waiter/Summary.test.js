import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Summary from './Summary'

//Test Summary
describe( 'Summary', () =>{
    it('Should return an array is not empty', ()=>{
        const products = new Map();
        products.set(1,{
            qty:1,
            product:{
                "id": 8,
                "name": "Papas fritas",
                "price": 5,
              }
        });
        render(<Summary products={products}/>);
        const productRow = screen.getByText("Papas fritas");
        expect(productRow).toBeInTheDocument();
    });
    // que si le da en el menos que llame la funcion sub
    it('Should call function subProduct', ()=>{
        const products = new Map();

        products.set(1,{
            qty:1,
            product:{
                "id": 8,
                "name": "Papas fritas",
                "price": 5,
              }
        });
        //se crea un mock de la funcion que resta para verificar si si la esta llamando
        function subProductTest(){
            //si lo llamo!
            products.clear();
        }
        render(<Summary products={products} subProduct={subProductTest}/>)
        const btnSubProduct= screen.getByText('do_not_disturb_on');
        fireEvent.click(btnSubProduct);
        expect(products.size).toBe(0);//verifica que si lo alla limpiado
    });
});






