const container = document.querySelector(".container");

async function getRadioStations() {
  try {
    const response = await fetch("http://api.sr.se/api/v2/channels?format=json&size=100");
    const data = await response.json();

    data.channels.forEach((station) => {
      const stationElement = document.createElement("div");
      stationElement.setAttribute("class", "station");

      stationElement.style.backgroundColor = `#${station.color}`;

      stationElement.innerHTML = `
      <div class="station-body">
      <img src="${station.image}" alt="${station.name}" id= "station-image">
      <div class="station-info">
        <h2 class = "station-name">${station.name}</h2>
        <p class = "station-desc">${station.tagline}</p>
        <audio controls  autobuffer>
          <source src="${station.liveaudio.url}" type="audio/mpeg">
          Your browser does not support the audio tag.
        </audio></div></div>
      `;

      stationElement.querySelector('img').addEventListener('click', () => {
        stationElement.classList.toggle('show-desc');
      });
      
      stationElement.querySelector('.station-name').addEventListener('click', () => {
        stationElement.classList.toggle('show-desc');
      });

      container.appendChild(stationElement);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

// Finally, it's showtime! We're calling our function to start the whole process.
getRadioStations();
