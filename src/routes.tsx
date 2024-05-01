import { createRoutesFromElements, Route } from 'react-router-dom';
import App from './App';
import Home from './components/views/Home';
import NavigateToDefault from './components/NavigateToDefault';
import Search from './components/views/Search';

export enum RouterPaths {
  root = '/',
  home = '/search',
  search = '/search-results',
}

const routes = createRoutesFromElements(
  <Route path={RouterPaths.root} element={<App />} errorElement={<div>Error!</div>}>
    <Route index element={<NavigateToDefault />} />
    <Route path={RouterPaths.home} element={<Home />} />
    <Route path={RouterPaths.search} element={<Search />} />
    <Route path='*' element={<div>404: Page not found</div>} />
  </Route>
);

export default routes;
