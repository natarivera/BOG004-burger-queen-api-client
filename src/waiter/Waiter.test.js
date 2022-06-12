import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Waiter from "./Waiter";

jest.mock("../api/api-utils.js");

const user = {
  email: "juan.perez@systers.xyz",
  password: "$2a$10$JABwR1UAtJqr2DCJ41ypMOgOqlh8eRXmTBO6DXfKG3ybxhABY4rey",
  roles: {
    waiter: true,
  },
  id: 3,
  accessToken: "",
};

describe("Waiter", () => {
  it("Reders content", () => {
    render(<Waiter user={user} tablesCount={12} />);
    const btnTable = screen.getAllByText("table_restaurant");
    fireEvent.click(btnTable[0]);
    screen.getAllByText(/juan.perez@systers.xyz/i);
  });
});

describe("Component Waiter", () => {
  it("Renders products in summary", async () => {
    render(<Waiter user={user} tablesCount={12} />);
    const btnTable = screen.getAllByText("table_restaurant");
    fireEvent.click(btnTable[0]);
    const btnCategory = screen.getAllByText("Desayuno");
    fireEvent.click(btnCategory[0]);
    let btnProduct;
    await waitFor(() => (btnProduct = screen.getByText("Café americano")));
    fireEvent.click(btnProduct);
    screen.getAllByText(/Café americano/i);
  });

  it("Should call function subProduct", async () => {
    render(<Waiter user={user} tablesCount={12} />);
    const btnTable = screen.getAllByText("table_restaurant");
    fireEvent.click(btnTable[0]);
    const btnCategory = screen.getAllByText("Almuerzo");
    fireEvent.click(btnCategory[0]);
    let btnProduct;
    await waitFor(() => (btnProduct = screen.getByText("Hamburguesa simple")));
    fireEvent.click(btnProduct);
    const btnAddProduct = screen.getByText("add_circle");
    fireEvent.click(btnAddProduct);
    const btnSubProduct = screen.getByText("do_not_disturb_on");
    fireEvent.click(btnSubProduct);
    fireEvent.click(btnSubProduct);    
    //const btnCatDrinks = screen.getAllByText("Café americano");
    //fireEvent.click(btnCatDrinks+[0]);
    expect(btnProduct).not.toBeInTheDocument();
  });


  it("Should send an Order", async () => {
    render(<Waiter user={user} tablesCount={12} />);
    const btnTable = screen.getAllByText("table_restaurant");
    fireEvent.click(btnTable[0]);
    const btnCategory = screen.getAllByText("Desayuno");
    fireEvent.click(btnCategory[0]);
    let btnProduct;
    await waitFor(() => (btnProduct = screen.getByText("Café americano")));
    fireEvent.click(btnProduct);
    let btnSend = screen.getByText("Enviar");
    fireEvent.click(btnSend);
  });

  it("Should exist input", () => {
    render(<Waiter user={user} tablesCount={12} />);
    const btnTable = screen.getAllByText("table_restaurant");
    fireEvent.click(btnTable[0]);
    const cusInput = screen.getByPlaceholderText("Ingresar nombre del Cliente");
    fireEvent.change(cusInput, { target: { value: " Jeronimo Monroy" } });
  });
});
