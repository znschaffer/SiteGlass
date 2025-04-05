chrome.runtime.sendMessage({from: "popup", action: "getSiteRating"}, (response) => {
    document.getElementById("rating").innerHTML = response.rating
    document.getElementById("siteName").innerHTML = response.urls[0]
});

document.getElementById("clearCache").addEventListener("click", () => {
    chrome.runtime.sendMessage({from: "popup", action: "clearCache"}, (response) => {
        document.getElementById("clearCache").innerHTML = "Cache Cleared";
        document.getElementById("clearCache").disabled = "none";
    })
})
