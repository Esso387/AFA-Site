/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Truck, MapPin, Building2, Phone, Clock, Mail, ShieldAlert, Zap, Globe, Ship, Plane, Sparkles, AlertCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import HeroVideo from './components/HeroVideo';
import ServicesGrid from './components/ServicesGrid';
import FreightCalculator from './components/FreightCalculator';
import TrackingSection from './components/TrackingSection';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import { AUSTRALIAN_HUBS } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [searchedTrackingId, setSearchedTrackingId] = useState('');

  // Ticker operations values
  const tickerItems = [
    { label: 'PORT BOTANY (SYD)', status: 'NORMAL FLOW', color: 'text-emerald-400' },
    { label: 'PORT OF MELBOURNE', status: 'CRANE STABILITY 99.1%', color: 'text-emerald-400' },
    { label: 'HUME HIGHWAY DUPLEX', status: 'LINEHAUL CLEAR', color: 'text-emerald-400' },
    { label: 'FREMANTLE TERMINAL', status: 'BIO-SECURITY HIGH SPEED', color: 'text-emerald-400' },
    { label: 'PORT OF BRISBANE', status: 'CUSTOMS QUEUE: 14 MINS', color: 'text-yellow-400' },
    { label: 'NT ROAD TRAINS STATUS', status: 'OVERSIZE ACCESS OPEN', color: 'text-emerald-400' }
  ];

  const handleNavigation = (sectionId: string) => {
    setActiveSection(sectionId);
    
    // Smooth scroll
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchTracking = (trackingId: string) => {
    setSearchedTrackingId(trackingId);
    setActiveSection('tracking');
    
    // Scroll down to tracker
    const element = document.getElementById('tracking');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="min-h-screen bg-coastal-sand flex flex-col antialiased">
      
      {/* 1. Header Navigation */}
      <Navbar onNavigate={handleNavigation} activeSection={activeSection} />

      {/* 2. Urgent Live Logistical Route Ticker Banner */}
      <div className="bg-marine-950 border-b border-marine-900 text-[10px] sm:text-xs font-mono text-stone-250 py-2.5 z-40 fixed top-[64px] sm:top-[74px] left-0 right-0 overflow-hidden shadow-md">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 shrink-0 border-r border-marine-800 pr-3 mr-3 text-reef-400">
            <Zap className="w-3.5 h-3.5 mr-1 text-reef-400 animate-pulse" />
            <span className="font-extrabold tracking-wider uppercase">ROUTE METRIC FEED STATUS:</span>
          </div>

          {/* Marquee Content */}
          <div className="flex-1 flex gap-x-8 items-center overflow-x-auto whitespace-nowrap scrollbar-none no-scrollbar">
            {tickerItems.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-1 shrink-0">
                <span className="text-stone-300 font-bold block">{item.label}</span>
                <span className="block italic text-stone-500">→</span>
                <span className={`font-semibold block ${item.color}`}>{item.status}</span>
              </div>
            ))}
          </div>

          <div className="hidden md:flex items-center font-bold tracking-widest pl-3 ml-3 border-l border-marine-800 text-[9px] text-stone-400 select-none uppercase">
            SYSTEM TELEMETRY: AUTO-ONLINE
          </div>
        </div>
      </div>

      {/* Spacer to cater for both absolute fixed header + news alert banner heights */}
      <div className="h-[96px] sm:h-[105px] bg-marine-950" />

      {/* 3. Moving Hero Header (Sea, Road, Air Background Stream) */}
      <div id="hero">
        <HeroVideo onNavigate={handleNavigation} onSearchTrack={handleSearchTracking} />
      </div>

      {/* 4. Logistical Capabilities & Specifications Segment */}
      <ServicesGrid />

      {/* 5. Pricing, Dimensions & Carbon Estimate Tool */}
      <FreightCalculator />

      {/* 6. Dynamic Track, Trace & Checkpoint Map Timelines */}
      <TrackingSection searchedTrackingId={searchedTrackingId} />

      {/* 7. Corporate Hubs & Operational Base Directory Section */}
      <section id="hubs" className="py-20 bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section title */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-reef-600 tracking-widest uppercase block mb-1">
              National Infrastructure Grid
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-marine-900 tracking-tight">
              Corporate Operations Directory
            </h2>
            <div className="w-16 h-1 bg-reef-600 mx-auto mt-4 rounded-full" />
            <p className="text-stone-600 mt-5">
              AFA maintains physical customs-clearance offices and heavy-haul driver hubs located directly adjoining primary ports of call.
            </p>
          </div>

          {/* Hubs Bento Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {AUSTRALIAN_HUBS.map((hub) => (
              <div 
                key={hub.code}
                className="bg-coastal-sand/50 hover:bg-white border border-stone-200 rounded-xl p-6 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2.5 bg-marine-900 text-white rounded-lg">
                    <Building2 className="w-5 h-5 text-reef-400" />
                  </div>
                  <span className="text-lg font-mono font-bold text-stone-400 group-hover:text-reef-600 transition-colors">
                    {hub.code} Base
                  </span>
                </div>

                <h3 className="text-lg font-bold text-marine-900 font-display">
                  {hub.name}
                </h3>
                
                <p className="text-xs text-stone-500 mt-1 mb-4 font-mono uppercase tracking-wider">
                  State Administration: {hub.state}
                </p>

                <div className="space-y-2 border-t border-stone-150 pt-4 text-xs font-mono">
                  <div className="flex items-center space-x-2 text-stone-600">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                    <a href={`tel:${hub.phone.replace(/\s+/g, '')}`} className="hover:text-reef-600 underline">
                      {hub.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-stone-600">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>Business Hours: 07:30 - 18:00 (Mon-Sat)</span>
                  </div>

                  <div className="flex items-center space-x-2 text-stone-600">
                    <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                    <span>ops.{hub.code.toLowerCase()}@australianfreight.com.au</span>
                  </div>
                </div>

                {/* Simulated live status metric */}
                <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span className="flex items-center text-emerald-600">
                    <span className="inline-block w-2 h-2 bg-emerald-500 rounded-full mr-1.5" />
                    OFFICE OPEN & NORMAL
                  </span>
                  
                  <span className="text-stone-400">
                    ACCREDITED
                  </span>
                </div>

              </div>
            ))}

            {/* Quick Consultation Promo Box inside Bento Grid */}
            <div className="bg-marine-900 text-white rounded-xl p-8 flex flex-col justify-between relative overflow-hidden lg:col-span-1 border border-marine-800">
              <div className="absolute top-0 right-0 w-32 h-32 bg-reef-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-reef-400 font-mono text-xs uppercase tracking-widest">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  <span>Custom Engineering</span>
                </div>
                
                <h3 className="text-xl font-bold font-display leading-tight">
                  Require Project Logistics consultation?
                </h3>
                
                <p className="text-xs text-stone-300 leading-relaxed">
                  Connect directly with our senior customs brokers and heavy vehicle pilots to clear overdimensional, radioactive, or military payload specifications.
                </p>
              </div>

              <div className="pt-6">
                <div className="flex flex-col gap-2">
                  <a 
                    href="tel:1300000AFA"
                    className="w-full py-2.5 bg-reef-605/10 hover:bg-reef-600 text-reef-450 hover:text-white border border-reef-500/40 font-display text-center text-xs font-semibold uppercase tracking-wider rounded transition-all"
                  >
                    Operations Hotline
                  </a>
                  <button 
                    onClick={() => handleNavigation('booking')}
                    className="w-full py-2.5 bg-reef-600 hover:bg-reef-500 text-white font-display text-center text-xs font-semibold uppercase tracking-wider rounded transition-all shadow shadow-reef-600/10"
                  >
                    Open Quote Manifest Terminals
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 8. Booking Form (Manifest document outcomes) */}
      <BookingForm onQuoteRequested={handleSearchTracking} />

      {/* 9. Corporate Footer */}
      <Footer onNavigate={handleNavigation} />

    </div>
  );
}
