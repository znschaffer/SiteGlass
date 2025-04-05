function clearCache(request, sendResponse) {
    chrome.storage.local.clear().then(_ => sendResponse({message: "Cache cleared."}));
    return true;
}

function getSiteRating(request, sendResponse) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        let domain = new URL(tabs[0].url).hostname

        // handle leading www
        if (domain.split('.')[0] === 'www') {
            domain = domain.slice(4)
        }

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
                        resp.services.find((item) => {
                            if (item.urls.includes(domain)) {
                                data = item
                            }
                        })

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

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSiteRating") {
        return getSiteRating(request, sendResponse);
    } else if (request.action === "clearCache") {
        return clearCache(request, sendResponse);
    }

});
