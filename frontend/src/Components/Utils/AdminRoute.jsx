import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Store } from '../../Store';

const AdminRoute = ({ children }) => {
  const {
    state: { user },
  } = useContext(Store);
  return user && user.isAdmin ? (
    children
  ) : user ? (
    <Navigate to="/"></Navigate>
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default AdminRoute;
