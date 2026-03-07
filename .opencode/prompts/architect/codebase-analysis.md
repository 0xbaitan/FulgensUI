# Codebase Analysis - Technical Context Discovery

**Context:** Loaded during Phase 2 (Validation) to understand current state.

---

## Analysis Steps

### 1. File Discovery

**Goal:** Find all files affected by this issue

**Commands:**

```bash
# Find component files
find packages/core/src/components -name "*<component>*"

# Find test files
find packages/core/src -path "*__tests__*" -name "*<component>*"

# Find Storybook files
find packages/core/src -path "*storybook*" -name "*<component>*"

# Find config files
find packages/core/src/config -name "*<component>*"
```

**Document:**

- Files that exist (current state)
- Files missing (need to create)
- Related files (might need updates)

---

### 2. Import Analysis

**Goal:** Verify import paths are valid and detect circular dependencies

**Commands:**

```bash
# Check imports in component
grep -r "import.*from" packages/core/src/components/ui/<component>/

# Check what imports this component
grep -r "import.*<Component>" packages/core/src/components/

# Check for circular dependencies
# (manual inspection of import chains)
```

**Detect:**

- Valid imports (✅ paths exist)
- Invalid imports (❌ paths don't exist)
- Circular dependencies (❌ A imports B imports A)

---

### 3. Test Coverage Extraction

**Goal:** Determine current test coverage for affected areas

**Method 1: From recent CI run**

```bash
# Check if coverage report exists
ls packages/core/coverage/lcov.info

# Extract coverage for specific file
grep -A 5 "src/components/ui/<component>" packages/core/coverage/lcov.info
```

**Method 2: Run tests locally**

```bash
cd packages/core
bun run ci:test:coverage
```

**Parse output:**

```
All files        | 85.32 | 78.45 | 82.10 | 85.32 |
button/          | 92.15 | 88.30 | 90.00 | 92.15 |
```

**Status:**

- ≥90% = GREEN
- 70-89% = YELLOW
- <70% = RED (warning only)

---

### 4. Breaking Change Detection

**Goal:** Identify if changes will break public API

**Commands:**

```bash
# Check if on feature branch
git branch --show-current

# If on feature branch, compare to main
git diff main...HEAD --name-only

# Check for API changes
git diff main...HEAD -- 'packages/core/src/components/**/*.tsx'
git diff main...HEAD -- 'packages/core/src/config/**/*.ts'
```

**Breaking changes:**

- Removed exports
- Changed function signatures
- Renamed components
- Removed props
- Changed prop types (non-backward compatible)

**Non-breaking changes:**

- Added exports
- Added optional props
- Added new variants
- Internal refactors

---

### 5. Integration Point Identification

**Goal:** Find where this component/feature integrates with system

**Check for:**

**State management:**

```bash
grep -r "useState\|useReducer\|useContext" packages/core/src/components/<component>/
```

**API calls:**

```bash
grep -r "fetch\|axios\|useSWR" packages/core/src/components/<component>/
```

**Hooks:**

```bash
grep -r "use[A-Z]" packages/core/src/components/<component>/
```

**Context providers:**

```bash
grep -r "createContext\|Provider" packages/core/src/components/<component>/
```

**Document:**

- State management used (if any)
- External APIs called (if any)
- Custom hooks used (if any)
- Context providers (if any)

---

## Analysis Report Format

**Output in IMPLEMENTATION-PLAN.md Section 3:**

```markdown
## 3. Codebase Analysis

### Current State

**Existing Files:**

- ✅ src/components/ui/button/button.tsx (120 lines, 92% coverage)
- ✅ src/components/ui/button/config/button-recipe.ts (45 lines)
- ✅ src/components/ui/button/**tests**/button.test.tsx (80 lines, 15 tests)

**Missing Files:**

- ❌ src/components/ui/button/storybook/button.stories.tsx (needs creation)

**Related Files:**

- src/config/recipes.ts (exports button recipe)
- src/components/index.ts (exports Button component)

### Proposed Changes

**Files to Create:**

- src/components/ui/button/storybook/button.stories.tsx
- src/components/ui/button/storybook/button.mdx

**Files to Modify:**

- src/components/ui/button/config/button-recipe.ts
  - Add dark mode variant
  - Update hover states

**Files to Delete:**

- None

### Breaking Changes

**Status:** NO

**Analysis:**

- Only adding new variants (backward compatible)
- No existing props removed or changed
- Existing tests remain valid
```

---

## Error Handling

**If file not found:**

```
⚠️ Referenced file does not exist:
   src/components/ui/button/button.tsx

Status: RED (blocker)
```

**If circular dependency:**

```
❌ Circular dependency detected:
   Button → IconButton → Button

Status: RED (blocker)
```

**If low coverage:**

```
⚠️ Test coverage below threshold:
   Current: 65% | Threshold: 90%

Status: YELLOW (warning)
```
