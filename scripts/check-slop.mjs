#!/usr/bin/env node
// check-slop : détecte les marqueurs d'interface générée sur le RENDU, pas sur le code.
//
// Usage :
//   node scripts/check-slop.mjs <dossier | fichier.html | http://url> [options]
//     --wireframe          refuse toute couleur saturée (étape UX)
//     --mobile             vérifie aussi à 390 px : aucune page ne défile de côté
//     --captures <dossier> enregistre une capture pleine page par écran
//     --exempt a,b         lève des marqueurs (sinon lus dans esquisse/direction.md)
//     --report <fichier>   écrit le rapport JSON
//
// Codes de sortie : 0 aucun marqueur, 1 marqueur(s), 2 vérification impossible.
// Une vérification impossible n'est jamais un succès.

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

// ---------------------------------------------------------------- arguments

function parseArgs(argv) {
  const opts = { targets: [], wireframe: false, mobile: false, captures: null, exempt: [], report: null };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--wireframe") opts.wireframe = true;
    else if (a === "--mobile") opts.mobile = true;
    else if (a === "--captures") opts.captures = argv[++i];
    else if (a === "--exempt") opts.exempt = (argv[++i] || "").split(",").map((s) => s.trim()).filter(Boolean);
    else if (a === "--report") opts.report = argv[++i];
    else opts.targets.push(a);
  }
  return opts;
}

function collectTargets(inputs) {
  const out = [];
  for (const input of inputs) {
    if (/^https?:\/\//.test(input)) {
      out.push({ name: input, url: input, dir: process.cwd() });
      continue;
    }
    const abs = resolve(input);
    if (!existsSync(abs)) throw new Error("introuvable : " + input);
    if (statSync(abs).isDirectory()) {
      for (const f of readdirSync(abs).filter((f) => f.endsWith(".html")).sort()) {
        out.push({ name: f, url: pathToFileURL(join(abs, f)).href, dir: abs });
      }
    } else {
      out.push({ name: basename(abs), url: pathToFileURL(abs).href, dir: dirname(abs) });
    }
  }
  return out;
}

// Les partis pris assumés vivent dans esquisse/direction.md : un marqueur choisi
// n'est plus un marqueur, c'est une décision.
export function readExemptions(startDir) {
  let dir = startDir;
  for (let i = 0; i < 20; i++) {
    for (const candidate of [join(dir, "direction.md"), join(dir, "esquisse", "direction.md")]) {
      if (existsSync(candidate)) {
        const text = readFileSync(candidate, "utf8");
        const block = text.match(/##\s*Partis pris assum[ée]s\s*\n([\s\S]*?)(?=\n##\s|$)/i);
        if (!block) return [];
        return [...block[1].matchAll(/`([a-z-]+)`/g)].map((m) => m[1]);
      }
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return [];
}

// ---------------------------------------------------------------- couleurs

export function parseColor(str) {
  const m = String(str).match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/);
  if (!m) return null;
  let a = m[4] === undefined ? 1 : m[4].endsWith("%") ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
  return { r: +m[1], g: +m[2], b: +m[3], a };
}

export function toHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return { h, s, l };
}

function luminance({ r, g, b }) {
  const f = (c) => ((c /= 255) <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

const distance = (a, b) => Math.hypot(a.r - b.r, a.g - b.g, a.b - b.b);
const saturated = (c) => { const x = toHsl(c); return x.s > 0.45 && x.l > 0.25 && x.l < 0.8 && c.a > 0.5; };

// ---------------------------------------------------------------- collecte dans la page

function collect() {
  const all = [...document.body.querySelectorAll("*")];
  const fonts = {};
  let textTotal = 0, centered = 0, radiusBlocks = 0, shadowCards = 0, glass = 0;
  const radii = {};
  const gradients = [];
  const colors = [];

  for (const el of all) {
    const cs = getComputedStyle(el);
    if (cs.display === "none" || cs.visibility === "hidden" || !el.getClientRects().length) continue;
    const rect = el.getBoundingClientRect();

    let own = 0;
    for (const n of el.childNodes) if (n.nodeType === 3) own += n.textContent.trim().length;
    if (own) {
      const fam = cs.fontFamily.split(",")[0].replace(/["']/g, "").trim();
      fonts[fam] = (fonts[fam] || 0) + own;
      textTotal += own;
      if (cs.textAlign === "center") centered += own;
      colors.push({ c: cs.color, w: own, kind: "text" });
    }

    const hasBg = !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor);
    const hasBorder = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== "none";
    if (hasBg) colors.push({ c: cs.backgroundColor, w: rect.width * rect.height, kind: "bg" });
    if (hasBorder) colors.push({ c: cs.borderTopColor, w: rect.width, kind: "border" });

    if ((hasBg || hasBorder) && rect.width > 40 && rect.height > 24 && parseFloat(cs.borderTopLeftRadius) > 0) {
      radii[cs.borderTopLeftRadius] = (radii[cs.borderTopLeftRadius] || 0) + 1;
      radiusBlocks++;
      if (cs.boxShadow !== "none") shadowCards++;
    }
    if (cs.backgroundImage.includes("gradient")) gradients.push(cs.backgroundImage);
    const bf = cs.backdropFilter || cs.webkitBackdropFilter || "";
    if (bf.includes("blur")) glass++;
  }

  // Badge pilule : petit élément très arrondi posé juste avant le titre principal.
  let pill = null;
  const h1 = document.querySelector("h1");
  const prev = h1 && h1.previousElementSibling;
  if (prev) {
    const cs = getComputedStyle(prev), r = prev.getBoundingClientRect();
    if (r.height > 0 && r.height < 44 && parseFloat(cs.borderTopLeftRadius) >= r.height / 2 - 1 && prev.innerText.trim().length < 50) {
      pill = prev.innerText.trim();
    }
  }

  // Trio d'icônes : un parent à trois enfants, chacun icône + titre + phrase.
  let trio = 0;
  for (const el of all) {
    const kids = [...el.children];
    if (kids.length !== 3) continue;
    if (kids.every((k) => k.querySelector("svg, img, i, [class*=icon]") && k.querySelector("h2, h3, h4") && k.querySelector("p"))) trio++;
  }

  const bodyStyle = getComputedStyle(document.body);
  const htmlStyle = getComputedStyle(document.documentElement);
  const bodyBg = /rgba\(0, 0, 0, 0\)|transparent/.test(bodyStyle.backgroundColor) ? htmlStyle.backgroundColor : bodyStyle.backgroundColor;
  const heading = document.querySelector("h1, h2");

  return {
    fonts, textTotal, centered, radii, radiusBlocks, shadowCards, glass, gradients, colors, bodyBg, pill, trio,
    headingFont: heading ? getComputedStyle(heading).fontFamily : "",
    text: document.body.innerText,
    html: document.documentElement.outerHTML,
  };
}

// ---------------------------------------------------------------- règles

const DEFAULT_FONTS = [
  "inter", "roboto", "arial", "helvetica", "helvetica neue", "system-ui", "-apple-system", "segoe ui",
  "poppins", "montserrat", "open sans", "space grotesk", "geist", "sans-serif", "ui-sans-serif", "lato",
];

export function analyse(data, { wireframe = false, exempt = [] } = {}) {
  const hits = [];
  const warnings = [];
  const add = (id, detail) => { if (!exempt.includes(id)) hits.push({ id, detail }); };

  const parsed = data.colors.map((x) => ({ ...x, rgb: parseColor(x.c) })).filter((x) => x.rgb && x.rgb.a > 0.05);
  const bg = parseColor(data.bodyBg) || { r: 255, g: 255, b: 255, a: 1 };

  if (wireframe) {
    const coloured = parsed.filter((x) => toHsl(x.rgb).s > 0.12 && toHsl(x.rgb).l > 0.08 && toHsl(x.rgb).l < 0.95);
    const gradientColours = data.gradients.flatMap((g) => [...g.matchAll(/rgba?\([^)]*\)/g)].map((m) => parseColor(m[0]))).filter((c) => c && toHsl(c).s > 0.12);
    if (coloured.length || gradientColours.length) {
      const sample = [...new Set(coloured.map((x) => x.c))].slice(0, 3).join(", ");
      add("couleur-en-wireframe", "un wireframe est en niveaux de gris, trouvé : " + (sample || "dégradé coloré"));
    }
  } else {
    const dominant = Object.entries(data.fonts).sort((a, b) => b[1] - a[1])[0];
    if (dominant && DEFAULT_FONTS.includes(dominant[0].toLowerCase())) {
      add("police-defaut", "face dominante « " + dominant[0] + " », sur " + Math.round((dominant[1] / data.textTotal) * 100) + " % du texte");
    }
  }

  const accents = parsed.filter((x) => x.kind !== "border" && saturated(x.rgb));
  const hues = [...new Set(accents.map((x) => Math.round(toHsl(x.rgb).h / 30)))];

  const cream = { r: 244, g: 241, b: 234 };
  const serifHeading = /serif/i.test(data.headingFont) && !/sans-serif/i.test(data.headingFont);
  // La terre cuite est un orange rompu. Un orange fluo (parachute de palier,
  // signalétique) est saturé au-delà de 0,8 : c'est une autre couleur.
  const terracotta = accents.some((x) => { const h = toHsl(x.rgb); return h.h >= 5 && h.h <= 28 && h.l < 0.62 && h.s < 0.8; });
  // Le crème est un blanc CHAUD : rouge au-dessus du bleu. Un blanc froid à la
  // même distance euclidienne n'a rien du cliché, et le premier essai réel
  // (un fond #EFF4F5) l'a pris à tort.
  const warm = bg.r >= bg.b + 5;
  if (warm && distance(bg, cream) < 18 && (serifHeading || terracotta)) {
    add("creme-terracotta", "fond " + data.bodyBg + (terracotta ? ", accent terracotta" : ", titrage serif"));
  }

  if (luminance(bg) < 0.03 && hues.length === 1) {
    const h = toHsl(accents[0].rgb).h;
    if ((h >= 65 && h <= 160) || h <= 22 || h >= 345) add("noir-acide", "fond presque noir et un seul accent " + accents[0].c);
  }

  for (const g of data.gradients) {
    const cs = [...g.matchAll(/rgba?\([^)]*\)/g)].map((m) => parseColor(m[0])).filter(Boolean);
    if (cs[0] && toHsl(cs[0]).s > 0.3 && toHsl(cs[0]).h >= 240 && toHsl(cs[0]).h <= 310) {
      add("degrade-violet", "dégradé qui part de " + `rgb(${cs[0].r}, ${cs[0].g}, ${cs[0].b})`);
      break;
    }
  }

  if (data.glass > 0) add("verre-depoli", data.glass + " élément(s) en backdrop-filter: blur");

  const radiusKinds = Object.keys(data.radii);
  if (data.radiusBlocks >= 8 && radiusKinds.length === 1) {
    add("rayon-unique", "les " + data.radiusBlocks + " blocs arrondis ont tous " + radiusKinds[0]);
  }
  if (data.shadowCards > 8) add("cartes-ombrees", data.shadowCards + " blocs arrondis et ombrés");
  if (data.textTotal > 200 && data.centered / data.textTotal > 0.5) {
    add("tout-centre", Math.round((data.centered / data.textTotal) * 100) + " % du texte centré");
  }
  if (data.pill) add("badge-pilule", "« " + data.pill + " » au-dessus du titre");
  if (data.trio) add("trio-icones", data.trio + " rangée(s) de trois colonnes icône, titre, phrase");

  if (/<h[1-4][^>]*>\s*(?:<[^>]+>\s*)*[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(data.html)) {
    add("emoji-section", "emoji en tête de titre");
  }
  const hollow = data.text.match(/transforme[zr]?\s+(votre|vos|ta|tes)\b|lib[ée]re[zr]?\s+(le|votre|ton)\s+potentiel|sans\s+effort|r[ée]volutionn(aire|ez)|unlock\s+(the|your)|transform\s+your|effortless(ly)?|seamless(ly)?|supercharge|next-level/i);
  if (hollow) add("formule-creuse", "« " + hollow[0] + " »");
  const fake = data.text.match(/lorem\s+ipsum|john\s+doe|jane\s+doe|votre\s+texte\s+ici|placeholder\s+text|acme\s+(corp|inc)/i);
  if (fake) add("faux-contenu", "« " + fake[0] + " »");

  const numbered = data.text.match(/(^|\n)\s*0[1-9]\s*(\n|$)/g) || [];
  if (numbered.length >= 3) warnings.push("numérotation 01 / 02 / 03 : à garder seulement si le contenu est une vraie séquence");

  return { hits, warnings };
}

// ---------------------------------------------------------------- exécution

async function loadPlaywright() {
  try {
    const mod = await import("playwright");
    return mod.chromium ? mod : null;
  } catch {
    return null;
  }
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (!opts.targets.length) {
    console.error("usage : check-slop.mjs <dossier | fichier.html | url> [--wireframe] [--captures dossier] [--exempt a,b] [--report fichier]");
    process.exit(2);
  }

  let targets;
  try {
    targets = collectTargets(opts.targets);
  } catch (err) {
    console.error("Esquisse : " + err.message);
    process.exit(2);
  }
  if (!targets.length) {
    console.error("Esquisse : aucun fichier .html à vérifier");
    process.exit(2);
  }

  const pw = await loadPlaywright();
  if (!pw) {
    console.error("Esquisse : vérification impossible, le navigateur n'est pas installé.");
    console.error("  Lance `npm run browser:install` dans le dossier du plugin.");
    console.error("  Les marqueurs se mesurent sur le rendu : rien n'a été vérifié, ce n'est pas un succès.");
    process.exit(2);
  }

  if (opts.captures) mkdirSync(resolve(opts.captures), { recursive: true });
  const browser = await pw.chromium.launch();
  const results = [];
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    for (const t of targets) {
      const page = await context.newPage();
      try {
        await page.goto(t.url, { waitUntil: "networkidle", timeout: 20000 });
      } catch {
        await page.goto(t.url, { waitUntil: "load", timeout: 20000 });
      }
      await page.evaluate(() => document.fonts.ready);
      const data = await page.evaluate(collect);
      const exempt = [...opts.exempt, ...readExemptions(t.dir)];
      const { hits, warnings } = analyse(data, { wireframe: opts.wireframe, exempt });
      let capture = null;
      if (opts.captures) {
        capture = join(resolve(opts.captures), t.name.replace(/[^\w.-]+/g, "_").replace(/\.html?$/, "") + ".png");
        await page.screenshot({ path: capture, fullPage: true });
      }
      // Au format téléphone, la page ne doit jamais défiler de côté. Un tableau
      // dans son propre conteneur défilant est permis, la page entière non.
      if (opts.mobile) {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(150);
        const width = await page.evaluate(() => document.documentElement.scrollWidth);
        if (width > 391 && !exempt.includes("debordement-telephone")) {
          hits.push({ id: "debordement-telephone", detail: "la page fait " + width + " px de large sur un écran de 390" });
        }
        if (opts.captures) {
          await page.screenshot({ path: capture.replace(/\.png$/, "-telephone.png"), fullPage: true });
        }
      }
      results.push({ name: t.name, hits, warnings, exempt, capture });
      await page.close();
    }
  } finally {
    await browser.close();
  }

  let failed = 0;
  for (const r of results) {
    const status = r.hits.length ? "ÉCHEC" : "ok";
    console.log(`${status.padEnd(5)} ${r.name}`);
    for (const h of r.hits) console.log(`      ✗ ${h.id} : ${h.detail}`);
    for (const w of r.warnings) console.log(`      ! ${w}`);
    if (r.exempt.length) console.log(`      partis pris assumés : ${r.exempt.join(", ")}`);
    if (r.capture) console.log(`      capture : ${r.capture}`);
    if (r.hits.length) failed++;
  }
  console.log(`\n${results.length - failed} / ${results.length} écran(s) sans marqueur${opts.wireframe ? " (mode wireframe)" : ""}`);
  console.log("Le script attrape les réflexes, pas l'absence d'idée : applique le test de substitution sur les captures.");

  if (opts.report) writeFileSync(resolve(opts.report), JSON.stringify(results, null, 2));
  process.exit(failed ? 1 : 0);
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"))) {
  main();
}
