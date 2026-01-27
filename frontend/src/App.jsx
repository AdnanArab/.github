import { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import './App.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const API_BASE_URL = 'http://localhost:8000';

function App() {
  const [salesData, setSalesData] = useState(null);
  const [usersData, setUsersData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [sales, users, performance, revenue] = await Promise.all([
        fetch(`${API_BASE_URL}/api/stats/sales`).then(res => res.json()),
        fetch(`${API_BASE_URL}/api/stats/users`).then(res => res.json()),
        fetch(`${API_BASE_URL}/api/stats/performance`).then(res => res.json()),
        fetch(`${API_BASE_URL}/api/stats/revenue`).then(res => res.json()),
      ]);

      setSalesData(sales);
      setUsersData(users);
      setPerformanceData(performance);
      setRevenueData(revenue);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data. Make sure the backend server is running on port 8000.');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSalesChartData = () => {
    if (!salesData) return null;
    
    return {
      labels: salesData.data.map(d => d.month),
      datasets: [
        {
          label: 'Sales',
          data: salesData.data.map(d => d.sales),
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  const getUsersChartData = () => {
    if (!usersData) return null;
    
    return {
      labels: usersData.data.map(d => d.month),
      datasets: [
        {
          label: 'Total Users',
          data: usersData.data.map(d => d.total_users),
          borderColor: 'rgb(54, 162, 235)',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
        },
        {
          label: 'Active Users',
          data: usersData.data.map(d => d.active_users),
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
  };

  const getPerformanceChartData = () => {
    if (!performanceData) return null;
    
    return {
      labels: performanceData.data.map(d => d.category),
      datasets: [
        {
          label: 'Performance (%)',
          data: performanceData.data.map(d => d.value),
          backgroundColor: performanceData.data.map(d => 
            d.status === 'healthy' ? 'rgba(75, 192, 192, 0.6)' : 'rgba(255, 159, 64, 0.6)'
          ),
          borderColor: performanceData.data.map(d => 
            d.status === 'healthy' ? 'rgb(75, 192, 192)' : 'rgb(255, 159, 64)'
          ),
          borderWidth: 1,
        },
      ],
    };
  };

  const getRevenueChartData = () => {
    if (!revenueData) return null;
    
    return {
      labels: revenueData.data.map(d => d.category),
      datasets: [
        {
          label: 'Revenue',
          data: revenueData.data.map(d => d.amount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (loading) {
    return (
      <div className="app">
        <header className="header">
          <h1>📊 Statistics Dashboard</h1>
        </header>
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="header">
          <h1>📊 Statistics Dashboard</h1>
        </header>
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchAllData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>📊 Statistics Dashboard</h1>
        <p>Real-time statistics and analytics</p>
        <button className="refresh-btn" onClick={fetchAllData}>
          🔄 Refresh Data
        </button>
      </header>

      <div className="dashboard">
        <div className="chart-container">
          <h2>{salesData?.title || 'Sales Statistics'}</h2>
          <div className="chart">
            {getSalesChartData() && (
              <Line data={getSalesChartData()} options={chartOptions} />
            )}
          </div>
        </div>

        <div className="chart-container">
          <h2>{usersData?.title || 'User Statistics'}</h2>
          <div className="chart">
            {getUsersChartData() && (
              <Bar data={getUsersChartData()} options={chartOptions} />
            )}
          </div>
        </div>

        <div className="chart-container">
          <h2>{performanceData?.title || 'Performance Metrics'}</h2>
          <div className="chart">
            {getPerformanceChartData() && (
              <Bar data={getPerformanceChartData()} options={chartOptions} />
            )}
          </div>
        </div>

        <div className="chart-container">
          <h2>{revenueData?.title || 'Revenue Breakdown'}</h2>
          <div className="chart">
            {getRevenueChartData() && (
              <Doughnut data={getRevenueChartData()} options={chartOptions} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
