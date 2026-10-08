export type PublicStats = { nodes_monitoring: number };

function apiOrigin() {
  const configured = process.env.CLOUD_API_URL;
  if (!configured && process.env.NODE_ENV === "production") {
    throw new Error("CLOUD_API_URL is required in production.");
  }
  const value = configured ?? "http://127.0.0.1:8000";
  const url = new URL(value);
  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash || !url.hostname) {
    throw new Error("CLOUD_API_URL must be an origin without credentials, path, query, or fragment.");
  }
  if (process.env.NODE_ENV === "production" && url.protocol !== "https:") {
    throw new Error("CLOUD_API_URL must use HTTPS in production.");
  }
  return url.origin;
}

export async function fetchPublicStats(): Promise<PublicStats | null> {
  try {
    const response = await fetch(`${apiOrigin()}/public/stats`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(3000) });
    if (!response.ok) return null;
    const value: unknown = await response.json();
    if (!value || typeof value !== "object" || !Number.isSafeInteger((value as PublicStats).nodes_monitoring) || (value as PublicStats).nodes_monitoring < 0) return null;
    return value as PublicStats;
  } catch {
    return null;
  }
}
