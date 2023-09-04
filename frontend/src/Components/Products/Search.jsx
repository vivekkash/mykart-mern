import { useEffect, useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
        countProducts: action.payload.countProducts,
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
  const query = sp.get('query') || 'all';
  const rating = sp.get('rating') || 'all';
  const price = sp.get('rating') || 'all';
  const sort = sp.get('sort') || 'newest';
  const page = sp.get('page') || 1;

  const [{ loading, error, products, pages, countProducts }, dispatch] =
    useReducer(reducer, { loading: true, error: '' });

  useEffect(() => {
    const getSearchFilteredProducts = async () => {};
    getSearchFilteredProducts();
  }, []);

  return (
    <div className="relative mt-20">
      <h1>Search Page</h1>
    </div>
  );
};

export default Search;
