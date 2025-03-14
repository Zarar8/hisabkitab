unction calculateEarnings() {
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
        "Zarar Ahmed": (parseFloat(amcShares["Zarar Ahmed"]) + parseFloat(cryptoShares["Zarar Ahmed"]) + parseFloat(stockShares["Zarar Ahmed"])).toFixed(2),
        "Rajab": (parseFloat(amcShares["Rajab"]) + parseFloat(stockShares["Rajab"])).toFixed(2),
        "Muhammad Khan": (parseFloat(amcShares["Muhammad Khan"]) + parseFloat(cryptoShares["Muhammad Khan"]) + parseFloat(stockShares["Muhammad Khan"])).toFixed(2)
    };

    let totalSharesPKR = {
        "Zarar Ahmed": (totalSharesUSD["Zarar Ahmed"] * exchangeRate).toFixed(2),
        "Rajab": (totalSharesUSD["Rajab"] * exchangeRate).toFixed(2),
        "Muhammad Khan": (totalSharesUSD["Muhammad Khan"] * exchangeRate).toFixed(2)
    };

    // Display Result
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <p><strong>Month:</strong> ${month}</p>
        <p><strong>Total Earnings:</strong> ${totalPayout} USD</p>
        <p><strong>Zarar Ahmed:</strong> ${totalSharesUSD["Zarar Ahmed"]} USD (${totalSharesPKR["Zarar Ahmed"]} PKR)</p>
        <p><strong>Rajab:</strong> ${totalSharesUSD["Rajab"]} USD (${totalSharesPKR["Rajab"]} PKR)</p>
        <p><strong>Muhammad Khan:</strong> ${totalSharesUSD["Muhammad Khan"]} USD (${totalSharesPKR["Muhammad Khan"]} PKR)</p>
    `;

    // Generate PDF
    let doc = new jsPDF();
    doc.text(YouTube Earnings Report - ${month}, 10, 10);
    doc.text(Total Payout: ${totalPayout} USD, 10, 20);
    doc.text(Exchange Rate: 1 USD = ${exchangeRate} PKR, 10, 30);
    doc.text(Zarar Ahmed: ${totalSharesUSD["Zarar Ahmed"]} USD (${totalSharesPKR["Zarar Ahmed"]} PKR), 10, 40);
    doc.text(Rajab: ${totalSharesUSD["Rajab"]} USD (${totalSharesPKR["Rajab"]} PKR), 10, 50);
    doc.text(Muhammad Khan: ${totalSharesUSD["Muhammad Khan"]} USD (${totalSharesPKR["Muhammad Khan"]} PKR), 10, 60);
    doc.save(YouTube_Earnings_${month}.pdf);
}