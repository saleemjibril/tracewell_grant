const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "/api";

async function parseJsonResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || "Request failed";
    const error = new Error(message);
    error.code = data?.error?.code;
    error.status = response.status;
    throw error;
  }

  return data;
}

export async function fetchGrants({ q, tab, tag, page = 1, limit = 9 } = {}) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (tab) params.set("tab", tab);
  if (tag) params.set("tag", tag);
  params.set("page", String(page));
  params.set("limit", String(limit));

  const response = await fetch(`${API_BASE}/grants?${params.toString()}`);
  return parseJsonResponse(response);
}

export async function fetchGrantFilters() {
  const response = await fetch(`${API_BASE}/grants/filters`);
  return parseJsonResponse(response);
}

export async function subscribeNewsletter(email) {
  const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return parseJsonResponse(response);
}
