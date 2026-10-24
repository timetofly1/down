# Requirements: down. native app

## Introduction

Build the down. iOS app as a real, installable React Native app that matches the Prototype v3 design exactly: every color, size, radius, font, spacing value, animation and interaction. Reference screen images and an 18-page visual spec define the target. All sizes are points on a 390×844 iPhone canvas. The demo runs on seed data only.

## Requirement 1: Lock screen (demo entry)

**User story:** As a demo viewer, I want the app to open on a phone lock screen with down. notifications, so the story starts the way real users would meet it.

#### Acceptance criteria
1. WHEN the app launches THEN the app SHALL show "Monday, November 2" (Geist 600 19) and "9:41" (Bricolage 700 98/1, −0.04em) on the lock-screen gradient.
2. The app SHALL show three stacked glass notifications (scale 1/.98/.96, opacity 1/.92/.82): "It's on: Salsa under the lights", "Priya pitched a plan", "Lan's supper is 1 away".
3. WHEN the user taps the first notification THEN the app SHALL open **It's on** for Salsa with Salsa at 150/150 and the user down.
4. WHEN the user taps the second notification THEN the app SHALL open the Squad tab.
5. WHEN the user taps the third notification THEN the app SHALL open Plan detail for Lan's supper.
6. WHEN the user swipes up or taps "Swipe up to open" THEN the app SHALL open onboarding.

## Requirement 2: Onboarding (screens 01–03)

**User story:** As a new user, I want to pick my vibes and get neighborhoods I've never been to, so the deck feels made for me.

#### Acceptance criteria
1. The app SHALL show 3 progress bars (flex 1, h4, radius 2, gap 6), ink up to the current step.
2. Welcome SHALL show "down." (Bricolage 800 108/.85, cream dot), the headline, body copy, a 58pt "Get started" button and "I already have an account".
3. Pick vibes SHALL offer 10 chips (h48, radius 24). WHILE fewer than 3 are picked THEN the CTA SHALL read "Pick N more" and be disabled; at 3+ it SHALL read "Next · N picked".
4. Suggested neighborhoods SHALL rank the 5 neighborhoods by vibe overlap, show the top 4 and preselect the top 2.
5. WHEN the user taps "Start swiping" THEN the app SHALL open the Swipe tab.
6. WHEN the user taps "I already have an account" THEN the app SHALL skip to the Swipe tab.

## Requirement 3: Swipe deck (screen 05)

**User story:** As a user, I want to swipe on plans before they exist, so I can signal what I'd show up to.

#### Acceptance criteria
1. The header SHALL show the "down." wordmark button (with a going-count badge when > 0), the "Dorchester, Boston" location chip, a bell with unread badge, and the "YO" avatar.
2. Filter chips (For you, City & public, Local hosts, Brands, Causes) SHALL filter the deck by category.
3. Each card SHALL be a ticket (≈362×524, radius 26) with 13pt notches 98pt above the bottom, a 206pt photo window, tags, friends chip, title, host row, WHEN/WHERE/ENTRY grid, dashed perforation, and a stub with count, progress bar, barcode and ticket number (count+1, zero-padded to 3).
4. WHILE dragging THEN the top card SHALL follow translate(dx, dy×0.5) rotate(dx/16°), and cards 2 and 3 SHALL rise and scale with p = min(1, |dx|/120).
5. The "I'M DOWN" and "NAH" stamps SHALL fade in with clamp(dx/90) and clamp(−dx/90).
6. WHEN released with dx > 100 THEN the card SHALL fly right (±560, +40, 300ms) and count as down; WHEN dx < −100 THEN it SHALL fly left; otherwise it SHALL spring back in 320ms cubic-bezier(.2,.8,.2,1).
7. WHEN movement is under 6pt THEN the release SHALL count as a tap and open Plan detail.
8. The action row SHALL provide Nah (56 glass), I'm down (flex, h60, ink) and Send to squad (46 glass).
9. WHEN the deck is empty THEN the app SHALL show "That's every plan near you." with Start over and Pitch a plan.

## Requirement 4: Plan detail (screen 06)

#### Acceptance criteria
1. The sheet SHALL slide up from top 54 (translateY 105% → 0, 450ms cubic-bezier(.2,.9,.2,1)) over a blurred backdrop that closes all sheets on tap.
2. It SHALL show the hero, tags, title (Bricolage 800 32), host row with Follow toggle, blurb, WHEN/WHERE tiles, and the 4-stage tracker (Pitched, Heating up, It's on, Happened).
3. The stage SHALL be: count ≥ goal → It's on; ≥ 50% → Heating up; else Pitched.
4. The progress card SHALL show count/goal, "closes in", a 10pt bar, who's down avatars and the "N people backing this have never been to <hood>" callout.
5. Each poll SHALL allow one vote per user (changeable) and animate result bars with percentages.
6. The sticky footer SHALL show the price and a CTA: "I'm down" → "Lock it in" → "You're locked in".

## Requirement 5: Lock it in (screen 07)

#### Acceptance criteria
1. Paid plans SHALL offer "Free RSVP" ($0) and "Early-bird · $N"; free plans SHALL offer "Free RSVP" and "Back the host · $5".
2. The terms box SHALL explain the hold ("Your card is held, not charged…") or the free path ("No card needed…").
3. WHEN the user confirms THEN the CTA SHALL show a spinner and "Locking in…" for 1.1s, then "You're backer #N."
4. IF the lock hits the goal THEN It's on SHALL open after 900ms.

## Requirement 6: It's on (screen 08)

#### Acceptance criteria
1. The screen SHALL be full-screen accent orange, entering with opacity 0→1 (400ms) and scale 1.04→1 (500ms).
2. It SHALL show "150 OF 150 DOWN · GOAL HIT", "It's on." (Bricolage 800 92/.86), the host's first word in the sub copy, and a ticket that rises from translateY(120%) rotate(−6°) over 700ms with a 150ms delay.
3. The ticket SHALL include a 21×21 QR with 3 finder squares, "Admit 1 · Free RSVP" and the charge line.
4. The app SHALL NOT show a top notification banner for this moment.

## Requirement 7: You're going, Inbox, Toast

1. WHEN the user taps the wordmark THEN a glass panel SHALL list plans they're down for, with "IT'S ON" or "N TO GO" pills.
2. The Inbox sheet SHALL list 5 items with the first 3 unread until "Mark all read".
3. Toasts SHALL slide from the top (translateY −130% → 0, 400ms) with a conic progress ring and auto-hide after 2.6s.

## Requirement 8: Map (screen 10)

1. The map SHALL show every plan as a pin (46 conic ring + 36 inner + label chip); the selected pin SHALL scale 1.22 with an ink center.
2. Chips (Everything / New to you / Almost there) SHALL dim non-matching pins to opacity .3.
3. The bottom sheet SHALL show the selected plan with "See the plan" and "I'm down" / "You're down".
(The real-map upgrade is specified in `.kiro/specs/boston-map`.)

## Requirement 9: Squad chat (screen 11)

1. The feed SHALL show the seeded messages in order, a shared plan card and the "Which night works?" poll (tap to vote as You).
2. The footer SHALL show "2 of 4 down for Fades" with "Lock it in together", and a composer that sends on Enter.

## Requirement 10: Pitch a plan (screens 12–13)

1. A 4-step sheet SHALL collect what & where, goal & price (stepper 4–60), a poll, and a preview.
2. WHEN the user taps "Pitch it" THEN the app SHALL create the plan (creator counted as 1 down), post it to Squad, toast "Pitched to the dot squad", and 1.8s later Priya SHALL join (+1) and reply.

## Requirement 11: Host (screen 14) and Profile (screen 15)

1. Host SHALL show earnings (week $1,284 / month $4,920) with a bar chart, Cash out, a week/month calendar with event markers and agenda, breakdown, insight and Your plans.
2. Profile SHALL slide in from the right and show stats and the Passport: 5 stamped neighborhoods, Nubian Sq "Soon" when down for Salsa, and 3 "Not yet" stamps.

## Requirement 12: Platforms and quality

1. The same codebase SHALL run on iPhone (Expo Go, no App Store review), Android and the web.
2. Every screen SHALL match the reference within 1–2pt, with no white or cream gaps outside cards and sheets.
3. All copy SHALL match the spec word for word.
