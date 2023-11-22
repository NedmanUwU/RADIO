const container = document.querySelector(".container");

//fetches the data from the SR API
async function getRadioStations() {
  try {
    const response = await fetch("http://api.sr.se/api/v2/channels?format=json&size=100");
    const data = await response.json();

    //goes through each channel in the data and creates all the html elements necessary for each station
    data.channels.forEach((station) => {
      const stationElement = document.createElement("div");
      stationElement.setAttribute("class", "station");

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
      
      //sets backgroundcolor of each station
      stationElement.style.backgroundColor = `#${station.color}`;

                    //Toggles tagline for stations when pressing logo or name
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
getRadioStations();