import { Card, Avatar } from 'flowbite-react';
import useFetch from '../Custom/useFetch';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import { Link } from 'react-router-dom';

const Categories = () => {
  const { result, error, loading } = useFetch('/api/v1/category/featured');

  const data = result.data || [];

  return (
    <div className="relative py-4 mt-4">
      <h2 className="text-sm">Featured Category</h2>
      <div className="flex gap-4 justify-evenly flex-wrap p-4">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message="Oops! failed loading, try reloading..." />
        ) : (
          data &&
          data.map((category, i) => {
            return (
              <Link key={i} to={`/search?category=${category.slug}`}>
                <Card className="max-w-sm hover:scale-105">
                  <Avatar
                    img={
                      category.image
                        ? category.image
                        : category.images
                        ? category.images
                        : ''
                    }
                    size="xl"
                  />
                  <h5 className="text-xl font-medium tracking-tight text-gray-900 dark:text-white text-center">
                    <p>{category.title}</p>
                  </h5>
                </Card>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Categories;
