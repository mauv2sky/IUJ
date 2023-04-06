import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NormalRoot from './roots/NormalRoot';
import NoFooterRoot from './roots/NoFooterRoot';
import LoginRoot from './roots/LoginRoot';
import { MainPage, MapPage, InterestPage, DetailPage, LoginPage } from './pages/index';
import './styles/reset.scss';

const router = createBrowserRouter([
  /** Navbar, Footer 전부 있는 페이지 */
  {
    path: '/',
    element: <NormalRoot />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: 'interest',
        element: <InterestPage />,
      },
    ],
  },
  /** Footer 없는 페이지 */
  {
    path: '/',
    element: <NoFooterRoot />,
    children: [
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: '/:type/:id',
        element: <DetailPage />,
      },
    ],
  },
  /** Navbar, Footer 둘 다 없는 페이지 */
  {
    path: '/',
    element: <LoginRoot />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root') as HTMLElement;
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);
const persister = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>,
);
