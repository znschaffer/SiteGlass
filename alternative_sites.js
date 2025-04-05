const altSiteCache = {
    "amazon": {"search": "Amazon", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "bing" : {"search": "Bing", "alternative": "Brave", "link" : "https://brave.com/"},
    "dropbox": {"search": "Dropbox", "alternative": "OnionShare", "link": "https://onionshare.org/#download"},
    "facebook": {"search": "Facebook", "alternative": "Mastodon", "link": "https://mastodon.social/explore"},
    "instagram": {"search": "Instagram", "alternative": "Mastodon", "link": "https://mastodon.social/explore"},
    "reddit": {"search": "Reddit", "alternative": "Lemmy", "link": "https://join-lemmy.org/"},
    "google" : {"search": "Google", "alternative": "Brave", "link" : "https://brave.com/"},
    "googlemaps": {"search": "Google Maps", "alternative": "OpenStreetMap", "link": "https://www.openstreetmap.org/"},
    "youtube" : {"search": "YouTube", "alternative": "FreeTube", "link": "https://freetubeapp.io/#download"},
    "vscode": {"search": "VSCode", "alternative": "VSCodium", "link": "https://vscodium.com/#install"},
    "x" : {"search": "X", "alternative": "Bluesky", "link": "https://bsky.app/"},
    "tiktok" : {"search": "TikTok", "alternative": "Bluesky", "link": "https://bsky.app/"},
    "yahoo": {"search": "Yahoo", "alternative": "ProtonMail", "link": "https://proton.me/mail"},
    "live": {"search": "Live", "alternative": "ProtonMail", "link": "https://proton.me/mail"},
    "taboola": {"search": "Taboola", "alternative": "Minds", "link": "https://www.minds.com/"},
    "foxnews": {"search": "Fox News", "alternative": "Minds", "link": "https://www.minds.com/"},
    "yandex" : {"search": "Yandex", "alternative": "Brave", "link" : "https://brave.com/"},
    "twitch" : {"search": "Twitch", "alternative": "PeerTube", "link": "https://joinpeertube.org/"},
    "office": {"search": "Office", "alternative": "Libre Office", "link": "https://www.libreoffice.org/"},
    "aliexpress": {"search": "Aliexpress", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "walmart": {"search": "Walmart", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "temu": {"search": "Temu", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "stackoverflow": {"search": "Stack Overflow", "alternative": "Dev.to", "link": "https://dev.to/"},
    "none" : {"search": "", "alternative": "There are currently no recommended alternatives for this site.", "link": "none"}
};

function getSiteAlternatives(searchSite){
    let site = searchSite.toLowerCase()
    if(site in altSiteCache){
        // Flash Icon
        for (let i = 0; i < 4; i++) {

            chrome.browser.seticon("icons/Inactive Favicon.png");
            wait(1000);

            chrome.browser.seticon("icons/Active_Favicon.png");
            wait(1000);
        }

        return (altSiteCache[site]);
    } else {
        let noResult = altSiteCache["none"]
        noResult.search = searchSite
        return noResult
    }
}

// Helper Wait Function

function wait() {
    return new Promise(resolve => setTimeout(resolve, ms));
}
