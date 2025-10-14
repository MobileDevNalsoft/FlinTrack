import { copyFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const dist = join(process.cwd(), "dist");
try {
  const index = join(dist, "index.html");
  const notFound = join(dist, "404.html");
  if (existsSync(index)) {
    copyFileSync(index, notFound);
    // Create .nojekyll to avoid Jekyll processing on GitHub Pages
    writeFileSync(join(dist, ".nojekyll"), "");
    console.log("Prepared GitHub Pages artifacts: 404.html and .nojekyll");
  } else {
    console.warn("dist/index.html not found - did the build complete?");
  }
} catch (e) {
  console.error("Error preparing GitHub Pages artifacts:", e);
  process.exitCode = 1;
}


