import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function ReminderPanel(){
  const [reminders, setReminders] = useState([]);
  useEffect(()=>{ API.get('/reminders').then(r=>setReminders(r.data)).catch(()=>{}); }, []);
  const toggle = async id => {
    await API.patch(`/reminders/${id}/toggle`);
    setReminders(rs => rs.map(r => r._id === id ? {...r, active: !r.active} : r));
  };
  return (
    <div>
      <div className="space-y-2">
        {reminders.map(r => (
          <div key={r._id} className="flex items-center justify-between border rounded p-2">
            <div>
              <div className="font-medium">{r.description}</div>
              <div className="text-sm text-gray-500">{r.time}</div>
            </div>
            <button onClick={()=>toggle(r._id)} className={`px-3 py-1 rounded ${r.active? 'bg-green-500 text-white':'bg-gray-200'}`}>{r.active? 'On':'Off'}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

