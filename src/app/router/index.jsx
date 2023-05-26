import { memo } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { routes } from '../../routes.js';
import MainPage from '../../pages/mainPage/index.jsx';
import GoodPage from '../../pages/goodPage/index.jsx';
import MainLayout from '../../components/main-layout/index.jsx';

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={routes.mainPage()}
        element={<MainLayout />}
      >
        <Route
          index
          element={<MainPage />}
        />

        <Route
          path={routes.goodsPage()}
          element={<GoodPage />}
        />
      </Route>,
    ),
  );
  return (
    <RouterProvider router={router} />
  );
}
export default memo(Router);
