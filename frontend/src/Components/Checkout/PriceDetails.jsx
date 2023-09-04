import { useContext } from 'react';
import { Store } from '../../Store';

const PriceDetails = () => {
  const {
    state: { cart },
  } = useContext(Store);

  //Instead of using below var, you can use cart.cartItems.reduce((a, item)=>a+item.price,0) similarly for others.
  let totalItemPrice = 0;
  let totalDiscountPercentage = 0;
  let totalItem = 0;
  let deliveryCharges = 0;
  return (
    <div className="md:sticky md:top-20">
      <h1 className="bg-white h-12 p-3 mx-auto text-center text-md text-gray-400 border-[1px] border-top-gray-400">
        Price Detail
      </h1>
      <div className="relative flex flex-col gap-4 border-[1px] border-top-gray-400 bg-white p-4 text-sm">
        <p>
          {cart &&
            cart.cartItems.map((product) => {
              totalItemPrice += product.price * product.quantity;
              totalDiscountPercentage += product.discountPercentage;
              totalItem += product.quantity;
              deliveryCharges = totalItemPrice < 1000 ? 99 : 0;
              return '';
            })}
          Price {`(Items ${totalItem})`}
          <span className="absolute right-4">
            ₹
            {totalItemPrice > 0
              ? totalItemPrice +
                Math.round(
                  (totalItemPrice * (totalDiscountPercentage / totalItem)) / 100
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
                  (totalItemPrice * (totalDiscountPercentage / totalItem)) / 100
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
                (totalItemPrice * (totalDiscountPercentage / totalItem)) / 100
              )
            : 0}
        </p>
      </div>
    </div>
  );
};

export default PriceDetails;
