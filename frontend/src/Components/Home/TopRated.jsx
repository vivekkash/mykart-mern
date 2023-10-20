import useFetch from '../Custom/useFetch';
import Card from '../Products/Card';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';

const TopRated = () => {
  const { result, error, loading } = useFetch('/api/v1/product/top?limit=6');

  const data = result.data;

  return (
    <div className="relative">
      <h2 className="text-sm">Top Products</h2>
      <div className="flex flex-wrap justify-start p-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message="Oops! failed loading, try reloading..." />
        ) : (
          data &&
          data.map((product, i) => {
            return <Card key={i} product={product} />;
          })
        )}
      </div>
    </div>
  );
};

export default TopRated;
