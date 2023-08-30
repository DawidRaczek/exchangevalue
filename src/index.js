function calculate() {
    let amount = parseFloat(document.getElementById("amount").value);
    let fromCurrency = document.getElementById("fromCurrency").value;
    let toCurrency = document.getElementById("toCurrency").value;

    if (fromCurrency === "PLN") {
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`)
            .then(response => response.json())
            .then(data => {
                let toRate = data.rates[0].mid;
                let result = amount / toRate;  // Poprawka tutaj
                document.getElementById("result").innerHTML = result.toFixed(2) + " " + toCurrency;
            })
            .catch(error => {
                console.error('Błąd przy pobieraniu kursu waluty docelowej:', error);
            });
    } else {
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${fromCurrency}/`)
            .then(response => response.json())
            .then(data => {
                let fromRate = data.rates[0].mid;

                fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`)
                    .then(response => response.json())
                    .then(data => {
                        let toRate = data.rates[0].mid;

                        let result = (amount / fromRate) * toRate;
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