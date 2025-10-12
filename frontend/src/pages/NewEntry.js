import React, { useState } from 'react';
import API from '../api/api';

export default function NewEntry() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    date: new Date().toISOString().substring(0,10),
    time: new Date().toTimeString().slice(0,5),
    mood: 'Neutral',
    moodScore: 5,
    activities: '',
    thoughts: '',
    tags: '',
    media: null
  });

  const handleFile = e => setForm({...form, media: e.target.files});

  const submit = async () => {
    const fd = new FormData();
    Object.keys(form).forEach(k => {
      if (k === 'media' && form.media) {
        Array.from(form.media).forEach(f => fd.append('media', f));
      } else fd.append(k, form[k]);
    });
    try {
      await API.post('/entries', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Entry saved');
      window.location = '/';
    } catch (e) { alert('Error'); }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">New Entry</h2>
      {step === 1 && (
        <div>
          <label>Date</label>
          <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="block border p-2"/>
          <label className="mt-2">Mood</label>
          <select value={form.mood} onChange={e=>setForm({...form,mood:e.target.value})} className="block border p-2">
            <option>Happy</option><option>Neutral</option><option>Anxious</option><option>Sad</option><option>Excited</option>
          </select>
          <label className="mt-2">Mood Intensity: {form.moodScore}</label>
          <input type="range" min="0" max="10" value={form.moodScore} onChange={e=>setForm({...form,moodScore:e.target.value})}/>
          <div className="mt-4">
            <button onClick={()=>setStep(2)} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <label>Activities</label>
          <input value={form.activities} onChange={e=>setForm({...form,activities:e.target.value})} placeholder="comma separated" className="block border p-2"/>
          <label className="mt-2">Thoughts</label>
          <textarea value={form.thoughts} onChange={e=>setForm({...form,thoughts:e.target.value})} className="block border p-2"/>
          <label className="mt-2">Add Media</label>
          <input type="file" multiple onChange={handleFile} />
          <div className="mt-4">
            <button onClick={()=>setStep(1)} className="px-4 py-2 border rounded mr-2">Back</button>
            <button onClick={()=>setStep(3)} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <label>Tags</label>
          <input value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} placeholder="comma separated" className="block border p-2"/>
          <div className="mt-4">
            <button onClick={()=>setStep(2)} className="px-4 py-2 border rounded mr-2">Back</button>
            <button onClick={submit} className="px-4 py-2 bg-green-600 text-white rounded">Save Entry</button>
          </div>
        </div>
      )}
    </div>
  );
}