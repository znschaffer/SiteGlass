const altSiteCache = {
    "google" : "Brave Search: Ranking at a B for privacy and using it's own index Brave search may be a better choice for a search engine.",
    "youtube" : "FreeTube ranking at an A for privacy gives users much more control and security as well as allows them to avoid ads. The development team is much smaller so some features are lacking, but if privacy is most  important this is a great alternative."
};

function getSiteAlternatives(searchSite){
    let site = searchSite.split(".")
    site = site[0]
    site = site.toLowerCase()
    if(site in altSiteCache){
        return (altSiteCache[site]);
    }
}
