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
            const cookiesList = response.cookies.map(cookie => `${cookie.name}: ${cookie.value}: ${cookie.domain}`);
            document.getElementById("getCookies").textContent = cookiesList.join(", ");
            //document.getElementById("getCookiesCount").textContent = response.cookiesList.size;



        } else {
            document.getElementById("getCookies").textContent = "No cookies found.";
        }
        console.log("GetCookies Response:", response);
    });

    chrome.runtime.sendMessage({ from: "popup", action: "getCookiesCount" }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error:", chrome.runtime.lastError.message);
                document.getElementById("getCookiesCount").textContent = "Failed to retrieve cookies.";
                return;
            }

            if (response && response.cookies) {
                const cookiesList = response.cookies.map(cookie => `${cookie.name}: ${cookie.value}`);
                document.getElementById("getCookiesCount").textContent = response.cookies.length;

            } else {
                document.getElementById("getCookiesCount").textContent = "No cookies found.";
            }
            console.log("GetCookies Count Response:", response);
        });


    chrome.runtime.sendMessage({ from: "popup", action: "functionalCount" }, (response) => {
        if (response && response.cookies) {

            const result = organizeCookies(response.cookies, "Functional");
            document.getElementById("functionalCount").textContent = result.length;

        } else {
                console.error("No cookies received.");
            }
        });


    chrome.runtime.sendMessage({ from: "popup", action: "analyticalCount" }, (response) => {
        if (response && response.cookies) {

            result = organizeCookies(response.cookies, "Analysis");
            document.getElementById("analyticalCount").textContent = result.length;

        } else {
                console.error("No cookies received.");
            }

    });

    chrome.runtime.sendMessage({ from: "popup", action: "marketingCount" }, (response) => {
        if (response && response.cookies) {

            result = organizeCookies(response.cookies, "Marketing");
            document.getElementById("marketingCount").textContent = result.length;


        } else {
                console.error("No cookies received.");
            }

    });
    chrome.runtime.sendMessage({ from: "popup", action: "miscCount" }, (response) => {
        if (response && response.cookies) {

            document.getElementById("miscCount").textContent = 0; //temp value - misc should be calculated based of others results

        } else {
                console.error("No cookies received.");
            }
    });

    chrome.runtime.sendMessage({ from: "popup", action: "firstPartyCookies" }, (response) => {

        if (response && response.cookies && response.domain) {
            firstPartyArray = []
            response.cookies.forEach(cookie => {

                if(response.domain.includes(cookie.domain) || cookie.domain.includes(response.domain))
                {
                    firstPartyArray.push(cookie);
                }
            });
            document.getElementById("firstPartyCookies").textContent = firstPartyArray.length;


        } else {
                console.error("No cookies received.");
            }
    });

});


function organizeCookies(cookies, category) {
    const bucket = []

    cookies.forEach(cookie => {

    switch (category) {
    case "Functional":
        if (cookie.name.includes("session") || cookie.name.includes("auth") || cookie.name.includes("language") || cookie.name.includes("tz")) {
            bucket.push(cookie);
        }
        break;
    case "Marketing":
        if (cookie.name.includes("ad") || cookie.name.includes("campaign") || cookie.name.includes("sid")) {
            bucket.push(cookie);
        }
        break;
    case "Analysis":

        if (cookie.name.includes("analytics") || cookie.name.includes("track")) {
            bucket.push(cookie);
        }
        break;
    default:
    }

    });

    return bucket;
}
