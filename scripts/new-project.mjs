#!/usr/bin/env node
// Scaffolds a new project page:
//   1. Creates src/routes/projects/<Name>.jsx
//   2. Adds an import + route to src/app/main.jsx
//   3. Adds an entry to the thumbnails array in src/app/App.jsx
//   4. Creates a media folder at public/media/<folder>
//
// Usage:
//   node scripts/new-project.mjs "My Cool Project"
//   node scripts/new-project.mjs "My Cool Project" --name CoolProj --route cool --media cool
//
// Options:
//   --name  <PascalCase>   component/file name (default: title in PascalCase)
//   --route <kebab-case>   route path, no leading slash (default: title in kebab-case)
//   --media <folder>       media folder name (default: title in kebab-case)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const projectsDir = path.join(root, "src", "routes", "projects");
const mainPath = path.join(root, "src", "app", "main.jsx");
const appPath = path.join(root, "src", "app", "App.jsx");

function fail(msg) {
  console.error(`Error: ${msg}`);
  process.exit(1);
}

// --- parse args ---
const args = process.argv.slice(2);
let title = null;
let name = null;
let route = null;
let media = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--name") name = args[++i];
  else if (args[i] === "--route") route = args[++i];
  else if (args[i] === "--media") media = args[++i];
  else if (title === null) title = args[i];
  else fail(`unexpected argument "${args[i]}" (did you forget quotes around the title?)`);
}

if (!title) {
  fail('missing title. Usage: node scripts/new-project.mjs "My Project Title" [--name Name] [--route route]');
}

const words = title
  .replace(/['’]/g, "")
  .replace(/[^a-zA-Z0-9]+/g, " ")
  .trim()
  .split(/\s+/);
if (words.length === 0 || words[0] === "") fail("title has no usable characters");

if (!name) {
  name = words.map((w) => w[0].toUpperCase() + w.slice(1)).join("");
}
const kebab = words.join("-").toLowerCase();
if (!route) route = kebab;
route = route.replace(/^\//, "");
if (!media) media = kebab;

if (!/^[A-Za-z][A-Za-z0-9]*$/.test(name)) fail(`invalid component name "${name}"`);
if (!/^[A-Za-z0-9._-]+$/.test(media)) fail(`invalid media folder name "${media}"`);

const componentPath = path.join(projectsDir, `${name}.jsx`);
const mediaDir = path.join(root, "public", "media", media);
const jsTitle = title.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

// --- preflight checks ---
if (fs.existsSync(componentPath)) fail(`${path.relative(root, componentPath)} already exists`);

let main = fs.readFileSync(mainPath, "utf8");
let app = fs.readFileSync(appPath, "utf8");

if (main.includes(`import ${name} `)) fail(`main.jsx already imports "${name}"`);
if (main.includes(`path: "/${route}"`)) fail(`route "/${route}" already exists in main.jsx`);

// --- 1. component file ---
const component = `import ProjectPage from "../../components/ProjectPage";

export default function ${name}() {
  return (
    <ProjectPage title="${jsTitle}">
      <p>TODO: write about this project.</p>
    </ProjectPage>
  );
}
`;
fs.writeFileSync(componentPath, component);

// --- 2. main.jsx: import + route ---
// insert import after the last existing import line
const importLines = [...main.matchAll(/^import .*;$/gm)];
if (importLines.length === 0) fail("couldn't find any import lines in main.jsx");
const lastImport = importLines[importLines.length - 1];
const importInsertAt = lastImport.index + lastImport[0].length;
main =
  main.slice(0, importInsertAt) +
  `\nimport ${name} from "../routes/projects/${name}.jsx";` +
  main.slice(importInsertAt);

// insert route before the closing "]);" of the router array
const routerClose = main.indexOf("]);");
if (routerClose === -1) fail('couldn\'t find "]);" closing the router array in main.jsx');
const routeEntry = `  {\n    path: "/${route}",\n    element: <${name} />,\n  },\n`;
main = main.slice(0, routerClose) + routeEntry + main.slice(routerClose);

fs.writeFileSync(mainPath, main);

// --- 3. App.jsx: thumbnail entry (appended at the bottom of the array) ---
const thumbsMarker = "const thumbnails = [";
const thumbsAt = app.indexOf(thumbsMarker);
if (thumbsAt === -1) fail('couldn\'t find "const thumbnails = [" in App.jsx');
const thumbsClose = app.indexOf("];", thumbsAt);
if (thumbsClose === -1) fail('couldn\'t find "];" closing the thumbnails array in App.jsx');
const thumbEntry = `  {
      title: "${jsTitle}",
      route: "/${route}",
      image: "/media/${media}/thumbnail.png", // TODO: add a thumbnail image
      badges: [], // TODO: add badges
    },
  `;
app = app.slice(0, thumbsClose) + thumbEntry + app.slice(thumbsClose);

fs.writeFileSync(appPath, app);

// --- 4. media folder ---
if (fs.existsSync(mediaDir)) {
  console.warn(`Note: ${path.relative(root, mediaDir)} already exists, skipping`);
} else {
  fs.mkdirSync(mediaDir);
}

console.log(`Created ${path.relative(root, componentPath)}`);
console.log(`Added import and route "/${route}" to src/app/main.jsx`);
console.log(`Added thumbnail entry (end of list) to src/app/App.jsx`);
console.log(`Created media folder ${path.relative(root, mediaDir)}`);
console.log("\nTODO: set the thumbnail image and badges in App.jsx");
