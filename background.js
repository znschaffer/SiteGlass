chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getData") {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            sendResponse(tabs[0].url);
        })
    }
    return true;
});