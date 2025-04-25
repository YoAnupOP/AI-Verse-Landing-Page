import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const InfiniteCarousel = ({ personas }) => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".card");
      const spacing = 0.1; // Adjust spacing between cards
      const snap = gsap.utils.snap(spacing);
      const totalDuration = cards.length * spacing;

      gsap.set(cards, { opacity: 0, scale: 0, xPercent: 400 });

      const loopTimeline = gsap.timeline({ repeat: -1, paused: true });
      cards.forEach((card, index) => {
        const time = index * spacing;
        loopTimeline
          .fromTo(
            card,
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 0.5, yoyo: true, repeat: 1, ease: "power1.in" },
            time
          )
          .fromTo(
            card,
            { xPercent: 400 },
            { xPercent: -400, duration: 1, ease: "none" },
            time
          );
      });

      const scrubTween = gsap.to(loopTimeline, { time: 0, duration: 0.5, ease: "power3", paused: true });

      ScrollTrigger.create({
        trigger: carouselRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        onUpdate: (self) => {
          const progress = snap(self.progress * totalDuration);
          scrubTween.vars.time = progress;
          scrubTween.invalidate().restart();
        },
      });
    }, carouselRef);

    return () => context.revert(); // Cleanup on unmount
  }, []);

  return (
    <section ref={carouselRef} className="carousel-section">
      <h2 className="text-4xl font-bold text-cyan-400 mb-8">Meet a Few AI Personas</h2>
      <div className="carousel-container flex space-x-4">
        {personas.map((persona, index) => (
          <div key={index} className="card bg-zinc-900 w-64 h-80 rounded-xl shadow-lg">
            <img src={persona.image} alt={persona.name} className="w-full h-64 object-cover" />
            <div className="text-cyan-300 text-center mt-2">{persona.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InfiniteCarousel;