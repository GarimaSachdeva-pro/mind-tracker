import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import NewEntry from './pages/NewEntry';
import Journal from './pages/Journal';
import Statistics from './pages/Statistics';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between">
          <h1 className="text-xl font-bold">Mind Tracker</h1>
          <nav className="space-x-3">
            <Link to="/" className="text-gray-700">Dashboard</Link>
            <Link to="/new" className="text-gray-700">New Entry</Link>
            <Link to="/journal" className="text-gray-700">Journal</Link>
            <Link to="/stats" className="text-gray-700">Stats</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/new" element={<NewEntry/>} />
          <Route path="/journal" element={<Journal/>} />
          <Route path="/stats" element={<Statistics/>} />
        </Routes>
      </main>
    </div>
  );
}
