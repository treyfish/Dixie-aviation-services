# KCTY Site — "The Smart Stop with a Story" Plan

Goal: keep the Heritage Editorial design and the history exhibit (nobody else has it),
and add Williston-style commercial punch — a clear fuel-stop value proposition backed
by real numbers and real local photos. Their pitch works because every claim is
specific and true; ours will only work the same way. Nothing goes on the site until
it's confirmed.

---

## Phase 1 — Numbers & facts to gather (Trey)

The value proposition lives or dies on these. Source them from the FBO/county records
and write them down; approximations are fine if labeled ("500,000+" style rounding is
what Williston does).

Fuel & fees (the core pitch):
- [ ] Gallons pumped per year (100LL and Jet-A, combined or split)
- [ ] Current fuel prices, and how often they change
- [ ] Self-serve: available 24/7 or attended hours only?
- [ ] Ramp fee? Landing fee? Overnight tiedown fee? — exactly what is free
- [ ] Typical quick-turn time if the FBO wants to claim one

Field & community:
- [ ] Current based-aircraft count (FDOT profile said 13 in 2023 — verify)
- [ ] FBO email address (Williston publishes theirs; we should too)
- [ ] Facebook or other social page URL, if one exists
- [ ] Amenities worth naming: pilot lounge? wifi? flight-planning computer?
      restrooms? vending/coffee? conference space?
- [ ] Courtesy car: how many, how far can visitors take them, any time limit
- [ ] Next Fly-In date, if scheduled

Verify while you're at it (dossier flagged these as unconfirmed):
- [ ] Attended hours still 0800–1700
- [ ] Manager contact still Clint Beauchamp / (352) 498-6656
- [ ] AWOS phone still (352) 498-0221

## Phase 2 — Photo shot list (Trey)

Phone camera is fine. Shoot landscape/wide, ideally golden hour, largest quality
setting. Get more than you think you need — editing down is easy.

Priority (these replace hotlinked/stock-feel imagery):
1. Ramp + runway, golden hour, wide — the new hero
2. Fuel farm and self-serve pump, close enough to read the sign
3. Courtesy car, ideally with the airport or FBO sign in frame
4. FBO terminal — outside and inside (lounge/seating if presentable)
5. Runway threshold numbers (4, 22, 13, 31) — also useful as section art

Nice to have:
6. AWOS station
7. The JSS radar dome in the distance (from public property)
8. Visiting aircraft on a busy day; any fly-in photos you already have
9. Entrance sign from the road
10. Anything Hidden Coast: the trail crossing, a load of scallops, Putnam Lodge

Getting them to me: commit to an `img/` folder in this repo (any filenames), or
drop them in the chat. I'll handle resizing, compression (WebP + fallback), and
alt text.

## Phase 3 — Build (Claude, once Phases 1–2 land)

1. **Hero refresh** — real photo replaces the Wikimedia panorama. Headline shifts
   toward the value proposition (ours, not Williston's words — e.g. "The smart
   stop on the Hidden Coast, since 1940"), with the history as the supporting
   line. Exact wording decided when we see which numbers are strongest.
2. **Numbers band** — a restrained stat strip near the hero, editorial style, only
   confirmed figures: gallons/year, no-fee policy, based aircraft, "since 1940."
3. **Ops strip additions** — fees ("No ramp or landing fees" if true) and
   self-serve hours join fuel/frequencies.
4. **Fuel price display** — a clearly dated, manually updated price block
   ("updated <date>") — a 30-second edit when prices change; automate later
   only if it proves annoying.
5. **Contact upgrades** — FBO email, social link, named amenities.
6. **Photo swap-through** — local photos into FBO, contact, and "Today" history
   chapter; CC-licensed Wikimedia images retired or kept only where they're the
   only option (their credit lines stay as long as they're used).
7. **SEO pass** — Open Graph tags, airport schema.org markup, meta descriptions,
   so "Cross City Airport" and "KCTY fuel" searches land here.

What does NOT change: the history exhibit, the live weather engine, the pilot data
section, the design system. The history is the differentiator no fuel-stop site can
copy — the smart-stop pitch gets pilots here once; the story is why they remember it.

## Later / optional

- Custom domain (e.g. crosscityairport.org) pointed at the Vercel project
- Simple analytics (Vercel Analytics is one toggle) to see what pilots read
- Florida Memory 1944 air-defense chart — download manually (their site blocks
  bots): https://www.floridamemory.com/items/show/147045 → add to the 1942 chapter
- Radomes.org permission email for station photos (main gate, commander's house)
- A quote from a 691st veteran via the Air Defense Radar Veterans' Association
