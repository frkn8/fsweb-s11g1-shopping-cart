import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";

// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

const writeToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const LSKey = "g11s10223";

const initializeCart = () => {
  const cart = readFromLocalStorage(LSKey);
  if (cart === null) {
    return [];
  } else {
    return cart;
  }
};

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(() => initializeCart());

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    const newCart = [...cart, item];

    setCart(newCart);
    writeToLocalStorage(LSKey, newCart);
  };

  const removeItem = (id) => {
    const newRemove = [...cart];
    let removedID = newRemove.findIndex((i) => i.id === id);
    newRemove.splice(removedID, 1);
    setCart(newRemove);
    writeToLocalStorage(LSKey, newRemove);
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <div className="App">
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />

          {/* Routelar */}
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </CartContext.Provider>
      </div>
    </ProductContext.Provider>
  );
}

export default App;
