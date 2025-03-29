// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './scss/styles.scss';

import router from './router/router';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <RouterProvider router={router} />
  // </StrictMode>
);
