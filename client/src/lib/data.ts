/**
 * TEDxAlMuntazirSchoolsYouth 2026 — Data
 * Speakers, segments, and event information
 */

export interface Speaker {
  id: string;
  name: string;
  topic: string;
  talkTitle: string;
  bio: string;
  talkDescription: string;
  segment: "past" | "present" | "future";
  isAlumni?: boolean;
  isPlaceholder?: boolean;
  initials: string;
  accentColor?: string;
}

export const speakers: Speaker[] = [
  // ── PAST SEGMENT ──────────────────────────────────────────
  {
    id: "anaya-rashid",
    name: "Anaya Rashid",
    topic: "Culture",
    talkTitle: "The Culture of Time",
    bio: "Anaya Rashid is a student at Al Muntazir Schools with a deep fascination for how cultures across the world perceive and relate to time. Her research explores the sociological dimensions of temporal experience.",
    talkDescription: "Different cultures experience time in fundamentally different ways. Anaya explores how our cultural inheritance shapes our relationship with the past — from cyclical time in Eastern philosophy to the linear urgency of Western modernity. What does it mean to be 'on time' when time itself is culturally constructed?",
    segment: "past",
    initials: "AR",
    accentColor: "#EB0028",
  },
  {
    id: "zahra-datoo",
    name: "Zahra Datoo",
    topic: "Memory",
    talkTitle: "The Architecture of Nostalgia",
    bio: "Zahra Datoo is a student whose work sits at the intersection of neuroscience and personal narrative. She investigates how memory shapes identity and why the human brain is wired to romanticize the past.",
    talkDescription: "Nostalgia is not merely sentimentality — it is a neurological survival mechanism. Zahra unpacks the science of how we construct, distort, and weaponize our memories of the past. In an age of digital permanence, what happens when we can never truly forget?",
    segment: "past",
    initials: "ZD",
    accentColor: "#EB0028",
  },
  {
    id: "alumni-past",
    name: "Alumni Speaker",
    topic: "Legacy",
    talkTitle: "Looking Back to Move Forward",
    bio: "An alumni of Al Muntazir Schools returning to share insights gained since graduation. This speaker will bridge the gap between the school's past and its present.",
    talkDescription: "A returning alumnus reflects on how their time at Al Muntazir Schools shaped their trajectory — and what lessons from the past continue to guide their present decisions.",
    segment: "past",
    isAlumni: true,
    isPlaceholder: true,
    initials: "AL",
    accentColor: "#EB0028",
  },

  // ── PRESENT SEGMENT ───────────────────────────────────────
  {
    id: "hassan-abbas",
    name: "Hassan Abbas Mohammed",
    topic: "Psychology",
    talkTitle: "The Procrastination Paradox",
    bio: "Hassan Abbas Mohammed is a student with a keen interest in behavioral psychology and productivity science. He has spent years studying why intelligent people consistently delay what matters most.",
    talkDescription: "Procrastination is not laziness — it is an emotional regulation problem. Hassan dismantles the myth of the 'perfect moment' and reveals the psychological mechanisms that keep us stuck in the present, unable to act on what we know we must do. The time you're waiting for is already here.",
    segment: "present",
    initials: "HA",
    accentColor: "#EB0028",
  },
  {
    id: "zahra-moledina",
    name: "Zahra Moledina",
    topic: "Economics",
    talkTitle: "Capitalism's Clock",
    bio: "Zahra Moledina is a student and emerging economist who examines how capitalist systems commodify time itself. Her work challenges the notion that productivity is the highest use of human hours.",
    talkDescription: "Under capitalism, time is not lived — it is sold. Zahra interrogates the modern obsession with optimization, hustle culture, and the monetization of every waking moment. What would it mean to reclaim our time from the market? And who profits from our perpetual busyness?",
    segment: "present",
    initials: "ZM",
    accentColor: "#EB0028",
  },
  {
    id: "alumni-present",
    name: "Alumni Speaker",
    topic: "Innovation",
    talkTitle: "Building in the Now",
    bio: "An alumni of Al Muntazir Schools currently working in a field of innovation and technology. This speaker will share how present-moment thinking drives creative breakthroughs.",
    talkDescription: "A current practitioner shares how embracing the present — rather than waiting for the future — has been the key to their most significant achievements.",
    segment: "present",
    isAlumni: true,
    isPlaceholder: true,
    initials: "AL",
    accentColor: "#EB0028",
  },

  // ── FUTURE SEGMENT ────────────────────────────────────────
  {
    id: "liyaan-karbelkar",
    name: "Liyaan Karbelkar",
    topic: "Philosophy",
    talkTitle: "The Legacy We Leave",
    bio: "Liyaan Karbelkar is a student philosopher who grapples with questions of meaning, mortality, and the marks we leave on the world. His talks challenge audiences to think beyond their own lifetimes.",
    talkDescription: "Legacy is the only form of time travel available to us. Liyaan explores what it means to live a life that extends beyond your own death — through ideas, relationships, and the choices we make today. In a borrowed life, what is worth leaving behind?",
    segment: "future",
    initials: "LK",
    accentColor: "#EB0028",
  },
  {
    id: "sada-mbaruk",
    name: "Sada Mbaruk Said",
    topic: "Environment & Technology",
    talkTitle: "Three Clocks: Climate, Animals, AI",
    bio: "Sada Mbaruk Said is a student environmentalist and technologist who tracks three of the most urgent countdowns facing humanity: climate collapse, species extinction, and the rise of artificial intelligence.",
    talkDescription: "Three timers are running simultaneously — and all of them are running out. Sada presents a unified theory of urgency: how the climate crisis, the sixth mass extinction, and the acceleration of AI are not separate problems but a single convergence point. The future is not waiting for us to be ready.",
    segment: "future",
    initials: "SM",
    accentColor: "#EB0028",
  },
  {
    id: "alumni-future",
    name: "Alumni Speaker",
    topic: "Vision",
    talkTitle: "Designing Tomorrow",
    bio: "An alumni of Al Muntazir Schools who has gone on to work in future-facing fields. This speaker will share their vision for what the next generation can build.",
    talkDescription: "A visionary alumnus shares what they see on the horizon — and how the education they received at Al Muntazir Schools prepared them to shape the future rather than merely inhabit it.",
    segment: "future",
    isAlumni: true,
    isPlaceholder: true,
    initials: "AL",
    accentColor: "#EB0028",
  },
];

export const segments = [
  {
    id: "past",
    label: "The Past",
    number: "01",
    description: "Where we came from shapes who we are. Explore memory, culture, and the weight of history.",
    theme: "Memory & Heritage",
    speakers: speakers.filter((s) => s.segment === "past"),
  },
  {
    id: "present",
    label: "The Present",
    number: "02",
    description: "The only moment we truly inhabit. Confront procrastination, capitalism, and the urgency of now.",
    theme: "Action & Awareness",
    speakers: speakers.filter((s) => s.segment === "present"),
  },
  {
    id: "future",
    label: "The Future",
    number: "03",
    description: "The time we are borrowing against. Legacy, climate, AI — what we leave for those who come after.",
    theme: "Legacy & Vision",
    speakers: speakers.filter((s) => s.segment === "future"),
  },
];

export const themeManifesto = {
  title: "Borrowed Time",
  subtitle: "TEDxAlMuntazirSchoolsYouth 2026",
  paragraphs: [
    "None of us choose our arrival.",
    "We are born into a world already in motion — inheriting its histories, its crises, its unfinished conversations. We did not ask for this moment. And yet, here we are.",
    "The clock was already running when you opened your eyes.",
    "Every second you have lived has been borrowed — from the future, from the planet, from the generations that will inherit whatever we leave behind. Time is not yours. It never was. You are merely its temporary custodian.",
    "So what do you do with borrowed time?",
    "Do you spend it looking backward — romanticizing a past that may never have existed as you remember it? Do you freeze in the present — paralyzed by the weight of everything that needs to be done? Or do you dare to look forward — to imagine a future worth borrowing time for?",
    "This is not a question for philosophers alone.",
    "It is the question of your generation. The climate does not wait. The algorithms do not pause. The species disappearing today will not return tomorrow. The borrowed time is running out — and the interest is compounding.",
    "But here is what we believe:",
    "Ideas are the only currency that appreciates with time. A single idea, spoken aloud in the right room, at the right moment, can alter the trajectory of everything that follows. That is why we gather. That is why we speak. That is why we listen.",
    "TEDxAlMuntazirSchoolsYouth 2026 is not a conference.",
    "It is a reckoning. A room full of people who refuse to waste the time they have been given. Students, thinkers, builders, dreamers — all of us asking the same question, from different angles:",
    "What will you do with the time that's left?",
  ],
};
