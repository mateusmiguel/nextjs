import React from 'react';
import Link from 'next/link';

const Menu = () => {
  return (
    <nav className="nav">
      <Link href="/">
        <a>Home</a>
      </Link>
      &nbsp;
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/services">
        <a>Services</a>
      </Link>
      <Link href="/search">
        <a>Search</a>
      </Link>
    </nav>
  );
};

export default Menu;