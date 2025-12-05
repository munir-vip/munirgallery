export interface Variant {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  sequence: {
    url: string;
    frameCount: number;
  };
}

export const variants: Variant[] = [
  {
    id: 1,
    name: 'MUNIR',
    subtitle: 'GAMER',
    description: '🎬 Your forever story, one frame at a time 📸 Modern | Moody | Magical 💌 Bookings Available – DM me!',
    sequence: {
      url: 'https://jjikcpuvzemupubhixhc.supabase.co/storage/v1/object/public/munir/frame_{frame}_delay-0.04s.webp',
      frameCount: 240,
    },
  },
  // To add more variants, copy the object above and change the values.
  // For example:
  // {
  //   id: 2,
  //   name: 'STUDIO',
  //   subtitle: 'CREATOR',
  //   description: 'Another description for another photo set.',
  //   sequence: {
  //     url: 'https://path.to/your/sequence/frame_{frame}.webp',
  //     frameCount: 120,
  //   },
  // },
];
