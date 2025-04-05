chrome.runtime.sendMessage({from: "popup", action: "getData"}, (response) => {
    document.getElementById("tabName").innerHTML = response.rating
    console.log(response);
});
