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

    else if (request.action === "getBreaches") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            domain = new URL(tabs[0].url);

            const fixedDomain = SplitDomain(domain);

            const params = new URLSearchParams({Domain: fixedDomain}); // Check if Domain parameter = domain of tab
            fetch(`https://haveibeenpwned.com/api/v3/breaches?${params}`).then((response) => response.json()).then((data) => {
                sendResponse(data);
            });

        })
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