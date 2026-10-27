"use client";
/**
 * Layered lace-envelope opening.
 * Layers (back→front): flap · back panel · invitation card · pocket · closed-envelope image.
 * All layers are cut from the supplied artwork (see public/images) and share one 962×1151 stage,
 * so the flap can rotate on its fold line independently of the pocket and card.
 */
import Image from "next/image";
import { useCallback, useState } from "react";
import { motion, useAnimate, useReducedMotion } from "framer-motion";
import { WEDDING } from "@/lib/wedding";

type Phase = "closed" | "opening" | "done";
const STAGE_W = 962, STAGE_H = 1151;
const FOLD = (465 / STAGE_H) * 100; // fold line, % from top of stage

export default function EnvelopeOpening({ onOpened }: { onOpened: () => void }) {
  const [scope, animate] = useAnimate();
  const [phase, setPhase] = useState<Phase>("closed");
  const reduce = useReducedMotion();

  const open = useCallback(async () => {
    if (phase !== "closed") return; // ignore repeated clicks
    setPhase("opening");
    onOpened(); // lets the page start music (a user gesture just happened)
    const d = reduce ? 0.01 : 1;
    // 1. swap closed artwork for the layered pieces (flap starts folded down)
    await animate([
      ["[data-layer=flap]", { opacity: 1 }, { duration: 0.01 }],
      ["[data-layer=closed]", { opacity: 0 }, { duration: 0.25 * d, at: 0 }],
      ["[data-layer=back]", { opacity: 1 }, { duration: 0.01, at: 0 }],
      ["[data-layer=pocket]", { opacity: 1 }, { duration: 0.01, at: 0 }],
    ]);
    // 2. flap lifts on its fold line
    await animate("[data-layer=flap]", { rotateX: 0 }, { duration: 1.1 * d, ease: [0.4, 0, 0.2, 1] });
    // 3. card slides up out of the pocket
    await animate("[data-layer=card]", { y: "-72%", opacity: 1 }, { duration: 1.4 * d, ease: [0.22, 1, 0.36, 1] });
    // 4. hold on the names + date, then hand over to the site
    await new Promise((r) => setTimeout(r, reduce ? 200 : 1400));
    await animate(scope.current, { opacity: 0 }, { duration: 0.9 * d });
    setPhase("done");
  }, [phase, animate, scope, onOpened, reduce]);

  if (phase === "done") return null;

  const layer = "absolute inset-x-0 pointer-events-none select-none";
  return (
    <div ref={scope} className="fixed inset-0 z-50 overflow-y-auto bg-ivory" role="dialog" aria-label="Wedding invitation envelope">
      <div className="absolute inset-0 opacity-60" style={{ backgroundImage: "url(/images/card-background.png)", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden />
      <div className="relative mx-auto flex min-h-full max-w-xl flex-col items-center justify-center px-4 py-8 text-center">
        <h1 className="font-serif text-2xl sm:text-3xl text-olive-deep">A Special Invitation for You</h1>
        <p className="mt-1 font-script text-5xl sm:text-6xl text-rose">{WEDDING.coupleDisplay}</p>

        <div className="relative mt-6 w-[min(86vw,440px)]" style={{ aspectRatio: `${STAGE_W} / ${STAGE_H}`, perspective: 1400 }}>
          {/* flap: folded onto the pocket (rotateX 180) until opened; pivots on the fold line */}
          <motion.div data-layer="flap" className={layer} initial={{ opacity: 0, rotateX: 180 }}
            style={{ top: 0, height: `${FOLD}%`, transformOrigin: "50% 100%", backfaceVisibility: "visible" }}>
            <Image src="/images/envelope-flap.png" alt="" fill sizes="440px" className="object-fill" priority />
          </motion.div>
          <div data-layer="back" className={layer} style={{ top: `${FOLD}%`, bottom: 0, opacity: 0 }}>
            <Image src="/images/envelope-back.png" alt="" fill sizes="440px" className="object-fill" style={{ objectPosition: "bottom" }} />
          </div>

          {/* invitation card (starts tucked behind the pocket) */}
          <motion.div data-layer="card" initial={{ y: "55%", opacity: 0 }}
            className="absolute flex flex-col items-center justify-center overflow-hidden rounded-[2px] bg-ivory px-4 text-center shadow-[0_6px_18px_rgba(65,67,41,.25)]"
            style={{ left: "13.3%", width: "73.5%", top: `${FOLD}%`, height: "50%", backgroundImage: "url(/images/card-background.png)", backgroundSize: "cover" }}>
            <p className="font-serif text-[clamp(.7rem,2.4vw,.95rem)] text-antique">Together with their families</p>
            <p className="mt-2 font-display text-[clamp(.95rem,3.4vw,1.35rem)] leading-snug text-olive-deep">
              {WEDDING.groom}<br /><span className="font-script text-[clamp(1.3rem,4.6vw,1.9rem)] text-rose">&amp;</span><br />{WEDDING.bride}
            </p>
            <p className="mt-3 font-serif text-[clamp(.95rem,3.2vw,1.25rem)] text-olive">{WEDDING.dateLabel}</p>
          </motion.div>

          <div data-layer="pocket" className={layer} style={{ top: `${FOLD}%`, bottom: 0, opacity: 0, zIndex: 3 }}>
            <Image src="/images/envelope-pocket.png" alt="" fill sizes="440px" className="object-fill" style={{ objectPosition: "bottom" }} />
          </div>

          {/* closed envelope, matched to the pocket's footprint */}
          <div data-layer="closed" className={layer} style={{ top: `${FOLD}%`, bottom: 0, zIndex: 4 }}>
            <Image src="/images/envelope-closed.png" alt="Closed olive-green lace envelope" fill sizes="440px" className="object-fill" priority />
          </div>
        </div>

        <button type="button" onClick={open} disabled={phase !== "closed"}
          className="mt-8 rounded-full bg-olive px-8 py-3 text-sm tracking-wide text-ivory shadow-md transition hover:bg-olive-deep disabled:opacity-60">
          Open Invitation
        </button>
      </div>
    </div>
  );
}
