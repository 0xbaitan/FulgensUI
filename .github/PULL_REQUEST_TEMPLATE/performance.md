<!--
  ⚡ Performance PR Template
  Use this template for performance improvements (type:perf)
-->

## 🎯 Type & Summary

**Type of change:**

- [ ] ⚡ Performance improvement (`type:perf`)

**One-line summary:**

<!-- Provide a concise summary (max 120 chars) of the performance improvement -->

---

## 🔗 Related Issues

<!-- Use auto-close syntax to link related issues -->

**Closes:** #
**Relates to:** #

---

## ⚡ Performance Details

### Problem Identified

<!-- Describe the performance issue -->

**Performance bottleneck:**

**How it was identified:**

- [ ] Profiling (React DevTools, Chrome DevTools)
- [ ] User reports (slow interactions, long load times)
- [ ] Lighthouse audit (low scores)
- [ ] Bundle size analysis (large bundles)
- [ ] Monitoring data (APM, analytics)

### Optimization Approach

<!-- Describe how the performance was improved -->

**Technique applied:**

- [ ] Memoization (`useMemo`, `useCallback`, `React.memo`)
- [ ] Virtualization (large lists, infinite scroll)
- [ ] Code splitting (lazy loading, dynamic imports)
- [ ] Debouncing/Throttling (event handlers)
- [ ] Algorithm optimization (data structures, complexity reduction)
- [ ] Bundle size reduction (tree-shaking, dependency removal)
- [ ] Caching (computed values, API responses)
- [ ] Rendering optimization (reduced re-renders, shallow comparisons)
- [ ] Other:

**Implementation details:**

---

## 📊 Performance Metrics

### Before Optimization

<!-- Provide baseline metrics -->

**Rendering performance:**

- Time to first render: `___ ms`
- Time to interactive: `___ ms`
- Re-renders per interaction: `___`

**Bundle size:**

- Total bundle size: `___ KB`
- Gzipped size: `___ KB`
- Component size: `___ KB`

**User interaction:**

- Click response time: `___ ms`
- Input lag: `___ ms`
- Scroll FPS: `___`

**Lighthouse scores (if applicable):**

- Performance: `___`
- Accessibility: `___`
- Best Practices: `___`

### After Optimization

<!-- Provide improved metrics -->

**Rendering performance:**

- Time to first render: `___ ms` (improvement: `-___ ms` / `___%`)
- Time to interactive: `___ ms` (improvement: `-___ ms` / `___%`)
- Re-renders per interaction: `___` (improvement: `-___` / `___%`)

**Bundle size:**

- Total bundle size: `___ KB` (reduction: `-___ KB` / `___%`)
- Gzipped size: `___ KB` (reduction: `-___ KB` / `___%`)
- Component size: `___ KB` (reduction: `-___ KB` / `___%`)

**User interaction:**

- Click response time: `___ ms` (improvement: `-___ ms` / `___%`)
- Input lag: `___ ms` (improvement: `-___ ms` / `___%`)
- Scroll FPS: `___` (improvement: `+___` / `___%`)

**Lighthouse scores (if applicable):**

- Performance: `___` (improvement: `+___`)
- Accessibility: `___`
- Best Practices: `___`

### Measurement Method

<!-- Explain how metrics were collected -->

**Tools used:**

- [ ] React DevTools Profiler
- [ ] Chrome DevTools Performance tab
- [ ] Lighthouse audit
- [ ] Bundle analyzer (webpack-bundle-analyzer, vite-plugin-visualizer)
- [ ] Custom benchmarks (Vitest benchmarks)
- [ ] Other:

**Test environment:**

- CPU throttling:
- Network throttling:
- Device:
- Browser:

---

## 💥 Breaking Changes

<!-- Only if optimization changes public APIs -->

- [ ] ⚠️ This optimization introduces breaking changes

<details>
<summary>Breaking change details (if applicable)</summary>

**What breaks:**

<!-- Describe what API changed for performance -->

**Migration guide:**

<!-- Provide step-by-step instructions -->

**Versioning impact:**

<!-- Performance improvements with breaking changes trigger MINOR bump -->

</details>

---

## ✅ CI Validation Checklist

<!-- Confirm all CI checks pass before requesting review -->

- [ ] ✅ **PandaCSS Generation** (`bun run ci:panda`) - No errors
- [ ] ✅ **ESLint** (`bun run ci:lint`) - No warnings or errors
- [ ] ✅ **TypeScript** (`bun run ci:type-check`) - No type errors
- [ ] ✅ **Tests with Coverage** (`bun run ci:test:coverage`) - All tests passing
- [ ] ✅ **Build** (`bun run ci:build`) - Builds successfully
- [ ] ✅ **Storybook Build** (`bun run ci:build-storybook`) - Builds successfully

**Build size comparison:**

```bash
# Before optimization
bun run ci:build
# Check dist/ size

# After optimization
bun run ci:build
# Compare dist/ size
```

**Local validation:**

```bash
bun run ci:all  # Run complete CI pipeline locally
```

---

## 🧪 Testing Details

### Performance Tests

<!-- Describe performance benchmarks added -->

- [ ] **Benchmark test added** - Vitest benchmark for optimization
- [ ] **Regression test added** - Ensures performance doesn't degrade
- [ ] **Comparison test** - Before/after performance comparison

**Benchmark results:**

```
BENCHMARK: {component} - {operation}
  Before: ___ ops/sec
  After:  ___ ops/sec
  Improvement: ___x faster
```

### Test Coverage (Optional)

<!-- Coverage thresholds are DISABLED but metrics are informative -->

**Coverage impact:**

- [ ] Coverage maintained (no decrease)
- [ ] Coverage improved (new edge cases tested)

### Manual Testing

<!-- Confirm manual testing performed -->

- [ ] Tested in Storybook (all variants)
- [ ] Profiled in React DevTools (verified fewer re-renders)
- [ ] Tested in Chrome DevTools (verified improved metrics)
- [ ] Tested on low-end devices (verified performance gain)
- [ ] Tested edge cases (large datasets, slow networks)

---

## 📚 Documentation

### Performance Notes Added

<!-- Document performance characteristics -->

- [ ] Updated Storybook docs (performance notes added)
- [ ] Updated component README (performance best practices)
- [ ] Updated `AGENTS.md` (if workflow affected)

### Architecture Documentation

<!-- Link to planning documents from agent workflow -->

- [ ] **IMPLEMENTATION-PLAN**: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`

**Storybook link:**
`http://localhost:6006/?path=/story/{component}--performance-demo`

---

## 🏗️ Agent Workflow Integration

<!-- Confirm which agents were used in implementation -->

**Agent workflow used:**

- [ ] `@architect` - Created IMPLEMENTATION-PLAN.md from performance task
- [ ] `@coder` - Executed optimization via TDD workflow

**Specs references:**

- Architecture plan: `specs/architecture/{issue}/IMPLEMENTATION-PLAN.md`

---

## 🏷️ Suggested Labels

<!-- These labels align with .github/labels.yml -->

**Suggested labels to apply:**

- `type:perf` ⚡ (Performance improvement)
- `status:review` 👀 (Ready for code review)
- `estimate:X` 📊 (Story points: 3-8 typical for performance work)
- `scope:core` 📦 (If core package affected)
- `priority:should-have` or `priority:could-have`

**Workflow status:**
Current: `status:review` → Next: `status:qa` → Final: `status:done`

---

## 👀 Reviewer Checklist

<!-- Reviewers should verify these items -->

### Performance Validation

- [ ] **Metrics verified** - Reviewer confirms performance improvement
- [ ] **Benchmark tests pass** - Performance benchmarks show improvement
- [ ] **No regressions** - No other performance metrics degraded
- [ ] **Real-world testing** - Tested on actual devices/networks

### Code Quality

- [ ] **No premature optimization** - Optimization addresses real bottleneck
- [ ] **Code readability** - Performance code still maintainable
- [ ] **Type safety** - No `any` types introduced
- [ ] **Error handling** - Edge cases still handled correctly

### Testing

- [ ] **All tests pass** - No test failures
- [ ] **Coverage maintained** - Test coverage not decreased
- [ ] **Performance tests added** - Benchmarks prevent regression

### Documentation

- [ ] **Performance notes added** - Storybook/README documents perf characteristics
- [ ] **Architecture docs accurate** - IMPLEMENTATION-PLAN.md reflects optimization

### Integration

- [ ] **CI passes** - All 6 checks green
- [ ] **Bundle size reduced** - Or no increase in bundle size
- [ ] **No breaking changes** - Or breaking changes properly documented

---

## 📊 Benchmark Results (Optional)

<!-- Provide detailed benchmark data -->
<details>
<summary>Detailed benchmark results (click to expand)</summary>

**Benchmark command:**

```bash
bunx vitest bench src/components/ui/{component}/__tests__/{component}.bench.ts
```

**Results:**

```
 ✓ src/components/ui/{component}/__tests__/{component}.bench.ts

 BENCH  Summary

  {operation} (optimized) - ___ ops/sec
  {operation} (original)  - ___ ops/sec

  Improvement: ___x faster (___% increase)
```

</details>

---

## 📝 Additional Notes

<!-- Any other context reviewers should know -->
<!-- Example: Trade-offs made, alternative approaches considered, future optimizations planned -->

---

## ✅ Pre-Merge Checklist

<!-- Complete before merging -->

- [ ] All CI checks pass
- [ ] At least one approval from reviewer
- [ ] All review comments addressed
- [ ] Performance improvement verified (metrics collected)
- [ ] Benchmark tests added and passing
- [ ] No performance regressions in other areas
- [ ] Bundle size impact acceptable
- [ ] Documentation updated with performance notes
- [ ] Labels applied correctly
- [ ] Issue will auto-close on merge

---

**Conventional Commit Format:**

```
perf(component): {what was optimized}

Improves {metric} by {amount/percentage}

Optimization technique: {technique}
```

**Examples:**

```
perf(button): reduce re-renders with React.memo

Improves click response time by 40% (from 120ms to 72ms)

Optimization technique: memoization
```

```
perf(table): virtualize large datasets

Improves rendering performance for 10k+ rows

Optimization technique: virtual scrolling
```
