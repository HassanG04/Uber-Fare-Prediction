// client/src/services/predictApi.ts
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

export async function predictFare(payload: any) {
  const res = await fetch(`${API_BASE}/api/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }

  return res.json();
}
