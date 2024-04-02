import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import RootNavigation from './components/navigation/RootNavigation';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <RootNavigation />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);