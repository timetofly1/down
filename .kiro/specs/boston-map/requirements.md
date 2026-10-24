# Requirements: real Boston map

## Introduction

Replace the illustrated map with a real OpenStreetMap of Boston and its close neighborhoods, styled in the down. palette, with every plan pinned at its real venue.

## Requirement 1: Real geography
**User story:** As a user, I want to see where plans actually are in Boston, so I can picture getting there.
1. The map SHALL cover Boston and close neighborhoods only: roughly Chinatown, Back Bay, South End, South Boston, East Boston, Roxbury, Jamaica Plain, Dorchester and Mattapan (bbox 42.235–42.405 N, 71.160–70.985 W).
2. The map SHALL show water (harbor, Charles River, ponds), parks and the street network from OpenStreetMap data.
3. The map SHALL credit "© OpenStreetMap contributors · OpenFreeMap".

## Requirement 2: On brand
1. The map SHALL sit on the app's orange gradient and use only the design's map colors: water `rgba(150,35,0,.22)`, parks `rgba(255,253,248,.2)`, major roads `rgba(255,253,248,.45)`, smaller streets fading to `.10`.
2. Neighborhood labels SHALL use Geist Mono 600 10, +0.14em, `rgba(21,18,15,.55)`; DORCHESTER (home) SHALL be ink.

## Requirement 3: Pins at real venues
1. Each plan SHALL be pinned at its venue: Nubian Square Plaza (Salsa), Fields Corner (Fades), a kitchen near Fields Corner (Phở), Franklin Park Playstead (5K), Kneeland St garage (Swap), Piers Park (Cleanup), Codman Square Branch Library (Zines).
2. A pitched plan SHALL be pinned at its chosen neighborhood.
3. The "you" dot SHALL be in Dorchester.

## Requirement 4: Interaction
1. WHEN the user drags THEN the map SHALL pan, clamped to the map bounds, with momentum on release.
2. Tapping a pin SHALL select it (scale 1.22) without starting a pan.

## Requirement 5: Reliable demo
1. The map SHALL work offline and on any network (no runtime tile requests, no API keys).
2. The map asset SHALL stay under 1 MB.
