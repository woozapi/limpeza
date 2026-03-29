import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider, useConfig } from './context/ConfigContext';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useConfig();
  if (!isLoggedIn) return <Navigate to="/painel/login" replace />;
  return <>{children}</>;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/painel/login" element={<AdminPanel isLogin />} />
      <Route 
        path="/painel" 
        element={
          <ProtectedRoute>
            <AdminPanel />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <Router>
        <AppRoutes />
      </Router>
    </ConfigProvider>
  );
}
