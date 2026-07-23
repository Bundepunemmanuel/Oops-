'use client';
import React from 'react';

export default function AnimatedMessage({ message, visible }:{ message:string; visible:boolean }){
  if(!visible) return null;
  return (
    <div className="fixed bottom-32 left-0 right-0 flex justify-center">
      <div className="bg-white/6 px-4 py-2 rounded-full text-white">{message}</div>
    </div>
  );
}
