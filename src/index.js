window.addEventListener("load", function () {
    const wrapper = document.querySelector(".wraper");
    wrapper.classList.add("show");
});

function calculate() {
    // Pobierz wartości z pól formularza
    let amount = parseFloat(document.getElementById("amount").value);
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;

    if (fromCurrency === "PLN") {
        // Jeśli waluta źródłowa to PLN
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`)
            .then(response => response.json())
            .then(data => {
                // Pobierz kurs waluty docelowej
                let toRate = data.rates[0].mid;
                 // Oblicz wynik jako kwota podzielona przez kurs docelowy
                let result = amount / toRate; 
                 // Oblicz wynik jako kwota podzielona przez kurs docelowy
                document.getElementById("result").innerHTML = result.toFixed(2) + " " + toCurrency;
            })
            .catch(error => {
                console.error('Błąd przy pobieraniu kursu waluty docelowej:', error);
            });
    } else if (toCurrency === "PLN") {
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${fromCurrency}/`)
        .then(response => response.json())
        .then(data => {
            let toRate = data.rates[0].mid;
            let result = amount * toRate;
            document.getElementById("result").innerHTML = result.toFixed(2) + " " + toCurrency;
        })
        .catch(error => {
            console.error("Błąd przy pobieraniu kursu waluty docelowej:", error);
        })
    } else {
        // Jeśli waluta źródłowa to inna niż PLN
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${fromCurrency}/`)
            .then(response => response.json())
            .then(data => {
                // Jeśli waluta źródłowa to inna niż PLN
                let fromRate = data.rates[0].mid;

                fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`)
                    .then(response => response.json())
                    // Jeśli waluta źródłowa to inna niż PLN
                    .then(data => {
                        let toRate = data.rates[0].mid;

                        // Oblicz wynik jako (kwota * kurs źródłowy) / kurs docelowy
                        let result = (amount / fromRate) * toRate;
                        // Wyświetl wynik z uwzględnieniem waluty docelowej
                        document.getElementById("result").innerHTML = result.toFixed(2) + " " + toCurrency;
                    })
                    .catch(error => {
                        console.error('Błąd przy pobieraniu kursu waluty docelowej:', error);
                    });
            })
            .catch(error => {
                console.error('Błąd przy pobieraniu kursu waluty źródłowej:', error);
            });
    }
}