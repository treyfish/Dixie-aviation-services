/* =========================================================
   KCTY live weather widget
   Primary source:  NWS API (api.weather.gov) — free, no key, CORS-friendly
   Fallback source: AviationWeather.gov Data API (METAR JSON)
   Degrades gracefully: if both fail, points pilots to the
   AWOS broadcast (120.775) and phone line (352) 498-0221.
   ========================================================= */

(function () {
  "use strict";

  var STATION = "KCTY";
  var FIELD_ELEV_FT = 42;
  var NWS_URL = "https://api.weather.gov/stations/" + STATION + "/observations/latest";
  var AWC_URL = "https://aviationweather.gov/api/data/metar?ids=" + STATION + "&format=json";
  var STALE_MINUTES = 90;
  var REFRESH_MS = 5 * 60 * 1000; // re-poll every 5 minutes while the page is open

  var els = {
    status: document.getElementById("wx-status"),
    grid: document.getElementById("wx-grid"),
    metar: document.getElementById("wx-metar"),
    updated: document.getElementById("wx-updated"),
    wind: document.getElementById("wx-wind"),
    vis: document.getElementById("wx-vis"),
    sky: document.getElementById("wx-sky"),
    temp: document.getElementById("wx-temp"),
    alt: document.getElementById("wx-alt"),
    da: document.getElementById("wx-da")
  };

  if (!els.status) return; // widget not on this page

  /* ---------- unit helpers ---------- */

  function kmhToKt(kmh) { return kmh / 1.852; }
  function mpsToKt(mps) { return mps * 1.9438445; }
  function cToF(c) { return c * 9 / 5 + 32; }
  function paToInHg(pa) { return pa * 0.0002952998; }
  function hpaToInHg(hpa) { return hpa * 0.02952998; }
  function metersToSM(m) { return m / 1609.344; }

  function round(n, places) {
    var f = Math.pow(10, places || 0);
    return Math.round(n * f) / f;
  }

  function fmtVisSM(sm) {
    if (sm >= 10) return "10+ SM";
    if (sm >= 3) return round(sm, 0) + " SM";
    return round(sm, 1) + " SM";
  }

  function degToCompass(deg) {
    var dirs = ["N","NNE","NE","ENE","E","ESE","SE","SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return dirs[Math.round(deg / 22.5) % 16];
  }

  function fmtWind(dirDeg, spdKt, gustKt) {
    if (spdKt == null) return "—";
    if (spdKt < 1) return "Calm";
    var s = "";
    if (dirDeg == null) {
      s = "VRB";
    } else {
      var d = Math.round(dirDeg / 10) * 10;
      if (d === 0) d = 360;
      s = String(d).padStart(3, "0") + "° (" + degToCompass(dirDeg) + ")";
    }
    s += " @ " + Math.round(spdKt) + " kt";
    if (gustKt != null && gustKt > spdKt + 2) s += " G" + Math.round(gustKt);
    return s;
  }

  /* Estimated density altitude from altimeter setting + OAT.
     PA = field elev + (29.92 - altim) * 1000
     DA ≈ PA + 120 * (OAT°C - ISA°C at field elev)                  */
  function densityAlt(altimInHg, tempC) {
    if (altimInHg == null || tempC == null) return null;
    var pa = FIELD_ELEV_FT + (29.92 - altimInHg) * 1000;
    var isaC = 15 - (FIELD_ELEV_FT / 1000) * 2;
    return Math.round((pa + 120 * (tempC - isaC)) / 50) * 50;
  }

  function skyFromLayers(layers) {
    if (!layers || !layers.length) return null;
    var parts = [];
    for (var i = 0; i < layers.length; i++) {
      var L = layers[i];
      var amt = (L.amount || "").replace("_", " ");
      if (!amt) continue;
      if (amt === "CLR" || amt === "SKC") { parts.push("Clear"); continue; }
      var base = L.base && L.base.value != null ? Math.round(L.base.value * 3.28084 / 100) * 100 : null;
      parts.push(amt + (base != null ? " " + base.toLocaleString() + " ft" : ""));
    }
    return parts.length ? parts.join(", ") : null;
  }

  /* ---------- rendering ---------- */

  function ageMinutes(iso) {
    return (Date.now() - new Date(iso).getTime()) / 60000;
  }

  function render(obs) {
    els.wind.textContent = fmtWind(obs.windDirDeg, obs.windKt, obs.gustKt);
    els.vis.textContent = obs.visSM != null ? fmtVisSM(obs.visSM) : "—";
    els.sky.textContent = obs.sky || "—";
    els.temp.textContent = obs.tempC != null
      ? Math.round(obs.tempC) + "°C / " + Math.round(cToF(obs.tempC)) + "°F" +
        (obs.dewC != null ? " · DP " + Math.round(obs.dewC) + "°C" : "")
      : "—";
    els.alt.textContent = obs.altimInHg != null ? round(obs.altimInHg, 2).toFixed(2) + " inHg" : "—";
    var da = densityAlt(obs.altimInHg, obs.tempC);
    els.da.textContent = da != null ? "~" + da.toLocaleString() + " ft" : "—";

    if (obs.raw) {
      els.metar.textContent = obs.raw;
      els.metar.hidden = false;
    }
    els.grid.hidden = false;

    var mins = Math.max(0, Math.round(ageMinutes(obs.time)));
    var when = new Date(obs.time).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    els.updated.textContent = "Observed " + when + " local (" + mins + " min ago) · " + obs.source;

    if (mins > STALE_MINUTES) {
      els.status.className = "wx-status wx-error";
      els.status.textContent = "⚠ Latest observation is " + mins +
        " minutes old — the feed may be lagging. Call the AWOS at (352) 498-0221 for live conditions.";
    } else {
      els.status.className = "wx-status";
      els.status.textContent = "Current conditions at " + STATION;
    }
  }

  function renderFailure() {
    els.status.className = "wx-status wx-error";
    els.status.innerHTML =
      "Live weather is temporarily unavailable. " +
      "Get current conditions from the AWOS broadcast on <strong>120.775</strong> " +
      "or call <a href='tel:+13524980221' style='color:inherit'>(352)&nbsp;498-0221</a>.";
    els.updated.textContent = "";
  }

  /* ---------- sources ---------- */

  function val(v) { return v && v.value != null ? v.value : null; }

  function fromNWS(json) {
    var p = json.properties;
    if (!p || !p.timestamp) throw new Error("empty NWS observation");
    return {
      time: p.timestamp,
      windDirDeg: val(p.windDirection),
      windKt: val(p.windSpeed) != null ? kmhToKt(val(p.windSpeed)) : null,
      gustKt: val(p.windGust) != null ? kmhToKt(val(p.windGust)) : null,
      visSM: val(p.visibility) != null ? metersToSM(val(p.visibility)) : null,
      tempC: val(p.temperature),
      dewC: val(p.dewpoint),
      altimInHg: val(p.barometricPressure) != null ? paToInHg(val(p.barometricPressure)) : null,
      sky: skyFromLayers(p.cloudLayers) || p.textDescription || null,
      raw: p.rawMessage || null,
      source: "NWS / api.weather.gov"
    };
  }

  function fromAWC(json) {
    var m = json && json[0];
    if (!m) throw new Error("empty AWC METAR");
    var clouds = null;
    if (m.clouds && m.clouds.length) {
      clouds = m.clouds.map(function (c) {
        return c.cover + (c.base != null ? " " + Number(c.base).toLocaleString() + " ft" : "");
      }).join(", ");
    }
    var visSM = null;
    if (m.visib != null) {
      visSM = typeof m.visib === "string" ? parseFloat(m.visib) : m.visib; // "10+" parses to 10
    }
    return {
      time: m.reportTime ? m.reportTime + "Z" : new Date(m.obsTime * 1000).toISOString(),
      windDirDeg: typeof m.wdir === "number" ? m.wdir : null,
      windKt: m.wspd != null ? m.wspd : null,
      gustKt: m.wgst != null ? m.wgst : null,
      visSM: visSM,
      tempC: m.temp != null ? m.temp : null,
      dewC: m.dewp != null ? m.dewp : null,
      altimInHg: m.altim != null ? (m.altim > 100 ? hpaToInHg(m.altim) : m.altim) : null,
      sky: clouds,
      raw: m.rawOb || null,
      source: "AviationWeather.gov"
    };
  }

  function fetchJSON(url) {
    return fetch(url, { headers: { "Accept": "application/geo+json, application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status + " from " + url);
        return r.json();
      });
  }

  function update() {
    fetchJSON(NWS_URL)
      .then(fromNWS)
      .then(render)
      .catch(function () {
        return fetchJSON(AWC_URL).then(fromAWC).then(render).catch(renderFailure);
      });
  }

  update();
  setInterval(update, REFRESH_MS);
})();
