'use client';
import React from 'react';

export default function FloatingEmojis({ visible, emoji }:{ visible:boolean; emoji:string }){
  if(!visible) return null;
  return (
    <div className="absolute mt-[-6rem]">
      <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center text-2xl">{emoji}</div>
    </div>
  );
}
