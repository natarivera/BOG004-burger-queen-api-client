import React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Customer from './Customer'


describe('Customer',() =>{
    it('Should exist input' , () => {
        var customer = '';
        function setCustomer(newCustomer){
            customer = newCustomer;
        }
        render(<Customer setCustomer={setCustomer} customer={customer}/>);
        const cusInput = screen.getByPlaceholderText('Ingresar nombre del Cliente')
        fireEvent.change(cusInput,{target: {value:' Jeronimo Monroy'}});
        expect(customer).toBe(' Jeronimo Monroy');

    });

});