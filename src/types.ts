/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FreightMode = 'SEA' | 'LAND' | 'AIR';

export interface TransportState {
  code: string;
  name: string;
  latitude: number;
  longitude: number;
}

export interface CargoType {
  id: string;
  name: string;
  icon: string;
  multiplier: number;
  description: string;
}

export interface RouteOption {
  id: string;
  origin: string;
  destination: string;
  distanceKm: number;
  baseDays: {
    AIR: number;
    LAND: number;
    SEA: number;
  };
}

export interface ShipmentStatus {
  timestamp: string;
  location: string;
  description: string;
  status: 'PENDING' | 'IN_TRANSIT' | 'ARRIVED' | 'CUSTOMS_CLEARED' | 'DELIVERED';
  completed: boolean;
}

export interface TrackingData {
  trackingId: string;
  mode: FreightMode;
  origin: string;
  destination: string;
  cargoType: string;
  weightKg: number;
  volumeM3: number;
  dispatchedDate: string;
  estimatedDelivery: string;
  currentProgressPct: number;
  statusHistory: ShipmentStatus[];
}

export interface InstantQuoteRequest {
  origin: string;
  destination: string;
  mode: FreightMode;
  cargoTypeId: string;
  weightKg: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  priority: 'STANDARD' | 'EXPRESS' | 'SUPER_PRIORITY';
}

export interface InstantQuoteResult {
  baseCost: number;
  prioritySurcharge: number;
  fuelSurcharge: number;
  gst: number;
  totalCost: number;
  estimatedDays: number;
  carbonOffsetKg: number;
}
