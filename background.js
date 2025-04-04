chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getData") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            domain = new URL(tabs[0].url);

            const params = new URLSearchParams({query: domain.hostname});
            fetch(`https://api.tosdr.org/search/v5?${params}`).then((response) => response.json()).then((data) => {
                sendResponse(data);
            });

        })
    }

    else if (request.action == "getBreaches") {

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            domain = new URL(tabs[0].url);

            const params = new URLSearchParams({query: domain.hostname});
            fetch(`https://haveibeenpwned.com/API/v3#AllBreaches${params}`).then((response) => response.json()).then((data) => {
                sendResponse(data);
            });

        })
    }

    // Commenting this to get the files sorted out :)
    return true;
});