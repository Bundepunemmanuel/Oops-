export type Category =
  | "🤦 Forgot Something"
  | "📱 Tech Fail"
  | "💸 Money Mistake"
  | "💬 Awkward Moment"
  | "🚗 Driving"
  | "📚 School/Work"
  | "❤️ Relationship"
  | "🏠 Home"
  | "🛒 Shopping"
  | "😂 Other";

export type OopsEvent = {
  id: string;
  category: Category;
  ts: number;
  xp: number;
};
