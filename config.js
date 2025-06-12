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
        }
    ]
};
