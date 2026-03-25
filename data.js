// Shared club data (used by events/home pages).
// Edit these values to update events and links.
window.wasabiHouse = {
  links: {
    youtube: "https://www.youtube.com/",
    soundcloud: "https://soundcloud.com/"
  },
  ticketRequestEmail: "tickets@wasabihouse.com",
  featuredTags: ["Techno", "Bass", "House", "Live", "Breaks", "Late"],
  events: [
    {
      id: "2026-03-28-neon-ramen",
      date: "2026-03-28",
      title: "Neon Ramen (Bass Night)",
      doors: "21:00",
      location: "Wasabi House — back room",
      artists: ["DJ Katsu", "Miso Rush"],
      tags: ["Bass", "Techno", "Ramen vibes"],
      status: "Limited",
      description:
        "Fast kicks. Hot sauce synths. Bring friends who like it loud.\nLine-up coming soon.",
      youtube: "https://www.youtube.com/",
      soundcloud: "https://soundcloud.com/",
      ticketTiers: [
        { key: "ga", label: "GA", price: 25, note: "Standard entry" },
        { key: "vip", label: "VIP", price: 45, note: "Priority entry + better view (limited)" }
      ]
    },
    {
      id: "2026-04-05-miso-attack",
      date: "2026-04-05",
      title: "Miso Attack (Live Sets)",
      doors: "21:30",
      location: "Wasabi House — main floor",
      artists: ["Aoi Wave", "Syrup Circuit"],
      tags: ["Live", "Breaks", "Synth heat"],
      status: "Limited",
      description:
        "Live sets all night long. Expect breaks, stutters, and cinematic bass.\nLimited VIP available.",
      youtube: "https://www.youtube.com/",
      soundcloud: "https://soundcloud.com/",
      ticketTiers: [
        { key: "ga", label: "GA", price: 28, note: "Entry when doors open" },
        { key: "vip", label: "VIP", price: 55, note: "Priority entry + merch bundle (limited)" }
      ]
    },
    {
      id: "2026-04-19-heatwave",
      date: "2026-04-19",
      title: "Heatwave (Late Closing)",
      doors: "22:00",
      location: "Wasabi House — back room",
      artists: ["Late Bloom", "Groove Samurai"],
      tags: ["House", "Groove", "Late session"],
      status: "Soon",
      description: "Long warm-up, then the drop hits. Stay for the final set.",
      youtube: "https://www.youtube.com/",
      soundcloud: "https://soundcloud.com/",
      ticketTiers: [
        { key: "ga", label: "GA", price: 30, note: "Standard entry" },
        { key: "vip", label: "VIP", price: 48, note: "Priority entry (limited)" }
      ]
    },
    {
      id: "2026-05-03-wasabi-waltz",
      date: "2026-05-03",
      title: "Wasabi Waltz (Deep + Dark)",
      doors: "21:00",
      location: "Wasabi House — main floor",
      artists: ["Nori Noir", "Deep Diver"],
      tags: ["Deep", "Dark", "Minimal groove"],
      status: "Limited",
      description: "A slow burn into deep resonance. Minimal groove with pressure.",
      youtube: "https://www.youtube.com/",
      soundcloud: "https://soundcloud.com/",
      ticketTiers: [
        { key: "ga", label: "GA", price: 27, note: "Standard entry" },
        { key: "vip", label: "VIP", price: 52, note: "Priority entry + lounge access (limited)" }
      ]
    },
    {
      id: "2026-05-17-salt-spark",
      date: "2026-05-17",
      title: "Salt Spark (DJ Showcase)",
      doors: "21:15",
      location: "Wasabi House — special set",
      artists: ["Sparkline", "UKG Ember"],
      tags: ["Showcase", "UKG", "Energy"],
      status: "Limited",
      description: "A rotating showcase. Fast transitions and big energy.",
      youtube: "https://www.youtube.com/",
      soundcloud: "https://soundcloud.com/",
      ticketTiers: [
        { key: "ga", label: "GA", price: 26, note: "Entry when doors open" },
        { key: "vip", label: "VIP", price: 49, note: "Priority entry (limited)" }
      ]
    }
  ]
};

