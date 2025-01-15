document.addEventListener("DOMContentLoaded", () => {
  const getLocationBtn = document.getElementById("get-location");
  const locationDetails = document.getElementById("location-details");
  const latitudeSpan = document.getElementById("latitude");
  const longitudeSpan = document.getElementById("longitude");
  const accuracySpan = document.getElementById("accuracy");
  const mapDiv = document.getElementById("map");
  const showOnMapBtn = document.getElementById("show-on-map");

  getLocationBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        latitudeSpan.textContent = latitude.toFixed(6);
        longitudeSpan.textContent = longitude.toFixed(6);
        accuracySpan.textContent = accuracy.toFixed(2);
        locationDetails.classList.remove("hidden");
      },
      (error) => {
        alert("Unable to retrieve location: " + error.message);
      }
    );
  });

  showOnMapBtn.addEventListener("click", () => {
    const latitude = parseFloat(latitudeSpan.textContent);
    const longitude = parseFloat(longitudeSpan.textContent);

    if (!latitude || !longitude) {
      alert("No location available to show on the map.");
      return;
    }

    mapDiv.classList.remove("hidden");

    // Static Map URL or Image
    const map = new Image();
    map.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x300&markers=color:red|${latitude},${longitude}&key=AIzaSyBfCAI9yrsePygEh042pRg0WvbJUbeKRqg`;
    map.alt = "Map showing your location";
    map.style.width = "100%"; // Make the map image fill the container width
    map.style.height = "100%"; // Make the map image fill the container height

    mapDiv.innerHTML = ""; // Clear previous map
    mapDiv.appendChild(map);
  });
});
