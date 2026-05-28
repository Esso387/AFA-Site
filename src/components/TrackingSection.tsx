/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Calendar, CheckSquare, Compass, ShieldAlert, Truck, Ship, Plane, Layers, AlertCircle } from 'lucide-react';
import { TrackingData } from '../types';
import { PRELOADED_TRACKING } from '../data';

interface TrackingSectionProps {
  searchedTrackingId: string;
}

export default function TrackingSection({ searchedTrackingId }: TrackingSectionProps) {
  const [queryId, setQueryId] = useState('');
  const [activeTracking, setActiveTracking] = useState<TrackingData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorText, setErrorText] = useState('');

  // Handle high-level triggers from the search bar in HeroVideo
  useEffect(() => {
    if (searchedTrackingId) {
      setQueryId(searchedTrackingId);
      triggerLookup(searchedTrackingId);
    } else {
      // Default to loading Melbourne-Sydney test flow on section initiation so it looks filled and responsive
      triggerLookup('AFA-AUS-2026M');
    }
  }, [searchedTrackingId]);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerLookup(queryId.trim());
  };

  const triggerLookup = (code: string) => {
    setHasSearched(true);
    const normalizedCode = code.toUpperCase();
    
    if (!normalizedCode) {
      setActiveTracking(null);
      setErrorText('Please enter a consignment key to authenticate.');
      return;
    }

    if (PRELOADED_TRACKING[normalizedCode]) {
      setActiveTracking(PRELOADED_TRACKING[normalizedCode]);
      setErrorText('');
    } else {
      setActiveTracking(null);
      setErrorText(`No active manifest matching "${normalizedCode}" is currently routed in our systems. Try searching one of the test shortcuts below.`);
    }
  };

  const getModeIcon = (mode: string) => {
    switch (mode) {
      case 'AIR': return <Plane className="w-5 h-5 text-sky-400" />;
      case 'SEA': return <Ship className="w-5 h-5 text-teal-400" />;
      default: return <Truck className="w-5 h-5 text-yellow-400" />;
    }
  };

  return (
    <section id="tracking" className="py-20 bg-marine-950 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-marine-900/60 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono text-reef-400 tracking-widest uppercase block mb-2">
            Sat-Com Hub Coordinates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Live Consignment Telemetry
          </h2>
          <div className="w-16 h-1 bg-reef-500 mx-auto mt-4 rounded-full" />
          <p className="text-stone-400 mt-5 leading-relaxed">
            Verify B-double truck transponder coordinates, sea vessel ocean coordinates, and air freight manifest stamps dynamically synchronized in real-time.
          </p>
        </div>

        {/* Input Control Area */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleLookupSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                className="w-full bg-marine-900/80 border border-marine-850 text-white rounded-lg pl-11 pr-4 py-3.5 text-sm font-mono focus:outline-none focus:border-reef-400 focus:ring-1 focus:ring-reef-400 uppercase placeholder:text-stone-500"
                placeholder="PRO-ROUTING-ID (e.g. AFA-AUS-2026M)"
                value={queryId}
                onChange={(e) => setQueryId(e.target.value)}
              />
              <Compass className="w-4.5 h-4.5 text-stone-500 absolute left-3.5 top-4 cursor-pointer" />
            </div>
            
            <button
              type="submit"
              className="py-3.5 px-6 bg-reef-600 hover:bg-reef-500 text-white font-display text-xs font-bold tracking-wider uppercase rounded-lg transition-all flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-reef-600/10"
            >
              <Search className="w-4 h-4" />
              <span>Locate Manifest</span>
            </button>
          </form>

          {/* Quick Shortcuts */}
          <div className="mt-3.5 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-stone-400">
            <span>Capital Hub Presets:</span>
            <button onClick={() => { setQueryId('AFA-AUS-2026M'); triggerLookup('AFA-AUS-2026M'); }} className="underline hover:text-white decoration-amber-500">
              AFA-AUS-2026M Road
            </button>
            <button onClick={() => { setQueryId('AFA-PAC-777S'); triggerLookup('AFA-PAC-777S'); }} className="underline hover:text-white decoration-sky-400">
              AFA-PAC-777S Air
            </button>
            <button onClick={() => { setQueryId('AFA-SEA-500F'); triggerLookup('AFA-SEA-500F'); }} className="underline hover:text-white decoration-teal-400">
              AFA-SEA-500F Sea
            </button>
          </div>
        </div>

        {/* Display Status Panel */}
        {activeTracking ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Block: Shipment Parameters */}
            <div className="lg:col-span-5 bg-marine-900/70 border border-marine-800 rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-reef-500 via-sky-400 to-teal-500" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono tracking-wider text-stone-400 block uppercase">
                    ACTIVE ROUTE STREAM
                  </span>
                  <div className="flex items-center space-x-2 mt-1">
                    {getModeIcon(activeTracking.mode)}
                    <h3 className="text-xl font-bold font-mono tracking-wider text-white">
                      {activeTracking.trackingId}
                    </h3>
                  </div>
                </div>
                
                <span className="text-xs bg-reef-950/80 text-reef-400 font-mono tracking-wide rounded-md px-2.5 py-1.5 border border-reef-900/60 font-semibold font-mono">
                  {activeTracking.dispatchedDate ? 'ACTIVE IN TRANSIT' : 'MANIFEST FILED'}
                </span>
              </div>

              {/* Core Parameters Metadata Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-xs py-4 border-y border-marine-800/80 font-mono">
                <div>
                  <span className="text-[9px] text-stone-500 uppercase block tracking-wider">DEPARTURE TERMINAL</span>
                  <span className="text-stone-200 mt-1 block font-sans font-semibold leading-tight">{activeTracking.origin}</span>
                </div>
                
                <div>
                  <span className="text-[9px] text-stone-500 uppercase block tracking-wider">SECURE RECEIVING DESK</span>
                  <span className="text-stone-200 mt-1 block font-sans font-semibold leading-tight">{activeTracking.destination}</span>
                </div>

                <div>
                  <span className="text-[9px] text-stone-500 uppercase block tracking-wider">PHYSICAL TOTAL WEIGHT</span>
                  <span className="text-reef-400 mt-1 block font-mono font-semibold">{activeTracking.weightKg.toLocaleString()} kg</span>
                </div>

                <div>
                  <span className="text-[9px] text-stone-500 uppercase block tracking-wider">CUBIC FOOTPRINT</span>
                  <span className="text-reef-400 mt-1 block font-mono font-semibold">{activeTracking.volumeM3} m³</span>
                </div>

                <div>
                  <span className="text-[9px] text-stone-500 uppercase block tracking-wider">DISPATCH REGISTERED</span>
                  <div className="flex items-center space-x-1 mt-1 text-stone-300">
                    <Calendar className="w-3.5 h-3.5 text-stone-550 mr-1 shrink-0" />
                    <span>{activeTracking.dispatchedDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[9px] text-stone-500 uppercase block tracking-wider">ESTIMATED POD WINDOW</span>
                  <div className="flex items-center space-x-1 mt-1 text-yellow-400 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-yellow-500 mr-1 shrink-0 animate-pulse" />
                    <span>{activeTracking.estimatedDelivery}</span>
                  </div>
                </div>
              </div>

              {/* Graphical Transit Line */}
              <div className="space-y-2 text-left bg-marine-950/80 p-4 rounded-xl border border-marine-850">
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>DISPATCH</span>
                  <span>PROGRESS: {activeTracking.currentProgressPct}%</span>
                  <span>DELIVERED</span>
                </div>
                
                <div className="h-2 w-full bg-marine-800/50 rounded-full overflow-hidden relative border border-marine-750">
                  <div 
                    style={{ width: `${activeTracking.currentProgressPct}%` }}
                    className="h-full bg-gradient-to-r from-reef-500 to-teal-400 rounded-full relative transition-all duration-1000"
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-2 bg-white animate-pulse" />
                  </div>
                </div>

                {/* Simulated Geographic Status Banner */}
                <span className="text-[10px] text-stone-400 block font-mono leading-relaxed pt-1 select-none">
                  🛰️ Carrier transponder communicating on encrypted secure band. Telemetry state: OK.
                </span>
              </div>

            </div>

            {/* Right Block: Milestones Vertical Timeline */}
            <div className="lg:col-span-7 bg-marine-900/40 border border-marine-800 rounded-2xl p-6 sm:p-8">
              <h4 className="text-xs font-mono text-reef-400 uppercase tracking-widest block mb-6">
                Active Telemetry Logging & Milestones:
              </h4>

              <div className="relative pl-6 border-l-2 border-marine-800 space-y-6">
                
                {activeTracking.statusHistory.map((step, idx) => {
                  const isFinished = step.completed;
                  return (
                    <div key={idx} className="relative group text-left">
                      
                      {/* Interactive dot */}
                      <span className={`absolute -left-[31px] top-1 flex h-4.5 w-4.5 rounded-full items-center justify-center border-2 text-[8px] font-mono leading-none ${
                        isFinished 
                          ? 'bg-reef-600 border-reef-500 text-white' 
                          : 'bg-marine-950 border-marine-805 text-stone-500'
                      }`}>
                        {isFinished ? '✓' : idx + 1}
                      </span>
                      
                      {/* Log details */}
                      <div className="space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                          <span className="text-sm font-bold font-display text-white group-hover:text-reef-400 transition-colors">
                            {step.location}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400 leading-none">
                            {step.timestamp}
                          </span>
                        </div>
                        
                        <p className={`text-xs ${isFinished ? 'text-stone-300' : 'text-stone-500 font-medium'}`}>
                          {step.description}
                        </p>
                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        ) : (
          /* Error or default fallback screen if search misses */
          <div className="max-w-2xl mx-auto py-12 px-6 bg-marine-900/50 border border-marine-800 rounded-2xl text-center space-y-4">
            <div className="inline-flex p-3 bg-red-950/50 rounded-xl border border-red-900/50 text-red-400 text-center mx-auto mb-2">
              <AlertCircle className="w-6 h-6" />
            </div>
            
            <h3 className="text-lg font-display font-semibold text-white">
              Secured Connection Suspended
            </h3>
            
            <p className="text-sm text-stone-400 leading-relaxed">
              {hasSearched 
                ? errorText 
                : 'Enter a valid AFA consignment key above to authenticate and hook into live Australian orbital telemetry.'
              }
            </p>

            {/* Guide Tip */}
            <div className="pt-4 border-t border-marine-800/60 max-w-md mx-auto text-xs text-stone-500 font-mono text-center">
              TIP: Real-time queries require matching exactly to our register. Click one of the "Capital Hub Presets" shortcuts located under the search box to test pre-loaded timelines!
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
