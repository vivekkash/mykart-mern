import { Button, Checkbox, Label, TextInput, Toast } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { FaCircleInfo, FaCheck } from 'react-icons/fa6';

const DeliveryAddress = () => {
  const { state, dispatch } = useContext(Store);
  const [toggle, setToggle] = useState('block');
  const [form, setForm] = useState({
    name: state.user?.name,
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
    isDefault: false,
  });
  const [error, setError] = useState('');

  const saveAddressSubmitHandler = async (e) => {
    e.preventDefault();

    setForm({ ...form, user: state.user.id });

    try {
      const response = await fetch('/api/v1/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.user.token}`,
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status === 400) {
        throw new Error(result.error);
      } else if (!response.ok) {
        throw new Error('Something went wrong, please try again.');
      }
      setError(null);
      // add the data to the store as can be globally accessed
      dispatch({ type: 'SAVE_USER_ADDRESS', payload: form });
    } catch (error) {
      setError(error.message);
    }
  };

  // update the step and hide the
  useEffect(() => {
    if (state.cart.address) {
      dispatch({
        type: 'CHECKOUT_STEP_ADDRESS',
        payload: true,
      });
    }
    if (state.checkout_step.delivery) {
      setToggle('hidden');
    } else {
      setToggle('block');
    }
  }, [state.checkout_step.delivery, state.cart.address, dispatch]);

  return (
    <div className="shadow-md mb-4">
      <h1
        className="bg-white p-3 h-12 mx-auto text-md border-[1px] border-top-gray-400 text-gray-400"
        onClick={() =>
          setToggle(
            (toggle) => (toggle = toggle == 'block' ? 'hidden' : 'block')
          )
        }
      >
        <span className="h-6 w-10 bg-gray-400 text-white px-2 mx-2">2</span>{' '}
        Delivery Address
        {state.cart.address ? (
          <span className="text-green-500 inline-block px-3">
            <FaCheck />
          </span>
        ) : (
          ''
        )}
      </h1>
      {state.cart.address ? (
        <div className="bg-white px-10 py-2">
          <span className="mx-4 text-[13px] text-black">{`${state.cart.address?.line1}, ${state.cart.address?.line2}, ${state.cart.address?.city}, ${state.cart.address?.state}, ${state.cart.address?.pincode}`}</span>
        </div>
      ) : (
        <div
          className={`text-sm flex h-auto border-[1px] border-gray-200 bg-white p-2 gap-4 ${toggle}`}
        >
          <form
            className="flex w-[80%] mx-auto flex-col gap-4"
            onSubmit={saveAddressSubmitHandler}
          >
            {error && error ? (
              <Toast className="mb-4">
                <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
                  <FaCircleInfo className="h-5 w-5" />
                </div>
                <div className="ml-3 text-sm font-normal">{error}</div>
              </Toast>
            ) : (
              ''
            )}
            <div className="flex my-2 gap-4 flex-wrap mt-4">
              <div className="my-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput
                id="name"
                placeholder=""
                required
                shadow
                type="text"
                sizing="sm"
                maxLength={100}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <div className="my-2 block">
                <Label htmlFor="mobile" value="Mobile" />
              </div>
              <TextInput
                id="mobile"
                placeholder=""
                required
                shadow
                type="phone"
                sizing="sm"
                maxLength={12}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="">
              <div className="mb-2 block">
                <Label htmlFor="line1" value="Address Line 1" />
              </div>
              <TextInput
                id="line1"
                placeholder="Building name, flat no."
                required
                shadow
                type="text"
                sizing="sm"
                maxLength="100"
                value={form.line1}
                onChange={(e) => setForm({ ...form, line1: e.target.value })}
              />

              <div className="my-2 block">
                <Label htmlFor="line2" value="Address Line 2" />
              </div>
              <TextInput
                id="line2"
                placeholder="Street, area name"
                required
                shadow
                type="text"
                sizing="sm"
                maxLength="100"
                value={form.line2}
                onChange={(e) => setForm({ ...form, line2: e.target.value })}
              />

              <div className="flex my-2 gap-4 flex-wrap mt-4">
                <div className="my-2 block">
                  <Label htmlFor="city" value="City" />
                </div>
                <TextInput
                  id="city"
                  placeholder="Mumbai"
                  required
                  shadow
                  type="text"
                  sizing="sm"
                  maxLength={50}
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
                <div className="my-2 block">
                  <Label htmlFor="pincode" value="Pincode" />
                </div>
                <TextInput
                  id="pincode"
                  placeholder="400001"
                  required
                  shadow
                  type="text"
                  sizing="sm"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(e) =>
                    setForm({ ...form, pincode: e.target.value })
                  }
                />
              </div>
              <div className="flex my-2 gap-4 flex-wrap mt-4">
                <div className="my-2 block">
                  <Label htmlFor="state" value="State" />
                </div>
                <TextInput
                  id="state"
                  placeholder="Maharashtra"
                  required
                  shadow
                  type="text"
                  sizing="sm"
                  maxLength={50}
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                />

                <div className="m-2 block">
                  <Checkbox
                    name="isDefault"
                    id="default"
                    checked={form.isDefault}
                    value="true"
                    sizing="sm"
                    onChange={(e) =>
                      setForm({ ...form, isDefault: !form.isDefault })
                    }
                  />

                  <Label
                    htmlFor="default"
                    value="Mark as default"
                    className="mx-2"
                  />
                </div>
              </div>
            </div>

            <Button
              className="md:w-1/3 self-end bg-sky-400 text-white rounded-none"
              type="submit"
            >
              Save Address
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default DeliveryAddress;
