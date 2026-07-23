'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import localforage from 'localforage';
import { ACHIEVEMENTS } from '../data/achievements';

export type Category =
  | '🤦 Forgot Something'
  | '📱 Tech Fail'
  | '💸 Money Mistake'
  | '💬 Awkward Moment'
  | '🚗 Driving'
  | '📚 School/Work'
  | '❤️ Relationship'
  | '🏠 Home'
  | '🛒 Shopping'
  | '😂 Other';

export type OopsEvent = { id: string; category: Category; ts: number; xp: number };

type Settings = { sound: boolean; theme: 'dark' | 'light' };

type AppState = {
  events: OopsEvent[];
  xp: number;
  level: number;
  streak: number;
  settings: Settings;
  addOops: (category: Category) => Promise<OopsEvent>;
  resetData: () => Promise<void>;
  unlocked: string[];
  recentAchievement: any | null;
  clearRecentAchievement: () => void;
};

const STORAGE_KEY = 'oops:web:v1';
const initialSettings: Settings = { sound: false, theme: 'dark' };

const AppContext = createContext<AppState | undefined>(undefined);

function calcLevel(xp:number){
  const thresholds=[0,10,30,60,100,160,240,340,460,600];
  let l=1; for(let i=0;i<thresholds.length;i++) if(xp>=thresholds[i]) l=i+1; return l;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<OopsEvent[]>([]);
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<any | null>(null);

  useEffect(()=>{(async()=>{
    const raw = await localforage.getItem(STORAGE_KEY);
    if(raw){
      try{
        const parsed = raw as any;
        setEvents(parsed.events||[]);
        setXp(parsed.xp||0);
        setLevel(calcLevel(parsed.xp||0));
        setStreak(parsed.streak||0);
        setSettings(parsed.settings||initialSettings);
        setUnlocked(parsed.unlocked||[]);
      }catch(e){console.warn(e)}
    }
  })()},[]);

  useEffect(()=>{(async()=>{
    await localforage.setItem(STORAGE_KEY,{events,xp,streak,settings,unlocked});
  })()},[events,xp,streak,settings,unlocked]);

  useEffect(()=>{setLevel(calcLevel(xp))},[xp]);

  const addOops = async (category: Category) => {
    const ev: OopsEvent = { id: String(Date.now()), category, ts: Date.now(), xp: 1 };
    setEvents(s => [ev, ...s]);
    setXp(x => x + ev.xp);
    setStreak(s => {
      const last = events[0]; if(!last) return 1; const lastDay = new Date(last.ts).toDateString(); const today = new Date().toDateString(); return lastDay===today? s+1:1;
    });
    // achievements
    const total = events.length + 1;
    const newly = ACHIEVEMENTS.filter(a=>a.condition(total,[ev,...events]) && !unlocked.includes(a.id));
    if(newly.length){ setUnlocked(s=>[...s,...newly.map(n=>n.id)]); setRecentAchievement(newly[0]); setXp(x=>x+newly[0].xp); }
    return ev;
  };

  const resetData = async ()=>{ setEvents([]); setXp(0); setLevel(1); setStreak(0); setSettings(initialSettings); setUnlocked([]); setRecentAchievement(null); await localforage.removeItem(STORAGE_KEY); };
  const clearRecentAchievement = ()=> setRecentAchievement(null);

  return (
    <AppContext.Provider value={{events,xp,level,streak,settings,addOops,resetData,unlocked,recentAchievement,clearRecentAchievement}}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = ()=>{ const ctx = useContext(AppContext); if(!ctx) throw new Error('useApp must be used inside AppProvider'); return ctx; };
