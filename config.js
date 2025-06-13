// Configuration for the download page
const CONFIG = {
    repos: [
        {
            owner: 'mvdicarlo',
            repo: 'postybirb-plus',
            displayName: 'PostyBirb Plus',
            minVersion: null, // Set to a version string like "v3.0.0" to filter out older releases
            filenameMappings: {
                'PostyBirb\\+-{version}-universal\\.dmg': {
                    name: 'macOS Universal (DMG)',
                    os: 'macos',
                    osVersions: ['10.15+'],
                    recommended: true
                },
                'postybirb-plus-{version}-x86_64\\.AppImage': {
                    name: 'Linux (AppImage)',
                    os: 'linux',
                    distros: ['Universal'],
                    recommended: true
                },
                'postybirb-plus-{version}\\.exe': {
                    name: 'Windows Portable (EXE)',
                    os: 'windows',
                    osVersions: ['7+'],
                    recommended: false
                },
                'postybirb-plus-setup-{version}\\.exe': {
                    name: 'Windows Installer',
                    os: 'windows',
                    osVersions: ['7+'],
                    recommended: true
                }
            }
        },
        {
            owner: 'mvdicarlo',
            repo: 'postybirb',
            displayName: 'PostyBirb (Alpha)',
            minVersion: 'v4.0.2',
            filenameMappings: {
                'PostyBirb-{version}-mac-arm64\\.dmg': {
                    name: 'macOS Apple Silicon (DMG)',
                    os: 'macos',
                    osVersions: ['11.0+'],
                    recommended: true
                },
                'PostyBirb-{version}-mac-x64\\.dmg': {
                    name: 'macOS Intel (DMG)',
                    os: 'macos',
                    osVersions: ['10.15+'],
                    recommended: false
                },
                'PostyBirb-{version}-win-x64\\.exe': {
                    name: 'Windows Installer (x64)',
                    os: 'windows',
                    osVersions: ['10+'],
                    recommended: true
                },
                'PostyBirb-{version}-portable-x64\\.exe': {
                    name: 'Windows Portable (x64)',
                    os: 'windows',
                    osVersions: ['10+'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-x86_64\\.AppImage': {
                    name: 'Linux (AppImage x64)',
                    os: 'linux',
                    distros: ['Universal'],
                    recommended: true
                },
                'PostyBirb-{version}-linux-arm64\\.AppImage': {
                    name: 'Linux (AppImage ARM64)',
                    os: 'linux',
                    distros: ['Universal'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-deb-amd64\\.deb': {
                    name: 'Linux (DEB x64)',
                    os: 'linux',
                    distros: ['Debian', 'Ubuntu'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-deb-arm64\\.deb': {
                    name: 'Linux (DEB ARM64)',
                    os: 'linux',
                    distros: ['Debian', 'Ubuntu'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-rpm-x86_64\\.rpm': {
                    name: 'Linux (RPM x64)',
                    os: 'linux',
                    distros: ['RedHat', 'Fedora', 'CentOS'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-rpm-aarch64\\.rpm': {
                    name: 'Linux (RPM ARM64)',
                    os: 'linux',
                    distros: ['RedHat', 'Fedora', 'CentOS'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-x64\\.tar\\.gz': {
                    name: 'Linux (TAR.GZ x64)',
                    os: 'linux',
                    distros: ['Universal'],
                    recommended: false
                },
                'PostyBirb-{version}-linux-arm64\\.tar\\.gz': {
                    name: 'Linux (TAR.GZ ARM64)',
                    os: 'linux',
                    distros: ['Universal'],
                    recommended: false
                }
            }
        }
    ]
};
