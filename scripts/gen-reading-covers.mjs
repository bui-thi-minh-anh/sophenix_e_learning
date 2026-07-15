/**
 * Generate cover images for reading passages with category icons.
 * Usage: node scripts/gen-reading-covers.mjs
 */
import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(import.meta.dirname, "..", "public", "images", "reading", "covers");
mkdirSync(OUT_DIR, { recursive: true });

const passages = [
  { slug: "my-school", title: "My School", category: "daily-life", level: "A1" },
  { slug: "weekend-plans", title: "Weekend Plans", category: "daily-life", level: "A2" },
  { slug: "coffee-culture-vietnam", title: "Coffee Culture in Vietnam", category: "culture", level: "B1" },
  { slug: "plastic-pollution", title: "The Problem of Plastic Pollution", category: "environment", level: "B2" },
  { slug: "ai-ethics", title: "The Ethics of Artificial Intelligence", category: "technology", level: "C1" },
];

const categoryThemes = {
  "daily-life": {
    bg: ["#1a1145", "#0f2847"],
    accent: "#818cf8",
    pattern: "circles",
  },
  culture: {
    bg: ["#2d1040", "#1a0a30"],
    accent: "#c084fc",
    pattern: "diamonds",
  },
  environment: {
    bg: ["#052e16", "#0a1f2e"],
    accent: "#34d399",
    pattern: "waves",
  },
  technology: {
    bg: ["#0c1a3a", "#1a1040"],
    accent: "#38bdf8",
    pattern: "grid",
  },
  science: {
    bg: ["#1c1917", "#271a0a"],
    accent: "#fb923c",
    pattern: "dots",
  },
};

function drawPattern(ctx, pattern, w, h, color) {
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1;

  if (pattern === "circles") {
    for (let x = 30; x < w; x += 55) {
      for (let y = 30; y < h; y += 55) {
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  } else if (pattern === "diamonds") {
    for (let x = 0; x < w; x += 45) {
      for (let y = 0; y < h; y += 45) {
        ctx.beginPath();
        ctx.moveTo(x + 22, y);
        ctx.lineTo(x + 44, y + 22);
        ctx.lineTo(x + 22, y + 44);
        ctx.lineTo(x, y + 22);
        ctx.closePath();
        ctx.stroke();
      }
    }
  } else if (pattern === "waves") {
    for (let y = 20; y < h; y += 30) {
      ctx.beginPath();
      for (let x = 0; x < w; x += 4) {
        ctx.lineTo(x, y + Math.sin(x / 25) * 10);
      }
      ctx.stroke();
    }
  } else if (pattern === "grid") {
    for (let x = 0; x < w; x += 35) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 35) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  } else {
    for (let x = 12; x < w; x += 25) {
      for (let y = 12; y < h; y += 25) {
        ctx.beginPath();
        ctx.arc(x, y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  ctx.globalAlpha = 1;
}

// ─── Category icon drawers ─────────────────────────────
function drawBook(ctx, cx, cy, size, color) {
  const s = size;
  ctx.save();
  ctx.translate(cx, cy);

  // Left page
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.25;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.5);
  ctx.quadraticCurveTo(-s * 0.6, -s * 0.4, -s * 0.7, -s * 0.3);
  ctx.lineTo(-s * 0.7, s * 0.4);
  ctx.quadraticCurveTo(-s * 0.5, s * 0.3, 0, s * 0.5);
  ctx.fill();

  // Right page
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.5);
  ctx.quadraticCurveTo(s * 0.6, -s * 0.4, s * 0.7, -s * 0.3);
  ctx.lineTo(s * 0.7, s * 0.4);
  ctx.quadraticCurveTo(s * 0.5, s * 0.3, 0, s * 0.5);
  ctx.fill();

  // Spine
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.4;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.5);
  ctx.lineTo(0, s * 0.5);
  ctx.stroke();

  // Lines on left page
  ctx.globalAlpha = 0.15;
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const y = -s * 0.2 + i * s * 0.15;
    ctx.beginPath();
    ctx.moveTo(-s * 0.55, y);
    ctx.lineTo(-s * 0.15, y);
    ctx.stroke();
  }

  // Lines on right page
  for (let i = 0; i < 4; i++) {
    const y = -s * 0.2 + i * s * 0.15;
    ctx.beginPath();
    ctx.moveTo(s * 0.15, y);
    ctx.lineTo(s * 0.55, y);
    ctx.stroke();
  }

  ctx.restore();
}

function drawMasks(ctx, cx, cy, size, color) {
  const s = size;
  ctx.save();
  ctx.translate(cx, cy);

  // Happy mask
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.22;
  ctx.beginPath();
  ctx.ellipse(-s * 0.2, -s * 0.05, s * 0.4, s * 0.45, -0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.35;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  // Happy eyes
  ctx.beginPath();
  ctx.arc(-s * 0.33, -s * 0.15, s * 0.06, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(-s * 0.1, -s * 0.18, s * 0.06, 0, Math.PI * 2);
  ctx.stroke();
  // Happy mouth
  ctx.beginPath();
  ctx.arc(-s * 0.2, s * 0.05, s * 0.15, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Sad mask (offset)
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.18;
  ctx.beginPath();
  ctx.ellipse(s * 0.25, s * 0.05, s * 0.38, s * 0.42, 0.15, 0, Math.PI * 2);
  ctx.fill();

  ctx.globalAlpha = 0.35;
  // Sad eyes
  ctx.beginPath();
  ctx.arc(s * 0.13, -s * 0.05, s * 0.06, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(s * 0.37, -s * 0.08, s * 0.06, 0, Math.PI * 2);
  ctx.stroke();
  // Sad mouth
  ctx.beginPath();
  ctx.arc(s * 0.25, s * 0.25, s * 0.13, Math.PI + 0.2, -0.2);
  ctx.stroke();

  ctx.restore();
}

function drawLeaf(ctx, cx, cy, size, color) {
  const s = size;
  ctx.save();
  ctx.translate(cx, cy);

  // Main leaf
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.6);
  ctx.bezierCurveTo(s * 0.6, -s * 0.5, s * 0.7, s * 0.1, s * 0.1, s * 0.6);
  ctx.bezierCurveTo(-s * 0.1, s * 0.3, -s * 0.5, -s * 0.1, 0, -s * 0.6);
  ctx.fill();

  // Center vein
  ctx.strokeStyle = color;
  ctx.globalAlpha = 0.3;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.5);
  ctx.quadraticCurveTo(s * 0.15, s * 0.1, s * 0.1, s * 0.55);
  ctx.stroke();

  // Side veins
  ctx.globalAlpha = 0.15;
  ctx.lineWidth = 1;
  for (let i = 0; i < 4; i++) {
    const t = 0.2 + i * 0.18;
    const px = t * s * 0.12;
    const py = -s * 0.4 + t * s * 0.9;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + s * 0.25, py - s * 0.05, px + s * 0.35, py - s * 0.12);
    ctx.stroke();
  }

  // Small leaf
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.12;
  ctx.beginPath();
  ctx.moveTo(-s * 0.5, -s * 0.1);
  ctx.bezierCurveTo(-s * 0.2, -s * 0.4, s * 0.05, -s * 0.3, -s * 0.15, s * 0.1);
  ctx.bezierCurveTo(-s * 0.3, -s * 0.05, -s * 0.45, 0.05, -s * 0.5, -s * 0.1);
  ctx.fill();

  // Droplet
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.moveTo(-s * 0.4, s * 0.3);
  ctx.quadraticCurveTo(-s * 0.35, s * 0.15, -s * 0.3, s * 0.3);
  ctx.quadraticCurveTo(-s * 0.35, s * 0.42, -s * 0.4, s * 0.3);
  ctx.fill();

  ctx.restore();
}

function drawCircuit(ctx, cx, cy, size, color) {
  const s = size;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2;

  // Central chip
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.roundRect(-s * 0.2, -s * 0.2, s * 0.4, s * 0.4, 4);
  ctx.fill();
  ctx.globalAlpha = 0.35;
  ctx.stroke();

  // Inner chip detail
  ctx.globalAlpha = 0.15;
  ctx.beginPath();
  ctx.roundRect(-s * 0.12, -s * 0.12, s * 0.24, s * 0.24, 2);
  ctx.fill();

  // Circuit lines from chip
  ctx.globalAlpha = 0.25;
  ctx.lineWidth = 1.5;

  // Top lines
  [-s * 0.1, 0, s * 0.1].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, -s * 0.2);
    ctx.lineTo(x, -s * 0.45);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, -s * 0.45, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Bottom lines
  [-s * 0.1, 0, s * 0.1].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, s * 0.2);
    ctx.lineTo(x, s * 0.45);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, s * 0.45, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Left lines
  [-s * 0.1, s * 0.1].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(-s * 0.2, y);
    ctx.lineTo(-s * 0.4, y);
    ctx.lineTo(-s * 0.4, y - s * 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-s * 0.4, y - s * 0.15, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Right lines
  [-s * 0.1, s * 0.1].forEach((y) => {
    ctx.beginPath();
    ctx.moveTo(s * 0.2, y);
    ctx.lineTo(s * 0.4, y);
    ctx.lineTo(s * 0.4, y + s * 0.15);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(s * 0.4, y + s * 0.15, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // Diagonal trace
  ctx.beginPath();
  ctx.moveTo(s * 0.4, -s * 0.45);
  ctx.lineTo(s * 0.55, -s * 0.45);
  ctx.lineTo(s * 0.55, -s * 0.25);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(s * 0.55, -s * 0.25, 3, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCategoryIcon(ctx, category, cx, cy, size, color) {
  switch (category) {
    case "daily-life":
      drawBook(ctx, cx, cy, size, color);
      break;
    case "culture":
      drawMasks(ctx, cx, cy, size, color);
      break;
    case "environment":
      drawLeaf(ctx, cx, cy, size, color);
      break;
    case "technology":
      drawCircuit(ctx, cx, cy, size, color);
      break;
    default:
      drawBook(ctx, cx, cy, size, color);
  }
}

function generateCover(passage) {
  const W = 600;
  const H = 240;
  const canvas = createCanvas(W, H);
  const ctx = canvas.getContext("2d");
  const theme = categoryThemes[passage.category] || categoryThemes["daily-life"];

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, theme.bg[0]);
  grad.addColorStop(1, theme.bg[1]);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Pattern
  drawPattern(ctx, theme.pattern, W, H, theme.accent);

  // Glows
  const glow1 = ctx.createRadialGradient(W * 0.7, H * 0.4, 10, W * 0.7, H * 0.4, 180);
  glow1.addColorStop(0, theme.accent + "18");
  glow1.addColorStop(1, "transparent");
  ctx.fillStyle = glow1;
  ctx.fillRect(0, 0, W, H);

  const glow2 = ctx.createRadialGradient(W * 0.25, H * 0.65, 10, W * 0.25, H * 0.65, 140);
  glow2.addColorStop(0, theme.accent + "10");
  glow2.addColorStop(1, "transparent");
  ctx.fillStyle = glow2;
  ctx.fillRect(0, 0, W, H);

  // Main category icon (large, right side)
  drawCategoryIcon(ctx, passage.category, W * 0.72, H * 0.48, 120, theme.accent);

  // Smaller floating icon (left side, decorative)
  ctx.save();
  ctx.globalAlpha = 0.5;
  drawCategoryIcon(ctx, passage.category, W * 0.15, H * 0.35, 50, theme.accent);
  ctx.restore();

  return canvas;
}

console.log("Generating reading passage covers...\n");

for (const p of passages) {
  const canvas = generateCover(p);
  const buf = canvas.toBuffer("image/png");
  const outPath = join(OUT_DIR, `${p.slug}.png`);
  writeFileSync(outPath, buf);
  console.log(`  ✓ ${p.slug}.png  (${buf.length} bytes)`);
}

console.log(`\nDone! ${passages.length} covers saved to public/images/reading/covers/`);
