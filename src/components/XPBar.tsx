'use client';
import React from 'react';

export default function XPBar({ xp }:{ xp:number }){
  const pct = Math.min(100, (xp % 10) * 10);
  return (
    <div>
      <div className="text-neutral-400 mb-2">XP</div>
      <div className="h-3 bg-white/8 rounded-full overflow-hidden">
        <div style={{ width: `${pct}%`, height:12, backgroundColor:'#7c3aed', borderRadius:8 }} />
      </div>
      <div className="text-neutral-400 mt-1">Level progress</div>
    </div>
  );
}
