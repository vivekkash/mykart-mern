import Categories from './Categories';
import Featured from './Featured';
import TopRated from './TopRated';

const MainProducts = () => {
  return (
    <div className="relative">
      <Categories />
      <Featured />
      <TopRated />
    </div>
  );
};

export default MainProducts;
