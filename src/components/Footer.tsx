/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Anchor, ShieldCheck, Mail, Phone, MapPin, ExternalLink, Globe } from 'lucide-react';
import { AUSTRALIAN_HUBS } from '../data';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="afa-corporate-footer" className="bg-marine-950 text-white pt-16 pb-8 border-t border-marine-900 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-marine-950 to-marine-950/95 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-marine-900">
          
          {/* Logo & Slogan Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('hero')}>
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-reef-600 text-white shadow-md">
                <Anchor className="w-5 h-5" />
                <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-4 h-4 bg-yellow-500 rounded-full" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg tracking-wider block">AUSTRALIAN</span>
                <span className="font-sans font-medium text-xs tracking-widest text-reef-400 block -mt-1 uppercase">Freight Agency</span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Headquartered in Melbourne with secured container depots at Fremantle Port, Port Botany, and Eagle Farm. Offering multi-modal freight transport solutions across the Australian continent.
            </p>

            {/* Compliance Badges strip */}
            <div className="space-y-3 pt-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-stone-500 block">
                FEDERALLY COMPLIANT ACCREDITATIONS:
              </span>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center space-x-1.5 bg-marine-900 border border-marine-800 px-2.5 py-1.5 rounded text-[10px] font-mono text-stone-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-reef-400" />
                  <span>NHVR TRANSIT D-190</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-marine-900 border border-marine-800 px-2.5 py-1.5 rounded text-[10px] font-mono text-stone-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-reef-400" />
                  <span>DAFF BIO-SECURITY</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick-links Section */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-reef-400">
              OPERATIONAL HUBS
            </h4>
            
            <div className="space-y-3 font-mono text-xs">
              {AUSTRALIAN_HUBS.map((hub) => (
                <div key={hub.code} className="group flex items-start space-x-2 text-stone-400">
                  <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-stone-300 font-semibold block">{hub.code} Base Office</span>
                    <span className="text-[11px] block">{hub.name}</span>
                    <a href={`tel:${hub.phone.replace(/\s+/g, '')}`} className="text-[10px] text-reef-400/80 hover:text-reef-400 transition-colors block mt-0.5">
                      {hub.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Corporate Columns */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-reef-400">
              SITE MAP
            </h4>
            <div className="flex flex-col space-y-2.5 text-xs text-stone-400 font-display">
              <button onClick={() => onNavigate('capabilities')} className="hover:text-white text-left transition-colors">
                Capabilities Grid
              </button>
              <button onClick={() => onNavigate('calculator')} className="hover:text-white text-left transition-colors">
                Cubic Cost Tool
              </button>
              <button onClick={() => onNavigate('tracking')} className="hover:text-white text-left transition-colors">
                Live Trace Track
              </button>
              <button onClick={() => onNavigate('booking')} className="hover:text-white text-left transition-colors">
                E-Booking Manifest
              </button>
            </div>
          </div>

          {/* Support Line column */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-reef-400">
              AFA SUPPORT COMM
            </h4>
            
            <div className="space-y-4">
              <div className="p-4 bg-marine-900 border border-marine-800 rounded-lg space-y-2">
                <span className="text-[10px] font-mono text-stone-450 uppercase block tracking-wider leading-none">
                  INTERSTATE EMERGENCY LINE
                </span>
                <a href="tel:1300000AFA" className="text-lg font-bold font-mono text-yellow-400 tracking-wider block hover:underline">
                  1300 FREIGHT
                </a>
                <span className="text-[10px] text-stone-400 block font-mono leading-tight">
                  24 HR driver support, DG containment dispatch and priority linehauls.
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                <a href="mailto:operations@australianfreight.com.au" className="flex items-center space-x-2 text-xs text-stone-400 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-reef-450 mr-1 shrinkage-0" />
                  <span>ops@australianfreight.com.au</span>
                </a>
                <div className="flex items-center space-x-2 text-xs text-stone-400">
                  <Globe className="w-3.5 h-3.5 text-reef-450 mr-1 shrinkage-0" />
                  <span>www.australianfreight.com.au</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Legal copyrights strip */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-stone-500 space-y-4 md:space-y-0 text-center md:text-left">
          <div>
            <span>© {currentYear} Australian Freight Agency (AFA) Pty Ltd. All Rights Reserved.</span>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
            <span className="hover:text-stone-300 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-stone-300 cursor-pointer transition-colors">NHVR Code of Conduct</span>
            <span className="hover:text-stone-300 cursor-pointer transition-colors">DAFF Quarantine Certifications</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
