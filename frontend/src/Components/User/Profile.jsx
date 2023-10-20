import { Button, Label, TextInput, Alert } from 'flowbite-react';
import { useContext, useEffect, useState } from 'react';
import { Store } from '../../Store';
import { useNavigate } from 'react-router';
import { FaCircleInfo } from 'react-icons/fa6';

const Profile = () => {
  const navigate = useNavigate();

  const {
    state: { user },
    dispatch,
  } = useContext(Store);

  // using useEffect, check whether the user is already login or UI is re-render due to signout if so, signout & update
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    password: '',
    cpassword: '',
  });
  const [message, setMessage] = useState({ error: '', success: '' });

  const updateProfileHandler = async (e) => {
    e.preventDefault();

    try {
      if (form.password !== form.cpassword) {
        throw new Error("password and confirm password doesn't match");
      }

      const response = await fetch(`/api/v1/user/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (response.status === 400) {
        throw new Error(result.error);
      } else if (response.status === 404) {
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
      setForm({
        name: user.name,
        email: user.email,
        password: '',
        cpassword: '',
      });
      setMessage({ success: 'Profile updated successfully' });
    } catch (error) {
      console.log(error.message);
      setMessage({ error: error.message });
    }
  };

  return (
    <div className="relative mt-20">
      {message.error && message.error ? (
        <Alert color="failure" icon={FaCircleInfo}>
          <span>
            <p>{message.error}</p>
          </span>
        </Alert>
      ) : message.success && message.success ? (
        <Alert color="success" icon={FaCircleInfo}>
          <span>
            <p>{message.success} </p>
          </span>
        </Alert>
      ) : (
        ''
      )}
      <div className="flex justify-center items-center mx-auto h-[calc(100vh-200px)] w-1/2">
        <div className="w-full flex flex-col bg-white p-4 px-10">
          <div className="self-center h-16 w-16 bg-gray-400 rounded-full text-2xl font-bold text-white p-4 text-center capitalize">
            {user.name[0]}
          </div>

          <form className="flex flex-col gap-4" onSubmit={updateProfileHandler}>
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
                readOnly
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="password" value="New password" />
              </div>
              <TextInput
                id="password"
                required
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
