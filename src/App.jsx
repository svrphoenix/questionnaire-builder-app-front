import './App.scss';

import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation/Navigation';

const App = () => {
  return (
    <>
      <Navigation />
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
};

export default App;
