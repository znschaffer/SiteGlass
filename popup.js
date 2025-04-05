chrome.runtime.sendMessage({ from: "popup", action: "getData" }, (response) => {
    document.getElementById("tabName").innerHTML = response.services[0].rating;
    console.log(response);
});

chrome.runtime.sendMessage({ from: "popup", action: "getBreaches" }, (response) => {
    document.getElementById("hostBreaches").innerHTML = Object.keys(response).length; // the Amount of Breaches
        let totalPwnCount = 0;
        // Calculate Total Affected People
        for (let i = 0; i < Object.keys(response).length; i++) {
            totalPwnCount += response[i].PwnCount;
        }
        document.getElementById("breachStats").innerHTML = totalPwnCount;
        document.getElementById("hostLastBreach").innerHTML = response[0].BreachDate;
        document.getElementById("hostName").innerHTML = response[0].Domain;
    console.log(response);
});

document.getElementById("clearCache").addEventListener("click", () => {
    chrome.runtime.sendMessage({from: "popup", action: "clearCache"}, (response) => {
        document.getElementById("clearCache").innerHTML = "Cache Cleared";
        document.getElementById("clearCache").disabled = "none";
    })
})


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