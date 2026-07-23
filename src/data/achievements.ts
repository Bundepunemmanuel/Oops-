export type Achievement = {
  id: string;
  title: string;
  description: string;
  xp: number;
  condition: (eventsCount: number, events: any[]) => boolean;
  icon?: string; // emoji or asset name
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "first",
    title: "First Oops",
    description: "Your first tiny catastrophe.",
    xp: 25,
    condition: (count) => count >= 1,
    icon: "🎉"
  },
  {
    id: "ten",
    title: "10 Oops",
    description: "Ten lessons later.",
    xp: 25,
    condition: (count) => count >= 10,
    icon: "🔟"
  },
  {
    id: "fifty",
    title: "50 Oops",
    description: "You are now a legend of small mistakes.",
    xp: 50,
    condition: (count) => count >= 50,
    icon: "🏆"
  },
  {
    id: "streak7",
    title: "7-Day Streak",
    description: "You checked in 7 days in a row.",
    xp: 50,
    condition: (_, events) => {
      const days = new Set(events.map((e: any) => new Date(e.ts).toDateString()));
      return days.size >= 7;
    },
    icon: "🔥"
  }
];
