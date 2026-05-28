/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { FileText, CheckCircle, Ship, Truck, Plane, Download, RefreshCw, AlertCircle, Sparkles, Building, User, Mail, Phone, Calendar } from 'lucide-react';
import { PRELOADED_TRACKING } from '../data';

interface BookingFormProps {
  onQuoteRequested: (newTrackingCode: string) => void;
}

export default function BookingForm({ onQuoteRequested }: BookingFormProps) {
  // Form input details
  const [companyName, setCompanyName] = useState('Southern Mining Solutions Ltd');
  const [abn, setAbn] = useState('44 192 839 401');
  const [senderName, setSenderName] = useState('Lachlan Macarthur');
  const [email, setEmail] = useState('l.macarthur@southernmining.com.au');
  const [phone, setPhone] = useState('+61 8 9205 3300');
  
  const [originAddress, setOriginAddress] = useState('Terminal Unit 4, Fremantle Port');
  const [originState, setOriginState] = useState('WA');
  const [destAddress, setDestAddress] = useState('Site 14 Depot, Port Botany Yards');
  const [destState, setDestState] = useState('NSW');

  const [weightKg, setWeightKg] = useState('4200');
  const [volumeM3, setVolumeM3] = useState('18');
  const [mode, setMode] = useState<'LAND' | 'SEA' | 'AIR'>('LAND');
  const [cargoType, setCargoType] = useState('Mining Machinery Projects & Oversize');
  
  // Status structures
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedDoc, setGeneratedDoc] = useState<any | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Field audits
    if (!companyName || !senderName || !email || !originAddress || !destAddress) {
      alert('Kindly fill in all required freight manifests in full.');
      return;
    }

    // Generate a unique tracking code following AFA standards
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingCode = `AFA-${originState}${destState}-${randomSuffix}`;

    // Prepare formal document metadata
    const docData = {
      trackingId: trackingCode,
      company: companyName,
      abn: abn || 'Not Provided',
      sender: senderName,
      email: email,
      phone: phone,
      origin: `${originAddress}, ${originState}`,
      destination: `${destAddress}, ${destState}`,
      weightKg: Number(weightKg) || 120,
      volumeM3: Number(volumeM3) || 1.5,
      mode: mode,
      cargoType: cargoType,
      dateCreated: new Date().toLocaleDateString('en-AU', { hour: '2-digit', minute: '2-digit' }),
      sealNumber: `SEAL-AU-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Inject this live generated code into our global preloaded tracking cache in data.ts so the Tracking section can lookup it up instantly!
    const currentTime = new Date().toISOString().slice(0, 16).replace('T', ' ');
    PRELOADED_TRACKING[trackingCode] = {
      trackingId: trackingCode,
      mode: mode,
      origin: `${originAddress}, ${originState}`,
      destination: `${destAddress}, ${destState}`,
      cargoType: cargoType,
      weightKg: Number(weightKg) || 120,
      volumeM3: Number(volumeM3) || 1.5,
      dispatchedDate: currentTime,
      estimatedDelivery: 'Calculate upon checkin',
      currentProgressPct: 15,
      statusHistory: [
        { timestamp: currentTime, location: `${originAddress}, ${originState}`, description: 'Digital Consignment Note filed online. Ground teams notified.', status: 'PENDING', completed: true },
        { timestamp: 'Awaiting departure', location: 'Origin Terminal', description: 'Subject to priority customs verification and hazardous-goods checkin.', status: 'PENDING', completed: false }
      ]
    };

    setGeneratedDoc(docData);
    setIsSubmitted(true);
    onQuoteRequested(trackingCode); // Inform root of new tracking available
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setGeneratedDoc(null);
  };

  return (
    <section id="booking" className="py-20 bg-coastal-beige/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-reef-600 tracking-widest uppercase block mb-2">
            Supply Chain Portal
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-marine-900 tracking-tight">
            Consignment Booking & Manifest Generator
          </h2>
          <div className="w-16 h-1 bg-reef-600 mx-auto mt-4 rounded-full" />
          <p className="text-stone-600 mt-5 leading-relaxed">
            Register shipments under formal Australian heavy transport codes. Instantly generate official consignment documents and printable manifest logs.
          </p>
        </div>

        {/* Dynamic Card Area */}
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            
            /* Entry Form UI */
            <form onSubmit={handleSubmit} className="bg-white border border-stone-250/70 rounded-2xl p-6 sm:p-10 shadow-xl text-left space-y-8">
              
              {/* Card Header */}
              <div className="flex items-center space-x-3 pb-5 border-b border-stone-100">
                <div className="p-3 bg-marine-900 text-white rounded-xl">
                  <FileText className="w-6 h-6 text-reef-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-marine-900 font-display">
                    E-Booking Terminal
                  </h3>
                  <p className="text-xs text-stone-500">
                    Prepare a legally compliant AFA consignment certificate for local or interstate delivery.
                  </p>
                </div>
              </div>

              {/* SECTION A: Company Credentials */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest font-bold">
                  A. Logistical Consigner Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Company / Trading Name *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                        placeholder="e.g. Southern Mining Solutions Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Australian Business Number (ABN)</label>
                    <input
                      type="text"
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                      placeholder="e.g. 44 192 839 401"
                      value={abn}
                      onChange={(e) => setAbn(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Contact Officer *</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                        placeholder="Lachlan Macarthur"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                      />
                      <User className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Primary Email Address *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                        placeholder="l.macarthur@sender.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* SECTION B: Origin and Destination address */}
              <div className="space-y-4 border-t border-stone-100 pt-6">
                <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest font-bold">
                  B. Transshipment Geographies
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Origin */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Origin Terminal Address *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                        value={originAddress}
                        onChange={(e) => setOriginAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                      <select
                        value={originState}
                        onChange={(e) => setOriginState(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                      >
                        {['WA', 'NSW', 'VIC', 'QLD', 'SA', 'NT', 'TAS'].map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Destination */}
                  <div className="grid grid-cols-4 gap-2">
                    <div className="col-span-3">
                      <label className="block text-xs font-semibold text-stone-700 mb-1">Receiving Depot Address *</label>
                      <input
                        type="text"
                        required
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                        value={destAddress}
                        onChange={(e) => setDestAddress(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-stone-700 mb-1">State *</label>
                      <select
                        value={destState}
                        onChange={(e) => setDestState(e.target.value)}
                        className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                      >
                        {['NSW', 'WA', 'VIC', 'QLD', 'SA', 'NT', 'TAS'].map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                </div>
              </div>

              {/* SECTION C: Physical Cargo specs */}
              <div className="space-y-4 border-t border-stone-100 pt-6">
                <h4 className="text-xs font-mono text-stone-400 uppercase tracking-widest font-bold">
                  C. Cargo Consignment Specifics
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Transport Mechanism *</label>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'LAND', label: 'Road', icon: Truck },
                        { id: 'SEA', label: 'Vessel', icon: Ship },
                        { id: 'AIR', label: 'Air', icon: Plane }
                      ].map(item => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setMode(item.id as any)}
                            className={`flex flex-col items-center justify-center py-2.5 px-2 border rounded-lg text-xs font-medium transition-all ${
                              mode === item.id 
                                ? 'bg-marine-900 border-marine-900 text-white shadow-sm' 
                                : 'bg-stone-50 border-stone-300 text-stone-600 hover:bg-stone-100'
                            }`}
                          >
                            <Icon className="w-4 h-4 mb-1" />
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Gross Mass (kg) *</label>
                    <input
                      type="number"
                      required
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                      placeholder="e.g. 4200"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">Total Volume (m³)</label>
                    <input
                      type="number"
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                      placeholder="e.g. 18"
                      value={volumeM3}
                      onChange={(e) => setVolumeM3(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Content Description / Handling Guidelines *</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-reef-500"
                    placeholder="e.g. Mining Machinery, Overdimensional items. Keep dry."
                    value={cargoType}
                    onChange={(e) => setCargoType(e.target.value)}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-reef-600 hover:bg-reef-500 text-white font-display text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg shadow-reef-600/10 transition-all"
                >
                  Confirm E-Booking Manifest
                </button>
              </div>

            </form>
          ) : (
            
            /* Official Generated Consignment Document (Receipt UI) */
            <div className="space-y-6">
              
              {/* Submission Feedback Banner */}
              <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                <div className="p-2.5 bg-emerald-100 text-emerald-600 rounded-full animate-bounce">
                  <CheckCircle className="w-6 h-6 animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
                    Consignment Declared successfully
                  </h4>
                  <p className="text-xs text-emerald-700 leading-normal">
                    This manifest has been locked into our database. The transport vessel transponder has reserved space for {generatedDoc.weightKg} kg under tracking code <strong className="font-mono bg-emerald-100 px-1 py-0.5 rounded text-emerald-900">{generatedDoc.trackingId}</strong>.
                  </p>
                </div>
              </div>

              {/* Legal Consolidated Consignment Document */}
              <div className="bg-white border-2 border-stone-300 rounded-xl overflow-hidden shadow-2xl relative text-left">
                
                {/* Visual Official Bar border and header stamp */}
                <div className="bg-marine-950 px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-white border-b border-stone-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded bg-reef-600 text-white flex items-center justify-center font-bold">
                      A
                    </div>
                    <div>
                      <span className="text-xs font-extrabold tracking-widest block font-display">AFA CONSIGNMENT REGISTER</span>
                      <span className="text-[9px] font-mono text-stone-400 block -mt-0.5">NATIONAL HEAVY TRANSPORT SERVICE</span>
                    </div>
                  </div>
                  
                  <div className="text-right text-[10px] font-mono text-stone-300 mt-2 sm:mt-0 leading-tight">
                    <span>SECURITY CODELOCK</span>
                    <strong className="block text-yellow-400">{generatedDoc.sealNumber}</strong>
                  </div>
                </div>

                {/* Main Paper Content Grid */}
                <div className="p-6 sm:p-10 space-y-8 relative font-mono text-xs text-stone-800">
                  
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none transform -rotate-12">
                    <span className="text-marine-900 text-7xl font-bold font-display uppercase">AFA SECURED</span>
                  </div>

                  {/* Header metadata row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-stone-200">
                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold">TRACKING BARCODE ID</span>
                      <span className="font-bold text-sm text-marine-950 font-mono tracking-wider">{generatedDoc.trackingId}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold">ABN REGISTERED</span>
                      <span className="font-medium text-stone-700 block font-mono">{generatedDoc.abn}</span>
                    </div>

                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold">FILING DATE-TIME</span>
                      <div className="flex items-center space-x-1 mt-0.5 text-stone-700">
                        <span>{generatedDoc.dateCreated}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold">ROUTING MODE</span>
                      <span className="font-extrabold text-reef-600 uppercase mt-0.5 block">{generatedDoc.mode}</span>
                    </div>
                  </div>

                  {/* Shipment details cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-stone-200">
                    <div className="bg-stone-50 p-4 rounded border border-stone-200">
                      <span className="text-[9px] text-stone-400 block font-bold mb-2">CONSIGNER (SENDER) DETAILS:</span>
                      <div className="space-y-1.5 font-sans">
                        <p className="text-xs font-bold text-marine-950">{generatedDoc.company}</p>
                        <p className="text-xs text-stone-600">Officer: {generatedDoc.sender}</p>
                        <p className="text-xs text-stone-600">Email: {generatedDoc.email}</p>
                        <p className="text-xs text-stone-600">Origin Desk: {generatedDoc.origin}</p>
                      </div>
                    </div>

                    <div className="bg-stone-50 p-4 rounded border border-stone-200">
                      <span className="text-[9px] text-stone-400 block font-bold mb-2">RECONSIGNED RECEIVINGS DOCK:</span>
                      <div className="space-y-1.5 font-sans">
                        <p className="text-xs font-bold text-marine-950">AFA Primary Capital Terminal</p>
                        <p className="text-xs text-stone-600">Corporate Receiver Desk (ABF Checked)</p>
                        <p className="text-xs text-stone-600">Phone: {generatedDoc.phone}</p>
                        <p className="text-xs text-stone-600">Destination Desk: {generatedDoc.destination}</p>
                      </div>
                    </div>
                  </div>

                  {/* Weight Specs Column */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-6 border-b border-stone-200 text-stone-800">
                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold">CARGO CONTENT SPECS</span>
                      <span className="text-xs font-extrabold block font-sans mt-1 text-marine-950">{generatedDoc.cargoType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold font-mono">SPECIFIED GROSS MASS</span>
                      <span className="text-xs font-extrabold block mt-1 font-mono">{generatedDoc.weightKg} kg</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-stone-400 block font-semibold font-mono">SPECIFIED VOLUME</span>
                      <span className="text-xs font-extrabold block mt-1 font-mono">{generatedDoc.volumeM3} m³</span>
                    </div>
                  </div>

                  {/* Simulated barcode */}
                  <div className="flex flex-col items-center justify-center p-6 bg-stone-50 rounded border border-stone-200 mt-4">
                    <span className="font-mono text-2xl tracking-[0.25em] text-marine-950 select-none">
                      ||||||| | ||||| | ||||| | |||||| || | || |||||
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 mt-2 block select-none">
                      MANIFEST KEY: * {generatedDoc.trackingId} *
                    </span>
                  </div>

                  {/* Official guidelines note */}
                  <p className="text-[10px] text-stone-500 leading-normal border-t border-stone-100 pt-4 font-sans text-center">
                    This electronic transaction constitutes a formal booking file generated on 2026-05-28. In accordance with the Australian Carriage of Goods by Sea Act and National Heavy Vehicle Law, all variables registered are subject to weight-station calibration upon driver dispatch. AFA seals must remain intact.
                  </p>

                </div>

                {/* printable footer controller */}
                <div className="bg-stone-100 p-4 border-t border-stone-200 flex flex-col sm:flex-row gap-3 justify-between items-center">
                  <div className="flex items-center space-x-1.5 text-xs text-stone-500">
                    <Sparkles className="w-4 h-4 text-reef-600 animate-pulse" />
                    <span>Cross-linked tracking enabled. Try searching mock logs!</span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleReset}
                      className="px-4 py-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-700 rounded-md text-xs font-semibold font-display transition-colors"
                    >
                      Book Another Parcel
                    </button>
                    
                    <button
                      onClick={() => {
                        const trackingEl = document.getElementById('tracking');
                        if (trackingEl) {
                          trackingEl.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                      className="px-5 py-2 bg-reef-600 hover:bg-reef-500 text-white rounded-md text-xs font-semibold font-display shadow-md shadow-reef-600/10 transition-colors"
                    >
                      Audit Journey Tracker Live
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}
        </div>

      </div>
    </section>
  );
}
