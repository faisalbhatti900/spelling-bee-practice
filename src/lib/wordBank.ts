// ===== WORD BANK FEATURE — word data + helpers =====
//
// HOW TO ADD / UPDATE WORDS:
//   Replace a letter's array with the words from the book, e.g.
//     A: ["Apple","Acorn","Anchor","Author","Animal"],
//
// A word may be a plain string, OR an object { word, def } if you want a short
// definition spoken in Level 1's "Hear in a sentence". Both forms are supported.

export type WordItem = string | { word: string; def?: string };
export type CategoryWords = Record<string, WordItem[]>;
export type WordBankData = Record<string, CategoryWords>;

export const WORD_BANK: WordBankData = {
  'Category 1': {
    A: ["Ape","Arm","Ash","Able","Acre","Area","Axle","Admit","Adult","Ahead","Alarm","Album","Alert","Amaze","Among","Ample","Amuse","Angel","Angry","Annoy","Apple","Apron","Arrow","Atlas","Avoid","Award"],
    B: ["Bee","Box","Bud","Bye","Baby","Back","Balm","Bath","Bead","Bear","Belt","Bend","Bird","Blew","Boat","Boil","Bone","Bore","Born","Bowl","Buck","Bulb","Bull","Bump","Busy","Badge","Basin","Begin","Below","Bench","Berry","Blade","Blaze","Bless","Blind","Blood","Bloom","Blush","Board","Boast","Boost","Brain","Brave","Bread","Brick","Brook","Brown","Brush","Bugle","Bunch","Bakery","Bangle","Banker","Barley","Barrel","Basket","Battle","Beauty","Before","Behind","Beyond","Borrow","Bought","Bounce","Branch","Broken","Bullet","Butter","Bandage","Bicycle","Blanket","Brother","Baseball","Baseline","Birthday","Breakfast","Basketball"],
    C: ["Cab","Cop","Cage","Cake","Cane","Cash","Chat","Chef","Chop","City","Claw","Clay","Club","Clue","Coin","Comb","Corn","Crab","Cube","Cure","Curl","Chain","Chase","Check","Chest","Chine","Choir","Clean","Cliff","Clock","Coach","Count","Court","Crack","Craft","Crawl","Creep","Crown","Cruel","Curve","Camera","Candle","Casket","Castle","Caught","Cellar","Change","Church","Circus","Clever","Clumsy"],
    D: ["Due","Dye","Damp","Dark","Dawn","Deaf","Dear","Deck","Desk","Dial","Dive","Dome","Dove","Down","Drag","Drum","Dusk","Duty","Daddy","Daily","Dance","Doubt","Dozen","Drama","Dream","Drink","Drive","Drown","Dwell","Daring","Decide","Delete","Desert","Device","Dinner","Donkey","Double","Dragon","Drawer","Duster","Daughter"],
    E: ["Each","East","Easy","Echo","Edge","Even","Exit","Eagle","Earth","Enemy","Entry","Equal","Every","Exact","Excel","Extra","Edible","Empire","Energy","Escape","Entrust","Explain"],
    F: ["Fat","Few","Fog","Fry","Fact","Fame","Fast","Fees","Felt","Film","Fine","Flag","Flap","Fold","Fort","Free","Fury","Fairy","Faith","False","Fancy","Feast","Fetch","Field","Final","Flame","Flask","Float","Floor","Force","Frame","Fresh","Frock","Fabric","Famine","Father","Fellow","Figure","Flight","Follow","Forest","Formal","Freeze","Friend","Fashion","Fertile","Forgive","Farewell"],
    G: ["Gem","God","Gate","Gift","Girl","Glad","Glow","Glue","Goat","Gown","Grin","Grow","Giant","Globe","Gloom","Glory","Grade","Grain","Grass","Group","Guard","Guess","Galaxy","Garden","Gentle","Greedy","Guilty","Guitar","Goodbye"],
    H: ["Hay","Half","Hall","Hard","Hark","Heat","Herb","Hero","Hide","High","Hold","Habit","Happy","Heart","Hello","Honey","Hotel","Human","Hurry","Hammer","Handle","Health","Helmet","Honest","Humble","Hungry","Holiday","Helicopter"],
    I: ["Idle","Iron","Igloo","Infant","Inkpot","Insect","Invite","Iceberg"],
    J: ["Jaw","Job","Joy","Jump","Jury","Jelly","Jewel","Joint","Joker","Juice","Jacket","Jumble","Journey"],
    K: ["Key","Keen","Kept","Kite","Knit","Kneel","Knock","Karate","Kennel","Kernel","Kidnap","Kidney","Kitten","Kitchen"],
    L: ["Law","Low","Lack","Lady","Land","Lark","Lash","Late","Lazy","Leaf","Leen","Left","Liar","Life","Lily","Lock","Loud","Love","Label","Large","Latch","Leech","Least","Leave","Level","Limit","Lobby","Local","Lofty","Lorry","Lotus","Lucky","Ladder","Length","Letter","Linger","Little","Lizard","Locket","Lovely","Lantern","Leopard","Luggage"],
    M: ["Map","Mix","Make","Many","Mark","Mask","Mean","Melt","Mend","Milk","Mild","Mind","Moon","Moth","Move","Mule","Myth","Magic","Mango","March","Medal","Metal","Money","Month","Moral","Motor","Mouse","Mouth","Music","Magnet","Malady","Master","Member","Method","Middle","Mirror","Motion","Muscle","Myself","Million","Mistake","Minister"],
    N: ["Nib","Now","Nail","Neat","Neck","Need","Next","Note","Noun","Nerve","Never","Noble","Noise","Narrow","Nation","Nature","Needle","Nibble","Normal","Notice","Neutral","Nursery","Network"],
    O: ["Odd","Off","Own","Obey","Omit","Once","Oral","Oven","Over","Occur","Ocean","Often","Olive","Order","Owner","Object","Office","Online","Option","Origin","Output","Operate"],
    P: ["Paw","Pay","Ply","Pack","Paid","Page","Park","Pass","Past","Path","Pave","Peer","Pest","Pick","Pine","Plan","Plum","Plus","Poet","Poke","Pond","Poor","Port","Paint","Paper","Paste","Petal","Photo","Piano","Pinch","Piper","Pitch","Place","Plant","Point","Pouch","Prawn","Press","Pride","Prime","Print","Probe","Prose","Proud","Purse","Packet","Palace","Parent","Pencil","People","Permit","Person","Picnic","Pierce","Pillar","Pillow","Please","Pledge","Plenty","Plural","Pocket","Polish","Polite","Potato","Powder","Prayer","Pretty","Priest","Proper","Public","Purple","Picture","Pitcher","Package","Parking","Patient","Payment","Plastic","Primary","Problem","Promise","Pumpkin","Password","Platform"],
    Q: ["Quit","Quiz","Quack","Queen","Quick","Quite","Question"],
    R: ["Rap","Raw","Ray","Rub","Rain","Rank","Rare","Rate","Read","Real","Reel","Rely","Rent","Rich","Ripe","Roar","Rock","Roof","Rose","Rule","Rush","Radio","Ranch","Rapid","Refer","Relax","Remit","Reply","Rhyme","Roast","Robot","Royal","Radish","Raisin","Reason","Recite","Relate","Remind","Return","Riddle","Rainbow","Reflect","Remember"],
    S: ["Say","See","Set","Shy","Sum","Sack","Sand","Scan","Scar","Seat","Seek","Self","Size","Skin","Skit","Slab","Slay","Slim","Snow","Soak","Soup","Slug","Spot","Stem","Sure","Sway","Swam","Saint","Satin","Scale","Scare","Scarf","Scold","Scope","Sense","Serve","Shade","Shave","Shawl","Sheep","Sheet","Shine","Shore","Shout","Slate","Slave","Slice","Slide","Slope","Smart","Smash","Smell","Smile","Snake","Socks","Solar","Solid","Sound","South","Space","Spark","Spend","Spice","Spine","Split","Spoil","Sport","Spray","Steam","Steep","Stick","Storm","Stuff","Swift","Swing","Settle","Shabby","Signal","Silent","Smooth","Speech","Splash","Spring","Square","Stable","Strain","Street","Strict","Strong","Studio","Submit","Servant","Station","Stomach","Strange","Student","Subject","Support","Sentence","Straight","Subtract"],
    T: ["Tie","Toe","Toy","Try","Tug","Talk","Tame","Taxi","Team","Text","Thaw","Tidy","Time","Tiny","Told","Tool","Tram","Tray","Tube","Turn","Tusk","Twin","Type","Telex","Thick","Thief","Thumb","Tiger","Tight","Tired","Torch","Total","Tough","Trace","Tribe","Truck","Truth","Tangle","Temper","Tender","Terror","Tragic","Travel","Thimble","Through","Tractor","Twinkle","Telephone"],
    U: ["Ugly","Used","Under","Unity","Upset","Usual","Utmost","Uniform","Umbrella"],
    V: ["Van","View","Visa","Verb","Valve","Venue","Video","Vital","Voice","Valley","Verify","Visual","Village"],
    W: ["Why","Want","Warm","Wave","Waste","Watch","Wheel","White","Window","Winner","Wedding"],
    X: ["Xray","Xylophone"],
    Y: ["Year","Young","Yellow"],
    Z: ["Zip","Zebra"],
  },
  'Category 4': {
    A: ["Aisle","Algae","Annul","Ambidextrous","Atone","Awash","Azure","Abrade","Alumni","Anoint","Assert","Astute","Asylum","Auction","Autism","Awning","Abscess","Abscond","Abustle","Amateur","Anguish","Antique","Appease","Applaud","Apprise","Ascetic","Asinine","Assault","Assuage","Austere","Abducted","Aberrant","Accurate","Amicable","Ancestor","Assembly","Audience","Accessory","Algorithm","Ambiguous","Arthritis","Artillery","Ascendant","Attrition","Authentic","Accomplice","Assignment","Assumption","Auspicious","Acknowledge","Adolescence","Archaeology","Aristocracy","Acquaintance","Advantageous","Announcement","Administrator","Advertisement"],
    B: ["Borne","Bacon","Benign","Bicker","Billow","Broach","Banquet","Barrack","Beastly","Bemused","Bequest","Berserk","Betroth","Bouquet","Brevity","Bristle","Brocade","Buzzard","Bankrupt","Barbeque","Biopsy","Begotten","Bequeath","Bewilder","Biennial","Boutique","Braggart","Breakage","Burnette","Buoyance","Barricade","Battalion","Becquerel","Behaviour","Bifurcate","Biography","Bountiful","Brigadier","Brilliance","Broadcast","Brokerage","Brutality","Beautician","Beneficial","Boisterous","Breathless","Beneficiary"],
    C: ["Cadre","Chasm","Cackle","Cavern","Chaise","Chalet","Camphor","Caprice","Carcass","Caustic","Charade","Chateau","Cleanse","Commend","Connote","Consign","Contour","Copious","Cuisine","Cemetery","Cohesion","Comatose","Commuter","Conquest","Contrary","Culinary","Cafeteria","Capillary","Caribbean","Catalogue","Catharsis","Celestial","Chauffeur","Chronicle","Clearance","Cloakroom","Coalition","Colleague","Committee","Commodity","Continual","Corrosion","Courteous","Capitalism","Cautionary","Centrifuge","Countenance","Challenger","Chancellor","Chandelier","Charitable","Chimpanzee","Chronology","Classified","Clandestiny","Colloquial","Combustion","Commentary","Comparable","Compassion","Concession","Conference","Confidence","Congestion","Continuous","Contribute","Controller","Convincing","Corruption","Ceremonious","Choreograph","Coefficient","Corporation"],
    D: ["Debut","Depot","Dahlia","Damsel","Debris","Detour","Deceive","Devious","Dilemma","Discern","Dissent","Dossier","Draught","Dropper","Drought","Dubious","Dwindle","Dynamic","Deceased","Decipher","Decisive","Dementia","Denounce","Derivate","Designer","Desolate","Despotic","Detainee","Detonate","Diabetic","Diagnose","Dialogue","Dialysis","Dictator","Disaster","Dispense","Doctrine","Dolomite","Domicile","Dumbbell","Dwelling","Dangerous","Dentistry","Desiccate","Desirable","Desperate","Detergent","Detriment","Devaluate","Deviation","Dexterity","Disarming","Dishonour","Dismantle","Diversity","Dysentery","Dealership","Definitely","Deliberate","Dependable","Depression","Detachment","Dictionary","Disastrous","Discourage","Dispensary","Distressed","Destination","Disjunction","Disturbance"],
    E: ["Easel","Efface","Eucalyptus","Embalm","Embryo","Enmity","Enwrap","Eulogy","Exceed","Exhale","Ecstasy","Edifice","Elegant","Elusive","Emanate","Embassy","Embroil","Eminent","Emulate","Enthral","Epitaph","Equator","Equinox","Erratic","Essence","Eternal","Evident","Excrete","Exhaust","Expanse","Easterly","Effluent","Effusive","Ejection","Elliptic","Elongate","Embedded","Embossed","Emigrant","Emissary","Emission","Emphasis","Energise","Envisage","Epilogue","Equation","Equipped","Escapade","Euphoria","Exempted","Exorcist","Exposure","Earnestly","Efficient","Eliminate","Elucidate","Embarrass","Emergency","Enigmatic","Entrapped","Eradicate","Escalator","Evolution","Excessive","Exclusion","Exploited","Explosion","Egocentric","Elementary","Employment","Exhibition","Experiment","Expression","Extraction","Eligibility"],
    F: ["Fawn","Feud","Fauna","Fiend","Folly","Frond","Frown","Fudge","Fickle","Fiesta","Foemen","Foster","Frisky","Frolic","Furrow","Factual","Faculty","Fancied","Fascist","Fatigue","Fibrous","Fidgety","Finesse","Fritter","Flaccid","Flicker","Foliage","Forfeit","Forlorn","Foundry","Fraught","Freaked","Frizzle","Famished","Fastener","Feasible","Flourish","Frenzied","Fledgling","Freckled","Fugitive","Fumigate","Fuselage","Fabricate","Ferocious","Firmament","Fortunate","Fragrance","Fraudster","Frivolous","Fallacious","Fastidious","Figurative","Fraternity","Fundraiser","Fascination","Favouritism","Feasibility","Financially","Foreseeable","Foreshorten","Facilitation","Fluorescence","Functionally"],
    G: ["Gait","Gasp","Gawk","Ghat","Gnaw","Gout","Gaudy","Gauge","Gauze","Ghoul","Gleam","Gooey","Gaiety","Ghetto","Grouse","Gypsum","Gyrate","Generic","Genuine","Ghastly","Giggler","Glimmer","Globule","Gourmet","Grapple","Gravest","Galleria","Gamester","Glorious","Golliwog","Gorgeous","Graduate","Grammar","Grandeur","Graphics","Graphite","Gruesome","Guardian","Guidance","Gullible","Generator","Gentility","Geometric","Geriatric","Gibberish","Giddiness","Glamorous","Glorifies","Goldsmith","Governess","Guarantee","Guerrilla","Gymnasium","Generality","Generosity","Gentrified","Garnet","Garrulous","Geographical","Grammalogue","Guffaw","Guacamole"],
    H: ["Hack","Hurl","Hymn","Haul","Havoc","Hertz","Hoard","Holly","Hunch","Hackle","Haggle","Hamlet","Hangar","Hansom","Hassel","Hatter","Hawker","Header","Herder","Hernia","Hoarse","Hoaxer","Homage","Halogen","Hammock","Harness","Hatches","Haughty","Heathen","Heinous","Heliport","Hideous","Hoarded","Holster","Homonym","Hormone","Hostile","Hygiene","Hammered","Harasses","Hedgehog","Heritage","Hermetic","Hesitant","Hijacker","Historic","Homicide","Humanity","Humorous","Habituate","Hailstone","Haphazard","Hidebound","Hereditary","Hierarchy","Humdinger","Hindrance","Horoscope","Hurricane","Hydraulic","Handicraft","Horrendous","Hyphenated","Hallucinate","Hospitality","Habilitation"],
    I: ["Ibis","Icon","Irks","Isle","Idiom","Imbed","Impel","Incur","Inept","Ivory","Impede","Impute","Incite","Ingest","Intern","Intuit","Irrupt","Isomer","Imagery","Immense","Impetus","Incisor","Insight","Interim","Irksome","Isolate","Imperial","Impostor","Impunity","Incisive","Indulge","Inhalant","Inherent","Iniquity","Innovate","Insipid","Integral","Incandescent","Intrigue","Irritate","Issuance","Ignorance","Imaginary","Impedance","Implement","Impulsive","Inaugural","Incessant","Increment","Incurring","Intrinsic","Invention","Isometric","Illuminist","Imprudence","Inadequate","Influences","Ingredient","Intolerant","Inkling","Inculcation","Inscrutable","Involuntary","Identifiable","Implementing","Incidentally","Indigestible","Inflammation","Interrogate"],
    J: ["Jade","Jinx","Joey","Jerky","Jetty","Jaunty","Jammed","Jerkin","Jester","Jostle","Jovial","Jurist","Jacuzzi","Janitor","Javelin","Jocular","Jubilee","Jaundice","Jeopardy","Juniper","Judicial","Julienne","Juncture","Juvenile","Journalist","Judgmental","Justifiable"],
    K: ["Knowledge","Kindergarten"],
    L: ["Label","Lager","Lasso","Leach","Leapt","Ledge","Lynch","Lackey","Lappet","Larder","Larynx","Laurel","Leaden","League","Limpid","Loathe","Loaves","Looter","Lunacy","Lurker","Lampoon","Languor","Lanyard","Launder","Leakage","Legible","Leprosy","Laconic","Lounger","Laudable","Lavender","Lecturer","Lenience","Limerick","Luncheon","Lustrous","Lyricism","Laborious","Lassitude","Legendary","Legislature","Leisurely","Liability","Librarian","Lightning","Limousine","Longitude","Lubricant","Luxurious","Loneliness","Launderette"],
    M: ["Mach","Minx","Moan","Mince","Mourn","Mulch","Maggot","Magpie","Malice","Manger","Mangle","Martyr","Meagre","Measly","Menial","Mettle","Midget","Moated","Morale","Morose","Motley","Mucous","Mussel","Mutiny","Muzzle","Myrtle","Maestro","Magenta","Malaise","Massive","Matinee","Melodic","Mileage","Mimicry","Mitosis","Mongrel","Macaroon","Mandarin","Manifesto","Manually","Masculine","Melamine","Memorize","Metaphor","Misalign","Misquote","Mortgage","Murderer","Maelstrom","Miscreant","Malleable","Mandatory","Medallion","Momentary","Mercantile","Meticulous","Mysterious","Magnificent","Maintenance","Microscopic","Mischievous","Mountaineer","Materialistic"],
    N: ["Nape","Neon","Newt","Numb","Nettle","Noose","Notch","Nudge","Nymph","Naught","Nectar","Nephew","Neuron","Newest","Nicety","Niggle","Nobble","Notary","Notion","Naivete","Narrate","Naughty","Nestled","Nickel","Nitrate","Nominee","Nullify","Narcotic","Nauseate","Nautical","Noisiest","Nostalgia","Nourished","Novelist","Nuisance","Numeracy","Numerous","Nurturing","Necessity","Nectarine","Notorious","Nullifies","Negligency","Negotiable","Netiquette","Noticeable","Numeration","Nonetheless"],
    O: ["Ogre","Okra","Omen","Obese","Ochre","Octet","Oblate","Oblige","Obtuse","Ocular","Opaque","Orator","Obscene","Obscure","Obtrude","Offense","Offhand","Offside","Omnibus","Opposed","Optimum","Oratory","Obstacle","Obstruct","Omission","Operable","Ordinary","Organism","Obligated","Occupancy","Occurring","Opportune","Oppressor","Oscillate","Observant","Obtrusion","Orphanage","Overhyped","Obediently","Observance","Occurrence","Oesophagus","Optimistic","Organically","Occasionally"],
    P: ["Palsy","Pansy","Parch","Penne","Peril","Pixel","Plank","Pleat","Prior","Proxy","Prune","Puree","Pygmy","Pylon","Pallor","Parity","Pastry","Patchy","Peruse","Pestle","Pewter","Pharos","Pilfer","Plaque","Pliant","Podium","Prance","Propel","Pseudo","Pumice","Punter","Purist","Purser","Palette","Palmist","Palpate","Panacea","Parsley","Peevish","Pensive","Perjury","Perplex","Petrify","Pianist","Pillion","Placebo","Pledged","Pliable","Plugged","Pompous","Portray","Poultry","Prattle","Profess","Psychic","Purport","Pursuit","Palatial","Palisade","Palpable","Pamphlet","Paraffin","Partisan","Pedigree","Petition","Pheasant","Pinnacle","Pleasure","Plethora","Polluter","Populous","Premiere","Pristine","Prologue","Prompter","Prospect","Prostate","Province","Prudence","Publican","Paralysed","Partially","Patriotic","Perforate","Periphery","Permanent","Permitted","Pollutant","Ponderous","Possessed","Precisely","Preferred","Prevalent","Privilege","Processor","Prominent","Prosecute","Punctuate","Pedestrian","Peninsular","Perception","Presidency"],
    Q: ["Quaff","Query","Quirk","Queasy","Queues","Qualify","Quality","Quantum","Quieten","Quantity","Quibbler","Quietest","Quotable","Qualities","Quickened"],
    R: ["Radii","Rebut","Reign","Resin","Retch","Roach","Rouge","Route","Ruddy","Rusty","Racism","Radial","Ramble","Rather","Rebate","Rebuke","Recess","Redeem","Regime","Relish","Repine","Repose","Revere","Review","Ripped","Router","Rudder","Radiate","Ragging","Ramming","Rampage","Ranches","Rapport","Raucous","Reagent","Realism","Recruit","Refinery","Reformer","Regimen","Remorse","Replete","Residue","Respite","Retting","Revenge","Revenue","Ricotta","Rippled","Rivalry","Roaster","Rockery","Rookery","Roughen","Royalty","Rubbish","Ruinous","Rummage","Rupture","Ravenous","Reactant","Reassign","Reckoned","Redeemer","Referred","Relevant","Remedial","Reminded","Repellent","Reproach","Resident","Resonate","Resource","Restrain","Restrict","Retainer","Retrieve","Revealed","Reversal","Rhetoric","Ridicule","Rigorous","Roadster","Roentgen","Roughage","Rucksack","Ruminant","Ravishing","Rebellion","Recession","Recommend","Rehearsal","Remainder","Rustiness","Respondent","Rollicking","Reallocated","Recognition"],
    S: ["Sable","Sabre","Sauna","Shoal","Sieve","Sinew","Slain","Smirk","Smoky","Snaky","Spawn","Sacred","Saddle","Scanty","Scurry","Seethe","Seized","Sequel","Sewage","Sheath","Shovel","Shrewd","Shroud","Signet","Silver","Simmer","Simper","Skimpy","Sleazy","Sludge","Solemn","Sparse","Splint","Squash","Squire","Starry","Subtle","Suburb","Summon","Saddles","Sagging","Satiate","Savoury","Scalpel","Scenery","Scriber","Scuffle","Seepage","Sheriff","Shrivel","Smasher","Snippet","Snooker","Snorkel","Splashy","Spoiler","Squalid","Stagger","Staunch","Steroid","Subsist","Subvert","Succeed","Succumb","Suction","Salinity","Sanctity","Sapphire","Sculptor","Sensible","Sergeant","Shepherd","Simulate","Sinister","Skeletal","Smoothie","Smuggler","Solidify","Solitary","Solstice","Souvenir","Spacious","Spinster","Spirited","Splinter","Splutter","Sterling","Symbolic","Secretary","Sedentary","Segregate","Simpleton","Southerly","Sovereign","Spaghetti","Spellbind","Structure","Scholastic","Skyscraper","Supplement","Spontaneous","Statistical"],
    T: ["Thrum","Twine","Tabbed","Talcum","Tannin","Tassel","Tattoo","Temper","Thrash","Thwart","Timbre","Toucan","Trowel","Trudge","Turret","Twirly","Typify","Tyrant","Tabloid","Tantrum","Tarnish","Tedious","Tempted","Textual","Theorem","Thyroid","Titular","Tonsure","Tornado","Traitor","Tribune","Trouser","Truckie","Twaddle","Talisman","Tapestry","Terminus","Thatched","Threaten","Timidity","Tranquil","Trapezia","Treasury","Tweezers","Twitcher","Tantalize","Taxidermy","Technique","Telescopic","Temperate","Terminate","Territory","Therapist","Thesaurus","Throbbing","Tolerable","Transcend","Transistor","Transitive","Transpire","Travelled","Treachery","Trialogue","Tubercular","Terminator","Terracotta","Theatrical","Trafficker","Translator","Tentatively","Thriftiness","Transparent"],
    U: ["Udder","Urban","Usher","Unison","Unveil","Unwary","Unwind","Unwrap","Uproar","Urchin","Unified","Unlatch","Upraise","Urgency","Usually","Utterly","Ugliness","Unmanned","Ulcerated","Umbilical","Unanimous","Unflapped","Ultrasound","Unconscious","Utilitarian"],
    V: ["Vain","Veal","Veil","Vague","Valet","Viola","Veneer","Viewer","Vigour","Valiant","Vaulted","Venison","Verdict","Vertigo","Vicious","Vintage","Viscous","Voucher","Vagabond","Vanquish","Venomous","Veracity","Verbatim","Vertebra","Vibrator","Vigilant","Virtuous","Vivacity","Vocation","Vibration","Vigilance","Vindicate","Vehemently"],
    W: ["Wade","Waft","Wage","Wane","Wick","Wacky","Wager","Waive","Waltz","Weary","Wedge","Weird","Whiff","Whisk","Whorl","Wield","Wrath","Wring","Waddle","Waiver","Wangle","Wanton","Wholly","Wiggle","Wither","Wombat","Wonder","Worsen","Wraith","Wreath","Wrench","Wrestle","Wretch","Warrant","Weighty","Whisper","Worsted","Wounded","Wriggle","Wrangler","Wallowing","Weekender","Westerner","Worthiest","Withdrawal","Waterlogged","Whereabout","Wheelbarrow"],
    X: ["Xylem","Xanthium","Xerophytes"],
    Y: ["Yelp","Yore","Yowl","Yearn","Yield","Yokel","Yelled","Yeoman","Youngster"],
    Z: ["Zany","Zonk","Zesty","Zealot","Zipper","Zither","Zounds","Zoology","Zookeeper"],
  },
};

// Visual identity per category. Add an entry here when you add a new category;
// unknown categories fall back to a palette colour so nothing ever breaks.
export const CATEGORY_META: Record<string, { color: string; emoji: string }> = {
  'Category 1': { color: '#1CB0F6', emoji: '🐣' },
  'Category 4': { color: '#FF9600', emoji: '🦉' },
};

const FALLBACK_COLORS = ['#CE82FF', '#58CC02', '#FF4B4B', '#00CD9C', '#FF86D0'];

export function getCategories(): string[] {
  return Object.keys(WORD_BANK);
}

export function getCategoryColor(category: string): string {
  if (CATEGORY_META[category]) return CATEGORY_META[category].color;
  const idx = getCategories().indexOf(category);
  return FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
}

export function getCategoryEmoji(category: string): string {
  return CATEGORY_META[category]?.emoji ?? '📚';
}

/** Normalise a WordItem to its spelling. */
export function wordText(item: WordItem): string {
  return typeof item === 'string' ? item : item.word;
}

/** Optional short definition for a WordItem (used by Level 1 sentence mode). */
export function wordDef(item: WordItem): string | undefined {
  return typeof item === 'string' ? undefined : item.def;
}

export function getWordItems(category: string, letter: string): WordItem[] {
  return WORD_BANK[category]?.[letter] ?? [];
}

export function getWords(category: string, letter: string): string[] {
  return getWordItems(category, letter).map(wordText);
}

export function countWords(category: string, letter: string): number {
  return getWordItems(category, letter).length;
}

export function getLettersWithCount(category: string): { letter: string; count: number }[] {
  const cat = WORD_BANK[category] ?? {};
  return Object.keys(cat).map((letter) => ({ letter, count: cat[letter].length }));
}

export function countLettersWithWords(category: string): number {
  return getLettersWithCount(category).filter((l) => l.count > 0).length;
}

export function countTotalWords(category: string): number {
  return getLettersWithCount(category).reduce((sum, l) => sum + l.count, 0);
}
