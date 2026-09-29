// Ajusta o AndroidManifest.xml gerado pelo `cap add android`.
// Idempotente: pode rodar quantas vezes quiser.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const file = "android/app/src/main/AndroidManifest.xml";
if (!existsSync(file)) {
  console.error("AndroidManifest.xml não encontrado — rode `npx cap add android` antes.");
  process.exit(1);
}
let xml = readFileSync(file, "utf8");
let changed = false;

if (!xml.includes('xmlns:tools=')) {
  xml = xml.replace("<manifest ", '<manifest xmlns:tools="http://schemas.android.com/tools" ');
  changed = true;
}

const block = `
    <!-- AUK-A: BLE -->
    <uses-feature android:name="android.hardware.bluetooth_le" android:required="true" />
    <uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" tools:targetApi="s" />
`;
if (!xml.includes("<!-- AUK-A: BLE -->")) {
  xml = xml.replace("<application", block + "\n    <application");
  changed = true;
}

if (changed) {
  writeFileSync(file, xml);
  console.log("AndroidManifest.xml ajustado (BLE).");
} else {
  console.log("AndroidManifest.xml já estava ajustado.");
}
