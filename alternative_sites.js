const altSiteCache = {
    "amazon.com": {"search": "Amazon", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "bing.com": {"search": "Bing", "alternative": "Brave", "link": "https://brave.com/"},
    "dropbox.com": {"search": "Dropbox", "alternative": "OnionShare", "link": "https://onionshare.org/#download"},
    "facebook.com": {"search": "Facebook", "alternative": "Mastodon", "link": "https://mastodon.social/explore"},
    "instagram.com": {"search": "Instagram", "alternative": "Mastodon", "link": "https://mastodon.social/explore"},
    "reddit.com": {"search": "Reddit", "alternative": "Lemmy", "link": "https://join-lemmy.org/"},
    "google.com": {"search": "Google", "alternative": "Brave", "link": "https://brave.com/"},
    "maps.google.com": {
        "search": "Google Maps",
        "alternative": "OpenStreetMap",
        "link": "https://www.openstreetmap.org/"
    },
    "youtube.com": {"search": "YouTube", "alternative": "FreeTube", "link": "https://freetubeapp.io/#download"},
    "vscode.com": {"search": "VSCode", "alternative": "VSCodium", "link": "https://vscodium.com/#install"},
    "x.com": {"search": "X", "alternative": "Bluesky", "link": "https://bsky.app/"},
    "tiktok.com": {"search": "TikTok", "alternative": "Bluesky", "link": "https://bsky.app/"},
    "yahoo.com": {"search": "Yahoo", "alternative": "ProtonMail", "link": "https://proton.me/mail"},
    "live.com": {"search": "Live", "alternative": "ProtonMail", "link": "https://proton.me/mail"},
    "taboola.com": {"search": "Taboola", "alternative": "Minds", "link": "https://www.minds.com/"},
    "foxnews.com": {"search": "Fox News", "alternative": "Minds", "link": "https://www.minds.com/"},
    "yandex.com": {"search": "Yandex", "alternative": "Brave", "link": "https://brave.com/"},
    "twitch.tv": {"search": "Twitch", "alternative": "PeerTube", "link": "https://joinpeertube.org/"},
    "office.com": {"search": "Office", "alternative": "Libre Office", "link": "https://www.libreoffice.org/"},
    "aliexpress.com": {"search": "Aliexpress", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "walmart.com": {"search": "Walmart", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "temu.com": {"search": "Temu", "alternative": "EcoCart", "link": "https://ecocart.io/"},
    "stackoverflow.com": {"search": "Stack Overflow", "alternative": "Dev.to", "link": "https://dev.to/"},
    "none": {
        "search": "",
        "alternative": "There are currently no recommended alternatives for this site.",
        "link": "none"
    }
};

export function getSiteAlternatives(searchSite) {

    let site = searchSite.toLowerCase()

    // handle leading www
    if (site.split('.')[0] === 'www') {
        site = site.slice(4)
    }

    if (site in altSiteCache) {
        return (altSiteCache[site]);
    } else {
        let noResult = altSiteCache["none"]
        noResult.search = searchSite
        return noResult
    }
}
