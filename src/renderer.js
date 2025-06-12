// Rendering functions for the download page

function renderDownloads(releases, config) {
    const currentOS = detectOS();
    
    return releases.map((release, index) => {
        const assets = release.assets.filter(asset => 
            !asset.name.includes('.blockmap') && 
            !asset.name.includes('.sig') &&
            !asset.name.endsWith('.yml') &&
            !asset.name.endsWith('.yaml') &&
            !asset.name.endsWith('.zip') &&
            asset.size > 0
        );

        if (assets.length === 0) return '';

        // Sort assets to show compatible ones first
        const sortedAssets = assets.sort((a, b) => {
            const aConfig = getReadableName(a.name, config.filenameMappings, release.tag_name);
            const bConfig = getReadableName(b.name, config.filenameMappings, release.tag_name);
            
            const aCompatible = isCompatibleWithCurrentOS(aConfig, currentOS);
            const bCompatible = isCompatibleWithCurrentOS(bConfig, currentOS);
            
            if (aCompatible && !bCompatible) return -1;
            if (!aCompatible && bCompatible) return 1;
            
            // Among compatible downloads, prioritize recommended ones
            if (aCompatible && bCompatible) {
                if (aConfig.recommended && !bConfig.recommended) return -1;
                if (!aConfig.recommended && bConfig.recommended) return 1;
            }
            
            return 0;
        });

        const downloadsHtml = sortedAssets.map(asset => {
            const downloadConfig = getReadableName(asset.name, config.filenameMappings, release.tag_name);
            const iconClass = getFileIcon(asset.name);
            const isCompatible = isCompatibleWithCurrentOS(downloadConfig, currentOS);
            const osInfo = formatOSInfo(downloadConfig);
            const downloadCount = asset.download_count ? formatDownloadCount(asset.download_count) : '';
            
            const classes = ['download-button'];
            if (isCompatible) classes.push('compatible');
            if (downloadConfig.recommended && isCompatible) classes.push('recommended');
            
            const ariaLabel = `Download ${downloadConfig.name} for ${downloadConfig.os}, ${formatFileSize(asset.size)}${isCompatible ? ', recommended for your system' : ''}`;
            
            return `
                <li class="download-item">
                    <div class="download-wrapper">
                        <a href="${asset.browser_download_url}" 
                           class="${classes.join(' ')}" 
                           target="_blank" 
                           rel="noopener"
                           aria-label="${ariaLabel}"
                           data-download-name="${downloadConfig.name}">
                            <div class="download-info">
                                <span class="download-icon" aria-hidden="true">${createIcon(iconClass)}</span>
                                <div class="download-text">
                                    <div class="download-name">
                                        ${downloadConfig.name}
                                        ${downloadConfig.recommended && isCompatible ? '<span class="sr-only"> (Recommended)</span>' : ''}
                                    </div>
                                    <div class="download-details">
                                        <span class="download-size">${formatFileSize(asset.size)}</span>
                                        ${downloadCount ? `<span class="download-count">${downloadCount} downloads</span>` : ''}
                                        ${osInfo ? `<span class="os-info">${osInfo}</span>` : ''}
                                    </div>
                                </div>
                            </div>
                            <span class="download-arrow" aria-hidden="true">${createIcon('fas fa-download')}</span>
                        </a>
                        <button class="copy-link-btn" 
                                onclick="copyToClipboard('${asset.browser_download_url}', this)"
                                aria-label="Copy download link to clipboard"
                                title="Copy download link">
                            ${createIcon('fas fa-copy')}
                        </button>
                    </div>
                </li>
            `;
        }).join('');

        return `
            <article class="release-card${index === 0 ? ' latest-release' : ''}" 
                     itemscope itemtype="https://schema.org/SoftwareApplication">
                <header class="release-header">
                    <div class="release-title-container">
                        <h3 class="release-version" itemprop="version">${release.tag_name}</h3>
                        ${index === 0 ? '<span class="latest-badge" aria-label="Latest release">Latest</span>' : ''}
                    </div>
                    <time class="release-date" datetime="${release.published_at}" itemprop="datePublished">
                        ${formatDate(release.published_at)}
                    </time>
                </header>
                <div class="downloads-section">
                    <h4 class="downloads-title sr-only">Available downloads for ${release.tag_name}</h4>
                    <ul class="downloads-list" role="list">
                        ${downloadsHtml}
                    </ul>
                </div>
                ${release.body ? `<details class="release-notes">
                    <summary>Release Notes</summary>
                    <div class="release-notes-content">${release.body.substring(0, 300)}${release.body.length > 300 ? '...' : ''}</div>
                </details>` : ''}
            </article>
        `;
    }).join('');
}

function renderRepo(repoConfig, releases) {
    const releasesHtml = renderDownloads(releases, repoConfig);
    const githubUrl = `https://github.com/${repoConfig.owner}/${repoConfig.repo}/releases`;
    
    return `
        <div class="repo-section">
            <div class="repo-header">
                <h2 class="repo-title">${repoConfig.displayName}</h2>
                <a href="${githubUrl}" class="github-link" target="_blank" rel="noopener">
                    <span class="github-icon">${createIcon('fab fa-github')}</span>
                    View all releases on GitHub
                </a>
            </div>
            <div class="releases-grid">
                ${releasesHtml}
            </div>
        </div>
    `;
}
