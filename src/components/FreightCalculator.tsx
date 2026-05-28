/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calculator, HelpCircle, Info, RefreshCw, Layers, DollarSign, Calendar, TrendingUp, Zap, Leaf } from 'lucide-react';
import { InstantQuoteRequest, InstantQuoteResult } from '../types';
import { CARGO_TYPES, ROUTE_OPTIONS } from '../data';

export default function FreightCalculator() {
  // Calculator Request State
  const [origin, setOrigin] = useState('MEL');
  const [destination, setDestination] = useState('SYD');
  const [mode, setMode] = useState<'LAND' | 'SEA' | 'AIR'>('LAND');
  const [cargoTypeId, setCargoTypeId] = useState('dry_van');
  const [weightKg, setWeightKg] = useState<number>(350);
  const [lengthCm, setLengthCm] = useState<number>(120);
  const [widthCm, setWidthCm] = useState<number>(80);
  const [heightCm, setHeightCm] = useState<number>(160);
  const [priority, setPriority] = useState<'STANDARD' | 'EXPRESS' | 'SUPER_PRIORITY'>('STANDARD');
  const [applyGreenOffset, setApplyGreenOffset] = useState<boolean>(true);

  // Result output State
  const [result, setResult] = useState<InstantQuoteResult>({
    baseCost: 0,
    prioritySurcharge: 0,
    fuelSurcharge: 0,
    gst: 0,
    totalCost: 0,
    estimatedDays: 0,
    carbonOffsetKg: 0
  });

  const [activeTab, setActiveTab] = useState<'quote' | 'guide'>('quote');

  // Trigger recalculations on input changes
  useEffect(() => {
    recalculateFreightQuote();
  }, [origin, destination, mode, cargoTypeId, weightKg, lengthCm, widthCm, heightCm, priority, applyGreenOffset]);

  const recalculateFreightQuote = () => {
    // 1. Calculate physical measurements
    const volumeM3 = (lengthCm * widthCm * heightCm) / 1000000;
    
    // Volumetric conversion factor (typically 250kg per cubic meter in Australia)
    const volumetricWeightKg = volumeM3 * 250;
    const chargeableWeight = Math.max(weightKg, volumetricWeightKg);

    // Find route details
    const selectedRoute = ROUTE_OPTIONS.find(
      r => (r.origin === origin && r.destination === destination) || 
           (r.origin === destination && r.destination === origin)
    ) || { distanceKm: 800, baseDays: { LAND: 2, AIR: 1, SEA: 4 } };

    // Find cargo multiplier
    const selectedCargoType = CARGO_TYPES.find(c => c.id === cargoTypeId) || CARGO_TYPES[0];

    // Base cost formula: (Distance factor * Chargeable Weight factor) * Cargo Multiplier
    const ratePerKmPerKg = 0.00045; // custom rate structure
    let calculatedBaseCost = selectedRoute.distanceKm * chargeableWeight * ratePerKmPerKg;
    
    // Ensure logical floor
    const minRates = { LAND: 120, AIR: 380, SEA: 250 };
    calculatedBaseCost = Math.max(calculatedBaseCost * selectedCargoType.multiplier, minRates[mode]);

    // Priority multipliers
    let prioritySurcharge = 0;
    if (priority === 'EXPRESS') {
      prioritySurcharge = calculatedBaseCost * 0.35; // 35% express speed markup
    } else if (priority === 'SUPER_PRIORITY') {
      prioritySurcharge = calculatedBaseCost * 0.75; // 75% hotshot express markup
    }

    // Fuel Index Surcharge (linked to diesel prices, let's mock 14.5% standard index)
    const fuelSurchargeIndex = 0.145;
    const fuelSurcharge = (calculatedBaseCost + prioritySurcharge) * fuelSurchargeIndex;

    // Carbon calculation
    // Average CO2 emissions per tonne-km: Rail/Land = 0.12kg, Air = 0.80kg, Ocean = 0.02kg
    const co2PerTonneKm = { LAND: 0.12, AIR: 0.80, SEA: 0.02 };
    const carbonOffsetKg = Math.round((chargeableWeight / 1000) * selectedRoute.distanceKm * co2PerTonneKm[mode]);

    // Green Carbon Offset Levy ($0.15 per kg CO2 offset option)
    const offsetLevy = applyGreenOffset ? (carbonOffsetKg * 0.15) : 0;

    // GST (Goods and Services Tax in Australia - 10%)
    const subtotal = calculatedBaseCost + prioritySurcharge + fuelSurcharge + offsetLevy;
    const gstValue = subtotal * 0.10;
    const finalTotal = subtotal + gstValue;

    // Schedulers estimated days
    let estimatedDays = selectedRoute.baseDays[mode];
    if (priority === 'EXPRESS' && estimatedDays > 1) {
      estimatedDays = Math.max(1, Math.round(estimatedDays * 0.6));
    } else if (priority === 'SUPER_PRIORITY') {
      estimatedDays = 1; // Dedicated charter or Hotshot
    }

    setResult({
      baseCost: calculatedBaseCost,
      prioritySurcharge,
      fuelSurcharge,
      gst: gstValue,
      totalCost: finalTotal,
      estimatedDays,
      carbonOffsetKg
    });
  };

  const selectedRouteDistance = ROUTE_OPTIONS.find(
    r => (r.origin === origin && r.destination === destination) || 
         (r.origin === destination && r.destination === origin)
  )?.distanceKm || 850;

  const totalVolume = (lengthCm * widthCm * heightCm) / 1000000;
  const volumetricWeight = Math.round(totalVolume * 250);
  const chargeableWeight = Math.max(weightKg, volumetricWeight);

  // Constants for capital cities selection
  const hubOptions = [
    { code: 'SYD', name: 'Sydney (NSW)' },
    { code: 'MEL', name: 'Melbourne (VIC)' },
    { code: 'BNE', name: 'Brisbane (QLD)' },
    { code: 'PER', name: 'Perth (WA)' },
    { code: 'ADL', name: 'Adelaide (SA)' },
    { code: 'DRW', name: 'Darwin (NT)' },
    { code: 'HBA', name: 'Hobart (TAS)' }
  ];

  return (
    <section id="calculator" className="py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-reef-600 tracking-widest uppercase block mb-2">
            Engineering Precision
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-marine-900 tracking-tight">
            Interstate Pricing & Carbon Constructor
          </h2>
          <div className="w-16 h-1 bg-reef-600 mx-auto mt-4 rounded-full" />
          <p className="text-stone-600 mt-5">
            Instantly formulate estimates based on dimensional cubic scale, fuel price surcharges, and carbon offset guidelines for interstate freight.
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Panel: Inputs Form */}
          <div className="lg:col-span-7 bg-coastal-sand/60 border border-stone-200/50 p-6 sm:p-8 rounded-2xl shadow-sm">
            <h3 className="text-lg font-display font-semibold text-marine-950 mb-6 flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-reef-600" />
              <span>Cargo Specifications & Routing</span>
            </h3>

            <div className="space-y-6">
              
              {/* Row 1: Departure and Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                    Origin Hub
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => {
                      if (e.target.value === destination) {
                        setDestination(origin); // Swap to prevent same-location routes
                      }
                      setOrigin(e.target.value);
                    }}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-stone-800 focus:outline-none focus:border-reef-500 focus:ring-1 focus:ring-reef-500 transition-colors"
                  >
                    {hubOptions.map(hub => (
                      <option key={hub.code} value={hub.code}>{hub.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                    Destination Hub
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => {
                      if (e.target.value === origin) {
                        setOrigin(destination); // Swap
                      }
                      setDestination(e.target.value);
                    }}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-stone-800 focus:outline-none focus:border-reef-500 focus:ring-1 focus:ring-reef-500 transition-colors"
                  >
                    {hubOptions.map(hub => (
                      <option key={hub.code} value={hub.code}>{hub.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Transport Mode & Priority Selectors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                    Logistical Mode
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'LAND', label: 'Road' },
                      { id: 'SEA', label: 'Sea' },
                      { id: 'AIR', label: 'Air' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setMode(tab.id as 'LAND' | 'SEA' | 'AIR')}
                        className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                          mode === tab.id
                            ? 'bg-marine-900 border-marine-900 text-white shadow-sm'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                    Service Speed Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-stone-800 focus:outline-none focus:border-reef-500 focus:ring-1 focus:ring-reef-500 transition-colors"
                  >
                    <option value="STANDARD">Standard Scheduled Run</option>
                    <option value="EXPRESS">Express Expedited (+35%)</option>
                    <option value="SUPER_PRIORITY">Hotshot / Premium Jet Charter (+75%)</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Cargo Type Category */}
              <div>
                <label className="block text-xs font-mono text-stone-500 uppercase tracking-wider mb-2">
                  Freight Cargo Classificaton
                </label>
                <select
                  value={cargoTypeId}
                  onChange={(e) => setCargoTypeId(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-stone-800 focus:outline-none focus:border-reef-500 focus:ring-1 focus:ring-reef-500 transition-colors"
                >
                  {CARGO_TYPES.map(c => (
                    <option key={c.id} value={c.id}>{c.name} (x{c.multiplier})</option>
                  ))}
                </select>
              </div>

              {/* Row 4: Dimensions & Weight Dials */}
              <div className="border-t border-stone-200/60 pt-5">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider font-semibold">
                    Cargo Dimensions & Base Mass
                  </h4>
                  <span className="text-xs font-mono bg-reef-100 text-reef-700 px-2 py-0.5 rounded-full font-semibold">
                    Factor: 250kg/M³
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Physical Weight Range */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-stone-600 font-medium">Actual Gross Mass</span>
                      <span className="text-xs font-mono font-bold text-marine-950">{weightKg.toLocaleString()} kg</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="15000"
                      step="10"
                      value={weightKg}
                      onChange={(e) => setWeightKg(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-reef-600"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>10 kg</span>
                      <span>5,000 kg</span>
                      <span>15,000 kg</span>
                    </div>
                  </div>

                  {/* Length Range */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-stone-600 font-medium">Length</span>
                      <span className="text-xs font-mono font-bold text-marine-950">{lengthCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="600"
                      step="5"
                      value={lengthCm}
                      onChange={(e) => setLengthCm(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-reef-500"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>20 cm</span>
                      <span>300 cm</span>
                      <span>600 cm</span>
                    </div>
                  </div>

                  {/* Width Range */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-stone-600 font-medium">Width</span>
                      <span className="text-xs font-mono font-bold text-marine-950">{widthCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="250"
                      step="5"
                      value={widthCm}
                      onChange={(e) => setWidthCm(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-reef-500"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>20 cm</span>
                      <span>130 cm</span>
                      <span>250 cm</span>
                    </div>
                  </div>

                  {/* Height Range */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-stone-600 font-medium">Height</span>
                      <span className="text-xs font-mono font-bold text-marine-950">{heightCm} cm</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="300"
                      step="5"
                      value={heightCm}
                      onChange={(e) => setHeightCm(Number(e.target.value))}
                      className="w-full h-1.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-reef-500"
                    />
                    <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                      <span>20 cm</span>
                      <span>150 cm</span>
                      <span>300 cm</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Green Offset Checkbox */}
              <div className="border-t border-stone-200/60 pt-5">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={applyGreenOffset}
                    onChange={(e) => setApplyGreenOffset(e.target.checked)}
                    className="mt-0.5 h-4 w-4 text-reef-600 focus:ring-reef-500 border-zinc-300 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-stone-800 flex items-center mb-0.5">
                      <Leaf className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
                      Offset Environmental Carbon Footprint (Green Choice)
                    </span>
                    <p className="text-[11px] text-stone-500 leading-snug">
                      Opt-in to contribute $0.15 per kg-CO2 towards Australian land-reforestation projects, mitigating the exact emissions computed for this route.
                    </p>
                  </div>
                </label>
              </div>

            </div>
          </div>

          {/* Right Panel: Cost breakdown & visual container model */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            {/* Visual Box Generator Box */}
            <div className="bg-marine-950 border border-marine-800 rounded-2xl p-6 text-white relative overflow-hidden mb-6 flex-1">
              <div className="absolute top-0 right-0 p-3">
                <span className="text-[10px] font-mono text-reef-400 bg-reef-950/80 px-2 py-0.5 rounded border border-reef-900 leading-none">
                  INTELLIGENT WIREFRAME
                </span>
              </div>
              
              <h4 className="text-xs font-mono uppercase text-stone-400 tracking-wider mb-2">
                Live Volumetric Render
              </h4>

              {/* Flex Container for Box Visualization & Dims Spec */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                
                {/* Visualizer wireframe */}
                <div className="sm:col-span-7 flex items-center justify-center h-44 relative bg-marine-900/40 rounded-xl border border-marine-800">
                  
                  {/* Dynamic Wireframe Box */}
                  <div 
                    style={{
                      width: `${Math.max(45, Math.min(130, lengthCm / 4.5))}px`,
                      height: `${Math.max(45, Math.min(130, heightCm / 2.2))}px`,
                      transform: 'rotateX(-20deg) rotateY(25deg)',
                      transformStyle: 'preserve-3d'
                    }}
                    className="relative flex items-center justify-center border-2 border-dashed border-reef-400/55 bg-reef-500/10 transition-all duration-300 rounded-sm"
                  >
                    {/* Shadow underneath */}
                    <div className="absolute -bottom-1 left-2 right-2 h-2 bg-black/60 blur-md rounded-full transform -translate-y-px" />
                    
                    {/* Size stats inner labels */}
                    <div className="text-[10px] font-mono text-white/90 bg-marine-950/90 py-0.5 px-1.5 rounded border border-marine-800 text-center select-none shadow-md">
                      {totalVolume.toFixed(2)} M³
                    </div>
                  </div>

                </div>

                {/* Measurements list */}
                <div className="sm:col-span-5 space-y-3.5 text-left bg-marine-900/50 p-4 rounded-xl border border-marine-800/80">
                  <div>
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider block">
                      TOTAL VOLUME
                    </span>
                    <span className="text-base font-bold font-display text-white">
                      {totalVolume.toFixed(3)} m³
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider block">
                      VOLUMETRIC WEIGHT
                    </span>
                    <span className="text-sm font-bold font-mono text-reef-400">
                      {volumetricWeight} kg
                    </span>
                  </div>

                  <div className="pt-2 border-t border-marine-800">
                    <span className="text-[9px] font-mono text-stone-400 uppercase tracking-wider block">
                      CHARGEABLE MASS
                    </span>
                    <span className="text-sm font-extrabold font-display text-yellow-400">
                      {chargeableWeight.toLocaleString()} kg
                    </span>
                    <span className="text-[9px] text-stone-500 block leading-tight mt-0.5">
                      {weightKg >= volumetricWeight ? '(Uses Actual Mass)' : '(Uses Cubed Volume)'}
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Price Output Box */}
            <div className="bg-marine-900 border border-marine-800 rounded-2xl p-6 text-white">
              <span className="text-[10px] font-mono tracking-widest text-reef-400 block uppercase mb-1">
                AFA Estimate Formulation
              </span>
              
              <div className="flex justify-between items-baseline mb-4">
                <h4 className="text-xl font-bold font-display">Quote Summary</h4>
                <div className="text-right">
                  <span className="text-xs text-stone-400 font-mono block">TRANSIT DAYS</span>
                  <span className="text-base font-extrabold text-yellow-400 font-mono leading-none">
                    ~ {result.estimatedDays} {result.estimatedDays === 1 ? 'Business Day' : 'Business Days'}
                  </span>
                </div>
              </div>

              {/* Items Breakdown list */}
              <div className="space-y-2 border-y border-marine-800 py-3 mb-4 text-xs font-mono">
                <div className="flex justify-between text-stone-300">
                  <span>Base Freight Cost ({mode}):</span>
                  <span>${result.baseCost.toFixed(2)}</span>
                </div>
                
                {result.prioritySurcharge > 0 && (
                  <div className="flex justify-between text-yellow-400">
                    <span>Priority Speed Markup:</span>
                    <span>+${result.prioritySurcharge.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span>Fuel Index Surcharge:</span>
                  <span>+${result.fuelSurcharge.toFixed(2)}</span>
                </div>

                {applyGreenOffset && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Green Re-Forest Offset:</span>
                    <span>+${(result.carbonOffsetKg * 0.15).toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-400">
                  <span>GST (10% standard rate):</span>
                  <span>+${result.gst.toFixed(2)}</span>
                </div>
              </div>

              {/* Carbon Offset Visual */}
              <div className="flex items-center justify-between text-xs font-mono mb-4 px-3 py-2 bg-marine-950/60 rounded border border-marine-800">
                <div className="flex items-center text-stone-300">
                  <Leaf className="w-4 h-4 text-emerald-500 mr-2 shrink-0 animate-bounce" />
                  <span>Emissions Footprint:</span>
                </div>
                <span className="font-extrabold text-emerald-400 text-right">
                  {result.carbonOffsetKg} kg CO₂
                </span>
              </div>

              {/* Total Row */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block">
                    TOTAL ESTIMATED COST
                  </span>
                  <span className="text-3xl font-extrabold font-display text-white mt-1 block">
                    ${result.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                
                <span className="text-[10px] text-stone-400 max-w-[130px] text-right font-mono leading-tight bg-marine-950/40 p-1.5 rounded border border-marine-800">
                  Linked to standard AU zone rates. GST Exclusive of customs duty.
                </span>
              </div>

              <button
                onClick={() => {
                  const scrollEl = document.getElementById('booking');
                  if (scrollEl) {
                    scrollEl.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full py-3 bg-reef-600 hover:bg-reef-500 text-white font-display text-xs tracking-wider uppercase font-extrabold rounded-lg shadow-md hover:shadow-reef-500/25 transition-all text-center"
              >
                Book with these Dimensions
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
