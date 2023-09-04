import React from 'react';
import Navigation from './Navigation';

const Header = () => {
  return (
    <header className="h-16 w-full bg-blue-700 fixed z-10 top-0">
      <Navigation />
    </header>
  );
};

export default Header;
