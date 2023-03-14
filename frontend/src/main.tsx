import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './store/store';
import NormalRoot from './roots/NormalRoot';
import { MainPage, MapPage, InterestPage, DetailPage, LoginPage } from './pages/index';
import './styles/reset.scss';
import NoFooterRoot from './roots/NoFooterRoot';

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
      {
        path: 'detail',
        element: <DetailPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
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
