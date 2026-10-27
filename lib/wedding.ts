// Single source of truth for wedding facts (venue details still need couple confirmation).
export const WEDDING = {
  timeZone: "Asia/Manila",
  coupleDisplay: "James & Tricia",
  groom: "James Matthew Chua",
  bride: "Tricia Lhyn Sanchez",
  dateLabel: "January 8, 2027",
  rsvpDeadline: "2026-12-25",
  // +08:00 is the fixed UTC offset for Asia/Manila (no DST).
  ceremonyStart: "2027-01-08T14:00:00+08:00",
  receptionStart: "2027-01-08T15:00:00+08:00",
} as const;

// Background music: a YouTube video played through YouTube's official embedded player.
// To change the song, replace the ID (the part after "v=" in a YouTube link).
export const MUSIC = { youtubeId: "tXG6mQfwsNE", volume: 60 } as const;
