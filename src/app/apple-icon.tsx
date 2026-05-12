import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
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
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        {/* Top-left dot */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "#f5f3ee",
            opacity: 0.7,
          }}
        />
        {/* Center mark */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            fontSize: 138,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1,
          }}
        >
          A
          <span
            style={{
              fontSize: 38,
              marginTop: 18,
              marginLeft: 4,
              opacity: 0.85,
            }}
          >
            ®
          </span>
        </div>
        {/* Bottom tagline */}
        <div
          style={{
            position: "absolute",
            bottom: 16,
            fontSize: 11,
            letterSpacing: "0.22em",
            opacity: 0.6,
            textTransform: "uppercase",
          }}
        >
          since 1996
        </div>
      </div>
    ),
    { ...size }
  );
}
