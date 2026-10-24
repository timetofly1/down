# Requirements: demo polish & launch

## Requirement 1: Event art
**User story:** As a user, I want each plan's card to show what the event feels like, so I can decide at a glance.
1. Every plan SHALL have an illustration: an orange field with black doodle line drawings depicting its theme (string lights + dancers; barber pole + clippers + mic; phở bowl + steam + chopsticks; sunrise + running shoe + jollof pot; facing sneakers + swap arrows + rooftops; harbor waves + pier + oyster; paper + scissors + collage; microphone for squad pitches).
2. The same art SHALL appear in every photo window: ticket card, detail hero, map thumbnail, squad shared card and pitch preview, cropped around a centered subject.

## Requirement 2: Celebration
1. WHEN It's on opens THEN the app SHALL burst confetti over the headline.
2. WHEN a booking is confirmed (lock-in "You're backer #N.") THEN the app SHALL burst confetti from the sheet.
3. WHEN the user taps the "It's on." headline THEN the confetti SHALL replay.
4. Confetti SHALL use brand colors (ink, cream, orange, peach, rust, green), never block taps, and clear itself after ~3s.

## Requirement 3: First-run flow
1. WHEN the user swipes up (or taps "Swipe up to open") on the lock screen THEN onboarding SHALL start; notification taps SHALL deep-link past it.
2. The lock screen SHALL support a real upward swipe (−70pt or a fast flick), not only a tap.

## Requirement 4: Ship it
1. The app SHALL be deployed to a short public URL on Vercel. (`imdown.vercel.app` belongs to another team, so the project is `imdownapp` → https://imdownapp.vercel.app.)
2. On desktop the web build SHALL show the phone frame; on a phone browser it SHALL run full-screen and support Add to Home Screen.
3. The repository SHALL include a README with the problem, value proposition, examples, screenshots and the demo link.
