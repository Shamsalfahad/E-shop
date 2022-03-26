import { click } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";
import Product from "../../Product/Product";
import "./Shop.css";
const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [list, setList] = useState([]);
  const [choose, setchoose] = useState([]);
  const [flag, setFlag] = useState(false);
  const handleChooseAgain = () => {
    setCart([]);
  };
  const handleChooseOne = () => {
    let uniqueProduct = [];
    let chooseOne = Math.round(Math.random() * list.id);
    if (chooseOne >= 0 && chooseOne <= 11) {
      const choosingValue = cart.filter((data) => data.id == chooseOne);
      let uniqueProduct = [...new Set(choosingValue)];
      setchoose(uniqueProduct);
      console.log(chooseOne);
    }
    setFlag(true);
  };
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  const handleAddToCart = (product) => {
    setList(product);
    const newCart = [...cart, product];
    setCart(newCart);
    setFlag(false);
  };
  console.log(choose);
  return (
    <div className="shope-container">
      <div className="products-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <h4>Order Summery</h4>
        <p>Selected Items:{cart.length}</p>
        {!flag && cart.map((list) => <p key={list.id}>{list.name}</p>)}
        {flag && choose.map((list) => <p key={list.id}>{list.name}</p>)}
        <button className="cart-btn" onClick={handleChooseOne}>
          Choose one for me
        </button>
        <button className="cart-btn" onClick={handleChooseAgain}>
          Choose Again
        </button>
      </div>
      <div className="QnA">
        
        <div>
          <h1>How React works?</h1>
          <p>
          React uses a declarative paradigm that makes it easier to reason about your application and aims to be both efficient and flexible. It designs simple views for each state in your application, and React will efficiently update and render just the right component when your data changes. The declarative view makes your code more predictable and easier to debug.
          A React application is made of multiple components, each responsible for rendering a small, reusable piece of HTML. Components can be nested within other components to allow complex applications to be built out of simple building blocks. A component may also maintain an internal state – for example, a TabList component may store a variable corresponding to the currently open tab.

          </p>
        </div>
        <div >
          <h1> Props vs State</h1>
          <p>
          PROPS-
The Data is passed from one component to another.
It is Immutable (cannot be modified). 
Props can be used with state and functional components. 
Props are read-only.
<br /> <br />
STATE-
The Data is passed within the component only.
It is Mutable ( can be modified).
State can be used only with the state components/class component (Before 16.0).
State is both read and write.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Shop;
