#!/usr/bin/env node
// .github/scripts/inject-labels.js
// Reads .github/labels.yml and exports label arrays for workflows

const fs = require("fs");
const yaml = require("js-yaml");
const path = require("path");

// Read labels.yml
const labelsPath = path.join(__dirname, "..", "labels.yml");
const labelsYaml = fs.readFileSync(labelsPath, "utf8");
const config = yaml.load(labelsYaml);

// Build label arrays
const STATUS_LABELS = config.status.labels.map(
  (l) => `${config.status.prefix}${l}`,
);
const PRIORITY_LABELS = config.priority.labels.map(
  (l) => `${config.priority.prefix}${l}`,
);
const TYPE_LABELS = config.type.labels.map((l) => `${config.type.prefix}${l}`);
const ESTIMATE_LABELS = config.estimate.labels.map(
  (l) => `${config.estimate.prefix}${l}`,
);

// Build transition rules object
const TRANSITION_RULES = {};
for (const [from, toArray] of Object.entries(config.status.transitions)) {
  TRANSITION_RULES[`${config.status.prefix}${from}`] = toArray.map(
    (t) => `${config.status.prefix}${t}`,
  );
}

// Get current date for comment
const now = new Date().toISOString().split("T")[0];

// Generate inline script for workflows
const inlineScript = `// === LABEL CONFIG (generated from .github/labels.yml) ===
// Run: node .github/scripts/inject-labels.js
// Last updated: ${now}
const STATUS_LABELS = ${JSON.stringify(STATUS_LABELS)};
const PRIORITY_LABELS = ${JSON.stringify(PRIORITY_LABELS)};
const TYPE_LABELS = ${JSON.stringify(TYPE_LABELS)};
const ESTIMATE_LABELS = ${JSON.stringify(ESTIMATE_LABELS)};
const TRANSITION_RULES = ${JSON.stringify(TRANSITION_RULES, null, 2)};
// === END LABEL CONFIG ===`;

// Export for module usage
module.exports = {
  STATUS_LABELS,
  PRIORITY_LABELS,
  TYPE_LABELS,
  ESTIMATE_LABELS,
  TRANSITION_RULES,
  inlineScript,
};

// CLI mode: output inline script
if (require.main === module) {
  console.log(inlineScript);
}
