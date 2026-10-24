import getData from "./fetch.js";
import ui from "./ui.js";
const eventHandler = (function () {
  const searchInput = document.querySelector(".search");
  const searchBtn = document.querySelector(".search-btn");

  function searchListener() {
    searchBtn.addEventListener("click", callGetData);
  }
  let lastResult = null;

  async function callGetData() {
    const locationName = searchInput.value.trim();
    if (!locationName) return; // ignore empty search

    ui.setLoading(true); // ← show spinner
    try {
      const result = await getData(locationName);
      lastResult = result;
      ui.render(); // render handles undefined → error state
    } finally {
      ui.setLoading(false); // ← hide spinner no matter what
      searchInput.value = "";
    }
  }
  function getLastResult() {
    return lastResult;
  }
  return { searchListener, getLastResult };
})();
export default eventHandler;
