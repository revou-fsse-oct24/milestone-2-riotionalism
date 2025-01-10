import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ShoppingCart from './pages/ShoppingCart';
import Login from './pages/Login';
import Register from './pages/Register';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products" exact component={ProductList} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/cart" component={ShoppingCart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </CartProvider>
  );
};

export default App;