

import { Routes, Route } from 'react-router-dom';
import MainLayout from './common/components/layouts/MainLayout';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import NEOFeature from './pages/neo';
import routesConfig from './config/routes.json';


const elementMap = {
  Home,
  NEOFeature,
  NotFound,
};

function App() {
  return (
    <MainLayout>
      <Routes>
        {routesConfig.map(route => {
          const Element = elementMap[route.element as keyof typeof elementMap];
          return (
            <Route key={route.path} path={route.path} element={<Element />} />
          );
        })}
      </Routes>
    </MainLayout>
  );
}

export default App
