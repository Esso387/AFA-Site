/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Ship, Truck, Plane, Search, ChevronRight, Play, Pause, AlertCircle, RefreshCw } from 'lucide-react';
import { FreightMode } from '../types';
import { HERO_VIDEOS } from '../data';

interface HeroVideoProps {
  onNavigate: (section: string) => void;
  onSearchTrack: (code: string) => void;
}

export default function HeroVideo({ onNavigate, onSearchTrack }: HeroVideoProps) {
  const [currentMode, setCurrentMode] = useState<FreightMode>('LAND');
  const [isPlaying, setIsPlaying] = useState(true);
  const [trackNumber, setTrackNumber] = useState('');
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Restart video playback when source changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setHasError(false);
            setIsPlaying(true);
          })
          .catch((err) => {
            console.log('Video play failed or interrupted, showing beautiful image fallback. Details:', err);
            // Non-blocking fallback is handled seamlessly
            setIsPlaying(false);
          });
      }
    }
  }, [currentMode]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  };

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackNumber.trim()) {
      onSearchTrack(trackNumber.trim());
    }
  };

  const currentContent = HERO_VIDEOS[currentMode];

  return (
    <div className="relative w-full min-h-screen bg-marine-950 flex flex-col justify-center overflow-hidden">
      
      {/* Background Media Container */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Dark Ambient Overlay Blend */}
        <div className="absolute inset-0 bg-gradient-to-r from-marine-950/95 via-marine-950/85 to-marine-950/70 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-marine-950 via-transparent to-marine-950/30 z-10" />
        
        {/* Live Video Element */}
        <video
          ref={videoRef}
          key={currentMode}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            isPlaying ? 'opacity-40' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          onError={() => setHasError(true)}
        >
          <source src={currentContent.videoUrl} type="video/mp4" />
        </video>

        {/* Dynamic Static Backdrop (Always loaded underneath as a crisp fallback) */}
        <img
          src={currentContent.fallbackImg}
          alt={currentContent.title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            isPlaying ? 'opacity-20' : 'opacity-40'
          }`}
        />
      </div>

      {/* Main Hero Messaging Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-12 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading & Mode Selectors */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center space-x-2 bg-marine-800/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-marine-700/50">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-reef-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-reef-500"></span>
              </span>
              <span className="font-mono text-xs font-semibold tracking-wider text-stone-200">
                AFA ACCREDITED CARRIER DIRECTORY
              </span>
            </div>

            {/* Main Punchy Logistical Slogan */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              We Move Australia. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-reef-400 via-sky-300 to-sky-100">
                Precisely. Efficiently.
              </span>
            </h1>

            <p className="text-lg text-stone-300 max-w-2xl leading-relaxed">
              Serving the Australian mining, maritime, agricultural, and retail sectors. 
              {` ${currentContent.subtitle}`}
            </p>

            {/* Quick Fleet Tabs to Control the Moving Video Stream! */}
            <div className="pt-2">
              <p className="text-xs font-mono text-stone-400 uppercase tracking-widest mb-3">
                Select Fleet Operation Mode to View Feed:
              </p>
              
              <div className="flex flex-wrap gap-2">
                {[
                  { mode: 'LAND', label: 'Overland Trucking', icon: Truck },
                  { mode: 'SEA', label: 'Maritime Logistics', icon: Ship },
                  { mode: 'AIR', label: 'Global Air Cargo', icon: Plane }
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = currentMode === tab.mode;
                  return (
                    <button
                      key={tab.mode}
                      onClick={() => setCurrentMode(tab.mode as FreightMode)}
                      className={`flex items-center space-x-2 px-5 py-3 rounded-lg border transition-all duration-300 text-sm font-display font-medium ${
                        isActive
                          ? 'bg-reef-600/20 border-reef-500 text-white shadow-md shadow-reef-600/10'
                          : 'bg-marine-900/40 border-marine-800 text-stone-400 hover:border-marine-700 hover:text-stone-200'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-reef-400 animate-pulse' : 'text-stone-400'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controller Controls */}
            <div className="flex items-center space-x-4 pt-1">
              <button 
                onClick={togglePlay}
                className="flex items-center space-x-1.5 text-xs text-stone-400 hover:text-white transition-colors py-1 px-2.5 rounded bg-marine-900/60 border border-marine-800/80"
                title={isPlaying ? "Pause background feed" : "Play background feed"}
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-reef-400" />
                    <span className="font-mono">PAUSE FEED</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-yellow-500" />
                    <span className="font-mono">PLAY LIVE FEED</span>
                  </>
                )}
              </button>
              
              <span className="text-[11px] font-mono text-stone-500">
                {isPlaying ? '● REAL-TIME LOGISTICAL STREAM' : '○ STATIC PRESET HOVERED'}
              </span>
            </div>

          </div>

          {/* Right Column: Mini Console Tracker & Quick Action Card */}
          <div className="lg:col-span-5">
            <div className="bg-marine-900/90 backdrop-blur-xl border border-marine-800 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-reef-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono text-reef-400 tracking-widest uppercase block mb-1">
                    Control Center
                  </span>
                  <h3 className="text-xl font-display font-bold text-white">
                    Track & Trace Shipment
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Check the journey of B-doubles or container vessels live.
                  </p>
                </div>

                {/* Tracking Query Form */}
                <form onSubmit={handleTrackSubmit} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-marine-950/80 border border-marine-800 text-white rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-reef-500 font-mono focus:ring-1 focus:ring-reef-500 placeholder:text-stone-500 transition-all uppercase"
                      placeholder="e.g. AFA-AUS-2026M"
                      value={trackNumber}
                      onChange={(e) => setTrackNumber(e.target.value)}
                    />
                    <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-3.5" />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full py-3 bg-reef-600 hover:bg-reef-500 text-white font-display text-xs tracking-wider uppercase font-semibold rounded-lg shadow-lg shadow-reef-600/20 transition-all flex items-center justify-center space-x-2"
                  >
                    <span>Fetch Live Telemetry</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Preloaded Demo Shortcuts for quick test */}
                <div className="p-3.5 bg-marine-950/60 rounded-lg border border-marine-800/80 text-left space-y-2">
                  <span className="text-[10px] font-mono text-stone-400 block tracking-wider uppercase">
                    Test Demo Consignments (Click to Quick-Load):
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <button
                      onClick={() => onSearchTrack('AFA-AUS-2026M')}
                      className="text-xs text-left hover:text-reef-400 text-stone-300 font-mono flex items-center justify-between group"
                    >
                      <span className="underline decoration-dotted">AFA-AUS-2026M</span>
                      <span className="text-[10px] text-stone-500 group-hover:text-reef-400">Road Linehaul (MEL → SYD)</span>
                    </button>
                    <button
                      onClick={() => onSearchTrack('AFA-PAC-777S')}
                      className="text-xs text-left hover:text-reef-400 text-stone-300 font-mono flex items-center justify-between group"
                    >
                      <span className="underline decoration-dotted">AFA-PAC-777S</span>
                      <span className="text-[10px] text-stone-500 group-hover:text-reef-400">Air Express (SYD → PER)</span>
                    </button>
                    <button
                      onClick={() => onSearchTrack('AFA-SEA-500F')}
                      className="text-xs text-left hover:text-reef-400 text-stone-300 font-mono flex items-center justify-between group"
                    >
                      <span className="underline decoration-dotted">AFA-SEA-500F</span>
                      <span className="text-[10px] text-stone-500 group-hover:text-reef-400">Sea Marine (SIN → BNE)</span>
                    </button>
                  </div>
                </div>

                <div className="border-t border-marine-800 pt-5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] block font-mono text-stone-400">ESTIMATING SIZES?</span>
                    <button
                      onClick={() => onNavigate('calculator')}
                      className="text-xs font-semibold text-reef-400 hover:text-reef-300 underline font-display block"
                    >
                      Cargo Weight Calculator
                    </button>
                  </div>
                  
                  <button
                    onClick={() => onNavigate('booking')}
                    className="px-4 py-2 bg-marine-800 hover:bg-marine-700 text-stone-100 rounded-md border border-marine-700 text-xs font-medium font-display transition-all"
                  >
                    Custom Quote Form
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Overlapping Bento Metric Cards Band */}
      <div className="relative z-30 bg-marine-900 border-y border-marine-800/80 -mt-1 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="border-r border-marine-800/60 last:border-none pr-2">
              <span className="block text-3xl sm:text-4xl font-extrabold text-white font-display">
                99.8%
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest block mt-1">
                ON-TIME ARRIVALS
              </span>
            </div>

            <div className="border-r border-marine-800/60 md:border-r last:border-none pr-2">
              <span className="block text-3xl sm:text-4xl font-extrabold text-reef-400 font-display">
                100%
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest block mt-1">
                AUSTRALIAN OWNED
              </span>
            </div>

            <div className="border-r border-marine-800/60 last:border-none pr-2">
              <span className="block text-3xl sm:text-4xl font-extrabold text-white font-display">
                47,000+
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest block mt-1">
                LOADS DISPATCHED
              </span>
            </div>

            <div className="last:border-none">
              <span className="block text-3xl sm:text-4xl font-extrabold text-reef-400 font-display">
                24/7
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-stone-400 uppercase tracking-widest block mt-1">
                INTELLIGENT MONITORING
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
