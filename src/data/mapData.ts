export interface School {
    id: string;
    name: string;
    lat: number;
    lng: number;
    logo: string; // Placeholder; provide real image path later
    description: { en: string; zh: string };
    website: string;
    nearestMRT: string[]; // IDs of nearest MRT stations
}

export interface MRTStation {
    id: string;
    name: string;
    code: string; // e.g., "NS24/NE6"
    lat: number;
    lng: number;
    lines: string[]; // e.g., ["NS", "NE"]
    avgPropertyPrice: string; // e.g., "$1,800 psf"
    description: { en: string; zh: string };
}

export const schools: School[] = [
    {
        id: 'kaplan',
        name: 'Kaplan Singapore',
        lat: 1.3006,
        lng: 103.8496,
        logo: '',
        description: {
            en: 'Kaplan Singapore is one of the largest private education institutions in Singapore.',
            zh: 'Kaplan 新加坡是新加坡规模较大的私立教育机构之一。',
        },
        website: 'https://www.kaplan.com.sg/',
        nearestMRT: ['dhoby-ghaut', 'rochors', 'little-india'],
    },
    {
        id: 'psb',
        name: 'PSB Academy',
        lat: 1.2904,
        lng: 103.8565,
        logo: '',
        description: {
            en: 'PSB Academy is known as "The Future Academy", with an approach to education that focuses on what really matters: performance in the New Economy.',
            zh: 'PSB 学院被称为“未来学院”，强调与新经济相关的实践能力与就业导向。',
        },
        website: 'https://www.psb-academy.edu.sg/',
        nearestMRT: ['city-hall', 'esplanade', 'promenade'],
    },
    {
        id: 'amity',
        name: 'Amity Global Institute',
        lat: 1.2963,
        lng: 103.8447,
        logo: '',
        description: {
            en: 'Amity Global Institute is part of a leading world-wide Education Group which has over two decades of experience in the field of education.',
            zh: 'Amity Global Institute 隶属于全球教育集团，拥有二十余年的教育经验。',
        },
        website: 'http://www.amitysingapore.sg/',
        nearestMRT: ['dhoby-ghaut', 'somerset', 'fort-canning'],
    },
    {
        id: 'nus',
        name: 'National University of Singapore (NUS)',
        lat: 1.2966,
        lng: 103.7764,
        logo: '',
        description: {
            en: "A leading global university centred in Asia, the National University of Singapore (NUS) is Singapore's flagship university.",
            zh: '新加坡国立大学（NUS）是亚洲领先的全球大学，也是新加坡的旗舰学府。',
        },
        website: 'https://www.nus.edu.sg/',
        nearestMRT: ['kent-ridge', 'clementi'],
    },
    {
        id: 'ntu',
        name: 'Nanyang Technological University (NTU)',
        lat: 1.3483,
        lng: 103.6831,
        logo: '',
        description: {
            en: 'A research-intensive public university, Nanyang Technological University, Singapore (NTU Singapore) has 33,000 undergraduate and postgraduate students.',
            zh: '南洋理工大学（NTU Singapore）是一所研究型公立大学，拥有约 33,000 名本科与研究生。',
        },
        website: 'https://www.ntu.edu.sg/',
        nearestMRT: ['pioneer', 'boon-lay'],
    },
];

export const mrtStations: MRTStation[] = [
    {
        id: 'dhoby-ghaut',
        name: 'Dhoby Ghaut',
        code: 'NS24/NE6/CC1',
        lat: 1.2991,
        lng: 103.8454,
        lines: ['NS', 'NE', 'CC'],
        avgPropertyPrice: '$2,400 psf',
        description: {
            en: 'A major interchange station located at the eastern end of Orchard Road.',
            zh: '位于乌节路东端的重要换乘站。',
        },
    },
    {
        id: 'rochors',
        name: 'Rochor',
        code: 'DT13',
        lat: 1.3036,
        lng: 103.8526,
        lines: ['DT'],
        avgPropertyPrice: '$2,100 psf',
        description: {
            en: 'Located in the Rochor planning area, serving the Sim Lim Square and Lasalle College of the Arts.',
            zh: '位于 Rochor 区，服务 Sim Lim Square 与拉萨尔艺术学院周边。',
        },
    },
    {
        id: 'little-india',
        name: 'Little India',
        code: 'NE7/DT12',
        lat: 1.3068,
        lng: 103.8492,
        lines: ['NE', 'DT'],
        avgPropertyPrice: '$1,900 psf',
        description: {
            en: 'Serves the ethnic district of Little India.',
            zh: '服务小印度文化街区。',
        },
    },
    {
        id: 'city-hall',
        name: 'City Hall',
        code: 'NS25/EW13',
        lat: 1.2932,
        lng: 103.8522,
        lines: ['NS', 'EW'],
        avgPropertyPrice: '$2,800 psf',
        description: {
            en: 'Located in the Civic District, near many historical landmarks.',
            zh: '位于市政区，毗邻多处历史地标。',
        },
    },
    {
        id: 'esplanade',
        name: 'Esplanade',
        code: 'CC3',
        lat: 1.2935,
        lng: 103.8554,
        lines: ['CC'],
        avgPropertyPrice: '$2,700 psf',
        description: {
            en: 'Serves the Esplanade - Theatres on the Bay and Suntec City.',
            zh: '服务滨海艺术中心与新达城一带。',
        },
    },
    {
        id: 'promenade',
        name: 'Promenade',
        code: 'CC4/DT15',
        lat: 1.2939,
        lng: 103.8603,
        lines: ['CC', 'DT'],
        avgPropertyPrice: '$2,900 psf',
        description: {
            en: 'Located near the Singapore Flyer and Marina Bay Sands.',
            zh: '靠近新加坡摩天观景轮与滨海湾金沙。',
        },
    },
    {
        id: 'somerset',
        name: 'Somerset',
        code: 'NS23',
        lat: 1.3002,
        lng: 103.8392,
        lines: ['NS'],
        avgPropertyPrice: '$2,600 psf',
        description: {
            en: 'Located in the heart of the Orchard Road shopping belt.',
            zh: '位于乌节路商圈核心地带。',
        },
    },
    {
        id: 'fort-canning',
        name: 'Fort Canning',
        code: 'DT20',
        lat: 1.2925,
        lng: 103.8443,
        lines: ['DT'],
        avgPropertyPrice: '$2,500 psf',
        description: {
            en: 'Located next to Fort Canning Park and Liang Court.',
            zh: '毗邻福康宁公园一带。',
        },
    },
    {
        id: 'kent-ridge',
        name: 'Kent Ridge',
        code: 'CC24',
        lat: 1.2933,
        lng: 103.7845,
        lines: ['CC'],
        avgPropertyPrice: '$1,600 psf',
        description: {
            en: 'Serves the National University of Singapore and National University Hospital.',
            zh: '服务新加坡国立大学及国立大学医院周边。',
        },
    },
    {
        id: 'clementi',
        name: 'Clementi',
        code: 'EW23',
        lat: 1.3151,
        lng: 103.7652,
        lines: ['EW'],
        avgPropertyPrice: '$1,400 psf',
        description: {
            en: 'A major residential town in the west.',
            zh: '新加坡西部重要住宅城镇之一。',
        },
    },
    {
        id: 'pioneer',
        name: 'Pioneer',
        code: 'EW28',
        lat: 1.3376,
        lng: 103.6974,
        lines: ['EW'],
        avgPropertyPrice: '$1,100 psf',
        description: {
            en: 'Serves the industrial areas in Jurong West.',
            zh: '服务裕廊西部工业区一带。',
        },
    },
    {
        id: 'boon-lay',
        name: 'Boon Lay',
        code: 'EW27',
        lat: 1.3386,
        lng: 103.7058,
        lines: ['EW'],
        avgPropertyPrice: '$1,200 psf',
        description: {
            en: 'Located at Jurong Point Shopping Centre.',
            zh: '位于 Jurong Point 商圈附近。',
        },
    },
];
