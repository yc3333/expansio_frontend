import React, { useEffect, useState } from 'react';
import Login from './auth/Login';
import MainLayout from './components/layout/MainLayout';
import { WorkflowProvider } from './context/WorkflowContext';
import { setupAuth } from './utils/auth';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setupAuth();
    setIsLoggedIn(!!localStorage.getItem('access_token'));
  }, []);

  if (!isLoggedIn) {
    return <Login />;
  }

  return (
    <WorkflowProvider>
      <MainLayout />
    </WorkflowProvider>
  );
}

export default App;