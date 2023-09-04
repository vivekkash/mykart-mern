import { useEffect, useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, result: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const useFetch = (url, options = {}) => {
  const [{ result, error, loading }, dispatch] = useReducer(reducer, {
    result: [],
    error: '',
    loading: true,
  });

  useEffect(() => {
    const getProducts = async () => {
      try {
        dispatch({ type: 'FETCH_INIT' });

        const response = await fetch(url, options);

        if (response.status === 404) {
          throw new Error('Page not found');
        } else if (response.status === 500) {
          throw new Error('Server error');
        } else if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message });
      }
    };

    getProducts();
  }, [url]);

  return { result, error, loading };
};

export default useFetch;
