import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCartShopping } from 'react-icons/fa6';
import { Store } from '../Store';
import { Dropdown, Navbar } from 'flowbite-react';
import SearchBox from './SearchBox';

const Navigation = () => {
  const { state, dispatch } = useContext(Store);
  const { cart, user } = state;
  const navigate = useNavigate();

  const signOutHandler = () => {
    dispatch({ type: 'USER_LOGOUT' });
    navigate('/');
  };

  return (
    <Navbar fluid className="bg-white">
      <Link to="/">
        {/* <img
          alt="Flowbite React Logo"
          className="mr-3 h-6 sm:h-9"
          src="/favicon.svg"
        /> */}
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          MyCart.
        </span>
      </Link>
      {user ? (
        <div className="flex md:order-2">
          <Dropdown
            inline
            label={
              <div className="h-10 w-10 rounded-full bg-gray-400 text-white font-semibold p-2 text-md">
                {user.name[0]}
              </div>
            }
          >
            <Dropdown.Header>
              <div className="block text-sm">{user.name}</div>
              <div className="block truncate text-sm font-medium text-gray-400">
                {user?.email}
              </div>
            </Dropdown.Header>
            <div className="text-sm text-gray-500 p-2 mx-4">
              <Link to="/profile">Profile</Link>
            </div>
            <div className="text-sm text-gray-500 p-2 mx-4">
              <Link to="/orders">Orders</Link>
            </div>
            <div className="text-sm text-gray-500 p-2 mx-4">
              <Link to="/wishlist">Wishlist</Link>
            </div>
            <Dropdown.Divider />
            <div className="text-sm text-gray-500 p-2 mx-4">
              <button onClick={signOutHandler}>Sign out</button>
            </div>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      ) : (
        <div className="flex md:order-2 w-24 hover:bg-blue-600 hover:text-white hover:rounded">
          <Dropdown
            inline
            label={
              <div className="text-sm inline-block pl-4 p-1">
                <Link to="/login">Sign in</Link>
              </div>
            }
            trigger="hover"
          >
            <Dropdown.Header>
              <div className="block text-sm">
                New Customer?{' '}
                <span className="text-sm text-blue-700 mx-1">
                  <Link to="/signup">sign up</Link>
                </span>
              </div>
              <div className=""></div>
            </Dropdown.Header>
            <div className="text-sm text-gray-500 p-2 mx-4">Profile</div>
            <div className="text-sm text-gray-500 p-2 mx-4">Order</div>
            <div className="text-sm text-gray-500 p-2 mx-4">Wishlist</div>
            <Dropdown.Divider />
            <div className="text-sm text-gray-500 p-2 mx-4">Sign out</div>
          </Dropdown>
          <Navbar.Toggle />
        </div>
      )}
      <Navbar.Collapse>
        <SearchBox />
        <Link to="/cart">
          <div className="relative top-3 -right-20">
            {cart?.cartItems?.length > 0 && (
              <span className="absolute -top-3 -right-5 rounded-xl text-white text-[10px] mx-auto text-center font-light bg-red-600 w-6 h-6 pt-[2px]">
                {cart.cartItems?.reduce((a, item) => a + item.quantity, 0)}
              </span>
            )}
            <FaCartShopping size={24} />
          </div>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
