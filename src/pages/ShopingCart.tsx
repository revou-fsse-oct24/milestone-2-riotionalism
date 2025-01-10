import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ShoppingCart: React.FC = () => {
  const { cart, removeFromCart } = useContext(CartContext);

  return (
    <div>
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        ))
      )}
    </div>
  );
}

export default ShoppingCart;