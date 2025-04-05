chrome.runtime.sendMessage({ from: "popup", action: "getData" }, (response) => {
    document.getElementById("tabName").innerHTML = response.services[0].rating;
    console.log(response);
});

chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostBreaches").innerHTML = Object.keys(response).length; // the Amount of Responses
    // Check if There Are Any Breaches Before Printing
    if (Object.keys(response).length > 0) {
        document.getElementById("hostRecentBreach").innerHTML = response[0].BreachDate; // the Most Recent Breach Date
        document.getElementById("hostRecentBreachSummary").innerHTML = response[0].Description; // the Recent Breach Summary
        //document.getElementById("hostName").innerHTML = response[0].Name; // the Host Name
        document.getElementById("hostBreachCount").innerHTML = response[0].PwnCount; // the Amount of People Affected
    }
    console.log(response);
});