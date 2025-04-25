import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";

const InfiniteCarousel = ({ personas }) => {
  const carouselRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentIndex = useRef(0);

  useEffect(() => {
    const context = gsap.context(() => {
      const cards = gsap.utils.toArray(".card");
      
      // Set initial states for all cards
      gsap.set(cards, (index) => ({
        x: index === 0 ? "-120%" : 
           index === 1 ? "0%" : 
           index === 2 ? "120%" : "240%",
        scale: index === 1 ? 1 : 0.7,
        opacity: index <= 2 ? 1 : 0,
        zIndex: index === 1 ? 3 : 1,
        filter: index === 1 ? "brightness(1)" : "brightness(0.5)"
      }));

    }, carouselRef);

    return () => context.revert();
  }, []);

  const handleNavigation = (direction) => {
    if (isAnimating) return;
    setIsAnimating(true);

    const cards = gsap.utils.toArray(".card");
    const tl = gsap.timeline({
      onComplete: () => {
        setIsAnimating(false);
        currentIndex.current = direction === 'next' 
          ? (currentIndex.current + 1) % cards.length
          : (currentIndex.current - 1 + cards.length) % cards.length;
      }
    });

    if (direction === 'next') {
      const nextIndex = (currentIndex.current + 1) % cards.length;
      const nextNextIndex = (nextIndex + 1) % cards.length;

      tl.to(cards, {
        x: (index) => {
          const position = index === currentIndex.current ? "-120%" :
                         index === nextIndex ? "0%" :
                         index === nextNextIndex ? "120%" : "240%";
          return position;
        },
        scale: (index) => index === nextIndex ? 1 : 0.7,
        opacity: (index) => {
          const currentPos = (index - currentIndex.current + cards.length) % cards.length;
          return currentPos <= 2 ? 1 : 0;
        },
        filter: (index) => index === nextIndex ? "brightness(1)" : "brightness(0.5)",
        zIndex: (index) => index === nextIndex ? 3 : 1,
        duration: 0.7,
        ease: "power2.inOut"
      });

    } else {
      const prevIndex = (currentIndex.current - 1 + cards.length) % cards.length;
      const prevPrevIndex = (prevIndex - 1 + cards.length) % cards.length;

      tl.to(cards, {
        x: (index) => {
          const position = index === prevIndex ? "0%" :
                         index === currentIndex.current ? "120%" :
                         index === prevPrevIndex ? "-120%" : "240%";
          return position;
        },
        scale: (index) => index === prevIndex ? 1 : 0.7,
        opacity: (index) => {
          const currentPos = (currentIndex.current - index + cards.length) % cards.length;
          return currentPos <= 2 ? 1 : 0;
        },
        filter: (index) => index === prevIndex ? "brightness(1)" : "brightness(0.5)",
        zIndex: (index) => index === prevIndex ? 3 : 1,
        duration: 0.7,
        ease: "power2.inOut"
      });
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-12">
      <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-16">
        Meet a Few AI Personas
      </h2>

      <div 
        ref={carouselRef} 
        className="relative h-[400px] w-full max-w-[1200px] mx-auto flex items-center justify-center"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[320px]">
            {personas.map((persona, index) => (
              <div
                key={index}
                className="card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full transition-shadow duration-300"
                style={{ transformOrigin: "center center" }}
              >
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-zinc-800/50 shadow-xl transition-all duration-300">
                  <div className="relative h-[400px]">
                    <img
                      src={persona.image}
                      alt={persona.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                      <h3 className="text-2xl font-bold text-cyan-400">
                        {persona.name}
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Arrow Navigation Buttons - Making them less visible */}
        <button
          onClick={() => !isAnimating && handleNavigation('prev')}
          disabled={isAnimating}
          className="absolute left-[4%] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/40 hover:bg-black/40 backdrop-blur-md border border-cyan-400 text-cyan-400 rounded-full transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 group"
          aria-label="Previous"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform group-hover:-translate-x-0.5 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => !isAnimating && handleNavigation('next')}
          disabled={isAnimating}
          className="absolute right-[4%] top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 backdrop-blur-md border border-cyan-400 text-cyan-400 rounded-full transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed z-10 group"
          aria-label="Next"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 transform group-hover:translate-x-0.5 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bottom Navigation Buttons */}
        <div className="absolute bottom-[-4rem] left-1/2 -translate-x-1/2 flex items-center gap-4">
          <button
            onClick={() => !isAnimating && handleNavigation('prev')}
            disabled={isAnimating}
            className="px-6 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-cyan-400 border border-cyan-400 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            onClick={() => !isAnimating && handleNavigation('next')}
            disabled={isAnimating}
            className="px-6 py-2 bg-zinc-900/80 hover:bg-zinc-800 text-cyan-400 border border-cyan-400 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfiniteCarousel;