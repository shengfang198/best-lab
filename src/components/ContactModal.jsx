import React from 'react';

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-neutral-800/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl max-w-sm w-full mx-4 p-8 animate-fade-in-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <p className="text-white/80 text-sm mb-2">Get in touch</p>
          </div>

          <a
            href="mailto:konichiwa@gmail.com"
            className="inline-block bg-white/20 hover:bg-white/30 border border-white/30 rounded-full px-6 py-3 text-white font-medium transition-all duration-500 ease-out hover:scale-105 hover:shadow-lg"
          >
            konichiwa@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
