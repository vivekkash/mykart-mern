import { useContext } from 'react';
import { Store } from '../../Store';
import { Link, useNavigate } from 'react-router-dom';

const Section = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

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

  const checkoutHandler = () => {
    console.log('checkout handler');
    navigate('/login?redirect=/checkout');
  };

  //Instead of using below var, you can use cart.cartItems.reduce((a, item)=>a+item.price,0) similarly for others.
  let totalItemPrice = 0;
  let totalDiscountPercentage = 0;
  let totalItem = 0;
  let deliveryCharges = 0;

  return (
    <div className="relative mt-20">
      <div className="flex flex-wrap justify-center gap-2">
        <div className="h-40 w-full md:w-[60%] shadow-md">
          <h1 className="bg-white p-2 h-10 mx-auto text-center text-md border-[1px] border-top-gray-400 text-gray-400">
            Cart Details
          </h1>
          {cart.cartItems.length === 0 ? (
            <div className="flex flex-col gap-2 justify-center items-center bg-white h-full border-[1px] border-gray-200">
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
            cart.cartItems.map((product, i) => {
              totalItemPrice += product.price * product.quantity;
              totalDiscountPercentage += product.discountPercentage;
              totalItem += product.quantity;
              deliveryCharges = totalItemPrice < 1000 ? 99 : 0;

              return (
                <div
                  key={i}
                  className="flex h-40 border-[1px] border-gray-200 bg-white p-2 gap-4"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="aspect-square h-full"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-md font-semibold">{product.title}</h2>
                    <h4 className="text-md font-semibold dark:text-white">
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
        </div>
        <div className="h-auto w-full md:w-[28%]">
          <h1 className="bg-white h-10 p-2 mx-auto text-center text-md text-gray-400 border-[1px] border-top-gray-400">
            Price Detail
          </h1>
          <div className="relative flex flex-col gap-4 border-[1px] border-top-gray-400 bg-white p-4 text-sm">
            <p>
              Price {`(Items ${totalItem})`}
              <span className="absolute right-4">
                ₹
                {totalItemPrice > 0
                  ? totalItemPrice +
                    Math.round(
                      (totalItemPrice * (totalDiscountPercentage / totalItem)) /
                        100
                    )
                  : 0}
              </span>
            </p>
            <p>
              Discount
              <span className="absolute right-4">
                - ₹
                {totalItemPrice > 0
                  ? Math.round(
                      (totalItemPrice * (totalDiscountPercentage / totalItem)) /
                        100
                    )
                  : 0}
              </span>
            </p>
            <p>
              Coupon <span className="absolute right-4">- ₹0</span>
            </p>
            <p className="border-b-2 border-dashed border-gray-200 pb-2">
              Delivery Charges{' '}
              <span className="absolute right-4">₹{deliveryCharges}</span>
            </p>
            <h2 className="font-semibold text-lg border-b-2 border-dashed border-gray-200 pb-4 ">
              Total Amount
              <span className="absolute right-4">
                ₹{totalItemPrice + deliveryCharges}
              </span>
            </h2>
            <p className="font-normal text-sm text-green-500 text-center">
              Total Saving on this order ₹
              {totalItemPrice > 0
                ? Math.round(
                    (totalItemPrice * (totalDiscountPercentage / totalItem)) /
                      100
                  )
                : 0}
            </p>
          </div>
          <div>
            {cart.cartItems.length > 0 ? (
              <button
                disabled={cart.cartItems.length === 0}
                onClick={checkoutHandler}
                className="h-10 w-full mt-2 p-2 bg-orange-400 hover:bg-orange-500 text-white"
              >
                Place Order
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section;
