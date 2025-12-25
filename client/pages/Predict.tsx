
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PredictionInput } from '../types';
import { getPrediction } from '../src/pages/services/gemini';

const Predict: React.FC<{ darkMode: boolean; user: any }> = ({ darkMode, user }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<PredictionInput>>({
    userId: user?.id || 'guest',
    userName: user?.name || 'Guest User',
    driverName: 'John Doe',
    carCondition: 'Excellent',
    weather: 'Sunny',
    trafficCondition: 'Moderate',
    pickupLongitude: -73.935242,
    pickupLatitude: 40.730610,
    dropoffLongitude: -74.0060,
    dropoffLatitude: 40.7128,
    passengerCount: 1,
    weekday: 'Monday',
    hour: 12,
    day: 1,
    month: 1,
    year: 2024,
    distance: 5.2,
    bearing: 45.0,
    jfkDist: 12,
    ewrDist: 15,
    lgaDist: 8,
    solDist: 20,
    nycDist: 2,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await getPrediction(formData as PredictionInput);
      navigate('/result', { state: { prediction: result, input: formData } });
    } catch (error) {
      console.error(error);
      alert('Prediction failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">AI Fare Prediction</h1>
      <p className="mb-8 opacity-70">Enter your ride details below to get an AI-powered fare estimate.</p>

      <form onSubmit={handleSubmit} className={`p-8 rounded-2xl border space-y-8 shadow-lg ${darkMode ? 'navy-card border-blue-800' : 'bg-white border-gray-100'}`}>
        {/* User & Driver Context */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-blue-500 border-b border-blue-500/20 pb-2">Contextual Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Driver Name</label>
              <input type="text" name="driverName" value={formData.driverName} onChange={handleChange} className={`w-full p-2 rounded border focus:ring-2 ring-blue-500 outline-none ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Car Condition</label>
              <select name="carCondition" value={formData.carCondition} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`}>
                <option>New</option>
                <option>Excellent</option>
                <option>Good</option>
                <option>Standard</option>
              </select>
            </div>
          </div>
        </section>

        {/* Environment */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-blue-500 border-b border-blue-500/20 pb-2">Environment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Weather</label>
              <select name="weather" value={formData.weather} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`}>
                <option>Sunny</option>
                <option>Rainy</option>
                <option>Cloudy</option>
                <option>Snowy</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Traffic Condition</label>
              <select name="trafficCondition" value={formData.trafficCondition} onChange={handleChange} className={`w-full p-2 rounded border outline-none ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`}>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
                <option>Heavy</option>
              </select>
            </div>
          </div>
        </section>

        {/* Coordinates */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-blue-500 border-b border-blue-500/20 pb-2">Geolocation Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="block mb-1">Pickup Lat</label>
              <input type="number" step="0.0001" name="pickupLatitude" value={formData.pickupLatitude} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
            <div>
              <label className="block mb-1">Pickup Long</label>
              <input type="number" step="0.0001" name="pickupLongitude" value={formData.pickupLongitude} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
            <div>
              <label className="block mb-1">Dropoff Lat</label>
              <input type="number" step="0.0001" name="dropoffLatitude" value={formData.dropoffLatitude} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
            <div>
              <label className="block mb-1">Dropoff Long</label>
              <input type="number" step="0.0001" name="dropoffLongitude" value={formData.dropoffLongitude} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
          </div>
        </section>

        {/* Features */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-blue-500 border-b border-blue-500/20 pb-2">ML Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Distance (miles)</label>
              <input type="number" name="distance" value={formData.distance} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Passengers</label>
              <input type="number" name="passengerCount" value={formData.passengerCount} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Hour (0-23)</label>
              <input type="number" name="hour" value={formData.hour} onChange={handleChange} className={`w-full p-2 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-[10px] font-bold uppercase tracking-wider">
             {['jfkDist', 'ewrDist', 'lgaDist', 'solDist', 'nycDist'].map(field => (
                <div key={field}>
                  <label className="block mb-1">{field}</label>
                  <input type="number" name={field} value={(formData as any)[field]} onChange={handleChange} className={`w-full p-1 rounded border ${darkMode ? 'bg-black/20 border-blue-900' : 'bg-gray-50'}`} />
                </div>
             ))}
          </div>
        </section>

        <button
          disabled={loading}
          type="submit"
          className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20'}`}
        >
          {loading ? 'Predicting...' : 'Generate Prediction'}
        </button>
      </form>
    </div>
  );
};

export default Predict;
