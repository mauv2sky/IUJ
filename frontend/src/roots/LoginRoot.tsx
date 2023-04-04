import React from 'react';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../utils/ScrollToTop';

function LoginRoot() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default LoginRoot;
