async function getData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/today?key=DSJN3W5YN2RNU5EBDVXR3TDZ2&include=current,days&elements=datetime,temp,tempmax,tempmin,humidity,windspeed,precipprob,conditions,description,icon,sunrise,sunset&unitGroup=metric`,
    );
    const data = await response.json();
    return data;
  } catch {
    return;
  }
}
export default getData;
