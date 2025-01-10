import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to ShopSmart</h1>
      <Link to="/products">Browse Products</Link>
    </div>
  );
}

export default Home;