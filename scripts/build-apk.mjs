// Gera o APK completo: web -> projeto Android -> ícones -> Gradle -> dist/
// Requisitos: Node 22+, JDK 21, Android SDK (ANDROID_HOME).
import { execSync } from "node:child_process";
import { existsSync, mkdirSync, copyFileSync, readFileSync } from "node:fs";

const run = (cmd, opts = {}) => {
  console.log("\n> " + cmd);
  execSync(cmd, { stdio: "inherit", ...opts });
};

run("npm run build:web");
if (!existsSync("android")) run("npx cap add android");
run("node scripts/patch-android.mjs");
run("npx capacitor-assets generate --android");
run("npx cap sync android");

const gradlew = process.platform === "win32" ? "gradlew.bat" : "./gradlew";
run(`${gradlew} assembleDebug`, { cwd: "android" });

const apk = "android/app/build/outputs/apk/debug/app-debug.apk";
const version = JSON.parse(readFileSync("package.json", "utf8")).version;
mkdirSync("dist", { recursive: true });
const out = `dist/AUK-A-v${version}.apk`;
copyFileSync(apk, out);
console.log("\nAPK pronto: " + out);
