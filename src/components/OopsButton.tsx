'use client';
import React from 'react';

export default function OopsButton({ onClick }:{ onClick:()=>void }){
  return (
    <button aria-label="Oops" onClick={onClick} className="w-56 h-56 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 shadow-xl flex items-center justify-center text-3xl font-bold text-white">
      Oops 😅
    </button>
  );
}
