"use client";
import { useState } from "react";
import EnvelopeOpening from "@/components/EnvelopeOpening";
import MusicPlayer from "@/components/MusicPlayer";
import CouplePhotoshootHero from "@/components/CouplePhotoshootHero";
import PrenupGallery from "@/components/PrenupGallery";
import PrenupVideo from "@/components/PrenupVideo";
import WeddingCountdown from "@/components/WeddingCountdown";
import { WEDDING } from "@/lib/wedding";

export default function Home() {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <MusicPlayer startSignal={opened} />
      <EnvelopeOpening onOpened={() => setOpened(true)} />
      <main aria-hidden={!opened ? true : undefined} className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-6 px-6 py-16 text-center">
        <p className="font-serif text-xl text-antique">With joyful hearts and the blessings of our families</p>
        <h1 className="font-display text-3xl sm:text-5xl leading-tight text-olive-deep">{WEDDING.groom} &amp; {WEDDING.bride}</h1>
        <p className="font-serif text-lg text-antique">Together with their families, invite you to celebrate their wedding.</p>
        <p className="font-script text-5xl text-rose">{WEDDING.dateLabel}</p>
        <WeddingCountdown />
      </main>
      <CouplePhotoshootHero />
      <PrenupGallery />
      <PrenupVideo />
    </>
  );
}
