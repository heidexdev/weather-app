import eventHandler from "./eventHandler.js";

const ui = (function () {
  const weatherEl = document.querySelector(".weather");
  const statusEl = document.querySelector(".status");

  /* Visual Crossing icon names -> emoji */
  const ICONS = {
    "clear-day": "☀️",
    "clear-night": "🌙",
    "partly-cloudy-day": "⛅",
    "partly-cloudy-night": "☁️",
    cloudy: "☁️",
    rain: "🌧️",
    "showers-day": "🌦️",
    "showers-night": "🌧️",
    snow: "❄️",
    sleet: "🌨️",
    hail: "🌨️",
    fog: "🌫️",
    wind: "🌬️",
    "thunder-rain": "⛈️",
    "thunder-showers-day": "⛈️",
    "thunder-showers-night": "⛈️",
  };

  /* ---------- small helpers ---------- */

  function create(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  }

  function num(value, digits = 0, unit = "") {
    const n = Number(value);
    return Number.isFinite(n) ? `${n.toFixed(digits)}${unit}` : "—";
  }

  /* "17:00:00" -> "17:00" */
  function clock(value) {
    return typeof value === "string" && value.length >= 5
      ? value.slice(0, 5)
      : "—";
  }

  function emoji(name) {
    return ICONS[name] ?? "🌡️";
  }

  function stat(label, value) {
    const li = create("li", "stat");
    li.append(
      create("span", "stat__label", label),
      create("strong", "stat__value", value),
    );
    return li;
  }

  function setStatus(message, isError = false) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.classList.toggle("status--error", Boolean(message) && isError);
  }

  /* ---------- card builders ---------- */

  function buildCurrentCard(data) {
    const current = data.currentConditions ?? {};
    const card = create("article", "card card--current");

    const heading = create("div", "card__heading");
    heading.append(
      create("h2", "location", data.resolvedAddress ?? "Unknown location"),
      create(
        "p",
        "muted",
        `${data.timezone ?? "—"} · updated ${clock(current.datetime)}`,
      ),
    );

    const head = create("header", "card__head");
    head.append(heading, create("span", "icon", emoji(current.icon)));

    const temp = create("p", "temp");
    temp.append(
      create("span", "temp__value", num(current.temp, 0)),
      create("span", "temp__unit", "°C"),
    );

    const main = create("div", "current__main");
    main.append(temp, create("p", "conditions", current.conditions ?? "—"));

    const stats = create("ul", "stats");
    stats.append(
      stat("Humidity", num(current.humidity, 0, "%")),
      stat("Precip", num(current.precipprob, 0, "%")),
      stat("Wind", num(current.windspeed, 1, " km/h")),
    );

    card.append(head, main, stats);
    return card;
  }

  function buildTodayCard(data) {
    const today = data.days[0] ?? {};
    const card = create("article", "card card--today");

    const heading = create("div", "card__heading");
    heading.append(
      create("h3", "card__title", "Today"),
      create("p", "muted", today.datetime ?? "—"),
    );

    const head = create("header", "card__head");
    head.append(heading, create("span", "icon icon--small", emoji(today.icon)));

    const stats = create("ul", "stats");
    stats.append(
      stat("High", num(today.tempmax, 0, "°")),
      stat("Low", num(today.tempmin, 0, "°")),
      stat("Average", num(today.temp, 0, "°")),
      stat("Humidity", num(today.humidity, 0, "%")),
      stat("Precip", num(today.precipprob, 0, "%")),
      stat("Wind", num(today.windspeed, 1, " km/h")),
    );

    const sun = create("ul", "sun");
    sun.append(
      create("li", "sun__item", `🌅 Sunrise ${clock(today.sunrise)}`),
      create("li", "sun__item", `🌇 Sunset ${clock(today.sunset)}`),
    );

    const parts = [head];
    if (today.description) {
      parts.push(create("p", "summary", today.description));
    }
    parts.push(stats, sun);
    card.append(...parts);

    return card;
  }

  /* ---------- public API ---------- */

  function render(passedData) {
    // Works with eventHandler's ui.render() call, but also allows ui.render(data).
    const data = passedData ?? eventHandler.getLastResult();

    const valid =
      data &&
      data.currentConditions &&
      Array.isArray(data.days) &&
      data.days.length > 0;

    if (!valid) {
      weatherEl.replaceChildren();
      setStatus(
        "Couldn't load weather for that place. Try another search.",
        true,
      );
      return;
    }

    setStatus("");
    weatherEl.replaceChildren(buildCurrentCard(data), buildTodayCard(data));
  }
  function setLoading(isLoading) {
    document.body.classList.toggle("is-loading", isLoading);
    const btn = document.querySelector(".search-btn");
    if (btn) btn.disabled = isLoading;
    const input = document.querySelector(".search");
    if (input) input.disabled = isLoading;
  }
  return { render, setLoading };
})();

export default ui;
