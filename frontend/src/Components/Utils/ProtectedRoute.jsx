import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../../Store';

const ProtectedRoute = ({ children }) => {
  const {
    state: { user },
  } = useContext(Store);
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default ProtectedRoute;
