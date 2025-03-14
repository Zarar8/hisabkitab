function generateSlip() {
    let month = document.getElementById("month").value;
    let totalPayout = parseFloat(document.getElementById("totalPayout").value);
    let amcEarnings = parseFloat(document.getElementById("amcEarnings").value);
    let cryptoEarnings = parseFloat(document.getElementById("cryptoEarnings").value);
    let stockEarnings = parseFloat(document.getElementById("stockEarnings").value);
    let exchangeRate = parseFloat(document.getElementById("exchangeRate").value);

    if (!month || isNaN(totalPayout) || isNaN(amcEarnings) || isNaN(cryptoEarnings) || isNaN(stockEarnings) || isNaN(exchangeRate)) {
        alert("Please fill in all fields correctly.");
        return;
    }

    // Equity Distribution
    let amcShares = {
        "Zarar Ahmed": (amcEarnings * 0.3333).toFixed(2),
        "Rajab": (amcEarnings * 0.3333).toFixed(2),
        "Muhammad Khan": (amcEarnings * 0.3333).toFixed(2)
    };

    let cryptoShares = {
        "Zarar Ahmed": (cryptoEarnings * 0.5).toFixed(2),
        "Muhammad Khan": (cryptoEarnings * 0.5).toFixed(2)
    };

    let stockShares = {
        "Zarar Ahmed": (stockEarnings * 0.4).toFixed(2),
        "Rajab": (stockEarnings * 0.2).toFixed(2),
        "Muhammad Khan": (stockEarnings * 0.4).toFixed(2)
    };

    let totalSharesUSD = {
        "Zarar Ahmed": (parseFloat(amcShares["Zarar Ahmed"]) + parseFloat(cryptoShares["Zarar Ahmed"] || 0) + parseFloat(stockShares["Zarar Ahmed"])).toFixed(2),
        "Rajab": (parseFloat(amcShares["Rajab"]) + parseFloat(stockShares["Rajab"])).toFixed(2),
        "Muhammad Khan": (parseFloat(amcShares["Muhammad Khan"]) + parseFloat(cryptoShares["Muhammad Khan"] || 0) + parseFloat(stockShares["Muhammad Khan"])).toFixed(2)
    };

    let totalSharesPKR = {
        "Zarar Ahmed": (totalSharesUSD["Zarar Ahmed"] * exchangeRate).toFixed(2),
        "Rajab": (totalSharesUSD["Rajab"] * exchangeRate).toFixed(2),
        "Muhammad Khan": (totalSharesUSD["Muhammad Khan"] * exchangeRate).toFixed(2)
    };

    // Open new page
    let newWindow = window.open("", "_blank");
    newWindow.document.write(`
        <html>
        <head>
            <title>YouTube Earnings Slip</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; }
                h2 { text-align: center; }
                .record { margin: 10px 0; }
                .btn { display: block; width: 100%; padding: 10px; margin-top: 20px; background: green; color: white; text-align: center; text-decoration: none; }
            </style>
        </head>
        <body>
            <div class="container">
                <h2>YouTube Earnings Report - ${month}</h2>
                <p class="record"><strong>Total Payout:</strong> ${totalPayout} USD</p>
                <p class="record"><strong>Exchange Rate:</strong> 1 USD = ${exchangeRate} PKR</p>
                <hr>
                <p class="record"><strong>Zarar Ahmed:</strong> ${totalSharesUSD["Zarar Ahmed"]} USD (${totalSharesPKR["Zarar Ahmed"]} PKR)</p>
                <p class="record"><strong>Rajab:</strong> ${totalSharesUSD["Rajab"]} USD (${totalSharesPKR["Rajab"]} PKR)</p>
                <p class="record"><strong>Muhammad Khan:</strong> ${totalSharesUSD["Muhammad Khan"]} USD (${totalSharesPKR["Muhammad Khan"]} PKR)</p>
                <a href="javascript:window.print()" class="btn">Print or Save as PDF</a>
            </div>
        </body>
        </html>
    `);
    newWindow.document.close();
}
