import { ImageResponse } from "next/og";

export const alt = "ARIH — Think big. Stay small. Branding & design studio, Ljubljana, since 1996.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0a0a",
          color: "#f5f3ee",
          display: "flex",
          flexDirection: "column",
          padding: 64,
          position: "relative",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        }}
      >
        {/* Top row: studio label + locator */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.7,
          }}
        >
          <span>ⓐ Agencija Arih</span>
          <span>Ljubljana · 46.05°N 14.51°E</span>
        </div>

        {/* Center: massive wordmark */}
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              fontSize: 280,
              lineHeight: 0.86,
              letterSpacing: "-0.05em",
              fontWeight: 700,
              display: "flex",
              alignItems: "flex-start",
            }}
          >
            ARIH
            <span
              style={{
                fontSize: 96,
                marginTop: 18,
                marginLeft: 6,
                opacity: 0.92,
              }}
            >
              ®
            </span>
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 38,
              opacity: 0.78,
              letterSpacing: "-0.01em",
              display: "flex",
              gap: 18,
            }}
          >
            <span>Think big.</span>
            <span style={{ fontStyle: "italic" }}>Stay small.</span>
          </div>
        </div>

        {/* Bottom row: thin rule + details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div style={{ height: 1, background: "#f5f3ee", opacity: 0.35 }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: 0.78,
            }}
          >
            <span>Branding · Identity · Packaging · Campaigns</span>
            <span>Since 1996 · 78 projects</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
