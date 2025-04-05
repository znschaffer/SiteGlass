
function getSiteRating(request, sendResponse) {
    if (request.action === "getData") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            const domain = new URL(tabs[0].url).hostname;
            const params = new URLSearchParams({query: domain});

            chrome.storage.local.get(domain, (result) => {
                const cached = result[domain];

                if (!cached) {
                    let url = `https://api.tosdr.org/search/v5?${params}`
                    console.log(url)
                    // Fetch from API if not cached
                    fetch(url)
                        .then((response) => response.json())
                        .then((resp) => {
                            let data = null
                            console.log(resp)
                            console.log(params)
                            resp.services.find((item) => {
                                if (item.urls.includes(domain)) {
                                    data = item
                                }
                                console.log(item)
                            })
                            console.log(data)
                            if (data) {
                                // Cache the data
                                chrome.storage.local.set({[domain]: data}, () => {
                                    sendResponse(data);
                                });
                            } else {
                                sendResponse(null);
                            }

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
