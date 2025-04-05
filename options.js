var clearCacheButton = document.getElementById("clearCache");
clearCacheButton.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
    // Clear the cache in local storage
    chrome.storage.local.clear(function () {
        if (chrome.runtime.lastError) {
            console.error("Error clearing cache:", chrome.runtime.lastError);
        } else {
            alert("Cache cleared successfully!");
        }
    });
})