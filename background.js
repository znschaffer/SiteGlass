chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getData") {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            domain = new URL(tabs[0].url);

            const params = new URLSearchParams({query: domain.hostname});
            fetch(`https://api.tosdr.org/search/v5?${params}`).then((response) => response.json()).then((data) => {
                sendResponse(data);
            });

        })
       return true;
    }

    if (request.action === "getCookies") {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
                //organizeCookies(cookies);

                sendResponse({ success: true,length: cookies.size, cookies });
            }).catch((error) => {
                console.error(error);
                sendResponse({ success: false, error: "Failed to retrieve cookies." });
            });
        });
        return true;
    }

        if (request.action === "getCookiesCount") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
                    //organizeCookies(cookies);

                    sendResponse({ success: true,length: cookies.size, cookies});
                }).catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: "Failed to retrieve cookies." });
                });
            });
            return true;
        }

        if (request.action === "functionalCount") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
                    //organizeCookies(cookies);

                    sendResponse({ success: true,length: cookies.size, cookies});
                }).catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: "Failed to retrieve cookies." });
                });
            });
            return true;
        }

        if (request.action === "analyticalCount") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
                    //organizeCookies(cookies);

                    sendResponse({ success: true,length: cookies.size, cookies});
                }).catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: "Failed to retrieve cookies." });
                });
            });
            return true;
        }

        if (request.action === "marketingCount") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
                    //organizeCookies(cookies);

                    sendResponse({ success: true,length: cookies.size, cookies});
                }).catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: "Failed to retrieve cookies." });
                });
            });
            return true;
        }

        if (request.action === "miscCount") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
                    //organizeCookies(cookies);

                    sendResponse({ success: true,length: cookies.size, cookies});
                }).catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: "Failed to retrieve cookies." });
                });
            });
            return true;
        }

        if (request.action === "firstPartyCookies") {
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.cookies.getAll({ url: tabs[0].url }).then((cookies) => {
              url = new URL(tabs[0].url);
              domain = url.hostname;

              sendResponse({ success: true, domain, cookies});

                }).catch((error) => {
                    console.error(error);
                    sendResponse({ success: false, error: "Failed to retrieve cookies." });
                });
            });
            return true;
        }
});

