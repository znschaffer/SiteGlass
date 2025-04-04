function getSiteRating(request, sendResponse) {
    if (request.action === "getData") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const domain = new URL(tabs[0].url).hostname;
            const params = new URLSearchParams({query: domain});

            chrome.storage.local.get(domain, (result) => {
                const cached = result[domain];

                if (!cached) {
                    // Fetch from API if not cached
                    fetch(`https://api.tosdr.org/search/v5?${params}`)
                        .then((response) => response.json())
                        .then((data) => {
                            // Cache the data
                            chrome.storage.local.set({[domain]: data}, () => {
                                sendResponse(data);
                            });
                        })
                        .catch((error) => {
                            console.error("Fetch error:", error);
                            sendResponse({error: "Failed to fetch data"});
                        });
                } else {
                    // Serve from cache
                    sendResponse(cached);
                }
            });
        });

        return true; // Keeps the message channel open for sendResponse
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    return getSiteRating(request, sendResponse);
});
