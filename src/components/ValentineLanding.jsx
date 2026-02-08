import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Volume2, VolumeX, Heart } from 'lucide-react';
import './ValentineLanding.css';

gsap.registerPlugin(ScrollTrigger);

const valentineDays = [
  {
    day: "Rose Day",
    icon: "🌹",
    title: "The Beginning",
    text: "Like a rose unfolding, my love for you grows more beautiful with every passing moment.",
    color: "#ff2d55"
  },
  {
    day: "Propose Day",
    icon: "💍",
    title: "The Question",
    text: "I don't need a thousand lifetimes. I just need one, as long as it's with you.",
    color: "#ffd700"
  },
  {
    day: "Chocolate Day",
    icon: "🍫",
    title: "The Sweetness",
    text: "Life was plain before you. Now, every day tastes like the sweetest indulgence.",
    color: "#8b4513"
  },
  {
    day: "Teddy Day",
    icon: "🧸",
    title: "The Comfort",
    text: "Your hugs are my safe haven. In your arms, the world feels soft and kind.",
    color: "#cd853f"
  },
  {
    day: "Promise Day",
    icon: "🤞",
    title: "The Vow",
    text: "I promise to be your calm in the storm, your laughter in the rain, and your forever.",
    color: "#4169e1"
  },
  {
    day: "Hug Day",
    icon: "🤗",
    title: "The Warmth",
    text: "Words fail me properly, but my arms never will. You fit perfectly right here.",
    color: "#ffa500"
  },
  {
    day: "Kiss Day",
    icon: "💋",
    title: "The Passion",
    text: "A single touch from you sets my soul on fire. You are my every desire.",
    color: "#ff1493"
  },
  {
    day: "Valentine's Day",
    icon: "❤️",
    title: "The Forever",
    text: "You are my today and all of my tomorrows. I love you, endlessly.",
    color: "#ff0000"
  }
];

export const ValentineLanding = () => {
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      mouseMultiplier: 1,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Hero Animations
    const tl = gsap.timeline();
    tl.to('.hero-text-1', {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 0.5
    })
      .to('.hero-text-2', {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, "-=1");

    // Floating particles/stars background
    gsap.to('.star-bg', {
      y: -100,
      duration: 20,
      repeat: -1,
      ease: 'none'
    });

    // Day Sections Animation
    const sections = document.querySelectorAll('.day-section');
    sections.forEach((section, index) => {
      const content = section.querySelector('.day-content');
      const icon = section.querySelector('.day-icon');

      gsap.fromTo(section,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(content,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          }
        }
      );

      gsap.fromTo(icon,
        { scale: 0, rotation: -180 },
        {
          scale: 1,
          rotation: 0,
          duration: 2,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          }
        }
      );
    });

    // Final Confession Animation
    gsap.fromTo('.final-text',
      { scale: 0.5, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: '.final-section',
          start: "center 70%",
        }
      }
    );

    // Footer Animation
    gsap.fromTo('.footer-brand',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 0.7,
        duration: 1,
        scrollTrigger: {
          trigger: '.valentine-footer',
          start: "top 90%",
        }
      }
    );

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      if (isMuted) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  return (
    <div className="valentine-landing">
      <div className="noise-overlay"></div>

      {/* Audio Control */}
      <button
        className="audio-control"
        onClick={toggleMute}
        aria-label="Toggle music"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <audio ref={audioRef} loop autoPlay>
        <source src="/Romantic Theme.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="star-bg"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.7
              }}
            />
          ))}
        </div>

        <div className="hero-content">
          <h1 className="hero-text-1">My Dearest...</h1>
          <h2 className="hero-text-2">
            A journey through my heart <Heart className="inline-heart" fill="currentColor" />
          </h2>
        </div>
        <div className="scroll-indicator">
          <span>Scroll to begin</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* Valentine Week Sections */}
      <div className="days-container">
        {valentineDays.map((item, index) => (
          <section key={index} className={`day-section day-${index}`}>
            <div className="day-content">
              <span className="day-label">{item.day}</span>
              <div className="day-icon">{item.icon}</div>
              <h3 className="day-title">{item.title}</h3>
              <p className="day-text">{item.text}</p>
            </div>
          </section>
        ))}
      </div>

      {/* Final Confession */}
      <section className="final-section">
        <div className="confession-content">
          <h1 className="final-text">I Love You.</h1>
          <p className="final-subtext">Always & Forever</p>
        </div>

        <footer className="valentine-footer">
          <p className="footer-brand">HPS Labs</p>
        </footer>
      </section>
    </div>
  );
};

export default ValentineLanding;
