function calculate() {
    var amount = parseFloat(document.getElementById("amount").value);
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;

    if (fromCurrency === "PLN") {
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`)
            .then(response => response.json())
            .then(data => {
                var toRate = data.rates[0].mid;
                var result = amount / toRate;  // Poprawka tutaj
                document.getElementById("result").innerHTML = result.toFixed(2) + " " + toCurrency;
            })
            .catch(error => {
                console.error('Błąd przy pobieraniu kursu waluty docelowej:', error);
            });
    } else {
        fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${fromCurrency}/`)
            .then(response => response.json())
            .then(data => {
                var fromRate = data.rates[0].mid;

                fetch(`http://api.nbp.pl/api/exchangerates/rates/A/${toCurrency}/`)
                    .then(response => response.json())
                    .then(data => {
                        var toRate = data.rates[0].mid;

                        var result = (amount / fromRate) * toRate;
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