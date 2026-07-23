'use client';
import React from 'react';

export default function StatCard({ label, value }:{ label:string; value:string }){
  return (
    <div className="bg-card rounded-2xl p-4 shadow-sm">
      <div className="text-neutral-300">{label}</div>
      <div className="text-white text-2xl font-semibold mt-2">{value}</div>
    </div>
  );
}
