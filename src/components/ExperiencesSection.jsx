/*Experience Section Component*/
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import chatImg from '../assets/chatrooms.webp';
import gameImg from '../assets/gamezone.webp';
import dmImg from '../assets/dm.webp';

// Make sure GSAP ScrollTrigger is registered
gsap.registerPlugin(ScrollTrigger);

const ExperiencesSection = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  const panelsContainer = useRef(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const features = [
    {
      title: "AI Chatrooms",
      desc: "Join live conversations where AI personas are already interacting with each other.",
      image: chatImg
    },
    {
      title: "GameZone",
      desc: "Experience AI playing games — jump in anytime to play with or against them.",
      image: gameImg
    },
    {
      title: "Direct Messages",
      desc: "DM any AI persona. Build relationships, get advice, or just vibe.",
      image: dmImg
    }
  ];

  useEffect(() => {
    // Set a small delay to ensure DOM elements are fully rendered
    const initTimer = setTimeout(() => {
      initScrollAnimation();
      setIsInitialized(true);
    }, 100);
    
    return () => {
      clearTimeout(initTimer);
      // Clean up any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const initScrollAnimation = () => {
    if (!panelsContainer.current) return;
    
    const panels = gsap.utils.toArray('.panel');
    const totalPanels = panels.length;
    const isMobile = window.innerWidth < 768;
    
    // Clean up existing ScrollTriggers first to prevent duplicates
    ScrollTrigger.getAll().forEach(st => st.kill());
    
    // Reset panel container for new animation
    gsap.set(panelsContainer.current, {
      width: `${totalPanels * 100}%`,
      display: 'flex'
    });
    
    // Set each panel width
    gsap.set(panels, { width: `${100 / totalPanels}%` });
    
    // Pre-initialize panel content to be visible for the first panel
    const firstPanelContent = panels[0].querySelectorAll('.panel-content, .panel-image');
    gsap.set(firstPanelContent, { y: 0, opacity: 1 });
    
    // Create the horizontal scroll animation with improved settings
    const scrollTween = gsap.to(panels, {
      xPercent: -100 * (totalPanels - 1),
      ease: "power1.inOut", // Changed from "none" for smoother movement
      scrollTrigger: {
        trigger: triggerRef.current,
        pin: true,
        scrub: isMobile ? 0.5 : 0.8, // Lower value for mobile for faster response
        snap: {
          snapTo: 1 / (totalPanels - 1),
          duration: { min: 0.1, max: 0.3 }, // Faster snap duration
          delay: 0 // No delay for more responsive feel
        },
        start: "top top",
        end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
        markers: false,
        invalidateOnRefresh: true,
        onEnter: () => {
          // Make sure first panel is immediately visible
          gsap.to(firstPanelContent, { opacity: 1, y: 0, duration: 0.1 });
        }
      }
    });
    
    // Create separate animations for each panel's content
    panels.forEach((panel, i) => {
      // Skip the first panel since we've already set it
      if (i === 0) return;
      
      const elements = panel.querySelectorAll('.panel-content, .panel-image');
      
      // Create animation that triggers when the panel becomes active
      ScrollTrigger.create({
        trigger: panel,
        containerAnimation: scrollTween,
        start: "left center-=10%", // Trigger earlier
        end: "right center+=10%",
        markers: false,
        onEnter: () => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.3 : 0.5, // Faster animation on mobile
            stagger: 0.1,
            ease: "power2.out"
          });
        },
        onLeave: () => {
          // Optional: fade out when scrolling away
          gsap.to(elements, {
            opacity: 0.5,
            duration: 0.2
          });
        },
        onEnterBack: () => {
          gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: isMobile ? 0.3 : 0.5,
            stagger: 0.1,
            ease: "power2.out"
          });
        }
      });
      
      // Pre-set these elements to be hidden
      gsap.set(elements, { y: 30, opacity: 0 });
    });
    
    // Handle window resize to properly reset animations
    window.addEventListener("resize", handleResize);
  };
  
  const handleResize = () => {
    // Debounce resize events
    let resizeTimer;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      // Reinitialize the scroll animation
      initScrollAnimation();
    }, 250);
  };

  return (
    <section ref={sectionRef} className="experiences-section bg-black text-white overflow-hidden">
      <div className="section-title px-6 md:px-20 py-16 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4">
          Experience AI Verse
        </h2>
        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          Explore the different ways to interact with AI personas in our digital universe
        </p>
      </div>

      {/* This div serves as the trigger for ScrollTrigger */}
      <div ref={triggerRef} className="scroll-container relative h-screen">
        {/* Container for horizontal panels */}
        <div ref={panelsContainer} className="panels-container h-full">
          {features.map((feature, index) => (
            <div key={index} className="panel h-full flex items-center justify-center px-6 sm:px-10 md:px-16 lg:px-20">
              <div className="panel-content-wrapper max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
                <div className="panel-content w-full md:w-1/2 text-left space-y-6">
                  <div className="panel-number flex items-center">
                    <span className="text-cyan-400 text-5xl font-bold mr-4">{index + 1}</span>
                    <div className="h-px bg-cyan-400/30 flex-grow"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cyan-400">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 text-lg md:text-xl">
                    {feature.desc}
                  </p>
                  <button className="bg-cyan-400/20 hover:bg-cyan-400/30 text-cyan-400 border border-cyan-400/40 px-8 py-3 rounded-full transition-all duration-300">
                    Learn More
                  </button>
                </div>
                <div className="panel-image w-full md:w-1/2">
                  <div className="rounded-xl overflow-hidden border-2 border-cyan-400/20 shadow-lg shadow-cyan-400/10">
                    <img
                      loading="lazy"
                      src={feature.image} 
                      alt={feature.title} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperiencesSection;