import React from 'react';

const Header = ({ onContactClick, onLoginClick }) => {
  return (
    <header className="border-b border-neutral-100/50 backdrop-blur-md bg-white/70 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center text-white">
              <svg data-lucide="cpu" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                <span className="font-medium tracking-tight text-lg text-neutral-900">Best Lab</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-600 font-medium">
            <button onClick={onContactClick} className="hover:text-neutral-900 transition-colors">Contact</button>
            <button onClick={onLoginClick} className="inline-flex items-center gap-2 hover:bg-neutral-800 transition-all text-white bg-neutral-900 rounded-full py-2 px-4 shadow-lg shadow-neutral-500/10 hover:shadow-neutral-500/20">
              <span className="font-medium">Log In</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-neutral-600">
            <svg data-lucide="menu" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
