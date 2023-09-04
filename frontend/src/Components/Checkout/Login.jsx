import { useContext, useEffect } from 'react';
import { Store } from '../../Store';
import { useNavigate } from 'react-router';
import { FaCheck } from 'react-icons/fa6';

const Login = () => {
  const { state } = useContext(Store);
  const { user } = state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login?redirect=/checkout');
    }
  }, [user, navigate]);

  return (
    <div className="shadow-md mb-4">
      <h1 className="bg-white p-3 h-12 mx-auto border-[1px] border-top-gray-400 text-md text-gray-400 flex gap-2">
        <span className="h-6 w-6 bg-gray-400 text-white px-2 mx-2">1</span>{' '}
        Login{' '}
        <span className="text-green-500 p-1">
          <FaCheck />
        </span>
      </h1>
      <div className="bg-white px-10 py-2">
        {user ? (
          <span className="mx-4 text-[13px] text-black">{user.name}</span>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Login;
