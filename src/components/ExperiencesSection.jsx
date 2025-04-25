/*Experience Section Component*/
import { useEffect, useRef } from "react";
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
    const panels = gsap.utils.toArray('.panel');
    
    // Create the scroll animation
    const createHorizontalScrollAnimation = () => {
      // Clear any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());
      
      const totalPanels = panels.length;
      const width = totalPanels * 100;

      // Set the container width to accommodate all panels
      gsap.set(panelsContainer.current, {
        width: `${width}%`,
        display: 'flex'
      });
      
      // Set each panel to fill 100% of the viewport width
      gsap.set(panels, { width: `${100 / totalPanels}%` });

      // Create the horizontal scroll animation
      gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (totalPanels - 1),
          start: "top top",
          end: () => `+=${window.innerWidth * (totalPanels - 1)}`,
          // Add this to your ScrollTrigger setup in ExperiencesSection:
        markers: false,  // Set to true for debugging
onEnter: () => console.log('Panel entered'),
onLeave: () => console.log('Panel left'),
onEnterBack: () => console.log('Panel entered back'),
onLeaveBack: () => console.log('Panel left back'),
          invalidateOnRefresh: true
        }
      });

      // Animate each panel's content when it comes into view
      panels.forEach((panel, i) => {
        const elements = panel.querySelectorAll('.panel-content, .panel-image');
        gsap.fromTo(elements, 
          { 
            y: 50, 
            opacity: 0 
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
              trigger: panel,
              start: i === 0 ? "top top" : "left center",
              containerAnimation: ScrollTrigger.getById("scroll-animation"),
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    };

    // Create the animation once everything is loaded
    createHorizontalScrollAnimation();

    // Recreate the animation on window resize
    window.addEventListener("resize", createHorizontalScrollAnimation);
    
    return () => {
      window.removeEventListener("resize", createHorizontalScrollAnimation);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

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
              <div className="panel-content-wrapper max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
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