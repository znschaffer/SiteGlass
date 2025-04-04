chrome.runtime.sendMessage({from: "popup", action: "getData"}, (response) => {

    document.getElementById("tabName").innerHTML = response.services[0].rating;
    console.log(response);
});
