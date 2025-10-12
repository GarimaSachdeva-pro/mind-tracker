import React, { useEffect, useState } from 'react';
import API from '../api/api';

export default function Journal() {
  const [entries, setEntries] = useState([]);
  useEffect(()=>{ API.get('/entries').then(r=>setEntries(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Journal Entries</h2>
      <div className="space-y-4">
        {entries.map(e => (
          <div key={e._id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">{e.mood} — {e.moodScore}/10</div>
                <div className="text-sm text-gray-500">{new Date(e.date).toLocaleString()}</div>
              </div>
            </div>
            <p className="mt-2">{e.thoughts}</p>
            <div className="mt-2 text-sm text-gray-600">Activities: {e.activities?.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
}