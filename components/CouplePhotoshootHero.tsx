"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FEATURED_PHOTO_ID, PRENUP_PHOTOS } from "@/lib/photos";
import { WEDDING } from "@/lib/wedding";

export default function CouplePhotoshootHero() {
  const reduce = useReducedMotion();
  const photo = PRENUP_PHOTOS.find((p) => p.id === FEATURED_PHOTO_ID) ?? PRENUP_PHOTOS[0];
  if (!photo) return null;
  return (
    <section aria-label="Featured couple photograph" className="mx-auto max-w-3xl px-6 py-12">
      <motion.figure
        initial={reduce ? false : { opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.2 }}
        className="mx-auto max-w-md"
      >
        <div className="rounded-sm border border-champagne bg-ivory p-3 shadow-[0_12px_32px_rgba(65,67,41,.22)]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(max-width:768px) 90vw, 448px" className="object-cover object-[50%_35%]" />
          </div>
        </div>
        <figcaption className="mt-6 text-center">
          <p className="font-script text-4xl text-rose">{WEDDING.coupleDisplay}</p>
          <p className="mt-1 font-serif text-lg italic text-antique">Two Hearts, One Beautiful Journey</p>
        </figcaption>
      </motion.figure>
    </section>
  );
}
