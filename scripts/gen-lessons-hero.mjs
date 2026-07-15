/**
 * Generate hero banner for Lessons page.
 * Night sky with blackboard + grammar symbols.
 * Usage: node scripts/gen-lessons-hero.mjs
 */
import { createCanvas } from "@napi-rs/canvas";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

const OUT_DIR = join(import.meta.dirname, "..", "public", "images", "lessons");
mkdirSync(OUT_DIR, { recursive: true });

const W = 1400;
const H = 420;
const canvas = createCanvas(W, H);
const ctx = canvas.getContext("2d");

// Night sky gradient
const skyGrad = ctx.createLinearGradient(0, 0, W, H);
skyGrad.addColorStop(0, "#060e1f");
skyGrad.addColorStop(0.4, "#0c1a3a");
skyGrad.addColorStop(1, "#1a1040");
ctx.fillStyle = skyGrad;
ctx.fillRect(0, 0, W, H);

// Stars
ctx.fillStyle = "#ffffff";
for (let i = 0; i < 80; i++) {
  const x = Math.random() * W;
  const y = Math.random() * H * 0.7;
  const r = Math.random() * 1.5 + 0.5;
  ctx.globalAlpha = Math.random() * 0.6 + 0.2;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}
ctx.globalAlpha = 1;

// Moon
const moonGrad = ctx.createRadialGradient(W * 0.55, 60, 5, W * 0.55, 60, 35);
moonGrad.addColorStop(0, "#fef3c7");
moonGrad.addColorStop(0.7, "#fbbf24");
moonGrad.addColorStop(1, "#f59e0b00");
ctx.fillStyle = moonGrad;
ctx.beginPath();
ctx.arc(W * 0.55, 60, 28, 0, Math.PI * 2);
ctx.fill();

// Moon glow
const moonGlow = ctx.createRadialGradient(W * 0.55, 60, 20, W * 0.55, 60, 100);
moonGlow.addColorStop(0, "rgba(251,191,36,0.15)");
moonGlow.addColorStop(1, "transparent");
ctx.fillStyle = moonGlow;
ctx.fillRect(0, 0, W, H);

// Clouds
ctx.globalAlpha = 0.04;
ctx.fillStyle = "#94a3b8";
ctx.beginPath();
ctx.ellipse(200, 100, 120, 30, 0, 0, Math.PI * 2);
ctx.fill();
ctx.beginPath();
ctx.ellipse(W - 300, 140, 150, 25, 0, 0, Math.PI * 2);
ctx.fill();
ctx.globalAlpha = 1;

// Warm orange glow at bottom
const warmGlow = ctx.createRadialGradient(W * 0.7, H, 50, W * 0.7, H, 300);
warmGlow.addColorStop(0, "rgba(249,115,22,0.12)");
warmGlow.addColorStop(1, "transparent");
ctx.fillStyle = warmGlow;
ctx.fillRect(0, 0, W, H);

// Blackboard (right-center area)
const bbX = W * 0.52;
const bbY = H * 0.22;
const bbW = 320;
const bbH = 220;

// Board shadow
ctx.fillStyle = "rgba(0,0,0,0.3)";
ctx.beginPath();
ctx.roundRect(bbX + 6, bbY + 6, bbW, bbH, 8);
ctx.fill();

// Board frame (wooden border)
ctx.fillStyle = "#5c3d1e";
ctx.beginPath();
ctx.roundRect(bbX - 8, bbY - 8, bbW + 16, bbH + 16, 12);
ctx.fill();

// Inner frame
ctx.fillStyle = "#7c5530";
ctx.beginPath();
ctx.roundRect(bbX - 4, bbY - 4, bbW + 8, bbH + 8, 10);
ctx.fill();

// Green board surface
const boardGrad = ctx.createLinearGradient(bbX, bbY, bbX + bbW, bbY + bbH);
boardGrad.addColorStop(0, "#1a3a2a");
boardGrad.addColorStop(1, "#163025");
ctx.fillStyle = boardGrad;
ctx.beginPath();
ctx.roundRect(bbX, bbY, bbW, bbH, 6);
ctx.fill();

// Chalk text on blackboard
ctx.fillStyle = "#e2e8f0";
ctx.globalAlpha = 0.85;

ctx.font = "bold 32px sans-serif";
ctx.fillText("ABC", bbX + 30, bbY + 50);

ctx.font = "22px sans-serif";
ctx.globalAlpha = 0.7;
ctx.fillText("Verb", bbX + 160, bbY + 48);

ctx.font = "18px sans-serif";
ctx.fillText("Noun", bbX + 240, bbY + 48);

ctx.font = "bold 20px sans-serif";
ctx.globalAlpha = 0.75;
ctx.fillText("Present Simple", bbX + 30, bbY + 95);

ctx.font = "16px sans-serif";
ctx.globalAlpha = 0.6;
ctx.fillText("S + V(s/es) + O", bbX + 30, bbY + 125);

ctx.font = "italic 16px sans-serif";
ctx.globalAlpha = 0.5;
ctx.fillText("She plays tennis.", bbX + 30, bbY + 155);

// Decorative chalk marks
ctx.strokeStyle = "#e2e8f0";
ctx.lineWidth = 1.5;
ctx.globalAlpha = 0.3;

// Underline
ctx.beginPath();
ctx.moveTo(bbX + 30, bbY + 100);
ctx.lineTo(bbX + 220, bbY + 100);
ctx.stroke();

// Checkmark
ctx.globalAlpha = 0.5;
ctx.strokeStyle = "#4ade80";
ctx.lineWidth = 2.5;
ctx.beginPath();
ctx.moveTo(bbX + 240, bbY + 115);
ctx.lineTo(bbX + 252, bbY + 128);
ctx.lineTo(bbX + 275, bbY + 100);
ctx.stroke();

// Star
ctx.fillStyle = "#fbbf24";
ctx.globalAlpha = 0.6;
ctx.font = "24px sans-serif";
ctx.fillText("★", bbX + bbW - 50, bbY + bbH - 20);

ctx.globalAlpha = 1;

// Chalk tray
ctx.fillStyle = "#5c3d1e";
ctx.beginPath();
ctx.roundRect(bbX + 20, bbY + bbH + 4, bbW - 40, 12, 4);
ctx.fill();

// Chalk pieces
ctx.fillStyle = "#f1f5f9";
ctx.beginPath();
ctx.roundRect(bbX + 40, bbY + bbH + 6, 30, 6, 3);
ctx.fill();
ctx.fillStyle = "#fbbf24";
ctx.beginPath();
ctx.roundRect(bbX + 80, bbY + bbH + 7, 22, 5, 3);
ctx.fill();
ctx.fillStyle = "#fb7185";
ctx.beginPath();
ctx.roundRect(bbX + 110, bbY + bbH + 6, 25, 6, 3);
ctx.fill();

// Bottom fog/gradient
const fogGrad = ctx.createLinearGradient(0, H - 60, 0, H);
fogGrad.addColorStop(0, "transparent");
fogGrad.addColorStop(1, "rgba(6,14,31,0.5)");
ctx.fillStyle = fogGrad;
ctx.fillRect(0, 0, W, H);

const buf = canvas.toBuffer("image/png");
writeFileSync(join(OUT_DIR, "hero-banner.png"), buf);
console.log(`✓ lessons/hero-banner.png (${buf.length} bytes)`);
