import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home/Section';
import Product from './Components/Products/Section';
import Cart from './Components/Cart/Section';
import Login from './Components/User/Login';
import SignUp from './Components/User/Signup';
import Checkout from './Components/Checkout/Section';
import Order from './Components/Order/Section';
import Profile from './Components/User/Profile';
import Orders from './Components/User/Orders';
import Search from './Components/Products/Search';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="mx-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
