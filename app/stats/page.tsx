'use client';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import StatCard from '../../src/components/StatCard';
import { useApp } from '../../src/context/AppContext';

export default function Page(){
  const { events } = useApp();
  const monthly = new Array(12).fill(0);
  events.forEach(e=>{ const d=new Date(e.ts); monthly[d.getMonth()]++; });
  const data = { labels:['J','F','M','A','M','J','J','A','S','O','N','D'], datasets:[{ label:'Oops', data: monthly, backgroundColor: '#7c3aed' }] };
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Insights</h2>
      <StatCard label="Lifetime Oops" value={`${events.length}`} />
      <div className="mt-6">
        <h3 className="text-white text-lg mb-2">Monthly Oops</h3>
        <div className="bg-card p-4 rounded-lg">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}
