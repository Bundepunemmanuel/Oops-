'use client';
import React, { useState } from 'react';
import { useApp } from '../src/context/AppContext';
import OopsButton from '../src/components/OopsButton';
import FloatingEmojis from '../src/components/FloatingEmojis';
import AnimatedMessage from '../src/components/AnimatedMessage';
import XPBar from '../src/components/XPBar';
import StatCard from '../src/components/StatCard';
import BottomSheetCategories from '../src/components/BottomSheetCategories';
import AchievementModal from '../src/components/AchievementModal';

export default function Page(){
  const { events, xp, level, streak } = useApp();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [floating, setFloating] = useState<{emoji:string,message:string}|null>(null);

  const todaysCount = events.filter(e=> new Date(e.ts).toDateString()===new Date().toDateString()).length;

  const onOops = ()=>{
    setSheetVisible(true);
    setFloating({emoji: ['😂','😅','😭','💀'][Math.floor(Math.random()*4)], message: ['Character development +1','Nobody saw that.','You survived.','Another lesson unlocked.'][Math.floor(Math.random()*4)]});
    setTimeout(()=>setFloating(null),2500);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-5xl font-semibold mb-6">Oops 😅</h2>
      <OopsButton onClick={onOops} />
      <FloatingEmojis visible={!!floating} emoji={floating?.emoji||''} />
      <AnimatedMessage message={floating?.message||''} visible={!!floating} />

      <div className="mt-8 w-full space-y-3">
        <StatCard label="Today's Oops" value={String(todaysCount)} />
        <StatCard label="Current Check-in Streak" value={`${streak} days`} />
        <StatCard label="Lifetime Oops" value={String(events.length)} />
        <StatCard label="Current Level" value={`Level ${level}`} />
        <div className="mt-2"><XPBar xp={xp} /></div>
      </div>

      <p className="mt-6 text-neutral-300 text-center max-w-xl">"{['Character development is expensive.','Congratulations. You unlocked another life lesson.','You survived another tiny catastrophe.'][Math.floor(Math.random()*3)]}"</p>

      <BottomSheetCategories visible={sheetVisible} onClose={()=>setSheetVisible(false)} />
      <AchievementModal />
    </div>
  );
}
