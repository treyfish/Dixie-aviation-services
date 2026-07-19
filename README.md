# Cross City Airport (KCTY) — Website

Modern website for Cross City Airport (ICAO **KCTY** / FAA **CTY**), Dixie County, Florida, and its FBO, **Dixie Aviation Services**.

Built to replace the county's thin airport page with:

- **Live AWOS weather** — pulled from the free NWS API (`api.weather.gov/stations/KCTY/observations/latest`), with an AviationWeather.gov METAR fallback. If both feeds fail or the observation goes stale, the widget degrades gracefully and points pilots to the AWOS broadcast (120.775) and phone line ((352) 498-0221). No vendor widgets, no direct AWOS-box integration to break.
- **Pilot data block** — identifiers, coordinates, elevation, both runways, CTAF/UNICOM 122.8, AWOS, Jacksonville Center frequencies, RNAV 31 approach note, NOTAM/SkyVector/AirNav links.
- **FBO & fuel** — 100LL and Jet-A, services, and the courtesy car. Prices are deliberately *not* hardcoded (they go stale); the site says "call for current prices" and links AirNav.
- **"KCTY Through Time"** — a scroll-driven history tour: 1940 civil field → WWII Cross City Army Airfield (P-39s, P-47s, Air Commando L-birds) → Cold War Cross City AFS / 691st Radar Squadron (SAGE) → 1972 prison conversion → the still-operational JSS radar today. Sources are cited on-page, including the 691st-vs-891st correction.
- **Events, Hidden Coast visitor info, economic impact, and contacts.**

## Stack

Plain HTML + CSS + vanilla JS. No frameworks, no build step, no CDNs, no API keys. Host it anywhere — GitHub Pages, county web server, any static host.

```
index.html        # the whole site (single page, anchored sections)
css/styles.css    # styles; mobile-first, honors prefers-reduced-motion
js/weather.js     # live weather widget (NWS primary, AWC fallback)
js/tour.js        # scroll-reveal for the history tour + mobile nav
```

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

(Opening `index.html` directly also works; the weather APIs allow CORS from any origin.)

## Before launch — verify with the airport

Per the research dossier this site was built from:

- Confirm all operational data (hours, contacts, fuel offerings, phone numbers) with the airport manager (Clint Beauchamp, (352) 498-6656).
- Confirm the county's preferred host and who approves content.
- Add real photography: golden-hour ramp/runway shots for the hero and "Today" era, and archival imagery for the tour (see the photo source book — Wikimedia Commons/USAF photos are public domain; radomes.org photos need permission from the Air Defense Radar Veterans' Association).

## Content notes

- History facts follow the Cross City **Air Force Station** record (691st Radar Squadron, 1958–1970) — the Wikipedia *airport* article's "891st, 1959–1969" is incorrect.
- Weather data on the page is labeled advisory; the AWOS broadcast/phone are stated as authoritative for flight decisions.
