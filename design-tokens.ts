export const designTokens = {
  risk: {
    normal: "#22C55E",
    earlyWarning: "#EAB308",
    highRisk: "#F97316",
    critical: "#EF4444",
    noSignal: "#6B7280",
  },
  dashboard: { background: "#0B0F14", surface: "#141A21" },
  website: { background: "#FFFFFF", section: "#F8FAFC" },
  accent: "#0D6879",
  chart: { grid: "#26313D", muted: "#748291", tooltipText: "#E6EDF3" },
  spacing: { unit: 8 },
  radius: { card: 8 },
  typography: {
    heading: "ui-sans-serif, system-ui, sans-serif",
    body: "ui-sans-serif, system-ui, sans-serif",
  },
} as const;
