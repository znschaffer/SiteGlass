function clearCache(request, sendResponse) {
    chrome.storage.local.clear().then(_ => sendResponse({message: "Cache cleared."}));
    return true;
}

function getSiteRating(request, sendResponse) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (tabs.length === 0) {
            return;
        }
        let {url} = tabs[0];
        // @ts-ignore
        let domain = new URL(url).hostname

        // handle leading www
        if (domain.split('.')[0] === 'www') {
            domain = domain.slice(4)
        }

        const params = new URLSearchParams({query: domain});

        chrome.storage.local.get(domain, (result) => {
            const cached = result[domain];
            if (!cached) {
                let url = `https://api.tosdr.org/search/v5?${params}`
                // Fetch from API if not cached
                fetch(url)
                    .then((response) => response.json())
                    .then(async (resp) => {
                        let service = resp.services.find(item => item.urls.includes(domain));
                        if (service) {


                            let concerns = await getPrivacyConcerns(service.id)
                            const data = {service, concerns}
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

async function getPrivacyConcerns(id) {
    try {
        const response = await fetch(`https://api.tosdr.org/service/v3?id=${id}`);
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch concerns:", error);
        return null;
    }


}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSiteRating") {
        return getSiteRating(request, sendResponse);
    } else if (request.action === "clearCache") {
        return clearCache(request, sendResponse);
    }

    else if (request.action === "getBreaches") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            domain = new URL(tabs[0].url);

            const fixedDomain = SplitDomain(domain);

            const params = new URLSearchParams({Domain: fixedDomain}); // Check if Domain parameter = domain of tab
            fetch(`https://haveibeenpwned.com/api/v3/breaches?${params}`).then((response) => response.json()).then((data) => {
                sendResponse(data);
            });

        })
        return true;
    }

});

// Helper Method for Splitting Domain
function SplitDomain(url) {
    const urlConst = new URL(url);
    const splitLink = urlConst.hostname.split('.'); // Splits link @ . 

    let domainLink = splitLink.slice(-2);

    return domainLink.join('.');

}
