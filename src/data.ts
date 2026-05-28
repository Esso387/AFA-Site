/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CargoType, RouteOption, TrackingData, FreightMode } from './types';

export const HERO_VIDEOS: Record<FreightMode, { videoUrl: string; fallbackImg: string; title: string; subtitle: string }> = {
  SEA: {
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-cargo-ship-in-the-sea-aerial-view-39828-large.mp4',
    fallbackImg: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1920',
    title: 'Precision Global Sea Portals',
    subtitle: 'Connecting Australia to global shipping corridors with full container load (FCL) & less container load (LCL) precision.'
  },
  LAND: {
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-highway-traffic-at-sunset-11531-large.mp4',
    fallbackImg: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1920',
    title: 'Interstate Heavy Linehaul',
    subtitle: 'Express B-Double haulage, temperature-sensitive carriage, and scheduled regional connections across the continent.'
  },
  AIR: {
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-a-cargo-ship-in-the-ocean-31952-large.mp4', // we can use ocean aerial or another high quality one
    fallbackImg: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1920',
    title: 'Time-Critical Air Charters',
    subtitle: 'Consolidated commercial space, bespoke urgent freight, and direct customs clearance gateways at major Australian terminals.'
  }
};

export const CARGO_TYPES: CargoType[] = [
  {
    id: 'dry_van',
    name: 'General Cargo / Dry Pallets',
    icon: 'Package',
    multiplier: 1.0,
    description: 'FMCG, retail goods, electronics, and standard boxed industrial inventory.'
  },
  {
    id: 'reefer',
    name: 'Temperature-Controlled (Reefer)',
    icon: 'ThermometerSnowflake',
    multiplier: 1.4,
    description: 'Chilled or frozen seafood, agricultural produce, pharmaceuticals, and dairy products.'
  },
  {
    id: 'hazardous',
    name: 'Dangerous & Dangerous Goods (DG)',
    icon: 'ShieldAlert',
    multiplier: 1.8,
    description: 'Chemicals, compressed gas, lithium batteries, and materials requiring class certifications.'
  },
  {
    id: 'oversize',
    name: 'Overdimensional & Heavy Project Lift',
    icon: 'Scale',
    multiplier: 2.2,
    description: 'Mining machinery, wind turbines, manufacturing parts, and out-of-gauge equipment.'
  },
  {
    id: 'priority',
    name: 'Aviation Priority & E-Commerce Consolidated',
    icon: 'Zap',
    multiplier: 1.5,
    description: 'High-value tech parts, emergency industrial spares, and high-frequency parcel sacks.'
  }
];

export const AUSTRALIAN_HUBS = [
  { code: 'SYD', name: 'Sydney (Kingsford Smith / Port Botany)', state: 'NSW', phone: '+61 2 9182 4301' },
  { code: 'MEL', name: 'Melbourne (Tullamarine / Port of Melbourne)', state: 'VIC', phone: '+61 3 9544 2390' },
  { code: 'BNE', name: 'Brisbane (Eagle Farm / Port of Brisbane)', state: 'QLD', phone: '+61 7 3862 8201' },
  { code: 'PER', name: 'Perth (Redcliffe / Fremantle Port)', state: 'WA', phone: '+61 8 9374 5500' },
  { code: 'ADL', name: 'Adelaide (Outer Harbor / Adelaide Airport)', state: 'SA', phone: '+61 8 8240 1100' },
  { code: 'DRW', name: 'Darwin (East Arm Wharf / Darwin Airport)', state: 'NT', phone: '+61 8 8984 4110' },
  { code: 'HBA', name: 'Hobart (Macquarie Wharf / Hobart Airport)', state: 'TAS', phone: '+61 3 6248 5590' }
];

export const ROUTE_OPTIONS: RouteOption[] = [
  { id: 'syd-mel', origin: 'SYD', destination: 'MEL', distanceKm: 870, baseDays: { AIR: 1, LAND: 1, SEA: 3 } },
  { id: 'syd-bne', origin: 'SYD', destination: 'BNE', distanceKm: 920, baseDays: { AIR: 1, LAND: 1, SEA: 3 } },
  { id: 'syd-per', origin: 'SYD', destination: 'PER', distanceKm: 3930, baseDays: { AIR: 1, LAND: 4, SEA: 8 } },
  { id: 'mel-per', origin: 'MEL', destination: 'PER', distanceKm: 3420, baseDays: { AIR: 1, LAND: 4, SEA: 7 } },
  { id: 'bne-per', origin: 'BNE', destination: 'PER', distanceKm: 4350, baseDays: { AIR: 2, LAND: 5, SEA: 9 } },
  { id: 'syd-adl', origin: 'SYD', destination: 'ADL', distanceKm: 1370, baseDays: { AIR: 1, LAND: 2, SEA: 4 } },
  { id: 'mel-adl', origin: 'MEL', destination: 'ADL', distanceKm: 730, baseDays: { AIR: 1, LAND: 1, SEA: 3 } },
  { id: 'syd-drw', origin: 'SYD', destination: 'DRW', distanceKm: 3980, baseDays: { AIR: 1, LAND: 5, SEA: 10 } },
  { id: 'mel-hba', origin: 'MEL', destination: 'HBA', distanceKm: 600, baseDays: { AIR: 1, LAND: 2, SEA: 2 } }
];

export const PRELOADED_TRACKING: Record<string, TrackingData> = {
  'AFA-AUS-2026M': {
    trackingId: 'AFA-AUS-2026M',
    mode: 'LAND',
    origin: 'Melbourne (Tullamarine Gateway)',
    destination: 'Sydney (Port Botany Depot)',
    cargoType: 'Temperature-Controlled (Reefer)',
    weightKg: 8500,
    volumeM3: 42.5,
    dispatchedDate: '2026-05-26 06:10',
    estimatedDelivery: '2026-05-28 17:30',
    currentProgressPct: 85,
    statusHistory: [
      { timestamp: '2026-05-26 06:10', location: 'Melbourne Terminal', description: 'Consignment declared, manifest registered & seal #AFA-991Applied', status: 'PENDING', completed: true },
      { timestamp: '2026-05-26 08:30', location: 'Melbourne Ground Hub', description: 'Pre-cool temperature locks verified at constant -18.5°C. Loaded onto B-Double.', status: 'PENDING', completed: true },
      { timestamp: '2026-05-27 12:40', location: 'Hume Highway Interstate', description: 'In-transit. Route monitored via telemetry. Hume Hwy waypoint checkpoint passed.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-28 04:15', location: 'Goulburn Transit Depot', description: 'Driver rest rotation. System auto-inspected container pressure & fuel reserves.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-28 07:00', location: 'Campbelltown Sydney Gate', description: 'Approaching Greater Sydney metro zone. Scheduled dispatch call to consignee completed.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-28 17:30', location: 'Sydney Port Botany', description: 'Estimated arrival and seal verification.', status: 'DELIVERED', completed: false }
    ]
  },
  'AFA-PAC-777S': {
    trackingId: 'AFA-PAC-777S',
    mode: 'AIR',
    origin: 'Sydney (Kingsford Smith Cargo Terminal)',
    destination: 'Perth Aviation Airport Hub',
    cargoType: 'Emergency Industrial Spares',
    weightKg: 1200,
    volumeM3: 8.4,
    dispatchedDate: '2026-05-27 22:40',
    estimatedDelivery: '2026-05-28 09:15',
    currentProgressPct: 100,
    statusHistory: [
      { timestamp: '2026-05-27 18:20', location: 'Sydney Airport Cargo', description: 'Critical industrial spare part accepted at Express Counter.', status: 'PENDING', completed: true },
      { timestamp: '2026-05-27 20:30', location: 'Sydney Airport Gate 12', description: 'Customs cleared & registered for dangerous lithium unit exclusions. Loaded onto QF Cargo 777F Flight.', status: 'CUSTOMS_CLEARED', completed: true },
      { timestamp: '2026-05-27 22:40', location: 'Airborne Flight #AFA-98', description: 'Departed Sydney Airport. Estimated flight time 4h 50 mins.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-28 03:30', location: 'Perth Airport Terminal', description: 'Landed at Perth Gate 5. Ground handlers unloading critical pallet cargo.', status: 'ARRIVED', completed: true },
      { timestamp: '2026-05-28 06:15', location: 'Perth Local Logistics', description: 'Consignment transferred to priority courier van. Out for last-mile delivery to Mine Site #4.', status: 'DELIVERED', completed: true },
      { timestamp: '2026-05-28 07:10', location: 'Perth - Gate 3 Receiving', description: 'Delivered in full to Mining Logistics desk. Signed by H. Henderson.', status: 'DELIVERED', completed: true }
    ]
  },
  'AFA-SEA-500F': {
    trackingId: 'AFA-SEA-500F',
    mode: 'SEA',
    origin: 'Port of Singapore International',
    destination: 'Port of Brisbane Container Port',
    cargoType: 'Dry Bulk / FMCG consolidated',
    weightKg: 24000,
    volumeM3: 68.0,
    dispatchedDate: '2026-05-20 12:00',
    estimatedDelivery: '2026-06-01 08:00',
    currentProgressPct: 60,
    statusHistory: [
      { timestamp: '2026-05-19 14:00', location: 'Port of Singapore Wharf', description: 'Container consolidated, certified & loaded onto container vessel "OOCL Oceanus".', status: 'PENDING', completed: true },
      { timestamp: '2026-05-20 12:00', location: 'Strait of Malacca Transit', description: 'Port clearance granted. Ship traveling at average speed 19.5 knots towards Australia.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-24 16:30', location: 'Arafura Sea Passage', description: 'Mid-voyage coordinates confirmed. Wave telemetry stable. Container power monitors active.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-28 05:00', location: 'Coral Sea Waters', description: 'Entering Australian maritime airspace boundary. Remote electronic manifest delivered to ABF.', status: 'IN_TRANSIT', completed: true },
      { timestamp: '2026-05-30 11:30', location: 'Moreton Bay Anchors', description: 'Scheduled pilots alignment and harbor queue assignment.', status: 'ARRIVED', completed: false },
      { timestamp: '2026-06-01 08:00', location: 'Brisbane Port Terminal', description: 'Unloading crane queue and bio-security inspections.', status: 'DELIVERED', completed: false }
    ]
  }
};
