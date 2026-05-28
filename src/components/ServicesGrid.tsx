/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ship, Truck, Plane, CheckCircle, ShieldAlert, Anchor, ArrowRight, Layers, Ruler } from 'lucide-react';
import { FreightMode } from '../types';

export default function ServicesGrid() {
  const [activeTab, setActiveTab] = useState<FreightMode>('LAND');

  const specifications = {
    LAND: {
      title: 'Continental Road Linehaul Fleet',
      description: 'Operating a fleet of modern B-double combos, semi-trailers, and temperature-governed reefers linking major ports to regional outbacks.',
      maxCapacity: 'Up to 42 tonnes per B-Double combination',
      compliance: 'Fully National Heavy Vehicle Regulator (NHVR) accredited and fatigue-management audited.',
      metrics: [
        { label: 'Standard Interstate Transit', value: '1 - 3 Days' },
        { label: 'Outback Remote Site Clearance', value: '4 - 5 Days' },
        { label: 'GPS Temperature Stream', value: '24/7 Monitored' }
      ],
      features: [
        'Multi-temperature zones for cold-chain grocery or vaccines',
        'Direct connection to primary coastal maritime container docks',
        'Dangerous Goods certified drivers with full DG spill containment kits',
        'Specialized tail-lift local distribution vans for urban centers'
      ],
      image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800'
    },
    SEA: {
      title: 'Ocean Container Freight Gateway',
      description: 'Providing extensive vessel space agreements on major shipping lines connecting Port Botany, Melbourne Docks, Fremantle, and international waterways.',
      maxCapacity: 'Unrestricted bulk weight, 20ft & 40ft general/high-cube containers',
      compliance: 'Department of Agriculture, Fisheries and Forestry (DAFF) biosecurity ready.',
      metrics: [
        { label: 'FCL Commercial Space', value: 'Weekly Sailings' },
        { label: 'LCL Hub Consolidation', value: 'Direct Low-cost' },
        { label: 'Customs Clearances', value: 'Pre-Arrival Prep' }
      ],
      features: [
        'Less-than-container-load (LCL) consolidation yards in all capital cities',
        'Flat rack & open top containers for heavy mining project oversized goods',
        'Secure terminal storage warehouses with advanced perimeter security',
        'Direct customs broker representation at Port Botany and Port of Brisbane'
      ],
      image: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=800'
    },
    AIR: {
      title: 'Time-Critical Specialized Air Cargo',
      description: 'Collaborating with premier airlines to coordinate block space and custom aircraft charters for high-value machinery spares and medical transport.',
      maxCapacity: 'Up to 110 tonnes utilizing dedicated Boeing 777 freighter hulls',
      compliance: 'Civil Aviation Safety Authority (CASA) regulated air-security cargo handlers.',
      metrics: [
        { label: 'Transit Window (Domestic)', value: 'Overnight' },
        { label: 'Charter Availability', value: '24/7 Booking' },
        { label: 'Urgent Processing Limit', value: '90 Min Pre-flight' }
      ],
      features: [
        'Dedicated high-value courier escorting systems from dock to cabin',
        'Dry ice repackaging & continuous cryogenic monitoring',
        'Direct apron transshipments under high-priority clearances',
        'Tailored small aircraft charters for remote Northern Territory mining targets'
      ],
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=800'
    }
  };

  const currentSpec = specifications[activeTab];

  return (
    <section id="capabilities" className="py-20 bg-coastal-sand/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-reef-600 tracking-widest uppercase block mb-2">
            Professional Grade Logistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-marine-900 tracking-tight">
            Integrated Australian Freight Capabilities
          </h2>
          <div className="w-16 h-1 bg-reef-600 mx-auto mt-4 rounded-full" />
          <p className="text-stone-600 mt-5">
            AFA matches state-of-the-art GPS vehicle telemetry with multi-modal deep-water shipping and priority air corridors to structure high-performance freight.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-marine-900 rounded-xl p-1.5 shadow-md border border-marine-800">
            {[
              { id: 'LAND', label: 'Overland Fleet', icon: Truck },
              { id: 'SEA', label: 'Maritime Logistics', icon: Ship },
              { id: 'AIR', label: 'Expedited Air', icon: Plane }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as FreightMode)}
                  className={`flex items-center space-x-2 px-6 py-3.5 rounded-lg font-display text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-reef-600 text-white shadow-lg shadow-reef-600/15'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel Content Box */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Frame: Specifications Text & Details */}
            <div className="p-8 sm:p-12 flex flex-col justify-between space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-reef-600">
                  <Layers className="w-5 h-5" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                    DEPARTING FLEET STATUS
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-marine-900 leading-tight">
                  {currentSpec.title}
                </h3>
                
                <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                  {currentSpec.description}
                </p>
              </div>

              {/* Quick Metrics Cards */}
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-stone-100">
                {currentSpec.metrics.map((metric, idx) => (
                  <div key={idx} className="text-left">
                    <span className="text-[10px] uppercase font-mono text-stone-400 tracking-wider block">
                      {metric.label}
                    </span>
                    <span className="text-sm font-extrabold text-marine-850 font-display mt-0.5 block">
                      {metric.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Core Feature List Checks */}
              <div className="space-y-3">
                <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-2">
                  Key Service Standards:
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentSpec.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-reef-600 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-700 leading-snug">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Logistics Guidelines Banner */}
              <div className="p-4 bg-stone-50 border-l-4 border-yellow-500 rounded-r-lg">
                <div className="flex space-x-3">
                  <ShieldAlert className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-semibold text-stone-800 uppercase font-mono tracking-wider block">
                      GOVERNMENT PROTOCOL & LIMITS
                    </span>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      {currentSpec.maxCapacity}. {currentSpec.compliance}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Frame: Highly refined background photography with coastal overlay */}
            <div className="relative min-h-[300px] lg:min-h-full overflow-hidden">
              <img
                src={currentSpec.image}
                alt={currentSpec.title}
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              {/* Australian Teal/Navy Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-marine-950/80 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white lg:via-transparent lg:to-transparent z-10" />
              
              {/* Overlay Badge for mobile */}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md border border-stone-200 p-4 rounded-xl shadow-lg z-20 hidden sm:block max-w-xs">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-reef-100 rounded-lg text-reef-600">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono text-stone-400 tracking-wider block">
                      CUSTOM SOLUTIONS
                    </span>
                    <span className="text-xs font-bold text-marine-900 block mt-0.5 leading-tight">
                      Out of Gauge & Bulk cargo consultations available daily.
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
