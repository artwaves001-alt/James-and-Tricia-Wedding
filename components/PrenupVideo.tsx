"use client";
import { useRef } from "react";
import { WEDDING } from "@/lib/wedding";

/** Couple's prenup video (public/videos/prenup.mp4). Pauses the background music while it plays. */
export default function PrenupVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const emit = (name: string) => window.dispatchEvent(new Event(name));
  return (
    <section aria-labelledby="prenup-video-title" className="mx-auto flex max-w-xl flex-col items-center px-6 py-16 text-center">
      <h2 id="prenup-video-title" className="font-script text-5xl text-rose">Our Prenup Film</h2>
      <p className="mt-2 font-serif text-lg text-antique">Two Hearts, One Beautiful Journey</p>
      <div className="mt-8 w-full max-w-[340px] rounded-t-[999px] rounded-b-md border border-champagne bg-ivory p-2 shadow-[0_10px_30px_rgba(65,67,41,.2)]">
        <video
          ref={ref}
          className="aspect-[368/492] w-full rounded-t-[999px] rounded-b-sm bg-beige object-cover"
          src="/videos/prenup.mp4"
          poster="/videos/prenup-poster.jpg"
          controls playsInline preload="metadata"
          aria-label={`Prenup video of ${WEDDING.coupleDisplay}`}
          onPlay={() => emit("jt:video-play")}
          onPause={() => emit("jt:video-pause")}
          onEnded={() => emit("jt:video-pause")}
        >
          Your browser can’t play this video.
        </video>
      </div>
    </section>
  );
}
