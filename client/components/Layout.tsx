
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  darkMode: boolean;
  toggleDarkMode: () => void;
  user: any;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, darkMode, toggleDarkMode, user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', path: '/' },
    { label: 'Predict', path: '/predict' },
    { label: 'Info', path: '/info' },
  ];

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'navy-bg text-white' : 'bg-gray-50 text-gray-900'}`}>
      <nav className={`sticky top-0 z-50 px-6 py-4 flex items-center justify-between shadow-md ${darkMode ? 'navy-card' : 'bg-white'}`}>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <span className="text-blue-500">Uber</span>Predict
          </Link>
          {user && (
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`font-medium transition-colors hover:text-blue-500 ${location.pathname === item.path ? 'text-blue-500' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full transition-colors ${darkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
            title="Toggle Dark Mode"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/profile" className="font-medium hover:text-blue-500">{user.name}</Link>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium hover:underline">Login</button>
              <button onClick={() => navigate('/signup')} className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">Sign Up</button>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-6 py-8">
        {children}
      </main>

      <footer className={`py-6 px-6 text-center border-t ${darkMode ? 'border-blue-900 bg-black/20' : 'border-gray-200 bg-white'}`}>
        <p className="text-sm opacity-60">
          This is just a model and it can predict inaccurately. Project for AASTMT / Cellula.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
