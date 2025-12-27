import { Game } from './types.ts';

export const SUPPORTED_GAMES: Game[] = [
  {
    id: 'lol',
    name: 'League of Legends',
    slug: 'league-of-legends',
    // Epic Games Store Asset (Extremely Stable & Public)
    image: 'https://cdn1.epicgames.com/offer/24b9b5e323bc498198a875794357c2a5/EGS_LeagueofLegends_RiotGames_S1_2560x1440-80471666c140f790f28dff19d5d6a635', 
    themeColor: 'text-nexus-gold',
  },
  {
    id: 'helldivers-2',
    name: 'Helldivers 2',
    slug: 'helldivers-2',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/553850/library_600x900.jpg',
    themeColor: 'text-yellow-400',
  },
  {
    id: 'valorant',
    name: 'VALORANT',
    slug: 'valorant',
    // Epic Games Store Asset
    image: 'https://cdn1.epicgames.com/offer/cbd5b3d310a54b12bf3fe8c41994174f/EGS_VALORANT_RiotGames_S1_2560x1440-d9ca2c0f20d44e2f9925227b81255738',
    themeColor: 'text-rose-500',
  },
  {
    id: 'cs2',
    name: 'Counter-Strike 2',
    slug: 'counter-strike-2',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/730/library_600x900.jpg',
    themeColor: 'text-orange-400',
  },
  {
    id: 'no-mans-sky',
    name: "No Man's Sky",
    slug: 'no-mans-sky',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/275850/library_600x900.jpg',
    themeColor: 'text-teal-300',
  },
  {
    id: 'apex',
    name: 'Apex Legends',
    slug: 'apex-legends',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1172470/library_600x900.jpg',
    themeColor: 'text-red-500',
  },
  {
    id: 'deep-rock-galactic',
    name: 'Deep Rock Galactic',
    slug: 'deep-rock-galactic',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/548430/library_600x900.jpg',
    themeColor: 'text-yellow-600',
  },
  {
    id: 'bf2042',
    name: 'Battlefield 2042',
    slug: 'battlefield-2042',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1517290/library_600x900.jpg', 
    themeColor: 'text-cyan-500',
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    slug: 'baldurs-gate-3',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1086940/library_600x900.jpg',
    themeColor: 'text-red-900',
  },
  {
    id: 'warframe',
    name: 'Warframe',
    slug: 'warframe',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/230410/library_600x900.jpg',
    themeColor: 'text-cyan-200',
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077',
    slug: 'cyberpunk-2077',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/library_600x900.jpg',
    themeColor: 'text-yellow-300',
  },
  {
    id: 'dota2',
    name: 'Dota 2',
    slug: 'dota-2',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/570/library_600x900.jpg',
    themeColor: 'text-red-600',
  },
  {
    id: 'the-finals',
    name: 'The Finals',
    slug: 'the-finals',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073850/library_600x900.jpg',
    themeColor: 'text-red-500',
  },
  {
    id: 'palworld',
    name: 'Palworld',
    slug: 'palworld',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1623730/library_600x900.jpg',
    themeColor: 'text-blue-400',
  },
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    slug: 'elden-ring',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1245620/library_600x900.jpg',
    themeColor: 'text-yellow-100',
  },
  {
    id: 'overwatch2',
    name: 'Overwatch 2',
    slug: 'overwatch-2',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2357570/library_600x900.jpg',
    themeColor: 'text-orange-500',
  },
  {
    id: 'minecraft',
    name: 'Minecraft',
    slug: 'minecraft',
    // Microsoft Store Asset (Very Stable)
    image: 'https://store-images.s-microsoft.com/image/apps.60323.13850085746326678.9b63e9c9-6330-4e80-9366-5d66649d2e1c.e954b830-4754-4654-a823-3b10c6607e4d',
    themeColor: 'text-green-600',
  },
  {
    id: 'genshin-impact',
    name: 'Genshin Impact',
    slug: 'genshin-impact',
    // Epic Games Store Asset
    image: 'https://cdn1.epicgames.com/salesEvent/salesEvent/EGS_GenshinImpact_miHoYoLimited_S1_2560x1440-91c6cd7312cc2647c3ebccca10f30399',
    themeColor: 'text-purple-300',
  },
  {
    id: 'diablo4',
    name: 'Diablo IV',
    slug: 'diablo-iv',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2344520/library_600x900.jpg',
    themeColor: 'text-red-700',
  },
  {
    id: 'destiny2',
    name: 'Destiny 2',
    slug: 'destiny-2',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1085660/library_600x900.jpg',
    themeColor: 'text-teal-400',
  },
  {
    id: 'r6siege',
    name: 'Rainbow Six Siege',
    slug: 'rainbow-six-siege',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/359550/library_600x900.jpg',
    themeColor: 'text-blue-500',
  },
  {
    id: 'delta-force',
    name: 'Delta Force',
    slug: 'delta-force-hawk-ops',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2507950/library_600x900.jpg',
    themeColor: 'text-emerald-500',
  },
  {
    id: 'arena-breakout',
    name: 'Arena Breakout: Infinite',
    slug: 'arena-breakout-infinite',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2073620/library_600x900.jpg',
    themeColor: 'text-yellow-600',
  },
  {
    id: 'once-human',
    name: 'Once Human',
    slug: 'once-human',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2139460/library_600x900.jpg',
    themeColor: 'text-yellow-400',
  },
  {
    id: 'bloons-td6',
    name: 'Bloons TD 6',
    slug: 'bloons-td-6',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/960090/library_600x900.jpg',
    themeColor: 'text-purple-400',
  },
  {
    id: 'fortnite',
    name: 'Fortnite',
    slug: 'fortnite',
    // Epic Games Store Asset
    image: 'https://cdn1.epicgames.com/offer/fn/29CM_Hero_2560x1440-9a205a764728b7b9b007b8b438b43800',
    themeColor: 'text-blue-400',
  },
  {
    id: 'gta-online',
    name: 'GTA Online',
    slug: 'grand-theft-auto-online',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/library_600x900.jpg',
    themeColor: 'text-green-500',
  },
  {
    id: 'path-of-exile',
    name: 'Path of Exile',
    slug: 'path-of-exile',
    // Epic Games Store Asset
    image: 'https://cdn1.epicgames.com/offer/21160c874df1492ba6438084a9c372b8/EGS_PathofExile_GrindingGearGames_S1_2560x1440-6218151213f5080c98f9801826f6580f',
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