// Import the getSiteAlternatives function
import {getSiteAlternatives} from './alternative_sites.js';

function clearCache(request, sendResponse) {
    chrome.storage.local.clear().then(_ => sendResponse({message: "Cache cleared."}));
    return true;
}

function flashBadge(message, times, interval) {
    flash();

    function flash() {
        setTimeout(function () {
            if (times == 0) {
                chrome.action.setIcon({path: "./icons/Active_Favicon.png"}); // Reset icon to active state
                return;
            }
            if (times % 2 == 0) {
                chrome.action.setIcon({path: "./icons/Active_Favicon.png"}); // Reset icon to active state


            } else {
                chrome.action.setIcon({path: "./icons/inactive_icon.png"}); // Reset icon to active state

            }
            times--;
            flash();
        }, interval);
    }
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    let domain = new URL(tab.url).hostname;
    if (getSiteAlternatives(domain).link !== "none") {
        flashBadge(tab.url, 15, 200); // Flash the badge 3 times with 1 second interval
    }
})

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
    } else if (request.action === "getBreaches") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            if (!tabs[0]) {
                return;
            }

            domain = new URL(tabs[0].url);

            const fixedDomain = SplitDomain(domain);

            const params = new URLSearchParams({Domain: fixedDomain}); // Check if Domain parameter = domain of tab
            fetch(`https://haveibeenpwned.com/api/v3/breaches?${params}`).then((response) => response.json()).then((data) => {
                sendResponse(data);
            });

        })
        return true;
    }

    if (request.action === "getCookies") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {
                sendResponse({success: true, length: cookies.size, cookies, domain: tabs[0].url});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }

    if (request.action === "getCookiesCount") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {

                sendResponse({success: true, length: cookies.size, cookies});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }

    if (request.action === "functionalCount") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {

                sendResponse({success: true, length: cookies.size, cookies});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }

    if (request.action === "analyticalCount") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {

                sendResponse({success: true, length: cookies.size, cookies});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }

    if (request.action === "marketingCount") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {

                sendResponse({success: true, length: cookies.size, cookies});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }

    if (request.action === "miscCount") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {

                sendResponse({success: true, length: cookies.size, cookies});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }

    if (request.action === "firstPartyCookies") {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.cookies.getAll({url: tabs[0].url}).then((cookies) => {
                domain = new URL(tabs[0].url).hostname
                sendResponse({success: true, domain, cookies});
            }).catch((error) => {
                console.error(error);
                sendResponse({success: false, error: "Failed to retrieve cookies."});
            });
        });
        return true;
    }
    return true;
});

// Helper Method for Splitting Domain
function SplitDomain(url) {
    const urlConst = new URL(url);
    const splitLink = urlConst.hostname.split('.'); // Splits link @ .

    let domainLink = splitLink.slice(-2);

    return domainLink.join('.');

}
