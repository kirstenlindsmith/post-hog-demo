import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import posthog from 'posthog-js';
import routes from './routes.tsx';

import './index.css';

const router = createBrowserRouter(routes);
posthog.init('phc_wud2ycHxIMI8IOgyGcMuiL33RJJ4RYYM4jcGqy6avnq', {
  api_host: 'https://us.i.posthog.com',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
