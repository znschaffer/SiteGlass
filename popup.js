chrome.runtime.sendMessage({from: "popup", action: "getSiteRating"}, ({service, concerns}) => {
    let ratingElement = document.getElementById("rating")
    if (ratingElement) ratingElement.textContent = service.rating

    let concernsElement = document.getElementById("concerns");
    for (let i = 0; i < concerns.points.length; i++) {
        let temp = document.createElement("li");
        if (concerns.points[i].case.classification === "bad") {
            temp.innerText = concerns.points[i].title;
            concernsElement?.appendChild(temp);
        }
    }
    let siteName = document.getElementById("siteName");
    if (siteName) siteName.innerHTML = service.urls[0]
});

let clearCacheButton = document.getElementById("clearCache");

if (clearCacheButton) clearCacheButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({from: "popup", action: "clearCache"}, (response) => {
        clearCacheButton.innerHTML = "Cache Cleared";
        clearCacheButton.disabled = true;
    })
})

