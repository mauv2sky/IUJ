import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

function NormalRoot() {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Outlet />
      <Footer />
    </>
  );
}

export default NormalRoot;
