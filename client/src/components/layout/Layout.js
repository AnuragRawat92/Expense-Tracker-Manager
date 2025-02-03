import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">
        {children} {/* Render the children prop here */}
      </div>
      <Footer />
    </>
  );
};

export default Layout;

