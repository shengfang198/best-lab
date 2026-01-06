import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ContactModal from "../components/ContactModal";
import LoginModal from "../components/LoginModal";
import SignupModal from "../components/SignupModal";

const Landing = ({ onLoginSuccess }) => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  useEffect(() => {
    // Initialize Lucide icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
          behavior: "smooth",
        });
      });
    });

    // Tab Switching Logic
    window.openTab = function (tabName) {
      const allContent = document.querySelectorAll(".tab-content");
      allContent.forEach((content) => {
        content.classList.remove("active");
      });

      const selectedContent = document.getElementById("content-" + tabName);
      if (selectedContent) {
        selectedContent.classList.add("active");
      }

      const allButtons = document.querySelectorAll(".tab-btn");
      allButtons.forEach((btn) => {
        btn.classList.remove(
          "bg-neutral-50",
          "border-neutral-200",
          "shadow-sm",
          "ring-1",
          "ring-neutral-200/50"
        );
        btn.classList.add(
          "border-transparent",
          "hover:bg-neutral-50",
          "hover:border-neutral-100"
        );
      });

      const activeButton = document.getElementById("btn-" + tabName);
      if (activeButton) {
        activeButton.classList.remove(
          "border-transparent",
          "hover:bg-neutral-50",
          "hover:border-neutral-100"
        );
        activeButton.classList.add(
          "bg-neutral-50",
          "border-neutral-200",
          "shadow-sm",
          "ring-1",
          "ring-neutral-200/50"
        );
      }
    };

    // Scroll Reveal Observer
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach((element) => {
      observer.observe(element);
    });
  }, []);

  return (
    <div className="antialiased bg-white text-neutral-900 selection:bg-indigo-100 selection:text-indigo-900 relative">


      <Header onContactClick={openContactModal} onLoginClick={openLoginModal} />

      <main>
        {/* HERO SECTION */}
        <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Copy */}
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur border border-neutral-200 text-xs font-medium text-neutral-600 mb-8 animate-fade-in-up shadow-sm">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  System online and ready
                </div>

                <h1 className="text-5xl lg:text-[68px] leading-[1.05] font-medium tracking-tighter text-neutral-900 mb-6">
                  Welcome
                </h1>

                <p className="text-lg text-neutral-600 mb-8 leading-relaxed max-w-lg">
                  Welcome to Best Lab, where innovation meets excellence.
                  We're here to help you build amazing things and achieve your goals.
                </p>

                <div className="text-sm text-neutral-500 space-y-2">
                  <p>✓ Fast and reliable service</p>
                  <p>✓ Expert team support</p>
                  <p>✓ Cutting-edge technology</p>
                </div>

              </div>


            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-white border-t border-neutral-200 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="max-w-xs">
              <a href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-neutral-900 rounded-full flex items-center justify-center text-white">
                  <svg
                    data-lucide="cpu"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                    <rect width="6" height="6" x="9" y="9" rx="1"></rect>
                    <path d="M15 2v2"></path>
                    <path d="M15 20v2"></path>
                    <path d="M2 15h2"></path>
                    <path d="M2 9h2"></path>
                    <path d="M20 15h2"></path>
                    <path d="M20 9h2"></path>
                    <path d="M9 2v2"></path>
                    <path d="M9 20v2"></path>
                  </svg>
                </div>
                <span className="font-medium tracking-tight text-lg text-neutral-900">
                  Best Lab
                </span>
              </a>
              <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                Welcome to a place where innovation begins. We're excited to have you here.
              </p>
              <div className="flex items-center gap-2 text-sm text-neutral-900 font-medium">
                <svg
                  data-lucide="map-pin"
                  className="w-4 h-4 text-neutral-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                Global
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-100 text-center md:text-left text-sm text-neutral-400">
            © 2025 Best Lab. All rights reserved.
          </div>
        </footer>
      </main>

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} onSignupClick={openSignupModal} onLoginSuccess={onLoginSuccess} />
      <SignupModal isOpen={isSignupModalOpen} onClose={closeSignupModal} onLoginClick={openLoginModal} />

      {/* Add custom styles */}
      <style jsx>{`
        .shiny-cta {
          --gradient-angle: 0deg;
          --gradient-angle-offset: 0deg;
          --gradient-percent: 20%;
          --gradient-shine: #818cf8;
          --shadow-size: 2px;
          position: relative;
          overflow: hidden;
          border-radius: 9999px;
          padding: 0.875rem 2rem;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 500;
          color: #ffffff;
          background: linear-gradient(#171717, #171717) padding-box,
            conic-gradient(
                from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
                transparent 0%,
                #312e81 5%,
                var(--gradient-shine) 15%,
                #312e81 30%,
                transparent 40%,
                transparent 100%
              )
              border-box;
          border: 2px solid transparent;
          box-shadow: inset 0 0 0 1px #1a1818,
            0 10px 25px -5px rgba(79, 70, 229, 0.3);
          outline: none;
          transition: --gradient-angle-offset 800ms
              cubic-bezier(0.25, 1, 0.5, 1),
            --gradient-percent 800ms cubic-bezier(0.25, 1, 0.5, 1),
            --gradient-shine 800ms cubic-bezier(0.25, 1, 0.5, 1),
            box-shadow 0.3s, transform 0.2s;
          cursor: pointer;
          isolation: isolate;
          outline-offset: 4px;
          font-family: "Geist", sans-serif;
          z-index: 0;
          animation: border-spin 1.5s linear infinite;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        @keyframes border-spin {
          to {
            --gradient-angle: 360deg;
          }
        }

        .shiny-cta:active {
          transform: translateY(1px) scale(0.98);
        }

        .shiny-cta:hover {
          box-shadow: inset 0 0 0 1px #1a1818,
            0 15px 30px -5px rgba(79, 70, 229, 0.4);
        }

        .shiny-cta::before {
          content: "";
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 0;
          --size: calc(100% - 6px);
          --position: 2px;
          --space: 4px;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
              circle at var(--position) var(--position),
              white 0.5px,
              transparent 0
            )
            padding-box;
          background-size: var(--space) var(--space);
          background-repeat: space;
          mask-image: conic-gradient(
            from calc(var(--gradient-angle) + 45deg),
            black,
            transparent 10% 90%,
            black
          );
          border-radius: inherit;
          opacity: 0.4;
          pointer-events: none;
        }

        .shiny-cta::after {
          content: "";
          pointer-events: none;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          width: 100%;
          aspect-ratio: 1;
          background: linear-gradient(
            -50deg,
            transparent,
            #4338ca,
            transparent
          );
          mask-image: radial-gradient(circle at bottom, transparent 40%, black);
          opacity: 0.6;
          animation: shimmer 4s linear infinite;
          animation-play-state: running;
        }

        .shiny-cta span {
          position: relative;
          z-index: 2;
          display: inline-block;
        }

        .shiny-cta i {
          position: relative;
          z-index: 2;
        }

        @keyframes shimmer {
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        /* Fade-in animations */
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
        .delay-2000 {
          animation-delay: 2000ms;
        }
        .delay-2500 {
          animation-delay: 2500ms;
        }
        .delay-3000 {
          animation-delay: 3000ms;
        }

        /* Scroll reveal animation */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1),
            transform 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          will-change: opacity, transform;
        }

        .reveal-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Infinite marquee slider */
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 60s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }

        /* Tab content transitions */
        .tab-content {
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
          display: none;
        }

        .tab-content.active {
          opacity: 1;
          display: block;
        }

        /* Floating animation for particles */
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) rotate(240deg);
          }
        }

        .animate-float {
          animation: float 20s ease-in-out infinite;
        }

        /* Fluid hover interactions for particles */
        .floating-particle, .floating-orb {
          transition: all 0.8s cubic-bezier(0.25, 1, 0.5, 1);
          cursor: pointer;
        }

        .floating-particle:hover {
          transform: scale(1.5) translateY(-10px);
          opacity: 0.9;
          filter: brightness(1.2);
        }

        .floating-orb:hover {
          transform: scale(1.1) translateY(-15px) rotate(45deg);
          opacity: 0.95;
          filter: brightness(1.3) blur(0px);
        }

        .floating-orb:hover {
          filter: blur(0px) brightness(1.3);
        }
      `}</style>
    </div>
  );
};

export default Landing;
