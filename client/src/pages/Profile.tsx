
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC<{ darkMode: boolean; user: any; onLogout: () => void }> = ({ darkMode, user, onLogout }) => {
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete your account? This will remove all prediction history.')) {
      localStorage.removeItem('user');
      onLogout();
      navigate('/signup');
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in">
      <div className={`p-8 rounded-2xl shadow-xl border ${darkMode ? 'navy-card border-blue-800' : 'bg-white border-gray-100'}`}>
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-3xl font-bold">{user.name}</h2>
            <p className="opacity-60">{user.email}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-bold mb-4">Account Settings</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Account Created</span>
                <span className="opacity-60">{user.createdAt || 'Jan 12, 2024'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Predictions Count</span>
                <span className="opacity-60">12</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-8">
            <button
              onClick={onLogout}
              className="flex-1 py-3 px-4 rounded-lg bg-gray-200 text-gray-800 font-bold hover:bg-gray-300 transition-colors"
            >
              Logout
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 py-3 px-4 rounded-lg bg-red-100 text-red-600 font-bold hover:bg-red-200 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
