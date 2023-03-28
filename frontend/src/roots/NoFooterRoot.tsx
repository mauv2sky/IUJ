import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import Navbar from '../components/Navbar/Navbar';

function NoFooterRoot() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default NoFooterRoot;
