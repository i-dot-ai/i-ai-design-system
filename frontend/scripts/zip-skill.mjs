// Zips the prototyping skill (.agents/skills/iai-prototype) into
// public/downloads/ so it can be offered as a download on the docs site.
//
// Runs as part of `sync:assets` (before dev and build), mirroring the
// sync:styles/sync:scripts pattern. The output .zip is git-ignored (*.zip in
// the root .gitignore), so it is a build artifact, never committed.
//
// Uses `archiver` (Node) rather than the system `zip` so it behaves identically
// locally and in the node:22-alpine Docker build, which has no `zip` binary.

import { createWriteStream, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ZipArchive } from "archiver";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// Source skill folder and the name it should keep inside the zip.
const skillName = "iai-prototype";
const srcDir = join(root, ".agents", "skills", skillName);
const outDir = join(root, "public", "downloads");
const outFile = join(outDir, `${skillName}-skill.zip`);

if (!existsSync(srcDir)) {
    console.error(`zip-skill: source folder not found: ${srcDir}`);
    process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const output = createWriteStream(outFile);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on("close", () => {
    console.log(`zip-skill: wrote ${outFile} (${archive.pointer()} bytes)`);
});

archive.on("warning", (err) => {
    if (err.code === "ENOENT") console.warn(err);
    else throw err;
});

archive.on("error", (err) => {
    throw err;
});

archive.pipe(output);
// Keep a top-level "iai-prototype/" folder inside the archive so it unzips
// straight into a drop-in skill directory.
archive.directory(srcDir, skillName);
await archive.finalize();
