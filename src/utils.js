// Utility functions for the download page

// Version comparison functions
function compareVersions(version1, version2) {
    // Remove 'v' prefix if present and split by dots
    const v1 = version1.replace(/^v/, '').split('.').map(num => parseInt(num) || 0);
    const v2 = version2.replace(/^v/, '').split('.').map(num => parseInt(num) || 0);
    
    // Pad arrays to same length
    const maxLength = Math.max(v1.length, v2.length);
    while (v1.length < maxLength) v1.push(0);
    while (v2.length < maxLength) v2.push(0);
    
    // Compare each part
    for (let i = 0; i < maxLength; i++) {
        if (v1[i] > v2[i]) return 1;
        if (v1[i] < v2[i]) return -1;
    }
    return 0;
}

function isVersionAtLeastMinimum(version, minVersion) {
    if (!minVersion) return true;
    return compareVersions(version, minVersion) >= 0;
}

// OS detection
function detectOS() {
    const userAgent = navigator.userAgent.toLowerCase();
    const platform = navigator.platform.toLowerCase();
    
    if (platform.includes('mac') || userAgent.includes('mac')) {
        return 'macos';
    } else if (platform.includes('win') || userAgent.includes('win')) {
        return 'windows';
    } else if (platform.includes('linux') || userAgent.includes('linux') || userAgent.includes('x11')) {
        return 'linux';
    }
    
    return 'unknown';
}

// Formatting functions
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function formatDownloadCount(count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
}

// Icon and file handling
function getFileIcon(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
        'dmg': 'fab fa-apple', // macOS
        'exe': 'fab fa-windows', // Windows
        'appimage': 'fab fa-linux', // Linux
        'deb': 'fab fa-ubuntu', // Debian/Ubuntu
        'rpm': 'fab fa-redhat', // Red Hat/Fedora
        'zip': 'fas fa-file-archive',
        'tar': 'fas fa-file-archive'
    };
    return icons[ext] || 'fas fa-file';
}

function createIcon(iconClass, additionalClasses = '') {
    return `<i class="${iconClass} ${additionalClasses}"></i>`;
}

function getReadableName(filename, mappings, version) {
    for (const [pattern, config] of Object.entries(mappings)) {
        const regex = new RegExp(pattern.replace('{version}', version.replace(/^v/, '')), 'i');
        if (regex.test(filename)) {
            return config;
        }
    }
    return { name: filename, os: 'unknown', recommended: false };
}

function isCompatibleWithCurrentOS(downloadConfig, currentOS) {
    return downloadConfig.os === currentOS || downloadConfig.os === 'unknown';
}

function formatOSInfo(downloadConfig) {
    let info = [];
    
    if (downloadConfig.osVersions && downloadConfig.osVersions.length > 0) {
        info.push(`${downloadConfig.osVersions.join(', ')}`);
    }
    
    if (downloadConfig.distros && downloadConfig.distros.length > 0) {
        info.push(`${downloadConfig.distros.join(', ')}`);
    }
    
    return info.length > 0 ? info.join(' • ') : '';
}

// Clipboard functionality
async function copyToClipboard(text, buttonElement) {
    try {
        await navigator.clipboard.writeText(text);
        const originalHTML = buttonElement.innerHTML;
        buttonElement.innerHTML = createIcon('fas fa-check');
        buttonElement.style.background = '#28a745';
        buttonElement.style.color = 'white';
        
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
            buttonElement.style.background = '';
            buttonElement.style.color = '';
        }, 2000);
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}
