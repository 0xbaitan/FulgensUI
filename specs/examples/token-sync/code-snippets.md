# Token Synchronization Code Snippets

Reference code examples for token operations via Penpot MCP.

---

## Creating Color Tokens

### Extract Colors from Penpot Design

```javascript
// Execute via MCP execute_code tool
const shapes = penpot.currentPage.shapes;
const usedColors = new Set();

function extractColors(shape) {
  // Extract fill colors
  if (shape.fills) {
    shape.fills.forEach((fill) => {
      if (fill.type === "solid" && fill.color) {
        usedColors.add(fill.color);
      }
    });
  }

  // Extract stroke colors
  if (shape.strokes) {
    shape.strokes.forEach((stroke) => {
      if (stroke.type === "solid" && stroke.color) {
        usedColors.add(stroke.color);
      }
    });
  }

  // Recurse into children
  if (shape.children) {
    shape.children.forEach(extractColors);
  }
}

shapes.forEach(extractColors);

return {
  colors: Array.from(usedColors),
  count: usedColors.size,
};
```

**Expected output:**

```json
{
  "colors": ["#3B82F6", "#2563EB", "#1E40AF", "#FFFFFF"],
  "count": 4
}
```

---

### Query Existing Tokens

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

// Get all existing tokens across all sets
const existingTokens = catalog.sets.flatMap((set) =>
  set.tokens.map((token) => ({
    id: token.id,
    name: token.name,
    type: token.type,
    value: token.value,
    setName: set.name,
    setActive: set.active,
  })),
);

return {
  totalTokens: existingTokens.length,
  sets: catalog.sets.map((s) => ({
    name: s.name,
    active: s.active,
    tokenCount: s.tokens.length,
  })),
  tokens: existingTokens,
};
```

**Expected output:**

```json
{
  "totalTokens": 12,
  "sets": [{ "name": "FulgensUI", "active": true, "tokenCount": 12 }],
  "tokens": [
    {
      "id": "abc123",
      "name": "colors/primary/500",
      "type": "color",
      "value": "#3B82F6",
      "setName": "FulgensUI",
      "setActive": true
    }
  ]
}
```

---

### Create Color Tokens

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

// Get or create FulgensUI set
let fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");
if (!fulgensSet) {
  fulgensSet = catalog.addSet({ name: "FulgensUI" });
}

// Define tokens to create
const tokensToCreate = [
  { type: "color", name: "colors/primary/500", value: "#3B82F6" },
  { type: "color", name: "colors/primary/600", value: "#2563EB" },
  { type: "color", name: "colors/primary/800", value: "#1E40AF" },
  { type: "color", name: "colors/white", value: "#FFFFFF" },
];

// Create tokens with error handling
const results = [];
for (const tokenData of tokensToCreate) {
  try {
    // Check if token already exists
    const existing = fulgensSet.tokens.find((t) => t.name === tokenData.name);

    if (existing) {
      results.push({
        success: false,
        skipped: true,
        name: tokenData.name,
        reason: "Token already exists",
        existingValue: existing.value,
        requestedValue: tokenData.value,
        valuesMatch: existing.value === tokenData.value,
      });
      continue;
    }

    // Create new token
    const token = fulgensSet.addToken({
      type: tokenData.type,
      name: tokenData.name,
      value: tokenData.value,
    });

    results.push({
      success: true,
      tokenId: token.id,
      name: tokenData.name,
      value: tokenData.value,
    });
  } catch (error) {
    results.push({
      success: false,
      error: error.message,
      name: tokenData.name,
    });
  }
}

// Activate set if not active
if (!fulgensSet.active) {
  fulgensSet.toggleActive();
}

return {
  setId: fulgensSet.id,
  setName: fulgensSet.name,
  setActive: fulgensSet.active,
  results: results,
  successCount: results.filter((r) => r.success).length,
  failureCount: results.filter((r) => !r.success && !r.skipped).length,
  skippedCount: results.filter((r) => r.skipped).length,
};
```

**Expected output:**

```json
{
  "setId": "set-abc123",
  "setName": "FulgensUI",
  "setActive": true,
  "results": [
    {
      "success": true,
      "tokenId": "tok-001",
      "name": "colors/primary/500",
      "value": "#3B82F6"
    },
    {
      "success": true,
      "tokenId": "tok-002",
      "name": "colors/primary/600",
      "value": "#2563EB"
    },
    {
      "success": true,
      "tokenId": "tok-003",
      "name": "colors/primary/800",
      "value": "#1E40AF"
    },
    {
      "success": false,
      "skipped": true,
      "name": "colors/white",
      "reason": "Token already exists",
      "existingValue": "#FFFFFF",
      "requestedValue": "#FFFFFF",
      "valuesMatch": true
    }
  ],
  "successCount": 3,
  "failureCount": 0,
  "skippedCount": 1
}
```

---

## Creating Token Sets

### Create and Configure Token Set

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

// Check if set already exists
let fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");

if (fulgensSet) {
  return {
    created: false,
    setId: fulgensSet.id,
    message: "Token set 'FulgensUI' already exists",
    active: fulgensSet.active,
    tokenCount: fulgensSet.tokens.length,
  };
}

// Create new set
fulgensSet = catalog.addSet({ name: "FulgensUI" });

// Activate the set
if (!fulgensSet.active) {
  fulgensSet.toggleActive();
}

return {
  created: true,
  setId: fulgensSet.id,
  setName: fulgensSet.name,
  active: fulgensSet.active,
  tokenCount: fulgensSet.tokens.length,
};
```

---

## Creating Themes

### Detect Dark Mode Frames

```javascript
const frames = penpot.currentPage.shapes.filter((s) => s.type === "frame");

const darkModeIndicators = ["dark", "night", "black"];
const darkModeFrames = frames.filter((f) => {
  const nameLower = f.name.toLowerCase();
  return darkModeIndicators.some((indicator) => nameLower.includes(indicator));
});

return {
  totalFrames: frames.length,
  darkModeFrames: darkModeFrames.map((f) => ({ id: f.id, name: f.name })),
  hasDarkMode: darkModeFrames.length > 0,
};
```

---

### Create Light and Dark Themes

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

// Ensure FulgensUI set exists
const fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");
if (!fulgensSet) {
  return { error: "Token set 'FulgensUI' not found. Create it first." };
}

const results = {};

// Create Light theme
let lightTheme = catalog.themes.find(
  (t) => t.name === "FulgensUI/Light" || t.name === "Light",
);
if (!lightTheme) {
  lightTheme = catalog.addTheme({ group: "FulgensUI", name: "Light" });
  results.lightTheme = {
    created: true,
    id: lightTheme.id,
    name: lightTheme.name,
  };
} else {
  results.lightTheme = {
    created: false,
    id: lightTheme.id,
    name: lightTheme.name,
    message: "Already exists",
  };
}

// Create Dark theme
let darkTheme = catalog.themes.find(
  (t) => t.name === "FulgensUI/Dark" || t.name === "Dark",
);
if (!darkTheme) {
  darkTheme = catalog.addTheme({ group: "FulgensUI", name: "Dark" });
  results.darkTheme = { created: true, id: darkTheme.id, name: darkTheme.name };
} else {
  results.darkTheme = {
    created: false,
    id: darkTheme.id,
    name: darkTheme.name,
    message: "Already exists",
  };
}

// Note: Token value overrides per theme may require additional API methods
// Check Penpot API documentation for TokenTheme.setTokenValue() or similar

return results;
```

**Expected output:**

```json
{
  "lightTheme": {
    "created": true,
    "id": "theme-001",
    "name": "FulgensUI/Light"
  },
  "darkTheme": { "created": true, "id": "theme-002", "name": "FulgensUI/Dark" }
}
```

---

## Spacing Tokens

### Extract Spacing Values

```javascript
const shapes = penpot.currentPage.shapes;
const spacingValues = new Set();

function extractSpacing(shape) {
  // Layout padding
  if (shape.layoutPadding) {
    spacingValues.add(shape.layoutPadding);
  }

  // Layout gap
  if (shape.layoutGap) {
    spacingValues.add(shape.layoutGap);
  }

  // Frame-specific spacing
  if (shape.type === "frame") {
    if (shape.horizontalPadding) spacingValues.add(shape.horizontalPadding);
    if (shape.verticalPadding) spacingValues.add(shape.verticalPadding);
  }

  // Recurse
  if (shape.children) {
    shape.children.forEach(extractSpacing);
  }
}

shapes.forEach(extractSpacing);

return {
  spacingValues: Array.from(spacingValues).sort((a, b) => a - b),
  count: spacingValues.size,
};
```

---

### Create Spacing Tokens

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

const fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");
if (!fulgensSet) {
  return { error: "Token set 'FulgensUI' not found" };
}

// Define spacing tokens
const spacingTokens = [
  { name: "spacing/xs", value: "4px" },
  { name: "spacing/sm", value: "8px" },
  { name: "spacing/md", value: "12px" },
  { name: "spacing/lg", value: "16px" },
  { name: "spacing/xl", value: "24px" },
  { name: "spacing/2xl", value: "32px" },
];

const results = [];
for (const tokenData of spacingTokens) {
  try {
    const existing = fulgensSet.tokens.find((t) => t.name === tokenData.name);
    if (existing) {
      results.push({
        skipped: true,
        name: tokenData.name,
        reason: "Already exists",
      });
      continue;
    }

    const token = fulgensSet.addToken({
      type: "dimension", // or "spacing" depending on Penpot API
      name: tokenData.name,
      value: tokenData.value,
    });

    results.push({ success: true, tokenId: token.id, name: tokenData.name });
  } catch (error) {
    results.push({
      success: false,
      error: error.message,
      name: tokenData.name,
    });
  }
}

return {
  results,
  successCount: results.filter((r) => r.success).length,
};
```

---

## Error Handling

### Robust Token Creation with Validation

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

function createTokenSafely(set, tokenData) {
  try {
    // Validate token data
    if (!tokenData.type || !tokenData.name || !tokenData.value) {
      return {
        success: false,
        error: "Missing required fields: type, name, or value",
        name: tokenData.name,
      };
    }

    // Check for duplicates
    const existing = set.tokens.find((t) => t.name === tokenData.name);
    if (existing) {
      const valuesMatch = existing.value === tokenData.value;
      return {
        success: false,
        skipped: true,
        name: tokenData.name,
        reason: "Token already exists",
        existingValue: existing.value,
        requestedValue: tokenData.value,
        valuesMatch: valuesMatch,
        action: valuesMatch
          ? "No action needed"
          : "Manual review required - values differ",
      };
    }

    // Create token
    const token = set.addToken({
      type: tokenData.type,
      name: tokenData.name,
      value: tokenData.value,
    });

    // Verify creation
    const verified = set.tokens.find((t) => t.id === token.id);
    if (!verified) {
      return {
        success: false,
        error: "Token created but not found in set after creation",
        name: tokenData.name,
      };
    }

    return {
      success: true,
      tokenId: token.id,
      name: tokenData.name,
      value: token.value,
      verified: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      stack: error.stack,
      name: tokenData.name,
    };
  }
}

// Example usage
const fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");
if (!fulgensSet) {
  return { error: "FulgensUI set not found", fatal: true };
}

const tokensToCreate = [
  { type: "color", name: "colors/primary/700", value: "#1D4ED8" },
];

const results = tokensToCreate.map((tokenData) =>
  createTokenSafely(fulgensSet, tokenData),
);

return {
  results,
  summary: {
    total: results.length,
    success: results.filter((r) => r.success).length,
    failed: results.filter((r) => !r.success && !r.skipped).length,
    skipped: results.filter((r) => r.skipped).length,
  },
};
```

---

## Verification

### Verify Token Creation

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

const tokenNamesToVerify = [
  "colors/primary/500",
  "colors/primary/600",
  "colors/primary/800",
];

const verificationResults = [];

const fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");
if (!fulgensSet) {
  return { error: "FulgensUI set not found" };
}

for (const tokenName of tokenNamesToVerify) {
  const token = fulgensSet.tokens.find((t) => t.name === tokenName);

  if (!token) {
    verificationResults.push({
      name: tokenName,
      exists: false,
      error: "Token not found in set",
    });
    continue;
  }

  // Try applying token to a test shape
  try {
    const testShape = penpot.createRectangle();
    testShape.applyToken(token, ["fill"]);

    const applied = testShape.tokens["fill"] === token.name;

    // Clean up
    testShape.remove();

    verificationResults.push({
      name: tokenName,
      exists: true,
      tokenId: token.id,
      value: token.value,
      type: token.type,
      canApply: applied,
    });
  } catch (error) {
    verificationResults.push({
      name: tokenName,
      exists: true,
      tokenId: token.id,
      value: token.value,
      canApply: false,
      error: error.message,
    });
  }
}

return {
  setName: fulgensSet.name,
  setActive: fulgensSet.active,
  verificationResults,
  allVerified: verificationResults.every(
    (r) => r.exists && r.canApply !== false,
  ),
};
```

**Expected output:**

```json
{
  "setName": "FulgensUI",
  "setActive": true,
  "verificationResults": [
    {
      "name": "colors/primary/500",
      "exists": true,
      "tokenId": "tok-001",
      "value": "#3B82F6",
      "type": "color",
      "canApply": true
    },
    {
      "name": "colors/primary/600",
      "exists": true,
      "tokenId": "tok-002",
      "value": "#2563EB",
      "type": "color",
      "canApply": true
    },
    {
      "name": "colors/primary/800",
      "exists": true,
      "tokenId": "tok-003",
      "value": "#1E40AF",
      "type": "color",
      "canApply": true
    }
  ],
  "allVerified": true
}
```

---

## Complete Workflow Example

### Full Token Sync Process

```javascript
const library = penpot.currentFile.library;
const catalog = library.tokens;

// Step 1: Extract colors from design
const shapes = penpot.currentPage.shapes;
const usedColors = new Set();

function extractColors(shape) {
  if (shape.fills) {
    shape.fills.forEach((fill) => {
      if (fill.type === "solid" && fill.color) usedColors.add(fill.color);
    });
  }
  if (shape.strokes) {
    shape.strokes.forEach((stroke) => {
      if (stroke.type === "solid" && stroke.color) usedColors.add(stroke.color);
    });
  }
  if (shape.children) shape.children.forEach(extractColors);
}

shapes.forEach(extractColors);

// Step 2: Get or create token set
let fulgensSet = catalog.sets.find((s) => s.name === "FulgensUI");
const setCreated = !fulgensSet;
if (!fulgensSet) {
  fulgensSet = catalog.addSet({ name: "FulgensUI" });
}

// Step 3: Map colors to token names (simplified mapping)
const colorMapping = {
  "#3B82F6": { name: "colors/primary/500", type: "color" },
  "#2563EB": { name: "colors/primary/600", type: "color" },
  "#1E40AF": { name: "colors/primary/800", type: "color" },
  "#FFFFFF": { name: "colors/white", type: "color" },
};

// Step 4: Create tokens
const tokenResults = [];
for (const [colorValue, tokenData] of Object.entries(colorMapping)) {
  if (!usedColors.has(colorValue)) continue; // Skip unused colors

  const existing = fulgensSet.tokens.find((t) => t.name === tokenData.name);
  if (existing) {
    tokenResults.push({ skipped: true, name: tokenData.name });
    continue;
  }

  try {
    const token = fulgensSet.addToken({
      type: tokenData.type,
      name: tokenData.name,
      value: colorValue,
    });
    tokenResults.push({
      success: true,
      name: tokenData.name,
      tokenId: token.id,
    });
  } catch (error) {
    tokenResults.push({
      success: false,
      name: tokenData.name,
      error: error.message,
    });
  }
}

// Step 5: Activate set
if (!fulgensSet.active) {
  fulgensSet.toggleActive();
}

// Step 6: Return summary
return {
  analysis: {
    colorsFound: usedColors.size,
    colorsUsed: Array.from(usedColors),
  },
  tokenSet: {
    name: fulgensSet.name,
    created: setCreated,
    active: fulgensSet.active,
    totalTokens: fulgensSet.tokens.length,
  },
  tokenCreation: {
    results: tokenResults,
    successCount: tokenResults.filter((r) => r.success).length,
    skippedCount: tokenResults.filter((r) => r.skipped).length,
    failureCount: tokenResults.filter((r) => !r.success && !r.skipped).length,
  },
};
```

---

## Notes

- All code snippets use Penpot Plugin API accessed via MCP `execute_code` tool
- Error handling is included in most examples
- Token types may vary based on Penpot API version (check `TokenType` enum)
- Theme token overrides may require additional API methods not shown here
- Always verify tokens after creation
- Use `penpot.currentFile.library.tokens` to access the token catalog
