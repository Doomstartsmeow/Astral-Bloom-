// src/api/orders.js

const STATUS_STEPS = ["PREPARING", "OUT_FOR_DELIVERY", "DELIVERED"];

const MOCK_ORDERS = [
  {
    id: "AB-2403-017",
    eventName: "Wedding – Politechnika rooftop",
    total: 738,
    status: "OUT_FOR_DELIVERY",
    date: "2025-03-24",
    deliveryWindow: "18:00–19:00",
    eco: true,
    address: "Warsaw, ul. Koszykowa 75",
    items: [
      { name: "Warsaw Wedding Classic", qty: 2 },
      { name: "Vistula Morning (table mini)", qty: 4 },
    ],
    updates: [
      { time: "15:05", text: "Payment authorised via PayU stub." },
      { time: "16:20", text: "Bouquets prepared by florist." },
      { time: "17:10", text: "Courier picked up order from studio." },
    ],
  },
  {
    id: "AB-2403-021",
    eventName: "Corporate gala – Wola tower lobby",
    total: 1124,
    status: "PREPARING",
    date: "2025-03-27",
    deliveryWindow: "17:30–18:30",
    eco: false,
    address: "Warsaw, ul. Grzybowska 88",
    items: [
      { name: "Corporate Event Standout", qty: 3 },
      { name: "Praga Night (bar accents)", qty: 5 },
    ],
    updates: [
      { time: "11:42", text: "Order verified for Warsaw delivery zone." },
      { time: "13:10", text: "Colour palette confirmed with organiser via email." },
    ],
  },
  {
    id: "AB-2402-093",
    eventName: "Jazz night – Praga riverside bar",
    total: 273,
    status: "DELIVERED",
    date: "2025-02-18",
    deliveryWindow: "19:00–20:00",
    eco: true,
    address: "Warsaw, ul. Ząbkowska 12",
    items: [{ name: "Praga Night", qty: 1 }],
    updates: [
      { time: "17:45", text: "Order prepared with eco packaging." },
      { time: "18:25", text: "Courier en route across Śląsko-Dąbrowski bridge." },
      { time: "19:05", text: "Delivered. Signed by venue manager." },
    ],
  },
];

const STORAGE_KEY = "astral_bloom_orders_v1";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function pad2(n) {
  return String(n).padStart(2, "0");
}

function nowHHMM() {
  const d = new Date();
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export function getSeedOrders() {
  return MOCK_ORDERS;
}

export function readOrdersFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const parsed = safeParse(raw);
  return Array.isArray(parsed) ? parsed : null;
}

export function writeOrdersToStorage(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export async function fetchOrders() {
  await new Promise((r) => setTimeout(r, 300));

  const stored = readOrdersFromStorage();
  if (!stored) {
    writeOrdersToStorage(getSeedOrders());
    return getSeedOrders();
  }

  return stored;
}

/**
 * Yeni order'ı listenin başına ekler (storage + return nextOrders)
 */
export function prependOrder(newOrder) {
  const current = readOrdersFromStorage() ?? getSeedOrders();
  const next = [newOrder, ...current];
  writeOrdersToStorage(next);
  return next;
}

/**
 * Siparişi CANCELLED yapar (storage + return nextOrders)
 * Not: sadece status PREPARING iken iptal mantıklı.
 */
export async function cancelOrder(orderId) {
  await new Promise((r) => setTimeout(r, 350));

  const current = readOrdersFromStorage() ?? getSeedOrders();
  const idx = current.findIndex((o) => o.id === orderId);
  if (idx === -1) {
    throw new Error("Order not found.");
  }

  const order = current[idx];

  if (order.status !== "PREPARING") {
    throw new Error("Only PREPARING orders can be cancelled.");
  }

  const cancelled = {
    ...order,
    status: "CANCELLED",
    updates: [
      { time: nowHHMM(), text: "Cancelled by customer (frontend demo)." },
      ...(order.updates ?? []),
    ],
  };

  const next = [...current];
  next[idx] = cancelled;

  writeOrdersToStorage(next);
  return next;
}

// İstersen başka yerde kullanırsın diye export ediyorum
export { STATUS_STEPS };
