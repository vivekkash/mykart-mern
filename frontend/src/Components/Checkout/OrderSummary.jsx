import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheck } from 'react-icons/fa6';

const OrderSummary = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const [toggle, setToggle] = useState('hidden');

  const navigate = useNavigate();

  const updateCartHandler = (product, quantity) => {
    if (product.stock < quantity) {
      console.log('outofstock');
      return;
    }
    dispatch({ type: 'CART_ADD_PRODUCT', payload: { ...product, quantity } });
  };

  const removeCartHandler = (product) => {
    dispatch({ type: 'CART_REMOVE_PRODUCT', payload: { ...product } });
  };

  const continueToPayment = () => {
    dispatch({
      type: 'CHECKOUT_STEP_ORDER_SUMMARY',
      payload: true,
    });
  };

  useEffect(() => {
    if (cart.cartItems.length === 0) {
      navigate('/');
    }
    if (state.checkout_step.delivery) {
      setToggle('block');
    } else {
      setToggle('hidden');
    }
  }, [cart, navigate, state.checkout_step.delivery]);

  return (
    <div className="shadow-md mb-4">
      <h1
        className="bg-white p-3 h-12 mx-auto text-md border-[1px] border-top-gray-400 text-gray-400"
        onClick={() =>
          state.checkout_step.delivery &&
          setToggle(
            (toggle) => (toggle = toggle == 'block' ? 'hidden' : 'block')
          )
        }
      >
        <span className="h-6 w-6 bg-gray-400 text-white px-2 mx-2">3</span>{' '}
        Order Summary{' '}
        <span className="px-2 text-[12px] text-black">
          Items({cart.cartItems.length})
        </span>
        {state.checkout_step?.order_summary ? (
          <span className="text-green-500 inline-block px-3">
            <FaCheck />
          </span>
        ) : (
          ''
        )}
      </h1>
      {cart.cartItems.length === 0 ? (
        <div
          className={`flex h-40 border-[1px] border-gray-200 bg-white p-2 gap-4 ${toggle}`}
        >
          <h2>Cart is empty</h2>
          <p>
            <Link to="/">
              <button className="h-10 w-auto m-2 p-2 text-sm bg-blue-600 text-white hover:bg-blue-700">
                Continue Shopping
              </button>
            </Link>
          </p>
        </div>
      ) : (
        !state.checkout_step.order_summary &&
        cart.cartItems.map((product, i) => {
          return (
            <div
              key={i}
              className={`flex h-40 border-[1px] border-gray-200 bg-white p-2 gap-4 ${toggle}`}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="aspect-square self-center h-24 md:h-full"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-sm md:text-md md:font-semibold">
                  {product.title}
                </h2>
                <h4 className="text-sm md:text-md md:font-semibold dark:text-white">
                  ₹{product.price}{' '}
                  <span className="line-through text-gray-400 text-[14px] px-2 font-light">
                    ₹{product.price + (product.price * 12) / 100}
                  </span>
                  <span className="text-green-500 text-sm font-normal">
                    {product.discountPercentage}% off
                  </span>
                </h4>

                <div className="mt-2">
                  <button
                    className="h-6 w-6 rounded-2xl bg-gray-200 text-gray-400"
                    disabled={product.quantity === product.stock}
                    onClick={() => {
                      updateCartHandler(product, product.quantity + 1);
                    }}
                  >
                    +
                  </button>
                  <span className="border-[1px] border-gray-300 w-10 mx-2 px-3 text-sm font-light">
                    {product.quantity}
                  </span>
                  <button
                    className="h-6 w-6 rounded-2xl bg-gray-200 text-gray-400"
                    disabled={product.quantity === 1}
                    onClick={() => {
                      updateCartHandler(product, product.quantity - 1);
                    }}
                  >
                    -
                  </button>
                  <div className="mt-4 text-sm">
                    <button
                      onClick={() => {
                        removeCartHandler(product);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      )}
      {!state.checkout_step.order_summary && cart.cartItems.length > 0 ? (
        <div className={`bg-white flex justify-end ${toggle}`}>
          <button
            className="h-10 md:h-12 p-2 px-6 bg-orange-500 hover:bg-orange-600 text-white text-[12px] md:text-sm m-2 "
            onClick={continueToPayment}
          >
            Continue
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default OrderSummary;
