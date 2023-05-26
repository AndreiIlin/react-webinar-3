import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { routes } from '../routes.js';
import MainLayout from '../components/main-layout/index.js';
import MainPage from '../pages/mainPage/index.jsx';
import GoodPage from '../pages/goodPage/index.jsx';

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
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
export default App;
