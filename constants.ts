import { Game } from './types';

export const SUPPORTED_GAMES: Game[] = [
  {
    id: 'lol',
    name: 'League of Legends',
    slug: 'league-of-legends',
    // Riot's DDragon is the most stable source for LoL assets
    image: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_0.jpg', 
    themeColor: 'text-nexus-gold',
  },
  {
    id: 'helldivers-2',
    name: 'Helldivers 2',
    slug: 'helldivers-2',
    // Switched to Akamai CDN for Steam which is generally more permissive for hotlinking
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/553850/header.jpg',
    themeColor: 'text-yellow-400',
  },
  {
    id: 'valorant',
    name: 'VALORANT',
    slug: 'valorant',
    // Microsoft Store asset (High Availability)
    image: 'https://store-images.s-microsoft.com/image/apps.25056.13658256338006263.a6501a1e-451e-4363-8a9d-5f33580a5823.15392d33-149b-433e-b873-138374d47348',
    themeColor: 'text-rose-500',
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    slug: 'counter-strike-2',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/730/header.jpg',
    themeColor: 'text-orange-400',
  },
  {
    id: 'no-mans-sky',
    name: "No Man's Sky",
    slug: 'no-mans-sky',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/275850/header.jpg',
    themeColor: 'text-teal-300',
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    slug: 'apex-legends',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1172470/header.jpg',
    themeColor: 'text-red-500',
  },
  {
    id: 'deep-rock-galactic',
    name: 'Deep Rock Galactic',
    slug: 'deep-rock-galactic',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/548430/header.jpg',
    themeColor: 'text-yellow-600',
  },
  {
    id: 'bf2042',
    name: 'Battlefield 2042',
    slug: 'battlefield-2042',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1517290/header.jpg', 
    themeColor: 'text-cyan-500',
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1086940/header.jpg',
    themeColor: 'text-red-900',
  },
  {
    id: 'warframe',
    name: 'Warframe',
    slug: 'warframe',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/230410/header.jpg',
    themeColor: 'text-cyan-200',
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077',
    slug: 'cyberpunk-2077',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg',
    themeColor: 'text-yellow-300',
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    slug: 'dota-2',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg',
    themeColor: 'text-red-600',
  },
  {
    id: 'the-finals',
    name: 'The Finals',
    slug: 'the-finals',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2073850/header.jpg',
    themeColor: 'text-red-500',
  },
  {
    id: 'palworld',
    name: 'Palworld',
    slug: 'palworld',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1623730/header.jpg',
    themeColor: 'text-blue-400',
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    slug: 'elden-ring',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1245620/header.jpg',
    themeColor: 'text-yellow-100',
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    slug: 'overwatch-2',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2357570/header.jpg',
    themeColor: 'text-orange-500',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    slug: 'minecraft',
    // Microsoft Store asset (High Availability)
    image: 'https://store-images.s-microsoft.com/image/apps.60323.13850085746326678.9b63e9c9-6330-4e80-9366-5d66649d2e1c.e954b830-4754-4654-a823-3b10c6607e4d',
    themeColor: 'text-green-600',
  },
  {
    id: 'genshin-impact',
    name: 'Genshin Impact',
    slug: 'genshin-impact',
    // Microsoft Store asset (High Availability)
    image: 'https://store-images.s-microsoft.com/image/apps.34568.14022837199462706.702c2ee9-994c-47a3-9426-1049383f9828.66779354-9721-4d37-9750-936894c264a7',
    themeColor: 'text-purple-300',
  },
  {
    id: 'diablo4',
    name: 'Diablo IV',
    slug: 'diablo-iv',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2344520/header.jpg',
    themeColor: 'text-red-700',
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    slug: 'destiny-2',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/1085660/header.jpg',
    themeColor: 'text-teal-400',
  },
  {
    id: 'r6siege',
    name: 'Rainbow Six Siege',
    slug: 'rainbow-six-siege',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/359550/header.jpg',
    themeColor: 'text-blue-500',
  },
  {
    id: 'delta-force',
    name: 'Delta Force',
    slug: 'delta-force-hawk-ops',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2507950/header.jpg',
    themeColor: 'text-emerald-500',
  },
  {
    id: 'arena-breakout',
    name: 'Arena Breakout: Infinite',
    slug: 'arena-breakout-infinite',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2073620/header.jpg',
    themeColor: 'text-yellow-600',
  },
  {
    id: 'once-human',
    name: 'Once Human',
    slug: 'once-human',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/2139460/header.jpg',
    themeColor: 'text-yellow-400',
  },
  {
    id: 'bloons-td6',
    name: 'Bloons TD 6',
    slug: 'bloons-td-6',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/960090/header.jpg',
    themeColor: 'text-purple-400',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    slug: 'fortnite',
    // Microsoft Store asset (High Availability)
    image: 'https://store-images.s-microsoft.com/image/apps.16850.7070227825797204.6047195d-00eb-4028-a681-4203da574742.e583685c-15a3-48b4-a46c-7e61845f3408',
    themeColor: 'text-blue-400',
  },
  {
    id: 'gta-online',
    name: 'GTA Online',
    slug: 'grand-theft-auto-online',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/271590/header.jpg',
    themeColor: 'text-green-500',
  },
  {
    id: 'path-of-exile',
    name: 'Path of Exile',
    slug: 'path-of-exile',
    image: 'https://cdn.akamai.steamstatic.com/steam/apps/238960/header.jpg',
    themeColor: 'text-red-800',
  }
];

export const TRENDING_UPDATES = [
  {
    gameId: 'helldivers-2',
    title: 'Major Order: Automatons',
    status: 'Live Event',
    time: 'Ends in 2d',
    url: 'https://twitter.com/helldivers2'
  },
  {
    gameId: 'lol',
    title: 'Patch 14.6 Preview',
    status: 'Upcoming',
    time: 'Expected Mar 20',
    url: 'https://www.leagueoflegends.com/en-us/news/game-updates/'
  },
  {
    gameId: 'valorant',
    title: 'Clove Agent Reveal',
    status: 'New Content',
    time: 'Coming Soon',
    url: 'https://playvalorant.com/en-us/news/'
  },
  {
    gameId: 'path-of-exile',
    title: 'Necropolis League',
    status: 'Major Update',
    time: 'Live Now',
    url: 'https://www.pathofexile.com/necropolis'
  },
  {
    gameId: 'overwatch2',
    title: 'Season 10 Dev Update',
    status: 'Dev Update',
    time: 'Just Posted',
    url: 'https://overwatch.blizzard.com/en-us/news/'
  },
  {
    gameId: 'apex',
    title: 'Shadow Society Event',
    status: 'Live Event',
    time: 'Ends Next Week',
    url: 'https://www.ea.com/games/apex-legends/news'
  }
];
