'use client';
import React from 'react';
import { useApp } from '../../src/context/AppContext';

export default function Page(){
  const { settings, resetData } = useApp();
  return (
    <div>
      <h2 className="text-3xl font-semibold mb-6">Settings</h2>
      <div className="bg-card p-4 rounded-lg">
        <div className="flex justify-between items-center">
          <span>Theme</span>
          <span className="text-neutral-300">{settings.theme}</span>
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 rounded-full bg-rose-600" onClick={resetData}>Reset Data</button>
        </div>
      </div>
    </div>
  );
}
