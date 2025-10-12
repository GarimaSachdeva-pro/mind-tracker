import React, { useEffect, useState } from 'react';
import API from '../api/api';
import MoodChart from '../components/MoodChart';

export default function Statistics() {
  const [stats, setStats] = useState(null);
  useEffect(()=>{ API.get('/entries/stats').then(r=>setStats(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
      <div className="bg-white p-6 rounded shadow">
        <p>Total Entries: {stats?.total || 0}</p>
        <p>Average Mood Score: {stats?.avg?.toFixed?.(1) || 0}</p>
        <div className="mt-4"><MoodChart /></div>
      </div>
    </div>
  );
}