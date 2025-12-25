
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const Result: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { prediction, input } = location.state || {};

  if (!prediction) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No prediction data found.</h2>
        <Link to="/predict" className="text-blue-500 underline">Go to Predict Page</Link>
      </div>
    );
  }

  const isGood = prediction.status === 'Good';

  return (
    <div className="max-w-2xl mx-auto py-10 animate-scale-in">
      <div className={`p-10 rounded-3xl border text-center shadow-2xl overflow-hidden relative ${darkMode ? 'navy-card border-blue-800' : 'bg-white border-gray-100'}`}>
        {/* Status indicator bar */}
        <div className={`absolute top-0 left-0 w-full h-2 ${isGood ? 'bg-green-500' : 'bg-red-500'}`} />
        
        <div className={`inline-block p-4 rounded-full mb-6 ${isGood ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          {isGood ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        <h1 className="text-4xl font-extrabold mb-2">Predicted Fare</h1>
        <div className="text-6xl font-black text-blue-500 mb-6">${prediction.predictedFare.toFixed(2)}</div>
        
        <div className={`inline-block px-6 py-2 rounded-full text-lg font-bold mb-8 ${isGood ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
           {prediction.status} Result
        </div>

        <div className={`p-6 rounded-2xl mb-8 text-left italic border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50 border-gray-100'}`}>
          <h4 className="font-bold not-italic mb-2 opacity-60">AI Analysis:</h4>
          "{prediction.analysis}"
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
          <div className="text-left">
            <span className="opacity-60 block">Distance</span>
            <span className="font-bold">{input.distance} miles</span>
          </div>
          <div className="text-left">
            <span className="opacity-60 block">Passengers</span>
            <span className="font-bold">{input.passengerCount}</span>
          </div>
        </div>

        <button
          onClick={() => navigate('/predict')}
          className="w-full py-4 rounded-xl font-bold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          Predict Another Trip
        </button>
      </div>
    </div>
  );
};

export default Result;
