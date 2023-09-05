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
import ProtectedRoute from './Components/Utils/ProtectedRoute';
import AdminRoute from './Components/Utils/AdminRoute';
import Dashboard from './Components/Admin/dashboard';
import Users from './Components/Admin/Users';
import OrderList from './Components/Admin/Orders';
import Products from './Components/Admin/Products';

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
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/order/:id"
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              }
            />
            <Route path="/search" element={<Search />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <Users />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute>
                  <OrderList />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute>
                  <Products />
                </AdminRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
