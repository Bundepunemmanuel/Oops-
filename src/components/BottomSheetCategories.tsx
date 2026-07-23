'use client';
import React from 'react';
import { ACHIEVEMENTS } from '../data/achievements';

export default function BottomSheetCategories({ visible, onClose }:{ visible:boolean; onClose:()=>void }){
  if(!visible) return null;
  const CATEGORIES = [
    '🤦 Forgot Something','📱 Tech Fail','💸 Money Mistake','💬 Awkward Moment','🚗 Driving','📚 School/Work','❤️ Relationship','🏠 Home','🛒 Shopping','😂 Other'
  ];
  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black/30">
      <div className="bg-bg rounded-t-3xl w-full max-w-3xl p-6">
        <div className="w-16 h-1.5 bg-white/10 rounded-full mb-3 mx-auto" />
        <h3 className="text-xl text-white font-semibold mb-4">What kind of Oops?</h3>
        <div className="space-y-2">
          {CATEGORIES.map(c=> (
            <button key={c} className="w-full text-left py-3 text-white" onClick={()=>{ /* emit via event system? For simplicity, we'll use a global custom event */ window.dispatchEvent(new CustomEvent('oops:add',{detail:c})); onClose(); }}>{c}</button>
          ))}
        </div>
        <div className="mt-4 text-center"><button onClick={onClose} className="text-neutral-400">Cancel</button></div>
      </div>
    </div>
  );
}
