/**
 * Cruise line reference data. Editorial judgments (scores, "best for") are ours.
 * Facts here should be re-verified whenever a line announces changes —
 * every line has a `lastReviewed` date that shows on its page.
 */

export type Dimension =
  | "value"
  | "families"
  | "thrills"
  | "nightlife"
  | "food"
  | "suites"
  | "flexibility"
  | "europe"
  | "short";

export const dimensions: { id: Dimension; label: string; hint: string }[] = [
  { id: "value", label: "Lowest fares", hint: "Cheapest per night for a balcony or inside cabin" },
  { id: "families", label: "Kids & teens", hint: "Clubs, water parks, family cabins" },
  { id: "thrills", label: "Rides & activities", hint: "Coasters, slides, surf sims, go-karts" },
  { id: "nightlife", label: "Nightlife", hint: "Bars, comedy, late-night energy" },
  { id: "food", label: "Food", hint: "Included dining quality and specialty choice" },
  { id: "suites", label: "Suite perks", hint: "Ship-within-a-ship and VIP areas" },
  { id: "flexibility", label: "No fixed schedule", hint: "Eat and do things whenever you want" },
  { id: "europe", label: "Europe & global", hint: "Mediterranean and international itineraries" },
  { id: "short", label: "Quick getaways", hint: "3–5 night cruises from many US ports" },
];

export type ShipClass = { name: string; ships: string[]; note?: string };

export type CruiseLine = {
  slug: string;
  name: string;
  short: string;
  color: string; // accent used for covers & tags (not a brand asset)
  tagline: string;
  summary: string;
  bestFor: string[];
  notFor: string[];
  scores: Record<Dimension, number>; // 1–5, editorial
  quickFacts: { label: string; value: string }[];
  classes: ShipClass[];
  privateDestinations: { name: string; note: string }[];
  loyalty: { name: string; note: string };
  newsWatch: { when: string; what: string }[];
  insiderTips: string[];
  officialSite: string;
  lastReviewed: string;
};

export const bigFour: CruiseLine[] = [
  {
    slug: "royal-caribbean",
    name: "Royal Caribbean",
    short: "Royal",
    color: "#1F5FBF",
    tagline: "The mega-ship playground.",
    summary:
      "Royal Caribbean builds the biggest ships at sea and fills them with things to do: water parks, surf simulators, zip lines, ice shows and Broadway-scale productions. It's the line people pick when the ship is the destination.",
    bestFor: [
      "Families with kids of every age",
      "First-timers who want the wow factor",
      "Groups where everyone wants something different",
    ],
    notFor: [
      "Travelers who want quiet, small ships",
      "Anyone who hates crowds on sea days",
    ],
    scores: { value: 3, families: 5, thrills: 5, nightlife: 4, food: 3, suites: 4, flexibility: 3, europe: 3, short: 4 },
    quickFacts: [
      { label: "Style", value: "Big, active, family-friendly" },
      { label: "Largest class", value: "Icon class" },
      { label: "Dining", value: "Set-time or flexible My Time Dining" },
      { label: "Drink package", value: "Deluxe / Refreshment, priced per day" },
      { label: "Loyalty", value: "Crown & Anchor Society" },
    ],
    classes: [
      { name: "Icon class", ships: ["Icon of the Seas (2024)", "Star of the Seas (2025)", "Legend of the Seas (2026)"], note: "Fourth and fifth Icon ships are on order." },
      { name: "Oasis class", ships: ["Oasis", "Allure", "Harmony", "Symphony", "Wonder", "Utopia of the Seas"] },
      { name: "Quantum class", ships: ["Quantum", "Anthem", "Ovation", "Spectrum", "Odyssey of the Seas"] },
      { name: "Freedom class", ships: ["Freedom", "Liberty", "Independence of the Seas"] },
      { name: "Voyager, Radiance & Vision", ships: ["Older, smaller ships — often the best value and the most unique itineraries"] },
    ],
    privateDestinations: [
      { name: "Perfect Day at CocoCay", note: "Bahamas. Thrill Waterpark, Hideaway Beach (adults) and Coco Beach Club cost extra." },
      { name: "Royal Beach Club Paradise Island", note: "Nassau, Bahamas. Opened December 2025 as Royal's first beach club." },
      { name: "Royal Beach Club Cozumel", note: "Mexico. Slated to open in late 2026." },
    ],
    loyalty: { name: "Crown & Anchor Society", note: "Points per night (double for suites). Status is shared with Celebrity through status match." },
    newsWatch: [
      { when: "Jul 2026", what: "Legend of the Seas, the third Icon-class ship, debuted in Europe before moving to Fort Lauderdale in November." },
      { when: "Dec 2025", what: "Royal Beach Club Paradise Island opened in Nassau." },
      { when: "Late 2026", what: "Royal Beach Club Cozumel due to open." },
      { when: "Oct 2026", what: "Serenade of the Seas begins Royal's first San Diego homeport season." },
    ],
    insiderTips: [
      "Book specialty dining and shows in the app the moment your booking window opens — the popular slots on Icon and Oasis class go in days.",
      "Day 1 on board is quieter than you think: the water slides and FlowRider rarely have lines while everyone is unpacking.",
      "Drink package prices change constantly in the Cruise Planner. Check it weekly and rebook if the price drops.",
      "Ask about the 'Royal Up' upgrade bid offer — you can bid for a better cabin and only pay if it's accepted.",
    ],
    officialSite: "https://www.royalcaribbean.com",
    lastReviewed: "2026-10-29",
  },
  {
    slug: "carnival",
    name: "Carnival Cruise Line",
    short: "Carnival",
    color: "#D6402F",
    tagline: "Fun, value, and a port near you.",
    summary:
      "Carnival sails from more US homeports than anyone, keeps fares low and leans into casual fun: comedy clubs, poolside parties and free food like Guy's Burger Joint. It's the easiest line to say yes to for a long weekend.",
    bestFor: [
      "Budget-minded travelers",
      "Short 3–5 night getaways",
      "Groups and celebrations",
    ],
    notFor: [
      "Travelers who want a refined, quiet vibe",
      "Suite seekers who want a private enclave",
    ],
    scores: { value: 5, families: 4, thrills: 4, nightlife: 5, food: 4, suites: 2, flexibility: 3, europe: 2, short: 5 },
    quickFacts: [
      { label: "Style", value: "Casual, lively, great value" },
      { label: "Largest class", value: "Excel class" },
      { label: "Dining", value: "Set-time or Your Time Dining" },
      { label: "Drink package", value: "CHEERS! (with daily drink cap)" },
      { label: "Loyalty", value: "Carnival Rewards (since June 2026)" },
    ],
    classes: [
      { name: "Excel class", ships: ["Mardi Gras (2021)", "Carnival Celebration (2022)", "Carnival Jubilee (2023)"], note: "Carnival Festivale joins in May 2027 from Port Canaveral." },
      { name: "Fun Italian Style", ships: ["Carnival Venezia", "Carnival Firenze"], note: "Former Costa ships with an Italian design spin." },
      { name: "Vista class", ships: ["Carnival Vista", "Carnival Horizon", "Carnival Panorama"] },
      { name: "Dream class", ships: ["Carnival Dream", "Carnival Magic", "Carnival Breeze"] },
      { name: "Older classes", ships: ["Conquest, Spirit, Splendor and Sunshine-class ships — cheapest fares, short itineraries"] },
    ],
    privateDestinations: [
      { name: "Celebration Key", note: "Grand Bahama. Opened July 2025 with family and adults-only lagoons plus the paid Pearl Cove Beach Club." },
      { name: "RelaxAway, Half Moon Cay", note: "Bahamas. The renamed Half Moon Cay — classic beach day." },
      { name: "Amber Cove & Mahogany Bay", note: "Carnival-owned ports in the Dominican Republic and Roatán." },
    ],
    loyalty: { name: "Carnival Rewards", note: "Spend-based points plus 'stars' for status (Red, Gold, Platinum, Diamond). Replaced VIFP on June 1, 2026." },
    newsWatch: [
      { when: "Jun 2026", what: "Carnival Rewards replaced VIFP. Old VIFP status carries over through May 2028 (Diamond through May 2032)." },
      { when: "May 2027", what: "Carnival Festivale debuts from Port Canaveral; every sailing visits Celebration Key." },
      { when: "2027", what: "Carnival Sunshine heads to Europe for a summer season." },
    ],
    insiderTips: [
      "Faster to the Fun (FTTF) gets you early boarding and priority everything — on short cruises it often pays for itself in time saved.",
      "The CHEERS! package caps alcoholic drinks per day. Do the math against your actual habits before buying.",
      "Guy's Burger Joint, BlueIguana Cantina and the pizza place are free and often better than the main dining room at lunch.",
      "On Excel-class ships, book BOLT (the roller coaster) for embarkation day — fewest crowds.",
    ],
    officialSite: "https://www.carnival.com",
    lastReviewed: "2026-10-29",
  },
  {
    slug: "norwegian",
    name: "Norwegian Cruise Line",
    short: "NCL",
    color: "#0F8A8A",
    tagline: "Freestyle, on your schedule.",
    summary:
      "Norwegian invented Freestyle Cruising: no fixed dining times, no formal nights, and lots of specialty restaurants. Its newest Prima-class ships are among the most stylish in the mainstream market.",
    bestFor: [
      "People who hate schedules",
      "Foodies willing to pay for specialty dining",
      "Hawaii cruises (Pride of America is US-flagged)",
    ],
    notFor: [
      "Budget travelers who add up every extra",
      "Families who want huge kids' clubs",
    ],
    scores: { value: 3, families: 3, thrills: 4, nightlife: 5, food: 4, suites: 5, flexibility: 5, europe: 4, short: 3 },
    quickFacts: [
      { label: "Style", value: "Flexible, modern, adult-leaning" },
      { label: "Largest class", value: "Prima Plus class" },
      { label: "Dining", value: "Freestyle — no set times" },
      { label: "Perks", value: "Free at Sea / More at Sea bundles" },
      { label: "Loyalty", value: "Latitudes Rewards" },
    ],
    classes: [
      { name: "Prima & Prima Plus", ships: ["Norwegian Prima (2022)", "Norwegian Viva (2023)", "Norwegian Aqua (2025)", "Norwegian Luna (2026)"], note: "Luna is about 10% larger than the original Prima ships." },
      { name: "Breakaway Plus", ships: ["Norwegian Escape", "Joy", "Bliss", "Encore"], note: "Go-karts and laser tag on the top deck." },
      { name: "Breakaway", ships: ["Norwegian Breakaway", "Norwegian Getaway"] },
      { name: "Hawaii", ships: ["Pride of America"], note: "Sails Hawaii inter-island, no foreign port needed." },
      { name: "Jewel, Dawn & Sun", ships: ["Smaller ships — great for Europe, Alaska and longer routes"] },
    ],
    privateDestinations: [
      { name: "Great Stirrup Cay", note: "Bahamas. New two-ship pier plus Great Tides Waterpark and an adults-only Vibe Shore Club in the works." },
      { name: "Harvest Caye", note: "Belize. Lagoon pool, zip line and beach." },
    ],
    loyalty: { name: "Latitudes Rewards", note: "Points per cruise night, more for suites. Higher tiers add priority embarkation and free laundry." },
    newsWatch: [
      { when: "Apr 2026", what: "Norwegian Luna began Caribbean sailings from Miami." },
      { when: "End of 2026", what: "Great Stirrup Cay upgrades (pier, Great Tides Waterpark, new pool) target full completion." },
      { when: "2027", what: "Free at Sea and More at Sea drink packages will be honored on Great Stirrup Cay." },
    ],
    insiderTips: [
      "Free at Sea isn't free: you pay service charges on the perks you select. Price it both ways before you book.",
      "The Haven is one of the best suite enclaves at sea — private pool deck, restaurant and concierge.",
      "Without set dining times, popular restaurants spike at 7pm. Eat at 5:30 or 8:30 and walk right in.",
      "Book specialty restaurants pre-cruise only if you have the dining perk; otherwise wait for onboard deals.",
    ],
    officialSite: "https://www.ncl.com",
    lastReviewed: "2026-10-29",
  },
  {
    slug: "msc",
    name: "MSC Cruises",
    short: "MSC",
    color: "#22355E",
    tagline: "European style, aggressive prices.",
    summary:
      "MSC is the world's fastest-growing big line: Swiss-based, Italian-flavored and priced to win. Its World-class ships rival anything at sea, and the MSC Yacht Club is a true luxury enclave for a fraction of luxury-line fares.",
    bestFor: [
      "Value hunters on Caribbean cruises",
      "Mediterranean and Europe itineraries",
      "Suite luxury at a good price (Yacht Club)",
    ],
    notFor: [
      "Travelers who want American-style service rhythms",
      "People who dislike multilingual announcements",
    ],
    scores: { value: 5, families: 4, thrills: 3, nightlife: 3, food: 3, suites: 5, flexibility: 2, europe: 5, short: 4 },
    quickFacts: [
      { label: "Style", value: "International, design-forward" },
      { label: "Largest class", value: "World class" },
      { label: "Dining", value: "Mostly assigned times; Yacht Club is open" },
      { label: "Drink package", value: "Easy / Easy Plus / Premium Extra" },
      { label: "Loyalty", value: "MSC Voyagers Club" },
    ],
    classes: [
      { name: "World class", ships: ["MSC World Europa (2022)", "MSC World America (2025)", "MSC World Asia (2026)"], note: "MSC World Atlantic sails from Port Canaveral starting winter 2027–28." },
      { name: "Meraviglia & Meraviglia-Plus", ships: ["Meraviglia", "Bellissima", "Grandiosa", "Virtuosa", "Euribia"] },
      { name: "Seaside class", ships: ["MSC Seaside", "Seaview", "Seashore", "Seascape"] },
      { name: "Fantasia class", ships: ["Fantasia", "Splendida", "Divina", "Preziosa"] },
      { name: "Musica & Lirica", ships: ["Older, smaller ships — long and unusual itineraries"] },
    ],
    privateDestinations: [
      { name: "Ocean Cay MSC Marine Reserve", note: "Bahamas. Pier being extended for two ships; a second island, Little Cay, is in development next door." },
    ],
    loyalty: { name: "MSC Voyagers Club", note: "Points per night and spend. Status matching from other lines is often available." },
    newsWatch: [
      { when: "Winter 2026–27", what: "MSC World Asia launches in the Mediterranean." },
      { when: "May 2026", what: "MSC Poesia began Alaska sailings from Seattle." },
      { when: "Winter 2026–27", what: "Four MSC ships based in Miami; Seascape sails year-round from Galveston." },
      { when: "Winter 2027–28", what: "MSC World Atlantic sails from Port Canaveral." },
    ],
    insiderTips: [
      "Fares are the 'Bella' experience by default. Fantastica or Aurea can be worth it for cabin choice and included perks — compare totals, not base fares.",
      "Yacht Club fares can be close to a regular balcony on other lines during promos. Watch for them.",
      "Buy drink packages pre-cruise. Onboard prices are usually higher.",
      "Expect announcements in several languages on European sailings; US-based ships are more English-first.",
    ],
    officialSite: "https://www.msccruises.com",
    lastReviewed: "2026-10-29",
  },
];

export type NicheLine = {
  slug: string;
  name: string;
  color: string;
  vibe: string;
  summary: string;
  bestFor: string;
};

export const nicheLines: NicheLine[] = [
  { slug: "virgin-voyages", name: "Virgin Voyages", color: "#B4234A", vibe: "Adults-only, design-led", summary: "Adults-only ships with no buffets, included Wi-Fi and gratuities, and tattoo parlors on board.", bestFor: "Couples and friend groups who want a hip, kid-free cruise" },
  { slug: "viking", name: "Viking", color: "#6E5A3A", vibe: "Quiet, cultural, no kids", summary: "Calm Scandinavian-style ships, a free excursion in most ports, and no casinos or kids.", bestFor: "Culture-focused travelers who want the port to be the point" },
  { slug: "celebrity", name: "Celebrity Cruises", color: "#2E2E3A", vibe: "Modern premium", summary: "Royal Caribbean's upscale sister: the Edge-class ships, better food and a calmer crowd.", bestFor: "Couples who want polish without luxury-line prices" },
  { slug: "disney", name: "Disney Cruise Line", color: "#1B4D8C", vibe: "Family premium", summary: "Characters, rotational dining and Broadway-quality shows. Expensive and worth it to its fans.", bestFor: "Families with young Disney fans" },
  { slug: "princess", name: "Princess Cruises", color: "#2B6F9E", vibe: "Classic, Alaska expert", summary: "MedallionClass tech, strong Alaska programs and the new Sun-class ships.", bestFor: "Alaska and longer, relaxed itineraries" },
  { slug: "explora", name: "Explora Journeys", color: "#5B6B73", vibe: "Ocean luxury", summary: "MSC Group's luxury brand: all-suite, all-inclusive, residential feel.", bestFor: "Luxury travelers who want space and quiet" },
  { slug: "windstar", name: "Windstar", color: "#3E7C5A", vibe: "Small ships & sails", summary: "Sailing yachts and small ships that slip into ports big ships can't reach.", bestFor: "Travelers who want intimate ships and unusual ports" },
  { slug: "lindblad", name: "Lindblad Expeditions", color: "#8A5A2B", vibe: "Expedition", summary: "Naturalist-led expeditions to Antarctica, the Galápagos and the Arctic.", bestFor: "Wildlife and once-in-a-lifetime trips" },
];

export const getLine = (slug: string) => bigFour.find((l) => l.slug === slug);
