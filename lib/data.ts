import { Property, CuratedExperience, BookingAddon, UserProfile } from './types';

export const POPULAR_DESTINATIONS = [
  {
    id: 'amalfi',
    name: 'Amalfi Coast, Italy',
    shortName: 'Amalfi Coast',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 14,
    averagePrice: 1650,
    tag: 'Coastal Romance & Riva Charters'
  },
  {
    id: 'kyoto',
    name: 'Kyoto Arashiyama, Japan',
    shortName: 'Kyoto',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 9,
    averagePrice: 1850,
    tag: 'Zen Sanctuaries & Private Onsens'
  },
  {
    id: 'maldives',
    name: 'Baa Atoll & Noonu, Maldives',
    shortName: 'Maldives',
    country: 'Maldives',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 18,
    averagePrice: 2400,
    tag: 'Overwater Bio-Reserves & Star Palaces'
  },
  {
    id: 'st-moritz',
    name: 'St. Moritz Engadin, Switzerland',
    shortName: 'St. Moritz',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 8,
    averagePrice: 2100,
    tag: 'Heli-Skiing & Alpine Royal Chalets'
  },
  {
    id: 'santorini',
    name: 'Oia & Caldera, Santorini, Greece',
    shortName: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 12,
    averagePrice: 1450,
    tag: 'Sunset Infinity Pools & Cycladic Caviar'
  },
  {
    id: 'aspen',
    name: 'Aspen Snowmass, Colorado, USA',
    shortName: 'Aspen',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 7,
    averagePrice: 2750,
    tag: 'Private Mountain Estates & Sommelier Cellars'
  },
  {
    id: 'serengeti',
    name: 'Serengeti & Ngorongoro, Tanzania',
    shortName: 'Serengeti',
    country: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    propertyCount: 6,
    averagePrice: 3200,
    tag: 'Private Tented Palaces & Big Five Fly-In'
  }
];

export const PROPERTIES: Property[] = [
  {
    id: 'villa-bellevue-amalfi',
    name: 'Villa Bella Vista Cliffside Palace',
    tagline: 'Perched 300 meters above Positano with private Riva yacht marina access',
    destination: 'Amalfi Coast, Italy',
    country: 'Italy',
    region: 'Campania',
    address: 'Via Panoramica 42, Positano, Amalfi Coast, Italy',
    propertyType: 'Cliffside Sanctuary',
    starRating: 5,
    reviewScore: 4.98,
    reviewCount: 142,
    basePricePerNight: 1850,
    originalPricePerNight: 2200,
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80'
    ],
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-villa-with-a-pool-and-ocean-view-41484-large.mp4',
    description: 'Carved seamlessly into the sun-drenched cliffs of Positano, Villa Bella Vista offers an exclusive Mediterranean sanctuary. Featuring private cascading infinity seawater pools, three-star Michelin private dining curated by Chef Marcello, and direct funicular access to our private Riva boat cove.',
    highlights: [
      'Private 28m heated infinity pool hanging over the Tyrrhenian Sea',
      'Dedicated 24-hour British Butler Guild certified team',
      'Complimentary daily 3-hour private Riva Aquarama boat cruise',
      '1,200-bottle antique wine cave with master sommelier tastings'
    ],
    amenities: [
      'Private Infinity Pool',
      '24/7 Dedicated Butler',
      'Helipad Access',
      'Michelin 3-Star Chef',
      'Private Marina & Yacht',
      'Spa & Hammam',
      'High-Speed Starlink',
      'Valet Chauffeur'
    ],
    features: {
      michelinDining: true,
      butlerService: true,
      helipad: true,
      privatePool: true,
      spaWellness: true,
      beachfront: true,
      yachtAccess: true
    },
    subRatings: {
      cleanliness: 5.0,
      location: 5.0,
      service: 4.98,
      gastronomy: 4.96,
      privacy: 4.99
    },
    coordinates: { lat: 40.6281, lng: 14.4850 },
    weather: { tempC: 24, condition: 'Sunny & Coastal Breeze', icon: 'Sun' },
    featured: true,
    surgeStatus: 'high_demand',
    rooms: [
      {
        id: 'room-bella-penthouse',
        name: 'The Royal Positano Penthouse Suite',
        sizeSqM: 280,
        maxGuests: 4,
        bedType: '1 King Bed + 1 Queen Bed (Custom Hypnos)',
        pricePerNight: 2850,
        originalPricePerNight: 3400,
        availableCount: 1,
        description: 'Occupying the entire top level with 270-degree panorama of the coastline, private plunge pool, and wraparound marble terrace.',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Private Heated Plunge Pool', 'Full Marble Bath with Sea View', 'Private Elevator', 'Champagne Bar', 'Dedicated Butler'],
        features: ['270° Panoramic Ocean View', 'B&O Sound System', 'Dyson Airwrap Suite', 'Hermès Toiletries']
      },
      {
        id: 'room-bella-cliff-residence',
        name: 'Cliffside Panorama Suite & Terrace',
        sizeSqM: 165,
        maxGuests: 2,
        bedType: '1 Emperor Size Bed',
        pricePerNight: 1850,
        originalPricePerNight: 2200,
        availableCount: 2,
        description: 'Featuring arched Venetian glass windows, outdoor Jacuzzi, and private sun lounger pavilion carved into the cliff.',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Outdoor Cliff Jacuzzi', 'Rain Shower with Chromotherapy', 'Walk-in Wardrobe', 'Espresso Bar'],
        features: ['Direct Sun Pavilion', 'In-suite Breakfast by Michelin Chef', 'Acqua di Parma Amenities']
      }
    ],
    reviews: [
      {
        id: 'rev-1',
        author: 'Lady Charlotte V.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'London, United Kingdom',
        rating: 5,
        date: 'June 2026',
        title: 'Unrivaled Mediterranean perfection',
        comment: 'From the private Riva boat transfer upon arrival to the flawless breakfast served on our cliffside terrace, Villa Bella Vista redefines ultra-luxury. Chef Marcello crafted an unforgettable 7-course seafood feast under the stars.',
        stayedRoom: 'The Royal Positano Penthouse Suite',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Alexander & Elena Dupont',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        location: 'Geneva, Switzerland',
        rating: 5,
        date: 'May 2026',
        title: 'Absolute privacy and world-class service',
        comment: 'Our dedicated butler Matteo anticipated our every wish before we could even ask. The wine cellar tasting was world-class. We have already rebooked for next summer.',
        stayedRoom: 'Cliffside Panorama Suite & Terrace',
        verified: true
      }
    ]
  },
  {
    id: 'resort-suiran-kyoto',
    name: 'Suiran Royal Onsen & Bamboo Retreat',
    tagline: 'Private hot spring pavilions nestled in the historic Arashiyama bamboo forest',
    destination: 'Kyoto Arashiyama, Japan',
    country: 'Japan',
    region: 'Kansai',
    address: '12 Sagatenryuji Susukinobaba-cho, Ukyo-ku, Kyoto, Japan',
    propertyType: 'Private Villa',
    starRating: 5,
    reviewScore: 4.99,
    reviewCount: 98,
    basePricePerNight: 2150,
    originalPricePerNight: 2500,
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An ethereal sanctuary along the peaceful Hozu River, combining centuries-old Japanese architectural mastery with modern aesthetic luxury. Featuring natural mineral thermal onsen in every pavilion and private Kaiseki dining rituals by Kyoto culinary masters.',
    highlights: [
      'Private mineral-rich outdoor onsen bath in ancient hinoki cypress wood',
      'Exclusive after-hours private access to historic Tenryu-ji Zen temple gardens',
      'Private 10-course seasonal Kaiseki banquet paired with rare aged sakes',
      'Bespoke traditional tea master ceremony in your private Japanese garden pavilion'
    ],
    amenities: [
      'Private Hinoki Onsen',
      'Traditional Kaiseki Dining',
      'Zen Garden Pavilion',
      'Private Tea Master',
      'Concierge Chauffeur',
      'Forest Spa Rituals',
      'Starlink Wi-Fi'
    ],
    features: {
      michelinDining: true,
      butlerService: true,
      privatePool: true,
      spaWellness: true
    },
    subRatings: {
      cleanliness: 5.0,
      location: 4.98,
      service: 5.0,
      gastronomy: 5.0,
      privacy: 5.0
    },
    coordinates: { lat: 35.0116, lng: 135.6777 },
    weather: { tempC: 21, condition: 'Serene & Gentle Breeze', icon: 'CloudSun' },
    featured: true,
    surgeStatus: 'limited_availability',
    rooms: [
      {
        id: 'room-kyoto-emperor',
        name: 'The Emperor Arashiyama Garden Villa',
        sizeSqM: 220,
        maxGuests: 3,
        bedType: '1 Emperor Futon/Western Hybrid + Tatami Lounging',
        pricePerNight: 2950,
        originalPricePerNight: 3400,
        availableCount: 1,
        description: 'Surrounded by a private moss garden and weeping maples, featuring an expansive open-air cedar onsen bath and tea pavilion.',
        image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Outdoor Hinoki Onsen', 'Private Zen Rock Garden', 'Tatami Tea Room', 'Bespoke Kimono Wardrobe'],
        features: ['Direct Hozu River View', 'Private Tea Ceremony Host', 'Rare Kyoto Sake Bar']
      },
      {
        id: 'room-kyoto-bamboo',
        name: 'Bamboo Moon Pavilion Suite',
        sizeSqM: 140,
        maxGuests: 2,
        bedType: '1 King Handcrafted Bed',
        pricePerNight: 2150,
        originalPricePerNight: 2500,
        availableCount: 3,
        description: 'Intimate forest suite with floor-to-ceiling glass looking out onto illuminated bamboo, granite soaking tub, and cedar terrace.',
        image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Granite Hot Spring Tub', 'Rain Garden Terrace', 'Japanese Tea Bar', 'Diptyque Amenities'],
        features: ['Bamboo Forest View', 'Daily In-room Kaiseki Breakfast']
      }
    ],
    reviews: [
      {
        id: 'rev-3',
        author: 'Kenji & Dr. Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        location: 'San Francisco, USA',
        rating: 5,
        date: 'April 2026',
        title: 'Transcendental peace and hospitality (Omotenashi)',
        comment: 'The sound of the river and bamboo rustling while soaking in the private onsen under starlight was the most tranquil experience of our lives. The tea master was phenomenal.',
        stayedRoom: 'The Emperor Arashiyama Garden Villa',
        verified: true
      }
    ]
  },
  {
    id: 'resort-soneva-maldives',
    name: 'Soneva Elysium Reserve & Observatory',
    tagline: 'Ultra-luxury overwater palaces with retractable astronomical roofs and water slides',
    destination: 'Baa Atoll & Noonu, Maldives',
    country: 'Maldives',
    region: 'Baa Atoll Biosphere',
    address: 'Baa Atoll UNESCO Biosphere Reserve, Maldives',
    propertyType: 'Overwater Resort',
    starRating: 5,
    reviewScore: 4.99,
    reviewCount: 210,
    basePricePerNight: 3100,
    originalPricePerNight: 3750,
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An idyllic barefoot luxury haven in the heart of a UNESCO Biosphere Reserve. Overwater villas feature master bedrooms with automated retractable roofs for stargazing directly from your bed, private curving slides into the crystal lagoon, and 24/7 dedicated "Barefoot Guardian" service.',
    highlights: [
      'Retractable master ceiling for starlit nights over the Indian Ocean',
      'Private 30-meter curving slide from upper deck straight into turquoise lagoon',
      'Resident marine biologist for private sea turtle and manta ray expeditions',
      'Michelin-starred overwater dining treehouse suspended above the coral reefs'
    ],
    amenities: [
      'Private Infinity Pool & Slide',
      'Retractable Stargazing Roof',
      'Dedicated Barefoot Guardian',
      'Submarine / Seabob Access',
      'Overwater Spa & Ayurveda',
      'Helipad / Seaplane Jetty',
      'Private Cinema Under Stars'
    ],
    features: {
      michelinDining: true,
      butlerService: true,
      helipad: true,
      privatePool: true,
      spaWellness: true,
      beachfront: true,
      yachtAccess: true
    },
    subRatings: {
      cleanliness: 5.0,
      location: 5.0,
      service: 5.0,
      gastronomy: 4.98,
      privacy: 5.0
    },
    coordinates: { lat: 5.3082, lng: 73.0805 },
    weather: { tempC: 29, condition: 'Tropical Sun & Azure Waters', icon: 'Sun' },
    featured: true,
    surgeStatus: 'high_demand',
    rooms: [
      {
        id: 'room-maldives-palace',
        name: 'The 2-Bedroom Overwater Star Palace & Slide',
        sizeSqM: 460,
        maxGuests: 5,
        bedType: '2 Emperor King Suites + Daybeds',
        pricePerNight: 4850,
        originalPricePerNight: 5800,
        availableCount: 1,
        description: 'Multi-level overwater masterpiece with private slide, glass floor panels, catamaran nets over the ocean, sauna, and wine room.',
        image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Curved Water Slide', 'Retractable Roof', 'Overwater Hammocks', 'Glass Floor Viewing Salon', 'Private Wine Vault'],
        features: ['Unobstructed Sunset Views', 'Complimentary Seaplane VIP Lounge', 'Unlimited Water Sports']
      },
      {
        id: 'room-maldives-water-villa',
        name: '1-Bedroom Sunset Water Villa with Pool',
        sizeSqM: 290,
        maxGuests: 3,
        bedType: '1 King Bed + Lounge Daybed',
        pricePerNight: 3100,
        originalPricePerNight: 3750,
        availableCount: 2,
        description: 'Expansive deck with private freshwater pool, outdoor sunken seating, lagoon access ladder, and open-air bathroom with sunken tub.',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Private Overwater Pool', 'Sunken Lounge', 'Open-air Bathtub', 'Bespoke Mini Bar'],
        features: ['Lagoon Snorkeling Access', 'Daily Champagne Canapés']
      }
    ],
    reviews: [
      {
        id: 'rev-4',
        author: 'Sebastian H. & Family',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
        location: 'Munich, Germany',
        rating: 5,
        date: 'July 2026',
        title: 'Paradise brought to life',
        comment: 'Sliding into the warm turquoise ocean before breakfast and stargazing through our opened bedroom roof at night will be etched in our memories forever.',
        stayedRoom: 'The 2-Bedroom Overwater Star Palace & Slide',
        verified: true
      }
    ]
  },
  {
    id: 'chalet-matterhorn-st-moritz',
    name: 'Chalet Grand Glacier Royale',
    tagline: 'Ultra-exclusive ski-in/ski-out estate overlooking the Swiss Alps & St. Moritz Lake',
    destination: 'St. Moritz Engadin, Switzerland',
    country: 'Switzerland',
    region: 'Grisons',
    address: 'Via Serlas 88, St. Moritz, Switzerland',
    propertyType: 'Alpine Chalet',
    starRating: 5,
    reviewScore: 4.97,
    reviewCount: 76,
    basePricePerNight: 2750,
    originalPricePerNight: 3300,
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'The pinnacle of Swiss Alpine grandeur. Crafted from reclaimed Austrian timber and Vals quartzite, this ski-in/ski-out chalet features a private indoor swimming pool looking directly into snow-capped peaks, an underground private cinema, a thermal spa suite, and Rolls-Royce chauffeur service.',
    highlights: [
      'Direct Ski-in / Ski-out access to Corviglia slopes',
      'Heated indoor ozone swimming pool with floor-to-ceiling mountain views',
      'Private helicopter pad with VIP transfers from Zurich / Milan',
      'Swiss private master chef preparing customized raclette, fondue, and haute cuisine'
    ],
    amenities: [
      'Ski-in / Ski-out Access',
      'Indoor Mountain Pool & Spa',
      'Private Ski Butler & Boot Warming',
      'Helipad',
      'Underground Cinema',
      'Fireplace Suites',
      'Wine & Cognac Tasting Room'
    ],
    features: {
      michelinDining: true,
      butlerService: true,
      helipad: true,
      privatePool: true,
      skiInOut: true,
      spaWellness: true
    },
    subRatings: {
      cleanliness: 5.0,
      location: 4.99,
      service: 4.97,
      gastronomy: 4.95,
      privacy: 5.0
    },
    coordinates: { lat: 46.4908, lng: 9.8355 },
    weather: { tempC: -2, condition: 'Powder Snow & Crisp Alpine Air', icon: 'Snowflake' },
    featured: true,
    surgeStatus: 'limited_availability',
    rooms: [
      {
        id: 'room-chalet-master-suite',
        name: 'The King Glacier Panoramic Penthouse',
        sizeSqM: 310,
        maxGuests: 4,
        bedType: '2 King Custom Swiss Wood Beds',
        pricePerNight: 3950,
        originalPricePerNight: 4700,
        availableCount: 1,
        description: 'Double-height cathedral ceilings with hand-carved stone fireplace, private balcony jacuzzi with thermal heating, and en-suite Vals quartzite steam room.',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Stone Fireplace', 'Thermal Balcony Jacuzzi', 'Private Quartzite Steam Room', 'Ski Gear Locker'],
        features: ['Corviglia Glacier Panorama', 'Private Ski Butler & Custom Boot Fitting']
      },
      {
        id: 'room-chalet-deluxe-pine',
        name: 'Alpine Timber Suite with Mountain Balcony',
        sizeSqM: 180,
        maxGuests: 2,
        bedType: '1 King Bed (Cashmere Linens)',
        pricePerNight: 2750,
        originalPricePerNight: 3300,
        availableCount: 2,
        description: 'Warm Swiss pine interiors, freestanding copper soaking tub looking toward the peaks, and glass fireplace.',
        image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Copper Soaking Tub', 'Glass Fireplace', 'Private Alpine Balcony', 'Heated Stone Floors'],
        features: ['Direct Lake St. Moritz View', 'Swiss Afternoon Tea Service']
      }
    ],
    reviews: [
      {
        id: 'rev-5',
        author: 'Countess Victoria von R.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
        location: 'Vienna, Austria',
        rating: 5,
        date: 'January 2026',
        title: 'The gold standard of European winter luxury',
        comment: 'Skiing right up to the chalet door to find warm glühwein, freshly baked pastries, and our heated ski boots prepped by the butler was immaculate.',
        stayedRoom: 'The King Glacier Panoramic Penthouse',
        verified: true
      }
    ]
  },
  {
    id: 'resort-canaves-santorini',
    name: 'Canaves Oia Infinity Sanctuary',
    tagline: 'Sculpted whitewashed caves and cantilevered infinity pools over the volcanic caldera',
    destination: 'Oia & Caldera, Santorini, Greece',
    country: 'Greece',
    region: 'Cyclades',
    address: 'Main Street, Oia, Santorini, Greece',
    propertyType: 'Cliffside Sanctuary',
    starRating: 5,
    reviewScore: 4.96,
    reviewCount: 165,
    basePricePerNight: 1650,
    originalPricePerNight: 1950,
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'An architectural icon carved into the dramatic cliffs of Oia. Endless azure views, cantilevered heated pools that blend into the Aegean horizon, and private sunset yacht cruises around the volcanic caldera.',
    highlights: [
      'Cantilevered private infinity pool with 180-degree caldera sunset vantage',
      'Cave-suite architecture with natural volcanic insulation and modern minimalist finish',
      'Private sommelier tastings of rare Assyrtiko vintages',
      'Sunset champagne catamaran cruise included with suites'
    ],
    amenities: [
      'Private Caldera Pool',
      'Cave Architecture',
      'Catamaran Sunset Charter',
      'Greek Fine Dining',
      'Valet Luggage Porter',
      'Spa Wellness Cave'
    ],
    features: {
      michelinDining: true,
      butlerService: true,
      privatePool: true,
      spaWellness: true,
      yachtAccess: true
    },
    subRatings: {
      cleanliness: 4.99,
      location: 5.0,
      service: 4.95,
      gastronomy: 4.94,
      privacy: 4.93
    },
    coordinates: { lat: 36.4618, lng: 25.3753 },
    weather: { tempC: 26, condition: 'Golden Sunshine & Sea Spray', icon: 'Sun' },
    featured: false,
    surgeStatus: 'best_value',
    rooms: [
      {
        id: 'room-santorini-cave-pool',
        name: 'The Infinity Cave Pool Residence',
        sizeSqM: 150,
        maxGuests: 2,
        bedType: '1 Emperor Size Bed',
        pricePerNight: 2350,
        originalPricePerNight: 2700,
        availableCount: 2,
        description: 'Whitewashed cave suite with private indoor/outdoor swimming pool stretching out toward the Aegean horizon.',
        image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Indoor/Outdoor Cave Pool', 'Private Sunset Terrace', 'Rain Shower', 'Espresso & Cocktail Bar'],
        features: ['Front Row Sunset Caldera View', 'Greek Gourmet Breakfast on Terrace']
      }
    ],
    reviews: [
      {
        id: 'rev-6',
        author: 'Dimitri & Chloe M.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        location: 'Paris, France',
        rating: 5,
        date: 'June 2026',
        title: 'Most romantic sunset in the world',
        comment: 'Watching the sunset from our private infinity pool with champagne in hand was pure magic. Unbeatable service.',
        stayedRoom: 'The Infinity Cave Pool Residence',
        verified: true
      }
    ]
  },
  {
    id: 'resort-singita-serengeti',
    name: 'Singita Sasakwa Serengeti Palace',
    tagline: 'Edwardian manor and private rim-flow pool villas overlooking the Great Migration plains',
    destination: 'Serengeti & Ngorongoro, Tanzania',
    country: 'Tanzania',
    region: 'Grumeti Reserve',
    address: 'Grumeti Reserves, Serengeti National Park, Tanzania',
    propertyType: 'Safari Lodge',
    starRating: 5,
    reviewScore: 5.0,
    reviewCount: 84,
    basePricePerNight: 3400,
    originalPricePerNight: 4100,
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Set atop Sasakwa Hill in an exclusive 350,000-acre private concession, offering panoramic views of the Serengeti plains. Complete with private airstrip, private safari vehicles with master trackers, and French-inspired bush dinners.',
    highlights: [
      'Private 350,000-acre wilderness concession with zero tourist crowds',
      'Private custom Land Cruiser and dedicated master tracker & guide',
      'Sunrise hot air balloon safari with champagne breakfast in the bush',
      'Private rim-flow infinity pool overlooking endless savanna wildlife'
    ],
    amenities: [
      'Private Safari Concession',
      'Private Airstrip & Plane',
      'Rim-flow Plunge Pool',
      'Dedicated Wildlife Tracker',
      'Bush Dining Under Stars',
      'Spa & Equestrian Center'
    ],
    features: {
      michelinDining: true,
      butlerService: true,
      helipad: true,
      privatePool: true,
      spaWellness: true
    },
    subRatings: {
      cleanliness: 5.0,
      location: 5.0,
      service: 5.0,
      gastronomy: 4.99,
      privacy: 5.0
    },
    coordinates: { lat: -2.1540, lng: 34.6857 },
    weather: { tempC: 28, condition: 'Golden Savanna Sun', icon: 'Sun' },
    featured: true,
    surgeStatus: 'exclusive',
    rooms: [
      {
        id: 'room-serengeti-manor-villa',
        name: 'The Royal Sasakwa Hillside Villa',
        sizeSqM: 350,
        maxGuests: 4,
        bedType: '2 King 4-Poster Beds (Custom Netting)',
        pricePerNight: 4600,
        originalPricePerNight: 5500,
        availableCount: 1,
        description: 'Colonial luxury estate with crystal chandeliers, antique silver tea sets, heated rim-flow pool looking out to the Great Migration herds.',
        image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1000&q=80',
        amenities: ['Rim-flow Heated Pool', 'Private Spotting Scope', 'Antique Fireplaces', 'Personal Chef'],
        features: ['Panoramic Serengeti Plains View', 'Private Game Drives Anytime', 'All Meals & Premium Cellar Wines Included']
      }
    ],
    reviews: [
      {
        id: 'rev-7',
        author: 'Sir Arthur Sterling',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        location: 'Melbourne, Australia',
        rating: 5,
        date: 'August 2026',
        title: 'Beyond five stars — the greatest safari on Earth',
        comment: 'To witness the Great Migration from our private terrace pool, followed by an evening tracking lions with our guide Emmanuel, was breathtaking.',
        stayedRoom: 'The Royal Sasakwa Hillside Villa',
        verified: true
      }
    ]
  }
];

export const CURATED_EXPERIENCES: CuratedExperience[] = [
  {
    id: 'exp-amalfi-riva',
    title: 'Amalfi Riva Yacht & Private Cliff Villa Escape',
    tagline: '4 Nights in Positano cliff palace + 2 full days private Riva yacht charter across Capri & Ischia',
    destination: 'Amalfi Coast, Italy',
    durationDays: 5,
    priceTotal: 9800,
    originalPrice: 11800,
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Yacht & Sea',
    highlights: [
      'Private Riva Aquarama yacht with dedicated skipper and Dom Pérignon champagne bar',
      'Private entry to Capri’s Blue Grotto at sunrise before public boats arrive',
      '7-course cliffside Michelin dinner with vintage Italian wine pairings',
      'Helicopter transfer from Naples Airport directly to property helipad'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Helicopter Arrival & Sunset Welcome Cocktail',
        description: 'Fly over Vesuvius to the private helipad. Settle into the Royal Penthouse with fresh oysters and champagne.',
        included: ['VIP Helipad Transfer', 'Luggage Valet', 'Welcome Gastronomy Dinner']
      },
      {
        day: 2,
        title: 'Private Riva Cruise to Capri & Faraglioni',
        description: 'Board your private wooden Riva yacht for an exclusive tour of hidden sea caves and private swimming coves.',
        included: ['Private Riva Yacht & Skipper', 'Seafood Lunch at La Fontelina Beach Club', 'Caviar & Champagne']
      },
      {
        day: 3,
        title: 'Ravello Secret Gardens & Michelin Tasting',
        description: 'Private chauffeur to Villa Cimbrone’s infinity terrace followed by a sunset concert and Michelin 3-star dining.',
        included: ['Vintage Alfa Romeo Chauffeur', 'Private Garden Tour', 'Sommelier Wine Pairing Dinner']
      },
      {
        day: 4,
        title: 'Ischia Thermal Springs & Sunset Sail',
        description: 'Cruise to the volcanic island of Ischia for private thermal spa rituals and a twilight dinner on the deck.',
        included: ['Thermal Spa Treatment', 'Private Sunset Yacht Sail', 'Chef Dinner Aboard']
      },
      {
        day: 5,
        title: 'Farewell Champagne Breakfast & Departure',
        description: 'Enjoy a leisurely breakfast on your cliffside terrace before a scenic flight or boat transfer.',
        included: ['Gourmet Breakfast', 'VIP Airport Transfer']
      }
    ],
    includedPerks: [
      '5-Day Suite Stay in Luxury Cliffside Villa',
      '2 Full-Day Private Riva Aquarama Charters',
      'All Michelin Star Meals & Wine Pairings',
      'Roundtrip Private Helicopter Transfers',
      '24/7 Dedicated Butler Guild Attendant'
    ],
    propertyId: 'villa-bellevue-amalfi'
  },
  {
    id: 'exp-kyoto-zen',
    title: 'Kyoto Sacred Zen & Imperial Ryokan Journey',
    tagline: 'Private after-hours temple gardens, Kaiseki with living national treasures, and ancient onsen rituals',
    destination: 'Kyoto Arashiyama, Japan',
    durationDays: 4,
    priceTotal: 8400,
    originalPrice: 9900,
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Cultural Heritage',
    highlights: [
      'Exclusive nighttime private meditation led by the Head Abbot of Tenryu-ji',
      'Private traditional Tea Ceremony in a 400-year-old preserved imperial tea house',
      '10-course Kaiseki banquet prepared by a 3-Star Michelin Grand Master',
      'Private morning wooden boat cruise along the misty Hozu Gorge'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Kyoto Arrival & Hinoki Onsen Ritual',
        description: 'Private luxury sedan from Kansai/Kyoto station. Purify in your villa’s private cedar thermal hot spring.',
        included: ['Luxury Chauffeur', 'Traditional Kimono Fitting', 'Welcome Kaiseki Feast']
      },
      {
        day: 2,
        title: 'Sacred Bamboo Dawn & Private Abbot Meditation',
        description: 'Walk through Arashiyama bamboo groves at first light before private meditation in the Golden Pavilion gardens.',
        included: ['Private Monk Guide', 'Exclusive Temple Access', 'Zen Vegetarian Lunch']
      },
      {
        day: 3,
        title: 'Art of the Tea Master & Sword Craftsman Workshop',
        description: 'Meet 15th-generation Japanese sword artisans followed by an intimate tea ceremony.',
        included: ['Artisan Master Access', 'Rare Matcha Tasting', 'Michelin Kaiseki Banquet']
      },
      {
        day: 4,
        title: 'Hozu River Boat Journey & Farewell',
        description: 'Serene morning wooden boat glide through mountain gorges with Japanese green tea.',
        included: ['Private River Boat', 'Bespoke Kyoto Souvenir Gift', 'Chauffeur Departure']
      }
    ],
    includedPerks: [
      '4 Nights in Arashiyama Garden Onsen Villa',
      'Private Access to Closed UNESCO Temples',
      'All Kaiseki Meals & Master Sake Pairings',
      'Private English-Speaking Cultural Scholar Guide',
      'Full Kimono Dressing & Tea Master Ceremony'
    ],
    propertyId: 'resort-suiran-kyoto'
  },
  {
    id: 'exp-maldives-starlight',
    title: 'Maldives Private Atoll & Astronomical Bio-Expedition',
    tagline: '5 Nights overwater star palace, private submarine reef dive, and uninhabited island castaway dinner',
    destination: 'Baa Atoll & Noonu, Maldives',
    durationDays: 6,
    priceTotal: 14500,
    originalPrice: 17200,
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Yacht & Sea',
    highlights: [
      'Stargazing with resort astrophysicist using a 16-inch high-powered telescope',
      'Private 2-person deep sea submarine dive across glowing coral walls',
      'Castaway deserted sandbank dinner with personal chef, violin, and fire torches',
      'Overwater retractable bedroom ceiling for falling asleep beneath constellations'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'VIP Seaplane Arrival & Overwater Villa Check-In',
        description: 'Scenic seaplane flight over coral atolls with direct greeting by your Barefoot Guardian.',
        included: ['VIP Seaplane Transfer', 'Champagne & Tropical Caviar', 'Sunset Overwater Cocktails']
      },
      {
        day: 2,
        title: 'Manta Ray Coral Safari & Marine Biologist Dive',
        description: 'Snorkel and swim alongside gentle manta rays in Hanifaru Bay Biosphere Reserve.',
        included: ['Private Yacht & Gear', 'Marine Biologist Guidance', 'Lagoon Seafood Grill']
      },
      {
        day: 3,
        title: 'Private Submarine Dive & Sandbank Castaway Banquet',
        description: 'Descend 100 meters in a luxury glass submarine before being ferried to a private sandbank for a torchlit dinner.',
        included: ['Luxury Submarine Dive', 'Private Sandbank Dining', 'Live Acoustic Performance']
      },
      {
        day: 4,
        title: 'Overwater Ayurvedic Spa & Treehouse Gastronomy',
        description: 'Rejuvenate with custom 4-hand herbal oil massage and dine suspended among treetops.',
        included: ['3-Hour Ayurvedic Spa Ritual', 'Suspended Treehouse Dining']
      },
      {
        day: 5,
        title: 'Sunset Dolphin Cruise & Stargazing Feast',
        description: 'Spot spinner dolphins at dusk followed by astronomical rooftop constellation tour.',
        included: ['Private Catamaran', 'Astrophysicist Presentation', 'Tasting Menu']
      },
      {
        day: 6,
        title: 'Champagne Lagoon Breakfast & Seaplane Farewell',
        description: 'Floating breakfast served directly in your overwater villa infinity pool.',
        included: ['Floating Pool Breakfast', 'VIP Seaplane Transfer']
      }
    ],
    includedPerks: [
      '6 Days in 2-Bedroom Overwater Star Palace',
      'Private Submarine & Manta Ray Expeditions',
      'Private Sandbank Castaway Dinner with Chef',
      'Unlimited Spa & Ayurvedic Wellness Treatments',
      'Dedicated 24-Hour Barefoot Guardian'
    ],
    propertyId: 'resort-soneva-maldives'
  },
  {
    id: 'exp-alps-heli',
    title: 'Swiss Engadin Heli-Skiing & Glacier Chalet Retreat',
    tagline: '4 Nights alpine royal estate, private helicopter glacier drops, and vintage champagne cellar banquets',
    destination: 'St. Moritz Engadin, Switzerland',
    durationDays: 5,
    priceTotal: 12900,
    originalPrice: 15400,
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    category: 'Alpine & Winter',
    highlights: [
      '2 Days of private helicopter drops onto untracked virgin Alpine powder with UIAGM guides',
      'Private indoor ozone pool and quartzite thermal steam spa at your chalet',
      'Exclusive vintage Krug & caviar tasting in the private underground cave',
      'Custom handcrafted Stöckli ski equipment fitted in-suite by your ski butler'
    ],
    dailyItinerary: [
      {
        day: 1,
        title: 'Rolls-Royce Transfer & In-Chalet Ski Fitting',
        description: 'Chauffeur arrival from Zurich. Enjoy welcome champagne while your master ski technician fits custom gear.',
        included: ['Rolls-Royce Chauffeur', 'Custom Gear Setup', 'Alpine Fondue & Truffle Banquet']
      },
      {
        day: 2,
        title: 'First Heli-Drop: Bernina Glacier Untouched Powder',
        description: 'Helicopter ascent to Piz Bernina (4,000m) for thrilling guided descent across pristine snowfields.',
        included: ['Private Heli Flights', 'UIAGM Mountain Guide', 'Glacier Champagne Picnic']
      },
      {
        day: 3,
        title: 'Corviglia World Cup Run & Thermal Quartzite Spa',
        description: 'Ski private access runs before relaxing in the chalet’s indoor heated ozone pool and steam grotto.',
        included: ['VIP Ski Passes', 'Sports Massage Therapy', 'Chef Michelin Dining']
      },
      {
        day: 4,
        title: 'Heli-Drop Corvatsch & Vintage Krug Cellar Gala',
        description: 'Second heli-ski expedition followed by a celebratory multi-course dinner in the subterranean cellar.',
        included: ['Helicopter Excursion', 'Rare Vintage Wine Gala', 'Live Jazz Performance']
      },
      {
        day: 5,
        title: 'Alpine Sunrise Breakfast & Departure',
        description: 'Leisurely breakfast overlooking Lake St. Moritz before private chauffeur return.',
        included: ['Swiss Gourmet Breakfast', 'Airport Transfer']
      }
    ],
    includedPerks: [
      '5 Days in King Glacier Panoramic Penthouse Chalet',
      '2 Days Private Helicopter Heli-Skiing with Master Guide',
      'Full Handcrafted Ski & Snowboard Equipment',
      'Daily Spa Treatments & Thermal Pool Access',
      'All Haute Cuisine Meals & Vintage Wine Cellar Tastings'
    ],
    propertyId: 'chalet-matterhorn-st-moritz'
  }
];

export const BOOKING_ADDONS: BookingAddon[] = [
  {
    id: 'addon-airport-rolls',
    name: 'Rolls-Royce / Maybach VIP Airport Chauffeur',
    description: 'Bespoke airport terminal meet-and-greet with luxury sedan, chilled bottled water, and fast-track customs assistance.',
    price: 350,
    priceType: 'per_stay',
    icon: 'Car'
  },
  {
    id: 'addon-dom-perignon',
    name: 'Vintage Dom Pérignon & Petrossian Caviar on Ice',
    description: 'Chilled bottle of vintage Dom Pérignon waiting in your suite alongside 50g of Royal Ossetra Caviar and blinis.',
    price: 490,
    priceType: 'per_stay',
    icon: 'Wine'
  },
  {
    id: 'addon-private-heli',
    name: 'Private Helicopter Airport / Scenic Transfer',
    description: 'Direct flight from international airport to property helipad with panoramic aerial views of coastline/mountains.',
    price: 1250,
    priceType: 'per_stay',
    icon: 'Plane'
  },
  {
    id: 'addon-spa-ritual',
    name: 'Couples 90-Min Bespoke Thermal Spa Ritual',
    description: 'In-suite or spa pavilion aromatic massage, organic scrub, and hot stone restorative therapy by master therapists.',
    price: 520,
    priceType: 'per_stay',
    icon: 'Sparkles'
  },
  {
    id: 'addon-michelin-chef',
    name: 'Private In-Suite Michelin 6-Course Dining Experience',
    description: 'Dedicated private executive chef preparing an intimate bespoke tasting menu with wine pairings on your private terrace.',
    price: 680,
    priceType: 'per_stay',
    icon: 'Utensils'
  }
];

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: 'Lord Harrison Sterling',
  email: 'harrison.sterling@grandluxe.com',
  phone: '+1 (415) 890-4321',
  memberTier: 'Aura Black Elite',
  tierPoints: 34250,
  upgradesAvailable: 2,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  preferences: {
    pillowType: 'Goose Down Firm + Silk Pillowcase',
    champagnePreference: 'Dom Pérignon 2013 / Krug Grande Cuvée',
    dietaryRestrictions: 'Wild caught seafood, gluten-conscious, seasonal organic',
    preferredTransfer: 'Rolls-Royce Phantom or Direct Helicopter'
  }
};

export const INITIAL_BOOKINGS: import('./types').Booking[] = [
  {
    id: 'bk-upcoming-1',
    bookingReference: 'AUR-984210',
    propertyId: 'villa-bellevue-amalfi',
    propertyName: 'Villa Bella Vista Cliffside Palace',
    propertyImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
    destination: 'Amalfi Coast, Italy',
    roomName: 'The Royal Positano Penthouse Suite',
    checkIn: '2026-09-14',
    checkOut: '2026-09-19',
    nights: 5,
    guests: { adults: 2, children: 0 },
    primaryGuest: {
      fullName: 'Lord Harrison Sterling',
      email: 'harrison.sterling@grandluxe.com',
      phone: '+1 (415) 890-4321',
      specialRequests: 'Anniversary celebration. Please chill Dom Pérignon upon arrival and prepare Riva boat cruise for day 2.',
      flightArrival: 'LH 342 arriving Naples at 14:15'
    },
    selectedAddons: [
      BOOKING_ADDONS[0],
      BOOKING_ADDONS[1]
    ],
    pricing: {
      roomSubtotal: 14250,
      addonsSubtotal: 840,
      resortFee: 450,
      serviceFee: 320,
      taxes: 1250,
      discountAmount: 1500,
      promoCodeApplied: 'ELITEBLACK',
      total: 15610,
      currency: 'USD'
    },
    status: 'confirmed',
    createdAt: '2026-08-10',
    digitalKeyGenerated: true
  }
];
