import React, { useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import API from '../api/api';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title);

export default function MoodChart(){
  const [entries, setEntries] = useState([]);
  useEffect(()=> API.get('/entries').then(r=>setEntries(r.data)).catch(()=>{}), []);
  // Prepare dataset: for simplicity show last 10 moodScores over time
  const labels = entries.slice(0,10).map(e => new Date(e.date).toLocaleDateString());
  const data = { labels, datasets: [{ label: 'Mood Score', data: entries.slice(0,10).map(e=>e.moodScore || 5), fill:false, tension: 0.4 }] };
  return <div><Line data={data} /></div>;
}