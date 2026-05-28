/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Ship, Truck, Plane, Phone, Menu, X, Anchor, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
}

export default function Navbar({ onNavigate, activeSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Capabilities', target: 'capabilities' },
    { label: 'Freight Calculator', target: 'calculator' },
    { label: 'Live Tracking', target: 'tracking' },
    { label: 'Corporate Hubs', target: 'hubs' },
    { label: 'Book Freight', target: 'booking' }
  ];

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setIsOpen(false);
  };

  return (
    <nav 
      id="afa-corporate-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-marine-950/95 backdrop-blur-md shadow-lg border-b border-marine-800/50 py-3' 
          : 'bg-gradient-to-b from-marine-950/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-reef-600 text-white shadow-md transition-transform group-hover:scale-105">
              <Anchor className="w-5 h-5" />
              <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full">
                <span className="block w-2 h-0.5 bg-white rounded-full"></span>
              </div>
            </div>
            <div>
              <div className="leading-tight">
                <span className="font-display font-bold text-white text-lg tracking-wider block">
                  AUSTRALIAN
                </span>
                <span className="font-sans font-medium text-xs tracking-widest text-reef-400 block -mt-1 uppercase">
                  Freight Agency
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-1 border-r border-marine-800 pr-6 mr-2 text-xs text-stone-300">
              <ShieldCheck className="w-4 h-4 text-reef-400 mr-1" />
              <span className="font-mono tracking-wider">NHVR ACCREDITED</span>
            </div>

            {navItems.map((item) => (
              <button
                key={item.target}
                onClick={() => handleNavClick(item.target)}
                className={`font-display text-sm tracking-wide transition-colors ${
                  activeSection === item.target 
                    ? 'text-reef-400 font-semibold' 
                    : 'text-stone-200 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <a 
              href="tel:1300000AFA" 
              className="flex items-center space-x-2 text-stone-300 hover:text-white transition-colors text-sm"
            >
              <div className="p-2 bg-marine-800/50 rounded-full border border-marine-700/30">
                <Phone className="w-3.5 h-3.5 text-reef-400" />
              </div>
              <div className="text-left leading-none">
                <span className="text-[10px] block font-mono text-stone-400">HOTLINE</span>
                <span className="font-semibold text-xs tracking-wider">1300 FREIGHT</span>
              </div>
            </a>
            
            <button
              onClick={() => handleNavClick('calculator')}
              className="px-4 py-2 bg-reef-600 hover:bg-reef-500 text-white font-display font-medium text-xs tracking-wider uppercase rounded-md transition-all shadow-md shadow-reef-600/25"
            >
              Instant Quote
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <a href="tel:1300000AFA" className="text-stone-300 p-2">
              <Phone className="w-5 h-5 text-reef-400" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-stone-300 hover:text-white hover:bg-marine-800/50 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`lg:hidden transition-all duration-350 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100 py-4 bg-marine-950 border-t border-marine-800/80 shadow-2xl' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-5 pt-2 pb-4 space-y-3">
          <div className="flex items-center space-x-2 pb-3 mb-2 border-b border-marine-800">
            <ShieldCheck className="w-4 h-4 text-reef-400" />
            <span className="text-xs font-mono tracking-wider text-stone-300">NHVR CERTIFIED CARRIER</span>
          </div>

          {navItems.map((item) => (
            <button
              key={item.target}
              onClick={() => handleNavClick(item.target)}
              className={`block w-full text-left px-3 py-2 rounded-md font-display text-base tracking-wide ${
                activeSection === item.target 
                  ? 'bg-reef-600/10 text-reef-400 font-semibold' 
                  : 'text-stone-300 hover:bg-marine-800/30 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-marine-800/50">
            <button
              onClick={() => handleNavClick('calculator')}
              className="w-full py-3 bg-reef-600 hover:bg-reef-500 text-white font-display text-center font-semibold text-sm tracking-wider uppercase rounded-md shadow-md"
            >
              Launch Quote Generator
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
