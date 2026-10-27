"use client";
import { useEffect, useState } from "react";
import { WEDDING } from "@/lib/wedding";

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now);
  const s = Math.floor(ms / 1000);
  return { done: target <= now, days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

export default function WeddingCountdown() {
  const target = new Date(WEDDING.ceremonyStart).getTime(); // absolute instant, so the viewer's own time zone doesn't matter
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return <div className="h-24" aria-hidden />;
  const t = diff(target, now);
  if (t.done) return <p className="font-script text-4xl text-rose">Today we celebrate — thank you for being part of it.</p>;
  const units = [["Days", t.days], ["Hours", t.hours], ["Minutes", t.minutes], ["Seconds", t.seconds]] as const;
  return (
    <div role="timer" aria-label="Time until the wedding" className="flex justify-center gap-3 sm:gap-6">
      {units.map(([label, v]) => (
        <div key={label} className="w-16 sm:w-20 text-center">
          <div className="font-display text-3xl sm:text-4xl text-olive tabular-nums">{String(v).padStart(2, "0")}</div>
          <div className="mt-1 text-xs tracking-wide text-antique">{label}</div>
        </div>
      ))}
    </div>
  );
}
