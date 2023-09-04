import { Button, Label, TextInput, Toast } from 'flowbite-react';
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

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  const registerFormSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (form.password !== form.cpassword) {
        throw new Error("password and confirm password doesn't match");
      }

      const response = await fetch(
        'http://localhost:3000/api/v1/user/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        }
      );

      const result = await response.json();

      console.log(result);

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

      // redirect to specific path as query string
      navigate(redirect);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <div className="relative mt-20">
      <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
        <div className="flex justify-center w-full md:w-[70%] md:h-full bg-white">
          <div className="hidden md:block bg-login-screen bg-cover bg-no-repeat w-1/2">
            <h1 className="text-white font-bold text-2xl text-center mt-8">
              My Cart.
            </h1>
            <p className="text-lg font-semibold text-center">
              Wishing you a joyful shopping journey
            </p>
          </div>
          <div className="w-3/4 md:w-1/2 py-2 lg:px-14">
            <h2 className="text-xl font-semibold py-2 text-center">Sign Up</h2>
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
              onSubmit={registerFormSubmitHandler}
            >
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div>
                <div className="mb-1 block">
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
                <div className="mb-1 block">
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
              <div>
                <div className="mb-1 block">
                  <Label htmlFor="cpassword" value="confirm password" />
                </div>
                <TextInput
                  id="cpassword"
                  required
                  type="password"
                  value={form.cpassword}
                  onChange={(e) =>
                    setForm({ ...form, cpassword: e.target.value })
                  }
                />
              </div>
              <Button type="submit">Sign up</Button>
              <p className="text-center text-sm font-light">
                Existing Customer?{' '}
                <Link to={`/login?redirect=${redirect}`}>
                  <span className="text-blue-600 underline">login</span>
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
