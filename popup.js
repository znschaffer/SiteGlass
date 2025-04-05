chrome.runtime.sendMessage({ from: "popup", action: "getData" }, (response) => {
    document.getElementById("tabName").innerHTML = response.services[0].rating;
    console.log(response);
});

chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostBreaches").innerHTML = Object.keys(response).length; // the Amount of Responses
    // If Breaches > 0, Get Breach Data
    if (Object.keys(response).length > 0) {
        let breachStats;
        breachStats = "The most recent breach was on: " + response[0].BreachDate + "<br><br>A summary of this breach is: " + response[0].Description + "<br><br>The amount of people affected by this breach is: " + response[0].PwnCount;

        document.getElementById("breachStats").innerHTML = breachStats;
    }
    console.log(response);
});