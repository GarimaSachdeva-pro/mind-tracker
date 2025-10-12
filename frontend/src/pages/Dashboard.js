import React, { useEffect, useState } from 'react';
import API from '../api/api';
import MoodChart from '../components/MoodChart';
import ReminderPanel from '../components/ReminderPanel';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    API.get('/entries/stats').then(r => setStats(r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded shadow">
          <h3 className="font-medium mb-2">Your Mood Trends</h3>
          <MoodChart />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h3 className="font-medium mb-2">Reminders</h3>
          <ReminderPanel />
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded shadow">
        <h3 className="font-medium mb-2">Quick Mood Check-in</h3>
        <div className="flex items-center space-x-3">
          {/* Quick mood emojis — clicking could route to NewEntry prefilled */}
          <button onClick={()=>{window.location='/new'}} className="px-4 py-2 bg-blue-500 text-white rounded">Add Quick Entry</button>
        </div>
      </div>
    </div>
  );
}