document.addEventListener("DOMContentLoaded", () => {
    chrome.runtime.sendMessage({ from: "popup", action: "getData" }, (response) => {
        //
        document.getElementById("tabName").innerHTML = response.services[0].rating;
        console.log(response);
    });

    chrome.runtime.sendMessage({ from: "popup", action: "getCookies" }, (response) => {
        if (chrome.runtime.lastError) {
            console.error("Error:", chrome.runtime.lastError.message);
            document.getElementById("getCookies").textContent = "Failed to retrieve cookies.";
            return;
        }

        if (response && response.cookies) {
            const cookiesList = response.cookies.map(cookie => `${cookie.name}: ${cookie.value}`);
            document.getElementById("getCookies").textContent = cookiesList.join(", ");
        } else {
            document.getElementById("getCookies").textContent = "No cookies found.";
        }
        console.log("GetCookies Response:", response);
    });
});
