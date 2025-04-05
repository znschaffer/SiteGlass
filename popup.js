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

            const { counts } = organizeCookies(response.cookies);


            document.getElementById("functionalCount").textContent = counts.functional;
            //document.getElementById("analyticalCount").textContent = counts.analytical;
            //document.getElementById("marketingCount").textContent = counts.marketing;
            //document.getElementById("miscCount").textContent = counts.misc;

        } else {
                console.error("No cookies received.");
            }
        });


    chrome.runtime.sendMessage({ from: "popup", action: "analyticalCount" }, (response) => {
        if (response && response.cookies) {

            const { counts } = organizeCookies(response.cookies);


            //document.getElementById("functionalCount").textContent = counts.functional;
            document.getElementById("analyticalCount").textContent = counts.analytical;
            //document.getElementById("marketingCount").textContent = counts.marketing;
            //document.getElementById("miscCount").textContent = counts.misc;

        } else {
                console.error("No cookies received.");
            }

    });

    chrome.runtime.sendMessage({ from: "popup", action: "marketingCount" }, (response) => {
        if (response && response.cookies) {

            const { counts } = organizeCookies(response.cookies);


            //document.getElementById("functionalCount").textContent = counts.functional;
            //document.getElementById("analyticalCount").textContent = counts.analytical;
            document.getElementById("marketingCount").textContent = counts.marketing;
            //document.getElementById("miscCount").textContent = counts.misc;

        } else {
                console.error("No cookies received.");
            }

    });
    chrome.runtime.sendMessage({ from: "popup", action: "miscCount" }, (response) => {
        if (response && response.cookies) {

            const { counts } = organizeCookies(response.cookies);


            //document.getElementById("functionalCount").textContent = counts.functional;
            //document.getElementById("analyticalCount").textContent = counts.analytical;
            //document.getElementById("marketingCount").textContent = counts.marketing;
            document.getElementById("miscCount").textContent = counts.misc;

        } else {
                console.error("No cookies received.");
            }
    });

    chrome.runtime.sendMessage({ from: "popup", action: "firstPartyCookies" }, (response) => {

        if (response && response.cookies && response.domain) {
            firstPartyArray = []
            response.cookies.forEach(cookie => {

                if(cookie.domain.includes(response.domain))
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


function organizeCookies(cookies) {
    const categories = {
        functional: [],
        analytical: [],
        marketing: [],
        misc: []
    };

    cookies.forEach(cookie => {
        if (cookie.name.includes("session") || cookie.name.includes("auth") || cookie.name.includes("language")) {
            categories.functional.push(cookie);
        } else if (cookie.name.includes("analytics") || cookie.name.includes("track")) {
            categories.analytical.push(cookie);
        } else if (cookie.name.includes("ad") || cookie.name.includes("campaign") || cookie.name.includes("sid")) {
            categories.marketing.push(cookie);
        } else {
            categories.misc.push(cookie);
        }
    });


    const counts = {
        functional: categories.functional.length,
        analytical: categories.analytical.length,
        marketing: categories.marketing.length,
        misc: categories.misc.length
    };

    return { categories, counts };
}

