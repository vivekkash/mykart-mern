import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import Loading from '../Utils/Loading';
import Error from '../Utils/Error';
import Card from './Card';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products || [],
        pages: action.payload.pages || 1,
        page: action.payload.page || 1,
        countProducts: action.payload.countProducts || 0,
        loading: false,
      };

    case 'FETCH_FAILED':
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};

const Search = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const category = sp.get('category') || 'all';
  const query = sp.get('q') || 'all';
  const rating = sp.get('rating') || 'all';
  const price = sp.get('price') || 'all';
  const sort = sp.get('sort') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, { loading: true, error: '' });

  useEffect(() => {
    const getSearchFilteredProducts = async () => {
      try {
        dispatch({ type: 'FETCH_INIT' });

        const response = await fetch(
          `/api/v1/product/search?q=${query}&category=${category}&rating=${rating}&price=${price}&sort=${sort}&page=${page}`
        );
        const result = await response.json();

        if (response.status == 400) {
          throw new Error(response.error);
        } else if (!response.ok) {
          throw new Error('Something went wrong, please try again');
        }

        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: error.message });
      }
    };

    getSearchFilteredProducts();
  }, [query, category, rating, price, sort, page]);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch('/api/v1/category/');
        const result = await response.json();
        if (!response.ok) {
          throw new Error(
            result.error || 'Something went wrong, please try again'
          );
        }
        setCategories(result.data);
      } catch (error) {
        console.log('failed to fetch category ', error.message);
      }
    };

    getCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;
    const filterPrice = filter.price || price;
    const filterSort = filter.sort || sort;

    return `/search?q=${filterQuery}&category=${filterCategory}&rating=${filterRating}&price=${filterPrice}&sort=${filterSort}&page=${filterPage}`;
  };

  const prices = [
    {
      name: '₹1 to ₹100',
      value: '1-100',
    },
    {
      name: '₹101 to ₹500',
      value: '101-500',
    },
    {
      name: '₹501 to ₹1000',
      value: '501-1000',
    },
    {
      name: '₹1001 to ₹5000',
      value: '1001-5000',
    },
    {
      name: '₹5000 & above',
      value: '5000',
    },
  ];

  const custRating = [
    {
      name: '4 ☆ & above',
      value: 4,
    },
    {
      name: '3 ☆ & above',
      value: 3,
    },
    {
      name: '2 ☆ & above',
      value: 2,
    },
    {
      name: '1 ☆ & up',
      value: 1,
    },
  ];

  return (
    <div className="relative mt-20">
      <div className="flex text-[12px] gap-4">
        <div className="w-40">
          {/* filters */}
          <h2 className="text-md font-bold p-2 mb-2 border-[1px] border-dotted border-b-gray-500">
            Filters
          </h2>
          <div className="pb-3 border-[1px] border-dotted border-b-gray-500 mb-2">
            <h2 className="text-md font-bold py-2">Category</h2>
            <div className="h-28 overflow-x-hidden overflow-y-scroll">
              <ul>
                <li>
                  <Link
                    className={category === 'all' ? 'font-bold' : ''}
                    to={getFilterUrl({ category: 'all', page: 1 })}
                  >
                    Any
                  </Link>
                </li>
                {categories &&
                  categories.map((c) => {
                    return (
                      <li key={c.title}>
                        <Link
                          className={c.slug === category ? 'font-bold' : ''}
                          to={getFilterUrl({ category: c.slug, page: 1 })}
                        >
                          {c.title}
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="pb-4 border-[1px] border-dotted border-b-gray-500 mb-2">
            <h2 className="text-md font-bold py-2">Price</h2>
            <ul>
              <li>
                <Link
                  className={price === 'all' ? 'font-bold' : ''}
                  to={getFilterUrl({ price: 'all', page: 1 })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => {
                return (
                  <li key={p.value}>
                    <Link
                      className={p.value === price ? 'font-bold' : ''}
                      to={getFilterUrl({ price: p.value, page: 1 })}
                    >
                      {p.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="pb-4 border-[1px] border-dotted border-b-gray-500 mb-2">
            <h2 className="text-md font-bold py-2">Customer Rating</h2>
            <ul>
              <li>
                <Link
                  className={rating === 'all' ? 'font-bold' : ''}
                  to={getFilterUrl({ rating: 'all', page: 1 })}
                >
                  Any
                </Link>
              </li>
              {custRating.map((r) => {
                return (
                  <li key={r.value}>
                    <Link
                      className={r.value === Number(rating) ? 'font-bold' : ''}
                      to={getFilterUrl({ rating: r.value, page: 1 })}
                    >
                      {r.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex-1">
          {/* results product */}

          <div className="flex justify-between">
            <span className="text-[12px]">Results found : {countProducts}</span>
            <div>
              <select
                name="sorting"
                id="sorting"
                value={sort}
                onChange={(e) =>
                  navigate(getFilterUrl({ sort: e.target.value }))
                }
              >
                <option value="latest">Latest</option>
                <option value="lowest">Price Low to High</option>
                <option value="highest">Price High to Low</option>
                <option value="top">Top Rated</option>
                <option value="featured">Featured</option>
              </select>
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-wrap justify-start p-4">
              {loading ? (
                <Loading />
              ) : error ? (
                <Error message="Oops! failed loading, try reloading..." />
              ) : (
                products &&
                products.map((product) => {
                  return <Card key={product.slug} product={product} />;
                })
              )}
            </div>
            <div className="flex justify-center items-center mb-4">
              {countProducts > 0 &&
                [...Array(pages).keys()].map((x) => {
                  return Number(page) === x + 1 ? (
                    <button
                      key={x}
                      className="w-auto h-8 px-3 border-[1px] border-gray-300 text-lg font-semibold text-black"
                      disabled={true}
                    >
                      {x + 1}
                    </button>
                  ) : (
                    <Link key={x} to={getFilterUrl({ page: x + 1 })}>
                      <button className="w-auto h-8 px-3 border-[1px] border-gray-300 text-md">
                        {x + 1}
                      </button>
                    </Link>
                  );
                })}
            </div>
            {countProducts === 0 && (
              <div className="flex justify-center items-center">
                <div className="w-1/2 md:h-96 text-lg text-center">
                  Sorry! No Products Found
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
