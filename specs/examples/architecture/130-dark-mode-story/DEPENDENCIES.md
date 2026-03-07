# Task Dependencies - Issue #130

> **Parent Issue:** #130 - Add dark mode toggle to settings  
> **Subtasks:** 3  
> **Total Estimate:** 10 points

---

## Dependency Analysis

### Subtask #131: Toggle Component

**Dependencies:** None

**Estimated:** 2 points

**Can start:** Immediately

**Outputs:**

- Toggle component (`packages/core/src/components/ui/toggle/`)
- PandaCSS recipe
- Tests and Storybook story

**Blocks:** #132 (ThemeProvider needs Toggle for UI)

---

### Subtask #132: Theme Provider

**Dependencies:** #131 (Toggle Component)

**Reason:** ThemeProvider will render Toggle component in settings/demo UI. While ThemeProvider logic doesn't strictly depend on Toggle, the complete feature requires Toggle for user interaction.

**Estimated:** 5 points

**Can start:** After #131 complete

**Outputs:**

- ThemeProvider component
- useTheme hook
- Theme context logic
- Tests

**Blocks:** #133 (Persistence needs ThemeProvider API)

---

### Subtask #133: Persistence

**Dependencies:** #132 (ThemeProvider)

**Reason:** Persistence integrates with ThemeProvider to save/restore theme state. Cannot implement without ThemeProvider API.

**Estimated:** 3 points

**Can start:** After #132 complete

**Outputs:**

- localStorage helpers (`src/utils/storage.ts`)
- Integration with ThemeProvider
- Tests for persistence logic

**Blocks:** None (final subtask)

---

## Execution Order

### Phase 1: Foundation (estimated 2-3 days)

**Tasks:**

- **#131: Toggle Component** (2 points)
  - Solo task, no blockers
  - Outputs: Interactive toggle UI component
  - Must complete before Phase 2 (API stability required)

**Key Milestone:** Toggle component merged and available for import

---

### Phase 2: Core Logic (estimated 5-6 days)

**Dependencies:** Phase 1 must complete

**Tasks:**

- **#132: Theme Provider** (5 points)
  - Blocked by: #131 (requires Toggle component)
  - Imports: Toggle from #131
  - Outputs: ThemeProvider, useTheme hook, theme context
  - Must complete before Phase 3 (persistence needs API)

**Key Milestone:** Theme switching works with Toggle, no persistence yet

---

### Phase 3: Persistence (estimated 3-4 days)

**Dependencies:** Phase 2 must complete

**Tasks:**

- **#133: Persistence** (3 points)
  - Blocked by: #132 (requires ThemeProvider API)
  - Integrates: localStorage with ThemeProvider
  - Outputs: Theme persists across sessions

**Key Milestone:** Complete dark mode feature with persistence

---

## Critical Path

**Longest sequence:** #131 → #132 → #133 (10 points, ~10-13 days)

**Bottleneck:** All tasks are sequential (no parallelization possible)

**Parallel opportunities:** None - strict dependency chain

---

## Dependency Graph (Text)

```
#131 (Toggle Component - 2 pts)
  └─→ #132 (Theme Provider - 5 pts)
        └─→ #133 (Persistence - 3 pts)
```

**Legend:**

- `→` : Blocking dependency (must wait)
- Numbers: Story points estimate

---

## Integration Points

### Task #131 → Task #132

**What's passed:**

- Toggle component with `checked` and `onCheckedChange` props
- PandaCSS recipe for styling

**How it's used:**

- ThemeProvider renders Toggle in settings
- Toggle's `onCheckedChange` calls ThemeProvider's `toggleTheme`
- Toggle's `checked` prop bound to theme context state

**Integration risk:** LOW

**Mitigation:**

- Toggle API is simple and stable (standard checkbox-like pattern)
- Well-tested before #132 begins

---

### Task #132 → Task #133

**What's passed:**

- ThemeProvider component
- useTheme hook with `{ theme, toggleTheme }` return value
- Theme context that all children can access

**How it's used:**

- Persistence wraps ThemeProvider initialization
- `useEffect` saves theme to localStorage on change
- Initial theme loaded from localStorage

**Integration risk:** MEDIUM

**Mitigation:**

- Define ThemeProvider API contract before #132 implementation
- Mock localStorage during #132 development
- Integration tests verify persistence works

---

## Recommended Workflow

### Option 1: Sequential (Recommended)

**Process:**

1. Complete #131 fully (code + tests + review)
2. **Merge #131 to main** ← KEY: Stable API before #132
3. Complete #132 fully
4. **Merge #132 to main** ← KEY: Stable API before #133
5. Complete #133 fully
6. Merge #133 to main

**Pros:**

- Stable foundation for each task
- Easy to review incrementally (3 focused PRs)
- No merge conflicts
- Each PR independently testable

**Cons:**

- Takes longer overall (~13 days vs ~10 days)
- More PR overhead (3 PRs vs 1 large PR)

**Rationale:**

- **Recommended** because APIs are critical
- ThemeProvider depends heavily on Toggle's interaction model
- Persistence depends on ThemeProvider's state management
- Sequential merges reduce integration risk

---

### Option 2: Parallel Development

**Process:**

1. Start #131 on `feature/130-toggle`
2. Once Toggle API finalized (not merged):
   - Start #132 on `feature/130-theme-provider`
   - Mock Toggle import temporarily
3. Once ThemeProvider API finalized:
   - Start #133 on `feature/130-persistence`
   - Mock ThemeProvider temporarily
4. Merge in order: #131 → #132 → #133

**Pros:**

- Faster overall (parallelizes design phase)
- Efficient use of time

**Cons:**

- **High risk:** API changes in #131 break #132
- Complex branch management (feature branches depend on each other)
- Potential for large rework if assumptions wrong
- Merge conflicts likely

**Rationale:**

- **Not recommended** due to tight coupling
- Toggle and ThemeProvider APIs are interdependent
- Risk outweighs time savings

---

## Risk Mitigation

### API Stability

**Risk:** ThemeProvider (#132) depends on Toggle (#131) API, which might change during review

**Mitigation:**

- Finalize Toggle API contract in #131 plan **before coding**
- Get user approval on `ToggleProps` interface
- Freeze Toggle API once #132 starts
- Use SemVer principles (only extend, don't break)

**Action Items:**

- [ ] Document Toggle API in subtask-131.md
- [ ] User approves API design
- [ ] No API changes after #132 starts

---

### Integration Issues

**Risk:** localStorage (#133) might not integrate cleanly with ThemeProvider (#132)

**Mitigation:**

- Design persistence integration during #132
- Add hooks in ThemeProvider for future persistence
- Mock localStorage during #132 development
- Test with real localStorage in #133

**Action Items:**

- [ ] ThemeProvider accepts `initialTheme` prop (for persistence)
- [ ] ThemeProvider exposes stable state/setter
- [ ] Integration tests in #133 verify end-to-end

---

### SSR Compatibility

**Risk:** localStorage not available in SSR (Next.js, etc.)

**Mitigation:**

- Wrap localStorage calls in try-catch
- Provide fallback to in-memory state
- Test in SSR-like environment (disable localStorage)

**Action Items:**

- [ ] Add `isBrowser` check in storage.ts
- [ ] Fallback to default theme on SSR
- [ ] Document SSR behavior in README

---

## Notes

### Task Order Rationale

**Why #131 (Toggle) first:**

- UI component is foundation for user interaction
- Simplest task (no dependencies)
- Can be tested/reviewed independently
- Provides stable API for #132

**Why #132 (ThemeProvider) second:**

- Core logic of theme system
- Requires Toggle for complete demo/usage
- Provides API for #133 (persistence)
- Medium complexity (context + hooks)

**Why #133 (Persistence) last:**

- Pure enhancement (feature works without it)
- Simplest integration (just add useEffect)
- Lowest risk (localStorage is well-understood)

---

### Parallel Work Opportunities

**None** - All tasks are strictly sequential due to dependencies.

**Possible future parallelization:**

- If ThemeProvider didn't need Toggle, #131 and #132 could run in parallel
- But current design couples them (Toggle in settings UI)

---

### Estimates Confidence

**High confidence:**

- #131 (Toggle) - 2 points ✅ Similar to Button/Checkbox
- #133 (Persistence) - 3 points ✅ Simple localStorage wrapper

**Medium confidence:**

- #132 (ThemeProvider) - 5 points ⚠️ Context + hooks can be tricky

**Total estimate range:** 9-12 points (conservative: 10 points)

---

## Progress Tracking

| Task | Status     | Started | Completed | Blockers        |
| ---- | ---------- | ------- | --------- | --------------- |
| #131 | ⏳ PENDING | -       | -         | None            |
| #132 | ⏳ PENDING | -       | -         | Waiting on #131 |
| #133 | ⏳ PENDING | -       | -         | Waiting on #132 |

**Legend:**

- ⏳ PENDING - Not started
- 🏗️ IN_PROGRESS - Active development
- ✅ COMPLETED - Done and merged
- 🚫 BLOCKED - Waiting on dependency

---

## References

- Parent Plan: [IMPLEMENTATION-PLAN.md](IMPLEMENTATION-PLAN.md)
- Subtask Plans:
  - [subtask-131.md](subtask-131.md) - Toggle Component
  - [subtask-132.md](subtask-132.md) - Theme Provider
  - [subtask-133.md](subtask-133.md) - Persistence
- GitHub Issue: https://github.com/0xbaitan/FulgensUI/issues/130
