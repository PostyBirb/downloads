// Main application logic

async function loadDownloads() {
    const loadingEl = document.getElementById('loading');
    const contentEl = document.getElementById('content');
    const errorEl = document.getElementById('error-state');

    // Show loading state
    loadingEl.style.display = 'block';
    contentEl.style.display = 'none';
    errorEl.style.display = 'none';

    try {
        let allContent = '';
        let hasContent = false;

        for (const repoConfig of CONFIG.repos) {
            try {
                const releases = await fetchReleases(repoConfig.owner, repoConfig.repo, repoConfig);
                if (releases.length > 0) {
                    allContent += renderRepo(repoConfig, releases);
                    hasContent = true;
                }
            } catch (error) {
                console.error(`Error loading ${repoConfig.displayName}:`, error);
                allContent += `
                    <div class="repo-error" role="alert">
                        <h3>Error loading ${repoConfig.displayName}</h3>
                        <p>Could not fetch releases. This might be due to rate limiting or network issues.</p>
                        <details class="error-details">
                            <summary>Technical details</summary>
                            <code>${error.message}</code>
                        </details>
                    </div>
                `;
            }
        }

        if (hasContent) {
            contentEl.innerHTML = allContent;
            loadingEl.style.display = 'none';
            contentEl.style.display = 'block';
        } else {
            throw new Error('No releases could be loaded');
        }

    } catch (error) {
        console.error('Error loading downloads:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', loadDownloads);
