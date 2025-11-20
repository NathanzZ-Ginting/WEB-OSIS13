import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AboutPage } from './pages/AboutPage';
import { NewsPage } from './pages/NewsPage';
import { ContactPage } from './pages/ContactPage';
import { ArticleDetail } from './pages/ArticleDetail';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { Preloader } from './components/Preloader';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  });

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAdminAuthenticated(false);
  };

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <div className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/admin"
              element={
                isAdminAuthenticated ? (
                  <AdminDashboard onLogout={handleAdminLogout} />
                ) : (
                  <AdminLogin onLogin={handleAdminLogin} />
                )
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}