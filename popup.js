chrome.runtime.sendMessage({ from: "popup", action: "getData" }, (response) => {
    document.getElementById("tabName").innerHTML = response.services[0].rating;
    console.log(response);
});

chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostName").innerHTML = Object.keys(response).length; // Return the Amount of Responses
    console.log(response);
});