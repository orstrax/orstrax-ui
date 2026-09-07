import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const src = join(root, "theme", "orstrax.css");
const versionDir = join(root, "public", "theme", `v${version}`);
const currentDir = join(root, "public", "theme", "current");

mkdirSync(versionDir, { recursive: true });
mkdirSync(currentDir, { recursive: true });
copyFileSync(src, join(versionDir, "orstrax.css"));
copyFileSync(src, join(currentDir, "orstrax.css"));
copyFileSync(src, join(root, "src", "styles.css"));

console.log(`Published theme v${version} → public/theme/v${version}/orstrax.css and public/theme/current/orstrax.css`);
