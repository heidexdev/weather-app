import eventHandler from "./eventHandler.js";

const ui = (function () {
  function render() {
    const data = eventHandler.getLastResult();
    const weather = {
      // ── Location ─────────────────────────────────────
      location: data.resolvedAddress, // "tehran"
      timezone: data.timezone, // "Asia/Tehran"

      // ── Live "right now" card ────────────────────────
      current: {
        temp: data.currentConditions.temp, // 22
        humidity: data.currentConditions.humidity, // 27
        precipProb: data.currentConditions.precipprob, // 0
        windSpeed: data.currentConditions.windspeed, // 11.5
        conditions: data.currentConditions.conditions, // "Partially cloudy"
        icon: data.currentConditions.icon, // "partly-cloudy-day"
        observedAt: data.currentConditions.datetime, // "17:00:00"
      },

      // ── Today's summary card ─────────────────────────
      today: {
        date: data.days[0].datetime, // "2026-10-24"
        high: data.days[0].tempmax, // 23
        low: data.days[0].tempmin, // 16.2
        avg: data.days[0].temp, // 20
        humidity: data.days[0].humidity, // 33.7
        precipProb: data.days[0].precipprob, // 0
        windSpeed: data.days[0].windspeed, // 18.3
        conditions: data.days[0].conditions, // "Partially cloudy"
        summary: data.days[0].description, // "Clearing in the afternoon."
        icon: data.days[0].icon, // "partly-cloudy-day"
        sunrise: data.days[0].sunrise, // "06:18:44"
        sunset: data.days[0].sunset, // "17:18:10"
      },
    };
  }
  return { render };
})();
export default ui;
