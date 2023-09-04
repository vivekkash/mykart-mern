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
  const price = sp.get('rating') || 'all';
  const sort = sp.get('sort') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, { loading: true, error: '' });

  useEffect(() => {
    const getSearchFilteredProducts = async () => {
      try {
        dispatch({ type: 'FETCH_INIT' });

        const response = await fetch(
          `http://localhost:3000/api/v1/product/search?q=${query}&category=${category}&rating=${rating}&price=${price}&sort=${sort}&page=${page}`
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
        const response = await fetch('http://localhost:3000/api/v1/category');
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
      name: '4 <FaStar /> & above',
      value: 4,
    },
    {
      name: '3 <FaStar /> & above',
      value: 3,
    },
    {
      name: '2 <FaStar /> & above',
      value: 2,
    },
    {
      name: '1 <FaStar /> & up',
      value: 1,
    },
  ];

  return (
    <div className="relative mt-20">
      <div className="flex">
        <div>
          {/* filters */}
          <div>
            <h2>By Category</h2>
            <ul>
              <li>
                <Link
                  className={category === 'all' ? 'font-bold' : ''}
                  to={getFilterUrl({ category: 'all' })}
                >
                  Any
                </Link>
              </li>
              {categories &&
                categories.map((c) => {
                  return (
                    <li key={c}>
                      <Link
                        className={c === category ? 'font-bold' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {category}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
          <div>
            <h2>By Price</h2>
            <ul>
              <li>
                <Link
                  className={price === 'all' ? 'font-bold' : ''}
                  to={getFilterUrl({ price: 'all' })}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => {
                return (
                  <li key={p.value}>
                    <Link
                      className={p.value === price ? 'font-bold' : ''}
                      to={getFilterUrl({ price: p.value })}
                    >
                      {p.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h2>By Customer Rating</h2>
            <ul>
              {custRating.map((r) => {
                return (
                  <li key={r.value}>
                    <Link
                      className={r.value === custRating ? 'font-bold' : ''}
                      to={getFilterUrl({ rating: r.value })}
                    >
                      {r.value}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  className={custRating === 'all' ? 'font-bold' : ''}
                  to={getFilterUrl({ rating: 'all' })}
                >
                  Any
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div>
          {/* results product */}
          <h1>Products</h1>
          <button onClick={navigate('/search')}>search</button>
          <div className="relative">
            <h2 className="text-sm">
              {' '}
              Products <span>{countProducts}</span>
            </h2>
            <div className="flex flex-wrap justify-start p-4">
              {loading ? (
                <Loading />
              ) : error ? (
                <Error message="Oops! failed loading, try reloading..." />
              ) : (
                products &&
                products.map((product, i) => {
                  return <Card key={i} product={product} />;
                })
              )}
              <div>
                {[...Array(pages).keys()].map((x) => {
                  <Link key={x} to={getFilterUrl({ page: x + 1 })}>
                    <button
                      className={`w-8 h-8 p-2 text-md ${
                        Number(page) == x + 1 ? 'font-bold' : ''
                      }`}
                    >
                      {x + 1}
                    </button>
                  </Link>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
