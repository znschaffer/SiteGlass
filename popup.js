chrome.runtime.sendMessage({ from: "popup", action: "getData" }, (response) => {
    document.getElementById("tabName").innerHTML = response.services[0].rating;
    console.log(response);
});

chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostName").innerHTML = response.name;
    console.log(response);
});