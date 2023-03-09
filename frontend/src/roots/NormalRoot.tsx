import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import ScrollToTop from '../utils/ScrollToTop';

function NormalRoot() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default NormalRoot;
