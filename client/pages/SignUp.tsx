
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp: React.FC<{ darkMode: boolean; onLogin: (user: any) => void }> = ({ darkMode, onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { id: Date.now().toString(), name, email };
    localStorage.setItem('user', JSON.stringify(user));
    onLogin(user);
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto py-20 animate-fade-in">
      <div className={`p-8 rounded-2xl shadow-xl border ${darkMode ? 'navy-card border-blue-800' : 'bg-white border-gray-100'}`}>
        <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ring-blue-500 ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`}
              placeholder="Ahmed Mohamed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ring-blue-500 ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`}
              placeholder="user@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 rounded-lg border outline-none focus:ring-2 ring-blue-500 ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Create Account
          </button>
        </form>
        <p className="mt-6 text-center text-sm opacity-60">
          Already have an account? <Link to="/login" className="text-blue-500 font-bold">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
