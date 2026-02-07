const path = require("path");
const fs = require("fs");
const { spawnSync } = require("child_process");

if (process.platform !== "win32") {
  process.exit(0);
}

const appBuilderPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "app-builder-bin",
  "win",
  "x64",
  "app-builder.exe"
);

if (!fs.existsSync(appBuilderPath)) {
  console.warn(
    "app-builder.exe not found. Re-run npm install or reinstall dependencies before building."
  );
  process.exit(0);
}

const unblock = spawnSync(
  "powershell",
  [
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-Command",
    `Get-Item -LiteralPath '${appBuilderPath}' | Unblock-File`,
  ],
  { stdio: "inherit" }
);

if (unblock.status !== 0) {
  console.warn(
    "Failed to unblock app-builder.exe. If builds still fail, ensure the Visual C++ runtime is installed and your antivirus is not quarantining the file."
  );
}
