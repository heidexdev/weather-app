async function getData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=DSJN3W5YN2RNU5EBDVXR3TDZ2`,
    );
    const data = await response.json();
    return data;
  } catch {
    return;
  }
}
export default getData;