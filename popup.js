chrome.runtime.sendMessage({from: "popup", action: "getSiteRating"}, (response) => {
    if (!response){
        return;
    }
    let service = response.service;
    let concerns = response.concerns;
    let ratingElement = document.getElementById("rating")
    if (ratingElement) ratingElement.textContent = service.rating

    let concernsElement = document.getElementById("concerns");
    let count = 0;
    for (let i = 0; i < concerns.points.length; i++) {
        if (count >= 3) {
            break;
        }
        let temp = document.createElement("li");
        if (concerns.points[i].case.classification === "bad") {
            temp.innerText = concerns.points[i].title;
            concernsElement?.appendChild(temp);
            count++;
        }
    }
    let siteName = document.getElementById("siteName");
    if (siteName) siteName.innerHTML = service.urls[0]
});

chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostBreaches").innerHTML = Object.keys(response).length; // the Amount of Breaches
        let totalPwnCount = 0;
        for (let i = 0; i < Object.keys(response).length; i++) {
            totalPwnCount += response[i].PwnCount;
        }
        document.getElementById("breachStats").innerHTML = totalPwnCount; // The Total Affected People
        document.getElementById("hostLastBreach").innerHTML = response[0] ? response[0].BreachDate : "Unknown"; // The Date of the Recent Breach
        document.getElementById("hostName").innerHTML = response[0] ? response[0].Domain : ""; // The Site Name
        console.log(response);
});

// document.getElementById("clearCache").addEventListener("click", () => {
//     chrome.runtime.sendMessage({from: "popup", action: "clearCache"}, (response) => {
//         document.getElementById("clearCache").innerHTML = "Cache Cleared";
//         document.getElementById("clearCache").disabled = "none";
//     })
// })
//
// document.getElementById("clearCache").addEventListener("click", () => {
//     chrome.runtime.sendMessage({from: "popup", action: "clearCache"}, (response) => {
//         document.getElementById("clearCache").innerHTML = "Cache Cleared";
//         document.getElementById("clearCache").disabled = "none";
//     })
// })

document.querySelectorAll('.tabButton').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.tabButton').forEach(btn => btn.classList.remove('tabButton--active'));

        // Add active class to the clicked button
        button.classList.add('tabButton--active');

        // Hide all tab contents
        document.querySelectorAll('.tab').forEach(tab => tab.style.display = 'none');

        // Show the corresponding tab content
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).style.display = 'flex';
    });
});

// Initially show the first tab
document.querySelector('.tabButton--active').click();


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
