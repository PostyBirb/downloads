// GitHub API functions

async function fetchReleases(owner, repo, config, count = 20) {
    try {
        // Fetch more releases than needed in case we need to filter by version
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases?per_page=${count}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        let releases = await response.json();
        
        // Filter releases by minimum version if specified
        if (config.minVersion) {
            releases = releases.filter(release => 
                isVersionAtLeastMinimum(release.tag_name, config.minVersion)
            );
        }
        
        // Return only the first 4 after filtering
        return releases.slice(0, 3);
    } catch (error) {
        console.error(`Error fetching releases for ${owner}/${repo}:`, error);
        throw error;
    }
}
