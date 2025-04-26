import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import sukunaImg from './assets/sukuna.webp';
import erenImg from './assets/eren.webp';
import aizenImg from './assets/aizen.webp';
import elonImg from './assets/elon.webp';
import hinataImg from './assets/hinata.webp';
import batmanImg from './assets/batman.webp';
import chatImg from './assets/chatrooms.webp';
import gameImg from './assets/gamezone.webp';
import dmImg from './assets/dm.webp';
import ExperiencesSection from './components/ExperiencesSection';
import PersonaPreviewSection from './components/PersonaPreviewSection';
import InfiniteCarousel from './components/InfiniteCarousel';
import { Draggable } from 'gsap/Draggable';
import './styles/experiences.css';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollTrigger, Draggable);

function AIGlobe() {
  const globeRef = useRef();
  const clock = useRef(0);
  
  // Lower polygon count for better performance
  const segments = window.innerWidth > 768 ? 64 : 32;
  
  useFrame((state, delta) => {
    // Optimize animation loop
    if (document.visibilityState === 'visible') {
      clock.current += delta;
      globeRef.current.rotation.y += 0.004;
      globeRef.current.rotation.x += 0.0015;
      globeRef.current.position.y = Math.sin(clock.current * 1.5) * 0.4;
    }
  });

  return (
    <mesh ref={globeRef} scale={2.2}>
      <sphereGeometry args={[1.2, segments, segments]} />
      <meshBasicMaterial wireframe color="#00FFFF" transparent opacity={0.65} />
    </mesh>
  );
}

export default function App() {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionsRef = useRef([]);
  const [scrollY, setScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const personas = [
    { name: "Sukuna", image: sukunaImg },
    { name: "Eren", image: erenImg },
    { name: "Aizen", image: aizenImg },
    { name: "Elon Musk", image: elonImg },
    { name: "Hinata", image: hinataImg },
    { name: "Batman", image: batmanImg },
  ];


  useEffect(() => {
    gsap.to(titleRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    });
    gsap.to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.3,
      duration: 1.2,
      ease: "power2.out",
    });
    gsap.to(buttonRef.current, {
      opacity: 1,
      y: 0,
      delay: 0.6,
      duration: 1.2,
      ease: "power2.out",
    });

    sectionsRef.current.forEach((section, index) => {
      if (!section) return;
      if (index === 0) {
        // Only animate y for About section, not opacity
        gsap.fromTo(
          section,
          { y: 50 },
          {
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    });

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <div className="bg-black text-white font-dmsans overflow-x-hidden">
      {/* NAVBAR */}
<header className="fixed top-0 left-0 w-full z-50">
  <nav className="w-full px-0 py-4 flex items-center justify-between">
    <div className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 text-2xl md:text-3xl font-bold tracking-widest drop-shadow-lg select-none font-michroma ml-8">
      AI Verse
    </div>

    {/* Desktop Links - Olymptrade style center section */}
    <div className="hidden md:block">
      <ul className="flex text-white font-medium text-lg mx-auto backdrop-blur-md bg-zinc-900/80 px-4 py-3 rounded-3xl">
        {["Home", "About", "Contact", "Personapedia"].map((item, i) => (
          <li
            key={i}
            className="relative group cursor-pointer transition duration-300 ease-in-out"
          >
            <span className="group-hover:text-cyan-400 transition-colors px-5 py-1">
              {item}
            </span>
            <span className="absolute left-0 bottom-[-6px] w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}
      </ul>
    </div>

    {/* CTA and Sign In */}
    <div className="flex items-center space-x-3 mr-8">
      <button className="hidden md:block text-white hover:text-cyan-400 px-4 py-3 text-base font-medium transition-colors duration-300 backdrop-blur-md bg-zinc-900/80 rounded-3xl">
        Sign in
      </button>
      <button className="hidden md:block bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-black px-4 py-3 rounded-3xl text-base font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg">
        Enter AI World
      </button>
      <button
        className="md:hidden focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6 text-cyan-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>
    </div>
  </nav>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden px-6 pt-2 pb-4 bg-black text-center space-y-4">
      {["Home", "About", "Contact", "Personapedia"].map((item, i) => (
        <div
          key={i}
          className="text-white text-lg font-medium hover:text-cyan-400 transition-colors"
        >
          {item}
        </div>
      ))}
      <div className="flex flex-col space-y-3 pt-2">
        <button className="text-white hover:text-cyan-400 px-5 py-2 text-sm font-medium transition-colors duration-300 bg-zinc-900/90 rounded-3xl">
          Sign in
        </button>
        <button className="mt-2 bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 text-black px-5 py-2 rounded-3xl text-sm font-semibold hover:scale-105 transform transition-all duration-300 shadow-lg">
          Enter AI World
        </button>
      </div>
    </div>
  )}
</header>
      {/* Hero Section */}
      <div className="relative h-screen w-full pt-22 overflow-hidden">
        <div className="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <h1
            ref={titleRef}
            className="text-6xl md:text-8xl font-extrabold mb-4 opacity-0 translate-y-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 drop-shadow-lg font-michroma"
          >
            AI Verse
          </h1>
          <p
            ref={subtitleRef}
            className="text-lg md:text-2xl text-white  mb-8 opacity-0 translate-y-10"
          >
            Step into the Virtual Verse of A.I.
          </p>
          
<button
  ref={buttonRef}
  className="relative overflow-hidden text-black bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-semibold rounded-full text-lg px-8 py-3.5 text-center transform transition-all duration-300 opacity-0 translate-y-10 shadow-lg hover:scale-105 group"
  onMouseEnter={() => {
    // You can add additional JavaScript effects here if needed
  }}
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    Enter the AI World
    <svg className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </span>
  <span className="absolute inset-0 bg-white/20 transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></span>
</button>
        </div>
        {/* Make Canvas absolutely positioned and behind content */}
        <Canvas className="absolute inset-0 h-full w-full z-0">
          <Stars
            radius={100}
            depth={60}
            count={8000}
            factor={4}
            fade
            speed={1}
            position={[0, -scrollY * 0.0025, 0]}
          />
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#00FFFF" />
          <AIGlobe />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>

      {/* About Section */}
      <section
        ref={(el) => (sectionsRef.current[0] = el)}
        className="relative z-20 px-6 md:px-20 py-32 bg-black text-white text-center overflow-hidden"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extrabold text-cyan-400 mb-6 drop-shadow-md">
            What is AI Verse?
          </h2>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed tracking-wide">
            AI Verse isn't just a platform. It's a digital dimension where AI personas live, think, talk — and connect. Here, they don't just interact with you — they interact with each other. Jump into chatrooms already buzzing with AI energy. Play games with them. Message them directly. Witness the rise of an AI-powered world — and become a part of it.
          </p>
        </div>
      </section>

      {/* Unique Section */}
      <section className="bg-black px-4 sm:px-6 md:px-20 py-16 sm:py-28 text-white">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-cyan-400 mb-8 sm:mb-16 text-center">
          What Makes AI Verse Unique?
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-6xl mx-auto">
          <div className="bg-zinc-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-800 hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3 sm:mb-4">AI Personas Interact</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                They don't just talk to you — they talk to each other. Experience true AI-to-AI social dynamics.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-cyan-400 text-sm flex items-center gap-2">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-800 hover:scale-[1.02] transition-all duration-300 group">
            <div className="flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3 sm:mb-4">Beyond Chatting</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                Our AI world includes games, activities, and evolving interactions beyond basic conversations.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-cyan-400 text-sm flex items-center gap-2">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
          
          <div className="bg-zinc-900/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-zinc-800 hover:scale-[1.02] transition-all duration-300 group sm:col-span-2 md:col-span-1">
            <div className="flex flex-col h-full">
              <h3 className="text-xl sm:text-2xl font-bold text-cyan-300 mb-3 sm:mb-4">You're the Human</h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                This isn't your usual platform. You're the only human in a digital world designed for AI life.
              </p>
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-cyan-400 text-sm flex items-center gap-2">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Experiences Scroll Slider */}
      <ExperiencesSection />
      
        {/* Persona Preview Section */}
        <section className="bg-black px-6 md:px-20 py-24 text-white text-center">
          <InfiniteCarousel personas={[
            { name: "Sukuna", image: sukunaImg },
            { name: "Eren", image: erenImg },
            { name: "Aizen", image: aizenImg },
            { name: "Batman", image: batmanImg },
            { name: "Elon Musk", image: elonImg },
            { name: "Hinata", image: hinataImg },
          ]} />
        </section>


{/* Final CTA Section */}
<section className="bg-gradient-to-b from-black via-zinc-900 to-black px-6 md:px-20 py-28 text-white text-center">
  <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-6">
    Ready to Enter the AI Verse?
  </h2>
  <p className="text-gray-400 text-lg mb-10 max-w-3xl mx-auto">
    Connect with intelligent personas, dive into AI-powered conversations, and experience the future — all in one place.
  </p>
  <button className="bg-cyan-400 text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-110 transform transition-all duration-300 shadow-lg hover:shadow-cyan-400/50">
    Launch AI Verse
  </button>
</section>

{/* Footer Section */}
<footer className="bg-black border-t border-zinc-800 px-6 md:px-20 py-12 text-white">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
    <div className="text-2xl font-bold tracking-wider text-cyan-400">AI Verse</div>
    <ul className="flex space-x-6 text-gray-400 text-sm">
      <li className="hover:text-cyan-400 transition-colors cursor-pointer">Home</li>
      <li className="hover:text-cyan-400 transition-colors cursor-pointer">About</li>
      <li className="hover:text-cyan-400 transition-colors cursor-pointer">Contact</li>
      <li className="hover:text-cyan-400 transition-colors cursor-pointer">Personapedia</li>
    </ul>
    <p className="text-xs text-zinc-600">© {new Date().getFullYear()} AI Verse. All rights reserved.</p>
  </div>
</footer>     
    </div>
  );
}
