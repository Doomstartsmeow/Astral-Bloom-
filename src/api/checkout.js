// src/api/checkout.js

export async function placeOrder(order) {
  await new Promise((r) => setTimeout(r, 800));

  if (!order?.fullName || !order?.address) {
    throw new Error("Missing required checkout fields.");
  }

  // fake order id
  const id = `AB-${Date.now().toString().slice(-6)}`;

  return {
    id,
    eventName: order.fullName,
    total: order.total,
    status: "PREPARING",
    date: new Date().toISOString().slice(0, 10),
    deliveryWindow: order.deliveryWindow,
    eco: order.items.some((i) => i.ecoOnly),
    address: order.address,
    items: order.items.map((i) => ({
      name: i.name,
      qty: i.qty,
    })),
    updates: [
      {
        time: new Date().toLocaleTimeString().slice(0, 5),
        text: "Order placed successfully.",
      },
    ],
  };
}
