window.addEventListener("load", function () {
    const wrapper = document.querySelector(".wraper");
    wrapper.classList.add("show");
});

// const apiKey = "5NZFPQF3BOMA5CS1";

// // funkcja do pobierania danych z API alpha Vantage

// function getData() {
//     const symbolSelect = document.getElementById("symbolSelect");
//     const selectedSymbol = symbolSelect.value;

// // utwórz URL zapytania do API alpha vantage
// const apiURL =  `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedSymbol}&apikey=${apiKey}`;

// // wykonaj zapytanie GET za pomocą Fetch API
// fetch(apiURL)
//     .then((Response) => {
//         if (!response.ok) {
//             throw new Error('Błąd: kod statusu ${response.status}');
//         }
//     return response.json();
//     })
// .then((data) => {
// // przetwarzaj dane i wyświetl je
// const dataContainer = document.getElementById("symbolSelect");
// dataContainer.innerHTML = JSON.stringify(data, null, 2);
// })
// .catch((error) => {
//     console.error('Wystąpił błąd: ${error}');
// });
// }

// // nasłuchuj kliknięcia przycisku
// const getdatabutton = document.getElementById("getdatabutton");
// getdatabutton.addEventListener("click", getData);

const apiKey = "5NZFPQF3BOMA5CS1";

    // Funkcja do pobierania danych z API Alpha Vantage
    function getData() {
      const symbolSelect = document.getElementById("symbolSelect");
      const selectedSymbol = symbolSelect.value;
      
      // Utwórz URL zapytania do API Alpha Vantage
      const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${selectedSymbol}&apikey=${apiKey}&outputsize=`;
      
      // Wykonaj zapytanie GET za pomocą Fetch API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Błąd: Kod statusu ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {

            const timeSeriesData = data["Time Series (Daily)"];
            const lastDay = Object.keys(timeSeriesData)[0];
            const lastDayData = timeSeriesData[lastDay];

          // Przetwarzaj dane i wyświetl je
          const dataContainer = document.getElementById("dataContainer");
          const openValue = Number(lastDayData["1. open"]);
          const highValue = Number(lastDayData["2. high"]);
          const lowValue = Number(lastDayData["3. low"]);
          const closeValue = Number(lastDayData["4. close"]);
          const volumeValue = Number(lastDayData["5. volume"]);
          const average = volumeValue * ((highValue + lowValue) / 2);   
          
          dataContainer.innerHTML = "Open: "+ openValue + "$" + "<br/>" +
                                    "High: " + highValue + "$" + "<br/>" +
                                    "Low: " + lowValue + "$" + "<br/>" +
                                    "Close: " + closeValue + "$" + "<br/>" +
                                    "Volume: " + volumeValue + "<br/>" +
                                    "Average: " + Math.round(average).toLocaleString('en-EN') + "$" + "<br/>";
        })
        .catch((error) => {
          console.error(`Wystąpił błąd: ${error.message}`);
        });
    }

    // Nasłuchuj kliknięcia przycisku
    const getDataButton = document.getElementById("getdatabutton");
    getDataButton.addEventListener("click", getData);