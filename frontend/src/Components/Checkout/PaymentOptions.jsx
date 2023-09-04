import { useContext, useEffect, useReducer, useState } from 'react';
import { Button, Label, Radio, Select } from 'flowbite-react';
import { Store } from '../../Store';
import { useNavigate } from 'react-router';
import { ButtonLoading } from '../Utils/Loading';
import uuid from 'react-uuid';

const reducer = (state, action) => {
  switch (action.type) {
    case 'ORDER_CREATED':
      return { ...state, loading: true };
    case 'ORDER_SUCESS':
      return { ...state, loading: false };
    case 'ORDER_FAILED':
      return { ...state, loading: false };

    default:
      return state;
  }
};

const PaymentOptions = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(Store);
  const [toggle, setToggle] = useState('hidden');
  const [form, setForm] = useState({
    status: 'SUCCESS',
    paymode: 'NetBanking',
  });
  const [{ loading }, OrderDispatch] = useReducer(reducer, { loading: false });

  useEffect(() => {
    if (state.checkout_step.order_summary) {
      setToggle('block');
    } else {
      setToggle('hidden');
    }
  }, [state]);

  const paymentFormHandler = async (e) => {
    e.preventDefault();

    let totalProductsAmount = 0;
    let deliveryCharges = 0;
    let totalDiscountPercentage = 0;
    let totalProducts = 0;

    state.cart.cartItems.forEach((product) => {
      totalProductsAmount += product.price * product.quantity;
      totalDiscountPercentage += product.discountPercentage;
      totalProducts += product.quantity;
      deliveryCharges = totalProductsAmount < 1000 ? 99 : 0;
    });

    try {
      const orderData = {
        orderedProducts: state.cart.cartItems,
        shippingAddress: state.cart.address,
        totalProductsAmount:
          totalProductsAmount +
          Math.round(
            (totalProductsAmount * (totalDiscountPercentage / totalProducts)) /
              100
          ),
        deliveryCharges,
        discountedAmount: Math.round(
          (totalProductsAmount * (totalDiscountPercentage / totalProducts)) /
            100
        ),
        totalAmount: totalProductsAmount + deliveryCharges,
        totalProducts,
        payment: { method: form.paymode, status: form.status, txn_id: uuid() },
      };

      //create order
      OrderDispatch({ type: 'ORDER_CREATED' });

      const response = await fetch('http://localhost:3000/api/v1/order', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${state.user?.token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong, please try again');
      }
      const result = await response.json();
      dispatch({ type: 'CART_CLEAN' });
      OrderDispatch({ type: 'ORDER_SUCCESS' });

      // navigate to order status page
      navigate(`/order/${result.data._id}`);
    } catch (error) {
      OrderDispatch({ type: 'ORDER_FAILED' });
      console.log(error.message);
    }
  };

  return (
    <div className="shadow-md mb-4">
      <h1
        className="bg-white p-3 h-12 mx-auto text-md border-[1px] border-top-gray-400 text-gray-400"
        onClick={() =>
          state.checkout_step.order_summary &&
          !state.checkout_step.payment &&
          setToggle(
            (toggle) => (toggle = toggle == 'block' ? 'hidden' : 'block')
          )
        }
      >
        <span className="h-6 w-6 bg-gray-400 text-white px-2 mx-2">3</span>{' '}
        Payment Options
      </h1>
      <div
        className={`flex h-auto border-[1px] border-gray-200 bg-white p-2 gap-4 ${toggle}`}
      >
        <form
          className="flex w-[80%] mx-auto flex-col gap-4"
          onSubmit={paymentFormHandler}
        >
          <div className="">
            <div className="mb-2 md:w-1/2">
              <div className="block mb-2">
                <Label htmlFor="paymode" value="Payment Option" />
              </div>
              <Select
                name="paymode"
                id="paymode"
                required
                value={form.paymode}
                onChange={(e) => setForm({ ...form, paymode: e.target.value })}
              >
                <option>NetBanking</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>UPI</option>
              </Select>
            </div>

            <div className="block mb-2">
              <Radio
                name="status"
                id="success"
                value="SUCCESS"
                sizing="sm"
                checked={form.status === 'SUCCESS'}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              />
              <span className="text-sm mx-2">Txn Success</span>
              <Radio
                name="status"
                id="fail"
                value="FAILED"
                sizing="sm"
                checked={form.status === 'FAILED'}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              />
              <span className="text-sm mx-2">Txn Fail</span>
            </div>
            <span className="text-sm text-red-500">**Testing mode</span>
          </div>

          <Button
            className="h-10 md:h-12 w-1/2 self-center p-2 px-6 bg-orange-500 hover:bg-orange-600 text-white md:text-sm m-2 rounded-none"
            type="submit"
            disabled={loading && 'disabled'}
          >
            {loading ? <ButtonLoading size="md" /> : 'Make Payment'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PaymentOptions;
