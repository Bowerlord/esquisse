import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { decide } from "../scripts/guard.mjs";
import { analyse, parseColor, toHsl } from "../scripts/check-slop.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const script = join(here, "..", "scripts", "check-slop.mjs");

// ------------------------------------------------------------ hook

test("le hook ignore les projets sans dossier esquisse", () => {
  const dir = mkdtempSync(join(tmpdir(), "esq-"));
  assert.equal(decide(join(dir, "src", "App.tsx")).allow, true);
});

test("le hook refuse le code tant que les maquettes ne sont pas validées", () => {
  const dir = mkdtempSync(join(tmpdir(), "esq-"));
  mkdirSync(join(dir, "esquisse"));
  writeFileSync(join(dir, "esquisse", "validation.md"), "ux: validée le 2026-09-14\n");
  assert.equal(decide(join(dir, "src", "App.tsx")).allow, false);
});

test("le hook laisse passer le travail de conception dans esquisse/", () => {
  const dir = mkdtempSync(join(tmpdir(), "esq-"));
  mkdirSync(join(dir, "esquisse"));
  assert.equal(decide(join(dir, "esquisse", "maquettes", "liste.html")).allow, true);
});

test("le hook laisse passer ce qui n'est pas du code", () => {
  const dir = mkdtempSync(join(tmpdir(), "esq-"));
  mkdirSync(join(dir, "esquisse"));
  assert.equal(decide(join(dir, "README.md")).allow, true);
});

test("le hook autorise le code après validation des maquettes", () => {
  const dir = mkdtempSync(join(tmpdir(), "esq-"));
  mkdirSync(join(dir, "esquisse"));
  writeFileSync(join(dir, "esquisse", "validation.md"), "maquettes: validées le 2026-09-14\n");
  assert.equal(decide(join(dir, "src", "App.tsx")).allow, true);
});

// ------------------------------------------------------------ règles, sans navigateur

const base = { fonts: { Newsreader: 300 }, textTotal: 300, centered: 0, radii: {}, radiusBlocks: 0, shadowCards: 0, glass: 0, gradients: [], colors: [], bodyBg: "rgb(255, 255, 255)", pill: null, trio: 0, headingFont: "Newsreader", text: "", html: "" };

test("parseColor et toHsl lisent une couleur calculée", () => {
  const c = parseColor("rgba(139, 92, 246, 0.5)");
  assert.equal(c.a, 0.5);
  assert.ok(Math.abs(toHsl(c).h - 258) < 2);
});

test("le noir avec un seul accent acide est détecté", () => {
  const data = { ...base, bodyBg: "rgb(10, 10, 10)", colors: [{ c: "rgb(163, 255, 18)", w: 40, kind: "text" }] };
  assert.ok(analyse(data).hits.some((h) => h.id === "noir-acide"));
});

test("un parti pris assumé lève le marqueur", () => {
  const data = { ...base, bodyBg: "rgb(10, 10, 10)", colors: [{ c: "rgb(163, 255, 18)", w: 40, kind: "text" }] };
  assert.equal(analyse(data, { exempt: ["noir-acide"] }).hits.length, 0);
});

test("le mode wireframe refuse la couleur", () => {
  const data = { ...base, colors: [{ c: "rgb(13, 92, 115)", w: 40, kind: "text" }] };
  assert.ok(analyse(data, { wireframe: true }).hits.some((h) => h.id === "couleur-en-wireframe"));
});

// ------------------------------------------------------------ bout en bout, navigateur réel

test("la fixture pleine de réflexes échoue sur les bons marqueurs", () => {
  const run = spawnSync(process.execPath, [script, join(here, "fixtures", "slop.html")], { encoding: "utf8" });
  if (run.status === 2) return; // navigateur absent : le test ne peut rien affirmer
  assert.equal(run.status, 1, run.stdout + run.stderr);
  for (const id of ["police-defaut", "degrade-violet", "verre-depoli", "rayon-unique", "cartes-ombrees", "tout-centre", "badge-pilule", "trio-icones", "formule-creuse", "faux-contenu"]) {
    assert.match(run.stdout, new RegExp(id), "marqueur attendu : " + id);
  }
});

test("la fixture sobre passe", () => {
  const run = spawnSync(process.execPath, [script, join(here, "fixtures", "sobre.html")], { encoding: "utf8" });
  if (run.status === 2) return;
  assert.equal(run.status, 0, run.stdout + run.stderr);
});
