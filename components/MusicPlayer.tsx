"use client";
/**
 * Floating background-music control backed by the official YouTube IFrame Player.
 * Playback only starts after the guest interacts (parent sets `startSignal` from the
 * "Open Invitation" click), which satisfies browser autoplay rules.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { Music2, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { MUSIC } from "@/lib/wedding";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global { interface Window { YT?: any; onYouTubeIframeAPIReady?: () => void } }

type Status = "loading" | "ready" | "playing" | "paused" | "error";

export default function MusicPlayer({ startSignal }: { startSignal: boolean }) {
  const host = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);
  const wantPlay = useRef(false);
  const [status, setStatus] = useState<Status>("loading");
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const create = () => {
      if (cancelled || !host.current || player.current) return;
      const el = document.createElement("div");
      host.current.appendChild(el);
      player.current = new window.YT.Player(el, {
        width: "200", height: "200", videoId: MUSIC.youtubeId,
        playerVars: { controls: 0, playsinline: 1, loop: 1, playlist: MUSIC.youtubeId, rel: 0, modestbranding: 1 },
        events: {
          onReady: (e: any) => { e.target.setVolume(MUSIC.volume); setStatus("ready"); if (wantPlay.current) e.target.playVideo(); },
          onStateChange: (e: any) => {
            if (e.data === 1) setStatus("playing");
            else if (e.data === 2) setStatus("paused");
          },
          onError: () => setStatus("error"), // unavailable, removed, or embedding disabled by the owner
        },
      });
    };
    if (window.YT?.Player) create();
    else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); create(); };
      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const s = document.createElement("script");
        s.src = "https://www.youtube.com/iframe_api";
        s.onerror = () => setStatus("error");
        document.head.appendChild(s);
      }
    }
    return () => { cancelled = true; player.current?.destroy?.(); player.current = null; };
  }, []);

  useEffect(() => {
    if (!startSignal) return;
    wantPlay.current = true;
    if (player.current?.playVideo) player.current.playVideo();
  }, [startSignal]);

  // Pause the song while the prenup video plays; resume afterwards only if it was playing before.
  useEffect(() => {
    let resume = false;
    const onPlay = () => { resume = wantPlay.current && status === "playing"; if (resume) player.current?.pauseVideo?.(); };
    const onPause = () => { if (resume) { player.current?.playVideo?.(); resume = false; } };
    window.addEventListener("jt:video-play", onPlay);
    window.addEventListener("jt:video-pause", onPause);
    return () => { window.removeEventListener("jt:video-play", onPlay); window.removeEventListener("jt:video-pause", onPause); };
  }, [status]);

  const toggle = useCallback(() => {
    const p = player.current;
    if (!p?.playVideo) return;
    wantPlay.current = status !== "playing";
    status === "playing" ? p.pauseVideo() : p.playVideo();
  }, [status]);

  const toggleMute = useCallback(() => {
    const p = player.current;
    if (!p?.mute) return;
    muted ? p.unMute() : p.mute();
    setMuted(!muted);
  }, [muted]);

  const btn = "grid h-9 w-9 place-items-center rounded-full text-olive transition hover:bg-blush/60 disabled:opacity-40";
  const playing = status === "playing";
  return (
    <>
      {/* YouTube requires the player to stay rendered; keep it tiny and off-screen rather than display:none */}
      <div ref={host} aria-hidden className="pointer-events-none fixed -left-[300px] top-0 h-[200px] w-[200px] opacity-0" />
      <div role="group" aria-label="Background music" className="fixed bottom-4 right-4 z-40 flex items-center gap-1 rounded-full border border-champagne/60 bg-ivory/95 py-1 pl-3 pr-1 shadow-lg backdrop-blur">
        <Music2 size={16} className={`text-rose ${playing ? "animate-pulse" : ""}`} aria-hidden />
        <span className="mr-1 text-xs text-antique" aria-live="polite">
          {status === "error" ? "Music unavailable" : playing ? "Playing" : status === "loading" ? "Loading…" : "Paused"}
        </span>
        <button type="button" className={btn} onClick={toggle} disabled={status === "error" || status === "loading"} aria-label={playing ? "Pause music" : "Play music"}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button type="button" className={btn} onClick={toggleMute} disabled={status === "error" || status === "loading"} aria-label={muted ? "Unmute music" : "Mute music"}>
          {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>
    </>
  );
}
