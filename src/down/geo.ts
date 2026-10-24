/** Map projection + real Boston coordinates (must match scripts/build-map.py). */
import MAP from '../../assets/map/map.json';

export { MAP };
export const MAP_IMG = require('../../assets/map/boston.png');


export function project(lat: number, lng: number) {
  const n = 2 ** MAP.z * 256;
  const x = ((lng + 180) / 360) * n;
  const r = (lat * Math.PI) / 180;
  const y = ((1 - Math.log(Math.tan(r) + 1 / Math.cos(r)) / Math.PI) / 2) * n;
  return { x: (x - MAP.x0) * MAP.k, y: (y - MAP.y0) * MAP.k };
}

/** Real venue locations for the seed plans. */
export const PLAN_LL: Record<string, [number, number]> = {
  salsa: [42.3292, -71.0838],   // Nubian Square Plaza, Roxbury
  fade: [42.3001, -71.0617],    // Fields Corner, Dorchester
  pho: [42.2928, -71.0522],     // a kitchen near Fields Corner
  run: [42.3093, -71.0927],     // Franklin Park, Playstead
  sneaker: [42.3486, -71.0610], // Kneeland St garage, Chinatown
  harbor: [42.3640, -71.0343],  // Piers Park, East Boston
  zine: [42.2896, -71.0712],    // Codman Square Branch Library
};
export const HOOD_LL: Record<string, [number, number]> = {
  Chinatown: [42.3515, -71.0628], 'Nubian Square': [42.3292, -71.0838], 'East Boston': [42.3702, -71.0389],
  'Fields Corner': [42.3001, -71.0617], 'Jamaica Plain': [42.3097, -71.1151],
};
export const YOU_LL: [number, number] = [42.3155, -71.0605]; // Dorchester

export const LABELS: [string, number, number, boolean?][] = [
  ['CHINATOWN', 42.3536, -71.0705],
  ['EAST BOSTON', 42.3772, -71.0340],
  ['SOUTH BOSTON', 42.3378, -71.0470],
  ['ROXBURY', 42.3225, -71.0990],
  ['JAMAICA PLAIN', 42.3170, -71.1260],
  ['DORCHESTER', 42.3045, -71.0545, true],
  ['MATTAPAN', 42.2745, -71.0965],
  ['BACK BAY', 42.3520, -71.0890],
  ['SOUTH END', 42.3405, -71.0790],
];

