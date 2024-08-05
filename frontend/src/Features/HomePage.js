import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const HomePage = () => {
  const [records, setRecords] = useState([]);
  const [metrics, setMetrics] = useState({
    totalConversions: 0,
    totalFiles: 0,
    activeUsers: 0,
    notifications: 0,
  });

  useEffect(() => {
    // Utilisation de données factices pour le débogage
    const mockData = [
      { userId: 'user1', fileCount: 3, notification: true, date: '2024-08-04' },
      { userId: 'user2', fileCount: 2, notification: false, date: '2024-08-03' },
      // Ajoutez d'autres données factices si nécessaire
    ];
    setRecords(mockData);
  }, []);

  useEffect(() => {
    // Fetch data from backend
    axios.get('/api/conversion-records')
      .then(response => {
        console.log('Data fetched from API:', response.data); // Log des données récupérées
        setRecords(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    console.log('Records state updated:', records); // Log des données mises à jour

    // Calculer les métriques basées sur les données récupérées
    const totalConversions = records.length;
    const totalFiles = records.reduce((sum, record) => sum + record.fileCount, 0);
    const activeUsers = new Set(records.map(record => record.userId)).size;
    const notifications = records.filter(record => record.notification).length;

    console.log('Calculated Metrics:', { totalConversions, totalFiles, activeUsers, notifications }); // Log des métriques calculées
    setMetrics({ totalConversions, totalFiles, activeUsers, notifications });
  }, [records]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      
      
      {/* Dashboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-customColor text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Conversions</h2>
          <p className="text-2xl">{metrics.totalConversions}</p>
        </div>
        <div className="bg-customColor text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Total Files</h2>
          <p className="text-2xl">{metrics.totalFiles}</p>
        </div>
        <div className="bg-customColor text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Active Users</h2>
          <p className="text-2xl">{metrics.activeUsers}</p>
        </div>
        <div className="bg-customColor text-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold">Notifications</h2>
          <p className="text-2xl">{metrics.notifications}</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Conversions Over Time</h2>
        <LineChart width={600} height={300} data={records}>
          <Line type="monotone" dataKey="fileCount" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
};

export default HomePage;
