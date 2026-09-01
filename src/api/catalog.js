// src/api/catalog.js

const MOCK_BOUQUETS = [
  {
    id: "vistula-morning",
    name: "Vistula Morning",
    price: 120,
    defaultSize: "SMALL",
    eco: true,
    tags: ["Everyday", "Pastel", "Same-day"],
    description:
      "Soft pastel bouquet for intimate breakfasts and daylight gatherings.",
    imageUrl:
      "https://images.pexels.com/photos/931162/pexels-photo-931162.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "warsaw-wedding-classic",
    name: "Warsaw Wedding Classic",
    price: 338,
    defaultSize: "MEDIUM",
    eco: true,
    tags: ["Wedding", "Roses", "Bridal", "Same-day"],
    description:
      "Cream and white roses with greenery for timeless Warsaw weddings.",
    imageUrl:
      "https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "corporate-event-standout",
    name: "Corporate Event Standout",
    price: 544,
    defaultSize: "LARGE",
    eco: false,
    tags: ["Corporate", "Lobby", "Formal", "Same-day"],
    description:
      "Tall centrepiece designed for lobbies, gala halls and conferences.",
    imageUrl:
      "https://images.pexels.com/photos/931167/pexels-photo-931167.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "praga-night",
    name: "Praga Night",
    price: 273,
    defaultSize: "MEDIUM",
    eco: false,
    tags: ["Evening", "Bold", "Night", "Same-day"],
    description:
      "Moody, dark-toned bouquet tuned for jazz bars and late-night venues.",
    imageUrl:
      "https://images.pexels.com/photos/5946994/pexels-photo-5946994.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export async function fetchBouquets() {
  // backend yok: simülasyon
  await new Promise((r) => setTimeout(r, 450));
  return MOCK_BOUQUETS;
}
