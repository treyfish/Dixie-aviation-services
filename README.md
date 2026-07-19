# Cross City Airport (KCTY) — Website

Modern website for Cross City Airport (ICAO **KCTY** / FAA **CTY**), Dixie County, Florida, and its FBO, **Dixie Aviation Services**.

Built to replace the county's thin airport page with:

- **Live AWOS weather** — pulled from the free NWS API (`api.weather.gov/stations/KCTY/observations/latest`), with an AviationWeather.gov METAR fallback. If both feeds fail or the observation goes stale, the widget degrades gracefully and points pilots to the AWOS broadcast (120.775) and phone line ((352) 498-0221). No vendor widgets, no direct AWOS-box integration to break.
- **Pilot data block** — identifiers, coordinates, elevation, both runways, CTAF/UNICOM 122.8, AWOS, Jacksonville Center frequencies, RNAV 31 approach note, NOTAM/SkyVector/AirNav links.
- **FBO & fuel** — 100LL and Jet-A, services, and the courtesy car. Prices are deliberately *not* hardcoded (they go stale); the site says "call for current prices" and links AirNav.
- **"KCTY Through Time"** — a scroll-driven history tour: 1940 civil field → WWII Cross City Army Airfield (P-39s, P-47s, Air Commando L-birds) → Cold War Cross City AFS / 691st Radar Squadron (SAGE) → 1972 prison conversion → the still-operational JSS radar today. Sources are cited on-page, including the 691st-vs-891st correction.
- **Events, Hidden Coast visitor info, economic impact, and contacts.**

## Stack

Plain HTML + CSS + vanilla JS. No frameworks, no build step, no API keys. Host it anywhere — GitHub Pages, county web server, any static host. Web fonts (Instrument Serif, Inter, IBM Plex Mono) load from Google Fonts with system-font fallbacks.

```
index.html        # the whole site (single page, anchored sections)
css/styles.css    # Heritage Editorial design system (warm paper/ink/olive/orange palette)
js/weather.js     # live weather widget (NWS primary, AWC fallback)
js/tour.js        # header state, mobile nav, subtle reveals, image-failure fallback
```

Design follows the "Heritage Editorial + Archive Field Manual + Executive FBO" direction:
editorial serif display type, monospace operational/archival annotations, hairline-and-column
layouts instead of cards, a dark operational strip for live field conditions, and the history
told as four editorial chapters with museum-style captions. All content remains visible with
JavaScript disabled, and animations honor `prefers-reduced-motion`.

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
- Add your own photography: golden-hour ramp/runway shots for the hero and "Today" era would beat the stock imagery currently in place.

## Imagery

History-tour and contact-section images are hotlinked from Wikimedia Commons (hotlinking is
supported by Wikimedia's CDN). Every file was license-verified on its Commons file page:

| Image | Used in | License / credit |
|---|---|---|
| Bell P-39 firing all weapons at night | 1942 era | PD (U.S. Air Force) |
| Republic P-47N in flight | 1943 era | PD (U.S. Air Force) |
| Stinson L-5 Sentinel | 1944 era | San Diego Air & Space Museum Archives — no known restrictions |
| Cross City AAF 1944 aerial | 1945 era | PD (USGS) |
| Cross City AFS station photo | 1958 era | PD (U.S. Air Force) |
| SAGE control room | 1960 era | PD (U.S. Air Force) |
| Cross City Airport 1999 orthophoto | 1972 era | PD (USGS) |
| Airport panorama (2010) | Today era | **CC BY-SA 3.0 — WillMcC** (credit required, kept in caption) |
| Entrance road (2024) | Contact | **CC BY 4.0 — DanTD** (credit required, kept in caption) |

If you later self-host these images, keep the caption credit lines for the two CC-licensed
photos — the rest are public domain and the credits are courtesy only.

Not yet included: the 1944 Florida air-defense chart on Florida Memory
(floridamemory.com/items/show/147045) — the site blocks automated fetching, so it couldn't be
verified from this environment. Download it manually in a browser (item is marked Public Domain
per the research dossier) and add it to the 1942 era if wanted. Radomes.org photos (main gate,
housing, commander's house) need permission from the Air Defense Radar Veterans' Association
before use.

## Content notes

- History facts follow the Cross City **Air Force Station** record (691st Radar Squadron, 1958–1970) — the Wikipedia *airport* article's "891st, 1959–1969" is incorrect.
- Weather data on the page is labeled advisory; the AWOS broadcast/phone are stated as authoritative for flight decisions.
