chrome.runtime.sendMessage({from: "popup", action: "getSiteRating"}, (response) => {
    document.getElementById("rating").innerHTML = response.rating
    document.getElementById("siteName").innerHTML = response.urls[0]
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