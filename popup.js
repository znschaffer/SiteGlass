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
chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostBreaches").innerHTML = Object.keys(response).length; // the Amount of Breaches
    let totalPwnCount = 0;
    // Calculate Total Affected People
    for (let i = 0; i < Object.keys(response).length; i++) {
        totalPwnCount += response[i].PwnCount;
    }
    document.getElementById("breachStats").innerHTML = totalPwnCount; // The Total Affected People
    document.getElementById("hostLastBreach").innerHTML = response[0].BreachDate; // The Date of the Recent Breach
    document.getElementById("hostName").innerHTML = response[0].Domain; // The Domain Name
    console.log(response);
});

let clearCacheButton = document.getElementById("clearCache");

if (clearCacheButton) clearCacheButton.addEventListener("click", () => {
    chrome.runtime.sendMessage({from: "popup", action: "clearCache"}, (response) => {
        clearCacheButton.innerHTML = "Cache Cleared";
        clearCacheButton.disabled = true;
    })
})


document.querySelectorAll('.tabButton').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tabButton').forEach(btn => btn.classList.remove('tabButton--active'));

        // Add active class to the clicked button
        button.classList.add('tabButton--active');

        // Hide all tab contents
        document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');

        // Show the corresponding tab content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'flex';
    });
});

// Initially show the first tab
document.querySelector('.tabButton--active').click();

