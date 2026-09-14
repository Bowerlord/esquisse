// Hook PreToolUse : pas de code applicatif tant que les maquettes ne sont pas validées.
//
// Opt-in : seuls les projets qui contiennent un dossier `esquisse/` sont gouvernés.
// Un plugin installé ne doit jamais bloquer les autres projets de la machine.

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve, sep, extname } from "node:path";

const CODE = new Set([
  ".tsx", ".jsx", ".ts", ".js", ".mjs", ".vue", ".svelte", ".astro",
  ".css", ".scss", ".sass", ".less", ".html", ".htm", ".php", ".erb", ".twig",
]);

function readInput() {
  try {
    return JSON.parse(readFileSync(0, "utf8") || "{}");
  } catch {
    return {};
  }
}

function findProjectRoot(start) {
  let dir = start;
  for (let i = 0; i < 40; i++) {
    if (existsSync(join(dir, "esquisse"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
  return null;
}

export function decide(filePath) {
  if (!filePath) return { allow: true };
  const abs = resolve(filePath);
  if (!CODE.has(extname(abs).toLowerCase())) return { allow: true };

  const root = findProjectRoot(dirname(abs));
  if (!root) return { allow: true };

  // Tout ce qui vit dans esquisse/ est du travail de conception : wireframes,
  // directions et maquettes sont justement des fichiers HTML et CSS.
  if (abs.startsWith(join(root, "esquisse") + sep)) return { allow: true };

  const validation = join(root, "esquisse", "validation.md");
  const text = existsSync(validation) ? readFileSync(validation, "utf8") : "";
  if (/^\s*maquettes\s*:\s*valid[ée]es?\b/im.test(text)) return { allow: true };

  return {
    allow: false,
    reason:
      "Esquisse : écriture refusée, les maquettes ne sont pas validées.\n" +
      "  Fichier : " + abs + "\n" +
      "  Le code applicatif s'écrit après /esquisse:maquettes, quand l'utilisateur a validé.\n" +
      "  La validation s'inscrit dans esquisse/validation.md : `maquettes: validées le <date>`.",
  };
}

if (import.meta.url === `file://${process.argv[1].replace(/\\/g, "/")}` || process.argv[1]?.endsWith("guard.mjs")) {
  const input = readInput();
  const filePath = input?.tool_input?.file_path || input?.tool_input?.path;
  const verdict = decide(filePath);
  if (!verdict.allow) {
    process.stderr.write(verdict.reason + "\n");
    process.exit(2);
  }
  process.exit(0);
}
