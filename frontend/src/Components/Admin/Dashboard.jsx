import { useContext } from 'react';
import { Store } from '../../Store';

const Dashboard = () => {
  const {
    state: { user },
  } = useContext(Store);

  return (
    <div className="relative mt-20">
      <h1>Dashboard</h1>
      <p>Welcome, {user.name}</p>
    </div>
  );
};

export default Dashboard;
