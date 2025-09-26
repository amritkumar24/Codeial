// config/middleware.js ya helpers/revHelper.js
const fs = require('fs');
const path = require('path');

let manifest = {};
const manifestPath = path.join(__dirname, '../public/assets/manifest.json');

// Load manifest once
if (fs.existsSync(manifestPath)) {
    manifest = JSON.parse(fs.readFileSync(manifestPath));
}

// Helper to get revved filename
module.exports = function(assetName) {
    return manifest[assetName] || assetName;
};
