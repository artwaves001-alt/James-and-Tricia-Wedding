# James & Tricia — Wedding Invitation (Phase 1)

Phase 1 contains the lace-envelope opening, cover and live countdown.

    npm install
    npm run dev   # http://localhost:3000

Assets: `public/images/` (envelope layers cut from the supplied artwork, prenup photos, card background).
Wedding facts live in `lib/wedding.ts`. Venue names/addresses are user-provided and still need confirmation.

## Background music
Plays a YouTube video through YouTube's official embedded player (`components/MusicPlayer.tsx`).
Change the song by editing `MUSIC.youtubeId` in `lib/wedding.ts`. Playback starts when the guest taps "Open Invitation".

## Prenup video
`public/videos/prenup.mp4` (poster: `prenup-poster.jpg`) is shown by `components/PrenupVideo.tsx`.
To replace it, overwrite those files. Keep it under ~50 MB for smooth mobile playback.
