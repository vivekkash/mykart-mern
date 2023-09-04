import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router';

const SearchBox = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const searchBoxHandler = (e) => {
    console.log('clicked searched', query);
    e.preventDefault();
    navigate(query ? `/search/?q=${query}` : '/search');
  };

  return (
    <div className="w-[450px] bg-gray-200 rounded-md flex">
      <form onSubmit={searchBoxHandler}>
        <input
          type="text"
          value={query}
          name="q"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="search here"
          className="w-[400px] border-2 px-3 h-12 bg-gray-200 rounded-md text-md focus:outline-none"
        />
      </form>
      <FaMagnifyingGlass className="self-center m-3 text-lg bg-gray-200 text-gray-400" />
    </div>
  );
};

export default SearchBox;
