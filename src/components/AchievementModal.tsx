'use client';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useApp } from '../context/AppContext';

const Player = dynamic(()=> import('@lottiefiles/react-lottie-player').then(m=>m.Player), { ssr:false });
const ReactConfetti = dynamic(()=> import('react-confetti'), { ssr:false });

export default function AchievementModal(){
  const { recentAchievement, clearRecentAchievement } = useApp();
  const [size, setSize] = useState({width:800,height:600});
  useEffect(()=>{setSize({width: window.innerWidth, height: window.innerHeight})},[]);
  if(!recentAchievement) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-bg p-6 rounded-3xl items-center w-[320px] text-center">
        <Player autoplay loop={false} src={'/animations/achievement.json'} style={{ width:160, height:160 }} />
        <div className="text-white text-xl font-semibold mt-2">{recentAchievement.title}</div>
        <div className="text-neutral-300 mt-1">{recentAchievement.description}</div>
        <div className="flex space-x-3 mt-4 justify-center">
          <button onClick={clearRecentAchievement} className="px-4 py-2 rounded-full bg-white/8 text-white">Nice</button>
          <button onClick={()=>{}} className="px-4 py-2 rounded-full bg-violet-600 text-white">Share</button>
        </div>
      </div>
      <ReactConfetti numberOfPieces={80} recycle={false} width={size.width} height={size.height} />
    </div>
  );
}
