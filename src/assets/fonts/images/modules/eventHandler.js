import getData from "./fetch.js";
const eventHandler = (function () {
  const searchInput = document.querySelector(".search");
  const searchBtn = document.querySelector(".search-btn");

  function searchListener() {
    searchBtn.addEventListener("click", () => {
      const locationName = searchInput.value;
      const result = getData(locationName);
      console.log(result);
    });
  }
  return { searchListener };
})();
export default eventHandler;
