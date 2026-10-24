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
    const locationName = searchInput.value;
    const result = await getData(locationName);
    searchInput.value = "";
    lastResult = result;
    console.log(result);
    ui.render();
  }
  function getLastResult() {
    return lastResult;
  }
  return { searchListener, getLastResult };
})();
export default eventHandler;
