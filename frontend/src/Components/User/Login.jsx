import { Button, Checkbox, Label, TextInput, Toast } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Store } from '../../Store';
import { FaCircleInfo } from 'react-icons/fa6';

const Login = () => {
  const { search } = useLocation();
  const redirectPath = new URLSearchParams(search).get('redirect');
  const redirect = redirectPath ? redirectPath : '/';
  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(Store);

  // using useEffect, check whether the user is already login or UI is re-render due to signout if so, signout & update
  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [navigate, user, redirect]);

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const loginFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/user/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status === 400) {
        throw new Error(result.error);
      }
      //else if (response.status === 404) {
      //  throw new Error('Page not found');
      //}
      // else if (response.status === 500) {
      //   throw new Error('Server error');
      // }
      else if (!response.ok) {
        throw new Error('Something went wrong, please try again.');
      }

      // add the data to the store as can be globally accessed
      dispatch({ type: 'USER_LOGIN', payload: result });

      // fetch the address from mongodb, if exists

      fetchUserAddress(result.data.token);

      // redirect to specific path as query string
      navigate(redirect);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  // fetch users default address from mongodb if available

  const fetchUserAddress = async (token) => {
    try {
      const response = await fetch('/api/v1/address/default', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.status === 400) {
        throw new Error(result.error);
      } else if (!response.ok) {
        throw new Error('Something went wrong, please try again.');
      }

      // add the data to the store as can be globally accessed
      dispatch({ type: 'SAVE_USER_ADDRESS', payload: result?.data });
    } catch (error) {
      console.log('Address fetch failed', error.message);
    }
  };

  // fetch users cart from the mongodb, if available;

  return (
    <div className="relative mt-20">
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <div className="flex justify-center w-full md:w-3/5 md:h-full bg-white">
          <div className="hidden md:block bg-login-screen bg-cover bg-no-repeat w-1/2">
            <h1 className="text-white font-bold text-2xl text-center mt-8">
              My Cart.
            </h1>
            <p className="text-lg font-semibold text-center">
              Wishing you a joyful shopping journey
            </p>
          </div>
          <div className="w-3/4 md:w-1/2 py-2 md:p-4 lg:px-14">
            <h2 className="text-xl font-semibold py-10 text-center">Login</h2>
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
            <form
              className="flex max-w-md flex-col gap-4"
              onSubmit={loginFormSubmitHandler}
            >
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="your@mail.com"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember">Remember me</Label>
              </div>
              <Button type="submit">Login</Button>
              <p className="text-center text-sm font-light">
                New to MyCart.?{' '}
                <Link to={`/signup?redirect=${redirect}`}>
                  <span className="text-blue-600 underline">signup</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
