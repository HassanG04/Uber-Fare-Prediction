
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { MOCK_CHART_DATA } from '../constants';
import { getDashboardSummary } from '../src/pages/services/gemini';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Home: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const [summary, setSummary] = useState("Generating analysis...");

  useEffect(() => {
    const fetchSummary = async () => {
      const result = await getDashboardSummary("Average Fare: $15.42, Total Rides: 4500, Peak Hour: 6PM, Avg Distance: 4.5 miles");
      setSummary(result || "Analysis complete.");
    };
    fetchSummary();
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <header>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className={`opacity-70 ${darkMode ? 'text-blue-100' : 'text-gray-600'}`}>Insights derived from the Uber dataset collection.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg Fare', value: '$15.42', trend: '+2.4%' },
          { label: 'Total Rides', value: '4,500', trend: '+12%' },
          { label: 'Avg Distance', value: '4.5 mi', trend: '-0.5%' },
          { label: 'Active Users', value: '1,280', trend: '+5.7%' }
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-xl shadow-sm border ${darkMode ? 'navy-card border-blue-900' : 'bg-white border-gray-100'}`}>
            <p className="text-sm font-medium opacity-60 mb-1">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold">{stat.value}</p>
              <span className={`text-xs font-semibold px-2 py-1 rounded ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={`p-6 rounded-xl border ${darkMode ? 'navy-card border-blue-800' : 'bg-blue-50 border-blue-100'}`}>
        <h3 className="text-lg font-semibold mb-2">AI Summary</h3>
        <p className="italic opacity-90">{summary}</p>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-6 rounded-xl shadow-sm border h-[400px] ${darkMode ? 'navy-card border-blue-900' : 'bg-white border-gray-100'}`}>
          <h3 className="text-lg font-bold mb-4">Weekly Fare Trends</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MOCK_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? '#333' : '#eee'} />
              <XAxis dataKey="name" stroke={darkMode ? '#888' : '#666'} />
              <YAxis stroke={darkMode ? '#888' : '#666'} />
              <Tooltip 
                contentStyle={{ backgroundColor: darkMode ? '#000040' : '#fff', borderColor: '#333' }}
              />
              <Legend />
              <Bar dataKey="fare" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Fare ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border h-[400px] ${darkMode ? 'navy-card border-blue-900' : 'bg-white border-gray-100'}`}>
          <h3 className="text-lg font-bold mb-4">Distance vs. Fare</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_CHART_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#333' : '#eee'} />
              <XAxis dataKey="name" stroke={darkMode ? '#888' : '#666'} />
              <YAxis stroke={darkMode ? '#888' : '#666'} />
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#000040' : '#fff', borderColor: '#333' }} />
              <Legend />
              <Line type="monotone" dataKey="distance" stroke="#10b981" strokeWidth={3} name="Distance (mi)" />
              <Line type="monotone" dataKey="fare" stroke="#f59e0b" strokeWidth={3} name="Fare ($)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 rounded-xl shadow-sm border h-[400px] ${darkMode ? 'navy-card border-blue-900' : 'bg-white border-gray-100'}`}>
          <h3 className="text-lg font-bold mb-4">Traffic Conditions Distribution</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={[
                  { name: 'Low', value: 400 },
                  { name: 'Medium', value: 300 },
                  { name: 'High', value: 300 },
                ]}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {MOCK_CHART_DATA.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: darkMode ? '#000040' : '#fff', borderColor: '#333' }} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
