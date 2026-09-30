type DataLayerWindow = Window & { dataLayer?: Record<string, unknown>[] };

// Envía eventos a dataLayer (GTM/GA4) si existe. No carga ningún script por sí mismo.
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...params });
}
