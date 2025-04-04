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
    return true;
});