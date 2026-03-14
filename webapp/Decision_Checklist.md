# FP&A Automation — Architecture Decision Checklist

## CRITICAL DECISIONS (DECIDE NOW)

### 1. Framework Strategy
**Question:** Should you upgrade to a frontend framework?

**Recommendation:** ✅ **YES - but only for Phases 4-5**
- **Phases 1-3:** Stay vanilla JS (zero overhead, modular structure)
- **Phase 4:** Introduce Vue.js 3 for AI generator + integrations
- **Phase 5:** Complete Vue migration for polishing

**Why this works:**
- Phases 1-3 (590 hours) need rapid iteration → vanilla is fastest
- Phase 4 (400 hours) needs form complexity, API streaming → Vue excels
- Coexistence is safe: Vue component in `<div id="phase4-app">`

---

### 2. State Management
**Question:** What pattern for managing 5+ complex scenarios + multiple views?

**Recommendation:** ✅ **Custom state manager (Phases 1-3) → Pinia (Phases 4-5)**

**Implementation:**
```javascript
// Phase 1-3: Lightweight custom manager
class StateManager {
  state = { scenarios: {}, currentScenario: 'default' };
  subscribe(key, callback) { /* ... */ }
  setState(key, value) { /* ... */ }
}

// Phase 4: Migrate to Pinia for Vue components
import { defineStore } from 'pinia';
export const useAppStore = defineStore('app', () => { /* ... */ });
```

**Why not Redux?**
- Too much complexity for this scope (1,200 LOC of boilerplate)
- State requirements are straightforward (scenarios + user prefs)
- Pinia is 80% of Redux with 20% of the overhead

---

### 3. Styling & Tailwind
**Question:** CDN vs. config file? Continue v4?

**Recommendation:** ✅ **Keep Tailwind v4 config file approach**

**Why:**
- Already set up in your codebase (tailwind.config.js)
- No migration pain for Phases 1-3
- Config file allows custom theme (colors, spacing, animations)
- Can drop CDN and use built version (Phase 4, if needed)

**Build command (when you want compiled CSS):**
```bash
npx tailwindcss -i ./src/styles/index.css -o ./public/styles.min.css
```

---

### 4. Visualization Libraries
**Question:** D3 vs. Chart.js vs. Plotly?

**Recommendation:** ✅ **Chart.js (Phases 2-3) + D3 (Phase 3) combo**

| Phase | Library | Use Case | Size |
|-------|---------|----------|------|
| 1 | None | No charts yet | — |
| 2 | Chart.js | Bar, line, pie charts | 60KB |
| 3 | D3.js | Dependency maps, custom viz | 200KB (tree-shake to 100KB) |
| 4+ | Chart.js + D3 | Dashboards, advanced analytics | 260KB combined |

**Why not Plotly?**
- 200KB bloated for your use case
- D3 + Chart.js cover 95% of requirements
- More control with composable libraries

**Avoid:** HighCharts (paid), ECharts (overkill), matplotlib (Python-only)

---

### 5. Data Persistence
**Question:** localStorage vs. backend database?

**Recommendation:** ✅ **localStorage (Phases 1-3) + optional backend (Phase 4)**

**Phase 1-3:**
```javascript
localStorage.setItem('fpa_scenarios', JSON.stringify(scenarios));
```
- 5-10MB quota typically available
- Offline-first experience
- No server cost

**Phase 4 (optional):**
Add simple backend sync (Express route + MongoDB/PostgreSQL):
```javascript
POST /api/scenarios/sync
GET /api/scenarios/:userId
```
- Multi-device synchronization
- Backup/recovery
- Usage analytics

**Quota management:**
- Store max 5 scenarios × 500KB each = 2.5MB
- Well under limit; test with `localStorage.getItem().length`

---

### 6. Export Format Support
**Question:** Which export formats are critical?

**Recommendation:** ✅ **PDF + Excel (must-have), CSV + JSON (nice-to-have)**

**Phase 3 (implement):**
- PDF via jsPDF + html2canvas (70KB combined)
- Excel via SheetJS (150KB)

**Phase 4+ (optional):**
- CSV (trivial, <5KB)
- JSON export for scenario backup/sharing

**Why not Word/PowerPoint?**
- Not requested in requirements
- 300KB+ libraries needed
- PDF covers most use cases

---

### 7. Claude API Integration
**Question:** Client-side vs. server-side API calls?

**Recommendation:** ✅ **Server-side wrapper (Express.js)**

**Why:**
- Protects API key (not exposed in frontend code)
- Enables rate limiting/caching
- Adds authentication layer (for Phase 4+)
- Allows request queuing (if concurrent demand)

**Implementation (server.js):**
```javascript
const Anthropic = require('@anthropic-ai/sdk');

app.post('/api/generate-proposal', async (req, res) => {
  const { scenario } = req.body;
  const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2048,
    messages: [{ role: "user", content: buildPrompt(scenario) }]
  });
  res.json({ narrative: message.content[0].text });
});
```

**Caching:**
- Cache generated proposals per scenario (5 min TTL)
- localStorage: `fpa_proposals_cache`

---

### 8. Build Tool & Bundling
**Question:** Need a build step? When?

**Recommendation:** ✅ **Skip until Phase 4, use Vite then**

**Phases 1-3:** No build needed
- Vanilla JS modules (ES6 imports work in modern browsers)
- Tailwind via config file (pre-compiled)
- Serve static files from Express

**Phase 4:** Introduce Vite
```javascript
// vite.config.js
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'pinia'],
          'viz': ['chart.js', 'd3'],
          'export': ['jspdf', 'html2canvas']
        }
      }
    }
  }
})
```

**Why Vite over Webpack/Parcel?**
- Fastest build times (instant HMR)
- Vue.js team-recommended
- Smallest bundle overhead
- Just works with your setup

---

### 9. TypeScript
**Question:** Add TypeScript for type safety?

**Recommendation:** ❌ **NO - not needed for this scope**

**Reasons:**
- Adds 10-15% overhead (compilation, learning curve)
- Your state is well-defined (scenarios, modules, costs)
- JSDoc comments sufficient for documentation
- Phase 1-3 priorities don't justify the complexity

**If reconsidering Phase 5:** Add TypeScript only to new Vue components:
```typescript
// Phase 5+: Optional
import { defineComponent } from 'vue'
export default defineComponent({
  props: { scenario: Object as PropType<Scenario> }
})
```

---

### 10. Testing Framework
**Question:** Unit tests? E2E tests?

**Recommendation:** ⚠️ **Optional but recommended**

**Minimal approach (recommended):**
- Unit tests for state manager (Vitest, 50 LOC)
- E2E tests for critical flows (Cypress, 100 LOC)
- Skip component-level tests (too time-intensive for 1,570 hrs)

**Phase 4+ (if time permits):**
```bash
npm install --save-dev vitest cypress
```

Test priority:
1. State manager mutations (3 tests)
2. Scenario save/load (5 tests)
3. Visualization rendering (5 tests)
4. Export generation (5 tests)

---

## SECONDARY DECISIONS (DESIGN NOW, DECIDE LATER)

### 11. Responsive Design Breakpoints
**Use Tailwind v4 defaults:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

**Test on:**
- 375px (iPhone)
- 768px (iPad)
- 1280px (desktop)

---

### 12. Deployment Environment
**Phase 1-3:**
- Static hosting: Vercel, Netlify, or AWS S3 + CloudFront
- No build step, no backend needed
- Cost: ~$0/month

**Phase 4+:**
- Node.js hosting: Render, Railway, Heroku, AWS Lambda
- Needed for `/api/generate-proposal` endpoint
- Cost: ~$7-20/month

---

### 13. Error Handling & Logging
**Phase 1-3 (basic):**
```javascript
try {
  stateManager.setState(key, value);
} catch (err) {
  console.error(`State update failed: ${err.message}`);
}
```

**Phase 4+ (structured):**
- Add error tracking: Sentry or Bugsnag
- API errors: retry logic + user feedback
- localStorage errors: graceful fallback

---

### 14. Accessibility Requirements
**WCAG 2.1 Level AA (recommended):**
- ✅ Keyboard navigation (Tab, Enter, Esc)
- ✅ ARIA labels on all interactive elements
- ✅ Color contrast ≥ 4.5:1
- ✅ Focus indicators visible
- ✅ Alt text for images/icons

**Phase 5 deliverable:** Run Lighthouse + WAVE audit

---

### 15. Performance Budgets
**Target (Lighthouse audit):**
- Performance score: 85+
- FCP (First Contentful Paint): < 1.5s
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1

**Strategies:**
- Lazy-load charts/D3 on scroll into view
- Code split by phase (Phase 4+)
- Cache API responses (5-min TTL)
- Compress images (WebP format)

---

## GO/NO-GO DECISION TABLE

| Decision | Recommendation | Risk Level | Impact |
|----------|---|---|---|
| **Framework upgrade** | Vue.js Phase 4+ | Low | High (+1,200 LOC, better DX) |
| **State management** | Custom + Pinia | Low | High (critical for scenarios) |
| **Tailwind** | Stay v4 | Low | Medium (already working) |
| **Visualization** | Chart.js + D3 | Medium | High (core Phase 3 feature) |
| **Data persistence** | localStorage | Low | High (critical for UX) |
| **Export formats** | PDF + Excel | Low | Medium (Phase 3 requirement) |
| **Claude API** | Server wrapper | Low | High (Phase 4 requirement) |
| **Build tool** | Vite (Phase 4) | Low | Medium (simplifies deployment) |
| **TypeScript** | Skip | Low | Low (not needed) |
| **Testing** | Vitest + Cypress | Low | Medium (optional, improves quality) |

---

## IMPLEMENTATION PRIORITY RANKING

1. **Week 1-2 (Critical):** Refactor app.js into modules
   - If this goes wrong, entire project at risk
   - Estimated effort: 80 hours
   - Mitigation: Small, frequent commits; test each module

2. **Week 3 (Critical):** Phase 1 (sidebar, views, costs, mobile)
   - Demonstrates core UX improvements
   - Estimated effort: 110 hours
   - Mitigation: Test on real mobile device early

3. **Week 4-5 (High):** Phase 2 (scenarios, comparison)
   - Complex state management needed
   - Estimated effort: 50 hours
   - Mitigation: Test scenario save/load thoroughly

4. **Week 6-7 (Medium):** Phase 3 (visualizations)
   - Chart.js + D3 integration
   - Estimated effort: 80 hours
   - Mitigation: Test visualization responsiveness

5. **Week 8-10 (Low):** Phase 4 (Vue.js, Claude API)
   - Can be paused if needed
   - Estimated effort: 150 hours
   - Mitigation: Ensure Phase 1-3 rock solid first

6. **Week 11 (Low):** Phase 5 (polish, perf, a11y)
   - Time-permitting improvements
   - Estimated effort: 50 hours
   - Mitigation: Use performance audit tools (Lighthouse)

---

## NEXT STEPS

1. **Confirm** these architectural decisions with your team
2. **Create** directory structure (Week 1)
3. **Refactor** app.js into modules (Week 1-2)
4. **Begin** Phase 1 development (Week 3)

**Estimated timeline:** 12 weeks (670 hours of actual work)  
**Your available budget:** 1,570 hours (plenty of buffer)

