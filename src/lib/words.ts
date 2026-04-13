export interface WordEntry {
  word: string;
  syn: string[];
  ant: string[];
}

export const WORDS: Record<string, WordEntry[]> = {
  A: [
    { word: "Adorn", syn: ["Decorate","Beautify","Embellish","Ornament"], ant: ["Strip","Remove","Spoil","Bare"] },
    { word: "Agony", syn: ["Pain","Suffering","Torment","Anguish"], ant: ["Joy","Comfort","Delight","Pleasure"] },
    { word: "Anomaly", syn: ["Oddity","Exception","Rarity","Irregularity"], ant: ["Normal","Typical","Regular","Standard"] },
    { word: "Attractive", syn: ["Pretty","Charming","Beautiful","Appealing"], ant: ["Ugly","Plain","Repulsive","Unattractive"] },
    { word: "Abandon", syn: ["Leave","Desert","Give up","Forsake"], ant: ["Keep","Stay","Hold on","Cherish"] },
    { word: "Abstract", syn: ["Complex","Vague","General","Theoretical"], ant: ["Concrete","Clear","Simple","Specific"] },
    { word: "Accomplish", syn: ["Achieve","Complete","Finish","Attain"], ant: ["Fail","Quit","Give up","Abandon"] },
    { word: "Assemble", syn: ["Gather","Collect","Join","Congregate"], ant: ["Scatter","Separate","Divide","Disperse"] },
    { word: "Admiration", syn: ["Respect","Praise","Approval","Esteem"], ant: ["Dislike","Hatred","Contempt","Scorn"] },
    { word: "Ambiguous", syn: ["Unclear","Vague","Confusing","Uncertain"], ant: ["Clear","Obvious","Plain","Definite"] }
  ],
  B: [
    { word: "Blur", syn: ["Smear","Smudge","Cloud","Obscure"], ant: ["Sharpen","Clarify","Focus","Define"] },
    { word: "Blurt", syn: ["Exclaim","Burst out","Utter","Blabber"], ant: ["Suppress","Hold back","Stay silent","Conceal"] },
    { word: "Bluff", syn: ["Pretend","Deceive","Fake","Mislead"], ant: ["Honest","Truthful","Sincere","Genuine"] },
    { word: "Barrier", syn: ["Wall","Obstacle","Block","Hindrance"], ant: ["Opening","Gateway","Help","Passage"] },
    { word: "Barren", syn: ["Empty","Dry","Lifeless","Desolate"], ant: ["Fertile","Rich","Productive","Lush"] },
    { word: "Behold", syn: ["See","Observe","Watch","Witness"], ant: ["Ignore","Overlook","Miss","Disregard"] },
    { word: "Banter", syn: ["Joke","Tease","Chat","Jest"], ant: ["Serious talk","Silence","Argue","Debate"] },
    { word: "Blatant", syn: ["Obvious","Bold","Clear","Flagrant"], ant: ["Subtle","Hidden","Quiet","Discreet"] },
    { word: "Belittle", syn: ["Mock","Put down","Dismiss","Demean"], ant: ["Praise","Encourage","Compliment","Uplift"] },
    { word: "Blemish", syn: ["Spot","Flaw","Defect","Imperfection"], ant: ["Perfection","Purity","Flawless","Immaculate"] }
  ],
  C: [
    { word: "Cope", syn: ["Manage","Handle","Deal with","Endure"], ant: ["Fail","Struggle","Give up","Collapse"] },
    { word: "Chide", syn: ["Scold","Blame","Rebuke","Reprimand"], ant: ["Praise","Compliment","Approve","Commend"] },
    { word: "Cease", syn: ["Stop","End","Quit","Halt"], ant: ["Begin","Start","Continue","Proceed"] },
    { word: "Commute", syn: ["Travel","Journey","Ride","Transit"], ant: ["Stay","Remain","Settle","Rest"] },
    { word: "Consume", syn: ["Eat","Use","Finish","Devour"], ant: ["Save","Produce","Keep","Preserve"] },
    { word: "Conceal", syn: ["Hide","Cover","Mask","Camouflage"], ant: ["Reveal","Show","Uncover","Expose"] },
    { word: "Cunning", syn: ["Clever","Sneaky","Sly","Crafty"], ant: ["Honest","Simple","Naive","Straightforward"] },
    { word: "Charisma", syn: ["Charm","Appeal","Attraction","Magnetism"], ant: ["Dullness","Coldness","Rudeness","Repulsion"] },
    { word: "Confession", syn: ["Admission","Disclosure","Statement","Reveal"], ant: ["Denial","Silence","Refusal","Concealment"] },
    { word: "Courageous", syn: ["Brave","Bold","Fearless","Valiant"], ant: ["Cowardly","Afraid","Timid","Fearful"] }
  ],
  D: [
    { word: "Daunt", syn: ["Frighten","Scare","Discourage","Intimidate"], ant: ["Encourage","Inspire","Motivate","Embolden"] },
    { word: "Depict", syn: ["Show","Describe","Illustrate","Portray"], ant: ["Hide","Conceal","Distort","Misrepresent"] },
    { word: "Decline", syn: ["Refuse","Decrease","Drop","Diminish"], ant: ["Accept","Increase","Improve","Grow"] },
    { word: "Devoid", syn: ["Empty","Lacking","Without","Bare"], ant: ["Full","Rich","Abundant","Overflowing"] },
    { word: "Dissect", syn: ["Examine","Analyse","Cut apart","Investigate"], ant: ["Join","Combine","Assemble","Unite"] },
    { word: "Dwindle", syn: ["Shrink","Decrease","Reduce","Diminish"], ant: ["Grow","Increase","Expand","Enlarge"] },
    { word: "Depart", syn: ["Leave","Go away","Exit","Set off"], ant: ["Arrive","Return","Stay","Remain"] },
    { word: "Deviate", syn: ["Stray","Wander","Differ","Diverge"], ant: ["Follow","Conform","Obey","Stick to"] },
    { word: "Dynamic", syn: ["Active","Energetic","Lively","Vibrant"], ant: ["Dull","Inactive","Static","Lifeless"] },
    { word: "Deserve", syn: ["Earn","Merit","Be worthy","Warrant"], ant: ["Forfeit","Lose","Be unworthy","Disqualify"] }
  ],
  E: [
    { word: "Exult", syn: ["Celebrate","Rejoice","Cheer","Triumph"], ant: ["Mourn","Grieve","Sorrow","Lament"] },
    { word: "Elapse", syn: ["Pass","Go by","Slip away","Expire"], ant: ["Stop","Remain","Pause","Freeze"] },
    { word: "Endure", syn: ["Bear","Survive","Tolerate","Withstand"], ant: ["Quit","Give up","Crumble","Surrender"] },
    { word: "Ecstasy", syn: ["Joy","Delight","Happiness","Euphoria"], ant: ["Misery","Sadness","Sorrow","Despair"] },
    { word: "Enhance", syn: ["Improve","Boost","Strengthen","Elevate"], ant: ["Worsen","Weaken","Reduce","Diminish"] },
    { word: "Engross", syn: ["Absorb","Captivate","Fascinate","Immerse"], ant: ["Bore","Distract","Ignore","Disinterest"] },
    { word: "Evident", syn: ["Obvious","Clear","Plain","Apparent"], ant: ["Hidden","Unclear","Doubtful","Obscure"] },
    { word: "Efficient", syn: ["Capable","Skilled","Productive","Effective"], ant: ["Lazy","Wasteful","Ineffective","Incompetent"] },
    { word: "Enormous", syn: ["Huge","Giant","Massive","Colossal"], ant: ["Tiny","Small","Little","Miniature"] },
    { word: "Exclusive", syn: ["Special","Private","Unique","Select"], ant: ["Common","Shared","Open","Inclusive"] }
  ],
  F: [
    { word: "Freeze", syn: ["Ice over","Solidify","Harden","Stiffen"], ant: ["Melt","Thaw","Warm up","Liquefy"] },
    { word: "Fabulous", syn: ["Wonderful","Amazing","Excellent","Spectacular"], ant: ["Terrible","Awful","Bad","Dreadful"] },
    { word: "Fathom", syn: ["Understand","Grasp","Figure out","Comprehend"], ant: ["Misunderstand","Miss","Confuse","Puzzle"] },
    { word: "Facilitate", syn: ["Help","Assist","Make easier","Enable"], ant: ["Hinder","Block","Prevent","Obstruct"] },
    { word: "Finicky", syn: ["Fussy","Picky","Choosy","Particular"], ant: ["Easy-going","Flexible","Simple","Accepting"] },
    { word: "Forgery", syn: ["Fake","Copy","Fraud","Counterfeit"], ant: ["Original","Real","Genuine","Authentic"] },
    { word: "Fortitude", syn: ["Courage","Strength","Bravery","Resilience"], ant: ["Weakness","Cowardice","Fear","Timidity"] },
    { word: "Fraudulent", syn: ["Fake","Dishonest","Deceitful","Corrupt"], ant: ["Honest","Genuine","Truthful","Authentic"] }
  ],
  G: [
    { word: "Gulp", syn: ["Swallow","Guzzle","Drink fast","Devour"], ant: ["Sip","Nibble","Taste","Savour"] },
    { word: "Glow", syn: ["Shine","Beam","Radiate","Gleam"], ant: ["Dim","Darken","Fade","Dull"] },
    { word: "Gnaw", syn: ["Chew","Bite","Nibble","Munch"], ant: ["Leave alone","Ignore","Rest","Release"] },
    { word: "Grant", syn: ["Give","Allow","Provide","Bestow"], ant: ["Deny","Refuse","Withhold","Take away"] },
    { word: "Gladden", syn: ["Cheer up","Delight","Please","Brighten"], ant: ["Sadden","Upset","Disappoint","Depress"] },
    { word: "Gabble", syn: ["Babble","Chatter","Ramble","Prattle"], ant: ["Speak clearly","Be silent","Pause","Articulate"] },
    { word: "Gibberish", syn: ["Nonsense","Babble","Rubbish","Drivel"], ant: ["Sense","Logic","Meaning","Clarity"] },
    { word: "Grotesque", syn: ["Ugly","Strange","Bizarre","Hideous"], ant: ["Normal","Beautiful","Attractive","Pleasant"] }
  ],
  H: [
    { word: "Hinder", syn: ["Block","Delay","Prevent","Impede"], ant: ["Help","Assist","Support","Facilitate"] },
    { word: "Hasty", syn: ["Quick","Rushed","Hurried","Impulsive"], ant: ["Slow","Careful","Calm","Deliberate"] },
    { word: "Hectic", syn: ["Busy","Chaotic","Frantic","Frenzied"], ant: ["Calm","Peaceful","Quiet","Relaxed"] },
    { word: "Hazard", syn: ["Danger","Risk","Threat","Peril"], ant: ["Safety","Protection","Security","Shield"] },
    { word: "Humility", syn: ["Modesty","Meekness","Simplicity","Humbleness"], ant: ["Pride","Arrogance","Boasting","Vanity"] },
    { word: "Harness", syn: ["Control","Use","Apply","Channel"], ant: ["Release","Free","Let go","Unleash"] },
    { word: "Hilarious", syn: ["Funny","Amusing","Comic","Hysterical"], ant: ["Boring","Dull","Serious","Tedious"] },
    { word: "Horizontal", syn: ["Flat","Level","Sideways","Lying down"], ant: ["Vertical","Upright","Standing","Perpendicular"] }
  ],
  I: [
    { word: "Ideate", syn: ["Think","Imagine","Brainstorm","Conceptualise"], ant: ["Forget","Ignore","Dismiss","Neglect"] },
    { word: "Irritate", syn: ["Annoy","Bother","Upset","Aggravate"], ant: ["Please","Calm","Soothe","Pacify"] },
    { word: "Impartial", syn: ["Fair","Neutral","Unbiased","Objective"], ant: ["Unfair","Biased","One-sided","Partial"] },
    { word: "Imperial", syn: ["Royal","Majestic","Grand","Regal"], ant: ["Common","Plain","Ordinary","Humble"] },
    { word: "Implicit", syn: ["Hidden","Indirect","Unspoken","Implied"], ant: ["Explicit","Clear","Direct","Stated"] },
    { word: "Inferior", syn: ["Lower","Worse","Weaker","Substandard"], ant: ["Superior","Better","Stronger","Excellent"] },
    { word: "Inbound", syn: ["Arriving","Coming in","Incoming","Entering"], ant: ["Outbound","Leaving","Departing","Exiting"] },
    { word: "Introvert", syn: ["Shy","Reserved","Quiet","Withdrawn"], ant: ["Extrovert","Outgoing","Sociable","Talkative"] }
  ],
  J: [
    { word: "Jiggle", syn: ["Shake","Wiggle","Wobble","Jolt"], ant: ["Still","Steady","Freeze","Stabilise"] },
    { word: "Jaunty", syn: ["Cheerful","Lively","Peppy","Sprightly"], ant: ["Dull","Sad","Gloomy","Downcast"] },
    { word: "Jocund", syn: ["Merry","Happy","Jolly","Jovial"], ant: ["Sad","Gloomy","Miserable","Sullen"] },
    { word: "Jabber", syn: ["Chatter","Babble","Talk fast","Prattle"], ant: ["Speak clearly","Stay quiet","Listen","Articulate"] },
    { word: "Juvenile", syn: ["Young","Childish","Immature","Youthful"], ant: ["Adult","Mature","Grown-up","Experienced"] },
    { word: "Jeopardy", syn: ["Danger","Risk","Threat","Peril"], ant: ["Safety","Security","Protection","Certainty"] }
  ],
  K: [
    { word: "Kempt", syn: ["Neat","Tidy","Groomed","Well-kept"], ant: ["Messy","Untidy","Scruffy","Dishevelled"] },
    { word: "Knead", syn: ["Press","Squeeze","Massage","Work"], ant: ["Ignore","Leave alone","Stretch out","Release"] },
    { word: "Kinetic", syn: ["Moving","Active","Energetic","Dynamic"], ant: ["Still","Static","Resting","Dormant"] },
    { word: "Kindness", syn: ["Goodness","Caring","Warmth","Generosity"], ant: ["Cruelty","Meanness","Harshness","Unkindness"] }
  ],
  L: [
    { word: "Lapse", syn: ["Mistake","Slip","Error","Oversight"], ant: ["Success","Perfection","Achievement","Accuracy"] },
    { word: "Latent", syn: ["Hidden","Dormant","Unseen","Concealed"], ant: ["Active","Visible","Obvious","Apparent"] },
    { word: "Least", syn: ["Smallest","Minimum","Lowest","Slightest"], ant: ["Most","Maximum","Highest","Greatest"] },
    { word: "Lucid", syn: ["Clear","Simple","Easy to understand","Coherent"], ant: ["Confused","Vague","Unclear","Muddled"] },
    { word: "Liberty", syn: ["Freedom","Independence","Rights","Liberation"], ant: ["Captivity","Restriction","Control","Imprisonment"] },
    { word: "Lavish", syn: ["Generous","Costly","Grand","Extravagant"], ant: ["Simple","Plain","Cheap","Modest"] },
    { word: "Lenient", syn: ["Gentle","Easy","Forgiving","Tolerant"], ant: ["Strict","Harsh","Tough","Severe"] },
    { word: "Languish", syn: ["Weaken","Fade","Suffer","Deteriorate"], ant: ["Thrive","Grow","Flourish","Prosper"] }
  ],
  M: [
    { word: "Messy", syn: ["Untidy","Dirty","Chaotic","Cluttered"], ant: ["Neat","Clean","Tidy","Organised"] },
    { word: "Mystic", syn: ["Magical","Mysterious","Spiritual","Enigmatic"], ant: ["Ordinary","Common","Explainable","Mundane"] },
    { word: "Migrate", syn: ["Travel","Move","Relocate","Journey"], ant: ["Stay","Settle","Remain","Reside"] },
    { word: "Manifest", syn: ["Show","Reveal","Display","Demonstrate"], ant: ["Hide","Conceal","Mask","Suppress"] },
    { word: "Motivate", syn: ["Inspire","Encourage","Push","Drive"], ant: ["Discourage","Demotivate","Disappoint","Deter"] }
  ],
  N: [
    { word: "Natural", syn: ["Normal","Real","Pure","Genuine"], ant: ["Artificial","Fake","Unnatural","Synthetic"] },
    { word: "Nascent", syn: ["New","Growing","Emerging","Budding"], ant: ["Old","Mature","Established","Declining"] },
    { word: "Nominal", syn: ["Small","Minor","Slight","Token"], ant: ["Large","Major","Significant","Substantial"] },
    { word: "Nimble", syn: ["Quick","Agile","Swift","Spry"], ant: ["Slow","Clumsy","Heavy","Awkward"] },
    { word: "Nuisance", syn: ["Bother","Annoyance","Problem","Irritant"], ant: ["Pleasure","Help","Benefit","Blessing"] },
    { word: "Notorious", syn: ["Famous for bad","Known","Infamous","Disreputable"], ant: ["Unknown","Respected","Admired","Reputable"] },
    { word: "Negligence", syn: ["Carelessness","Laziness","Neglect","Inattention"], ant: ["Care","Attention","Responsibility","Diligence"] }
  ],
  O: [
    { word: "Ordeal", syn: ["Trial","Hardship","Suffering","Ordeal"], ant: ["Pleasure","Ease","Comfort","Relief"] },
    { word: "Obsess", syn: ["Be fixated","Focus too much","Dwell","Fixate"], ant: ["Ignore","Let go","Move on","Forget"] },
    { word: "Obvious", syn: ["Clear","Plain","Easy to see","Apparent"], ant: ["Hidden","Unclear","Secret","Obscure"] },
    { word: "Obstruct", syn: ["Block","Prevent","Hinder","Impede"], ant: ["Allow","Help","Clear","Facilitate"] },
    { word: "Optimise", syn: ["Improve","Perfect","Maximise","Enhance"], ant: ["Worsen","Damage","Reduce","Neglect"] },
    { word: "Opponent", syn: ["Enemy","Rival","Competitor","Adversary"], ant: ["Friend","Ally","Partner","Supporter"] },
    { word: "Overwhelm", syn: ["Flood","Overpower","Overcome","Swamp"], ant: ["Help","Support","Ease","Assist"] }
  ],
  P: [
    { word: "Poise", syn: ["Balance","Grace","Calmness","Elegance"], ant: ["Clumsiness","Awkwardness","Tension","Unsteadiness"] },
    { word: "Pathos", syn: ["Sadness","Emotion","Pity","Sympathy"], ant: ["Happiness","Joy","Humour","Cheerfulness"] },
    { word: "Phobia", syn: ["Fear","Dread","Terror","Aversion"], ant: ["Courage","Bravery","Love","Attraction"] },
    { word: "Passive", syn: ["Quiet","Inactive","Calm","Submissive"], ant: ["Active","Energetic","Aggressive","Bold"] },
    { word: "Prelude", syn: ["Introduction","Opening","Beginning","Prologue"], ant: ["Ending","Conclusion","Finale","Epilogue"] },
    { word: "Pleasure", syn: ["Joy","Delight","Happiness","Enjoyment"], ant: ["Pain","Sadness","Displeasure","Suffering"] },
    { word: "Plausible", syn: ["Believable","Possible","Reasonable","Credible"], ant: ["Impossible","Unbelievable","Unlikely","Absurd"] },
    { word: "Profound", syn: ["Deep","Thoughtful","Serious","Meaningful"], ant: ["Shallow","Simple","Trivial","Superficial"] },
    { word: "Primitive", syn: ["Basic","Old","Simple","Crude"], ant: ["Modern","Advanced","Complex","Sophisticated"] },
    { word: "Professional", syn: ["Skilled","Expert","Qualified","Competent"], ant: ["Amateur","Beginner","Untrained","Inexperienced"] }
  ],
  Q: [
    { word: "Quarrel", syn: ["Argue","Fight","Disagree","Dispute"], ant: ["Agree","Make peace","Harmony","Reconcile"] },
    { word: "Quinine", syn: ["Medicine","Bitter substance","Treatment","Remedy"], ant: ["Poison","Harm","Illness","Toxin"] },
    { word: "Quicken", syn: ["Speed up","Hasten","Accelerate","Rush"], ant: ["Slow down","Delay","Stop","Decelerate"] },
    { word: "Qualify", syn: ["Earn","Pass","Succeed","Meet requirements"], ant: ["Fail","Lose","Be disqualified","Miss out"] }
  ],
  R: [
    { word: "Replica", syn: ["Copy","Duplicate","Imitation","Reproduction"], ant: ["Original","Real","Genuine","Authentic"] },
    { word: "Reveal", syn: ["Show","Uncover","Disclose","Expose"], ant: ["Hide","Conceal","Cover","Withhold"] },
    { word: "Rapture", syn: ["Joy","Delight","Ecstasy","Bliss"], ant: ["Misery","Sadness","Sorrow","Despair"] },
    { word: "Recluse", syn: ["Loner","Hermit","Isolated person","Solitary"], ant: ["Social person","Friend","Extrovert","Outgoing"] },
    { word: "Rampant", syn: ["Widespread","Out of control","Wild","Unchecked"], ant: ["Controlled","Calm","Limited","Contained"] },
    { word: "Reliable", syn: ["Trustworthy","Dependable","Honest","Consistent"], ant: ["Unreliable","Untrustworthy","Dishonest","Inconsistent"] },
    { word: "Resilient", syn: ["Strong","Tough","Bouncing back","Adaptable"], ant: ["Weak","Fragile","Sensitive","Breakable"] },
    { word: "Rudiment", syn: ["Basic","Beginning","Foundation","Fundamental"], ant: ["Advanced","Expert","Complex","Mastery"] },
    { word: "Reduction", syn: ["Decrease","Drop","Cut","Decline"], ant: ["Increase","Growth","Addition","Expansion"] }
  ],
  S: [
    { word: "Secure", syn: ["Safe","Protected","Stable","Guarded"], ant: ["Unsafe","Vulnerable","Exposed","Risky"] },
    { word: "Senile", syn: ["Old","Aged","Forgetful","Declining"], ant: ["Young","Alert","Sharp","Vigorous"] },
    { word: "Squirm", syn: ["Wriggle","Twist","Fidget","Writhe"], ant: ["Stay still","Relax","Sit calmly","Rest"] },
    { word: "Specific", syn: ["Exact","Precise","Detailed","Particular"], ant: ["Vague","General","Unclear","Broad"] },
    { word: "Simplify", syn: ["Make easy","Clarify","Shorten","Streamline"], ant: ["Complicate","Confuse","Make harder","Elaborate"] },
    { word: "Shallow", syn: ["Not deep","Surface","Simple","Superficial"], ant: ["Deep","Thoughtful","Profound","Complex"] },
    { word: "Swindle", syn: ["Cheat","Trick","Deceive","Defraud"], ant: ["Be honest","Help","Give fairly","Assist"] },
    { word: "Stamina", syn: ["Strength","Endurance","Energy","Persistence"], ant: ["Weakness","Tiredness","Fatigue","Exhaustion"] },
    { word: "Survive", syn: ["Live","Endure","Continue","Persist"], ant: ["Die","Fail","Give up","Perish"] },
    { word: "Squabble", syn: ["Argue","Fight","Bicker","Quarrel"], ant: ["Agree","Make peace","Get along","Reconcile"] },
    { word: "Significant", syn: ["Important","Major","Notable","Meaningful"], ant: ["Minor","Unimportant","Trivial","Insignificant"] }
  ],
  T: [
    { word: "Tirade", syn: ["Angry speech","Rant","Outburst","Diatribe"], ant: ["Calm talk","Praise","Compliment","Gentle words"] },
    { word: "Traitor", syn: ["Betrayer","Deceiver","Double-crosser","Defector"], ant: ["Patriot","Loyalist","Defender","Supporter"] },
    { word: "Tarnish", syn: ["Stain","Damage","Spoil","Taint"], ant: ["Clean","Polish","Restore","Shine"] },
    { word: "Trivial", syn: ["Minor","Unimportant","Small","Petty"], ant: ["Important","Major","Significant","Vital"] },
    { word: "Tremble", syn: ["Shake","Shiver","Quiver","Shudder"], ant: ["Stay steady","Calm down","Stand firm","Stabilise"] },
    { word: "Tentative", syn: ["Unsure","Hesitant","Cautious","Uncertain"], ant: ["Confident","Bold","Certain","Decisive"] },
    { word: "Tiresome", syn: ["Boring","Annoying","Dull","Tedious"], ant: ["Exciting","Fun","Interesting","Thrilling"] },
    { word: "Terminate", syn: ["End","Stop","Finish","Conclude"], ant: ["Begin","Start","Continue","Launch"] }
  ],
  U: [
    { word: "Unite", syn: ["Join","Connect","Come together","Unify"], ant: ["Separate","Divide","Split","Disconnect"] },
    { word: "Uneasy", syn: ["Worried","Nervous","Uncomfortable","Anxious"], ant: ["Calm","Relaxed","Comfortable","At ease"] },
    { word: "Unique", syn: ["Special","One of a kind","Rare","Distinctive"], ant: ["Common","Ordinary","Typical","Usual"] },
    { word: "Unravel", syn: ["Solve","Untangle","Discover","Decode"], ant: ["Complicate","Tangle","Confuse","Knot"] },
    { word: "Upgrade", syn: ["Improve","Advance","Enhance","Elevate"], ant: ["Downgrade","Worsen","Lower","Demote"] },
    { word: "Ultimate", syn: ["Final","Greatest","Best","Supreme"], ant: ["First","Least","Worst","Inferior"] }
  ],
  V: [
    { word: "Venom", syn: ["Poison","Toxin","Harmful liquid","Vile substance"], ant: ["Cure","Antidote","Remedy","Medicine"] },
    { word: "Virtue", syn: ["Goodness","Honesty","Quality","Morality"], ant: ["Evil","Wickedness","Vice","Immorality"] },
    { word: "Visible", syn: ["Seen","Clear","Noticeable","Observable"], ant: ["Invisible","Hidden","Unseen","Concealed"] },
    { word: "Violate", syn: ["Break","Disobey","Disrespect","Infringe"], ant: ["Obey","Follow","Respect","Honour"] },
    { word: "Vibrate", syn: ["Shake","Tremble","Buzz","Quiver"], ant: ["Still","Calm","Stop","Freeze"] }
  ],
  W: [
    { word: "Wrap", syn: ["Cover","Fold","Enclose","Bundle"], ant: ["Unwrap","Open","Uncover","Expose"] },
    { word: "Wizard", syn: ["Expert","Master","Genius","Prodigy"], ant: ["Beginner","Novice","Amateur","Learner"] },
    { word: "Wrath", syn: ["Anger","Rage","Fury","Wrath"], ant: ["Calmness","Kindness","Happiness","Peace"] },
    { word: "Wroth", syn: ["Angry","Furious","Mad","Enraged"], ant: ["Happy","Calm","Pleased","Content"] }
  ],
  X: [
    { word: "Xerosis", syn: ["Dryness","Rough skin","Dehydration","Parched"], ant: ["Moisture","Softness","Hydration","Dampness"] },
    { word: "X-ray", syn: ["Scan","Image","Photograph","Radiograph"], ant: ["Cover","Block","Hide","Conceal"] }
  ],
  Y: [
    { word: "Yearn", syn: ["Long for","Desire","Wish","Crave"], ant: ["Dislike","Reject","Ignore","Despise"] },
    { word: "Yore", syn: ["Old times","Long ago","The past","Ancient times"], ant: ["Present","Now","Today","Future"] },
    { word: "Yelp", syn: ["Cry out","Shout","Squeal","Screech"], ant: ["Whisper","Stay silent","Murmur","Hush"] },
    { word: "Yonder", syn: ["Over there","Far away","Distant","Beyond"], ant: ["Here","Close","Nearby","Adjacent"] }
  ],
  Z: [
    { word: "Zeal", syn: ["Passion","Enthusiasm","Energy","Eagerness"], ant: ["Laziness","Boredom","Indifference","Apathy"] },
    { word: "Zest", syn: ["Excitement","Enthusiasm","Energy","Vigour"], ant: ["Boredom","Dullness","Disinterest","Lethargy"] },
    { word: "Zenith", syn: ["Top","Peak","Highest point","Summit"], ant: ["Bottom","Lowest point","Base","Nadir"] },
    { word: "Zombie", syn: ["Living dead","Undead","Ghoul","Walking dead"], ant: ["Living person","Active","Alert","Vibrant"] }
  ]
};

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const TILE_COLORS = [
  '#CE82FF','#1CB0F6','#FF9600','#58CC02','#FF4B4B','#FF86D0',
  '#00CD9C','#FFC800','#CE82FF','#1CB0F6','#FF9600','#58CC02',
  '#FF4B4B','#FF86D0','#00CD9C','#FFC800','#CE82FF','#1CB0F6',
  '#FF9600','#58CC02','#FF4B4B','#FF86D0','#00CD9C','#FFC800',
  '#CE82FF','#1CB0F6'
];

export const LETTER_EMOJI = [
  '🍎','🐻','🐱','🐶','🐘','🦊','🦒','🐴','🍦','🃏',
  '🪁','🦁','🐵','🌙','🐙','🐧','👑','🌈','⭐','🐢',
  '☂️','🎻','🐋','✖️','💛','⚡'
];

export const CORRECT_MSGS = ["Amazing! 🎉","You got it! ⭐","Brilliant! 🏆","Super! 🌟","Fantastic! 💫","Wonderful! 🥳"];
export const WRONG_MSGS = ["Oops! Try again next time 💪","Almost! Keep going 🌈","You'll get it! 🐝","Not quite! 🌻"];
