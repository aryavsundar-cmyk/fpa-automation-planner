# FP&A Automation Web App — Optimal Technical Architecture Design
## Supporting 1,570-Hour, 5-Phase UX/UI Enhancement Project

**Document Date:** March 14, 2026  
**Current State:** Vanilla JS (3,010 LOC) + Tailwind CDN + Express.js  
**Target State:** Modular, scalable architecture supporting complex state, visualizations, and AI integration

---

## EXECUTIVE SUMMARY

Your project scope requires managing sophisticated state, multiple views, rich visualizations, and API integrations across 1,570 hours. A **hybrid approach** is recommended:

1. **Keep vanilla JS core** but restructure with clean patterns
2. **Add lightweight state library** (Pinia in standalone mode or custom state machine)
3. **Leverage existing Tailwind v4** config file setup
4. **Introduce component framework** for visualization-heavy phases
5. **Modularize incrementally** to minimize refactoring

This strategy avoids the risk of full framework migration while giving you the architecture patterns needed for Phase 1-5 delivery.

---

## SECTION 1: FRAMEWORK DECISION ANALYSIS

### Option 1: Stay Vanilla JS (Enhanced)
**Recommendation: Partial adoption – use this for Phases 1-3**

**Pros:**
- Minimal dependencies (current constraint satisfied)
- Fast to iterate on UI/state patterns
- Zero build complexity beyond Tailwind
- Current 1,170 LOC app.js is manageable with refactoring

**Cons:**
- State management becomes unmaintainable past 5-7 modules
- Visualizations require manual D3 integration
- No built-in reactivity for complex scenario management
- Export/API handling requires custom orchestration

**Best for:** Sidebar, stakeholder views, cost transparency, mobile redesign (Phase 1)

---

### Option 2: Upgrade to Vue.js 3 (Recommended for Phases 3-5)
**Recommendation: Adopt for Phases 4-5 only (AI generator, integrations, case studies)**

**Pros:**
- Incremental adoption (co-exist with vanilla JS)
- Excellent state management (Pinia)
- Component composition matches your modular needs
- Ecosystem supports visualization, PDF export, API integration

**Cons:**
- Build step required (Vite)
- Learning curve for team
- Adds ~200KB bundle (gzipped: ~70KB)

**Best for:** Phase 4 (AI generator form + integrations) and Phase 5 (polishing)

---

### Option 3: React.js
**Not Recommended.** Overkill for this scope. Vue.js gives you 90% of React benefits with 50% of the complexity.

---

## SECTION 2: RECOMMENDED ARCHITECTURE

### Architecture Pattern: Modular Vanilla + Vue.js Bridge

```
project-root/
├── public/
│   ├── index.html
│   ├── favicon.ico
├── src/
│   ├── core/
│   │   ├── state.js              # Centralized state machine
│   │   ├── events.js             # Event emitter (pub/sub)
│   │   ├── storage.js            # localStorage orchestration
│   │   └── api.js                # Backend communication
│   │
│   ├── modules/                  # Phase-based modular features
│   │   ├── phase1/
│   │   │   ├── sidebar.js        # Persistent sidebar component
│   │   │   ├── stakeholder-views.js
│   │   │   ├── cost-transparency.js
│   │   │   └── mobile.js
│   │   │
│   │   ├── phase2/
│   │   │   ├── comparison-matrix.js
│   │   │   ├── scenario-mgmt.js
│   │   │   └── educational-content.js
│   │   │
│   │   ├── phase3/
│   │   │   ├── risk-framework.js
│   │   │   ├── visualization.js  # D3 + Charts
│   │   │   └── timeline.js
│   │   │
│   │   ├── phase4-vue/           # Vue.js components
│   │   │   ├── AIGenerator.vue
│   │   │   ├── IntegrationsHub.vue
│   │   │   └── CaseStudies.vue
│   │   │
│   │   └── phase5/
│   │       ├── performance.js
│   │       ├── accessibility.js
│   │       └── mobile-polish.js
│   │
│   ├── components/
│   │   ├── common/               # Shared UI components (vanilla)
│   │   │   ├── Button.js
│   │   │   ├── Modal.js
│   │   │   ├── Tabs.js
│   │   │   └── Dropdown.js
│   │   │
│   │   └── vue-components/       # Vue.js shared components
│   │       ├── FormFields.vue
│   │       ├── DataTable.vue
│   │       └── Charts.vue
│   │
│   ├── services/
│   │   ├── export.js             # PDF/Excel generation
│   │   ├── visualization.js      # Chart.js, D3 initialization
│   │   ├── claudeAPI.js          # Claude API integration
│   │   ├── dataTransform.js      # Scenario management logic
│   │   └── cache.js              # Client-side caching
│   │
│   ├── utils/
│   │   ├── validation.js
│   │   ├── formatters.js
│   │   ├── dom.js                # DOM helpers (querySelector, etc.)
│   │   └── math.js               # Financial calculations
│   │
│   ├── styles/
│   │   ├── index.css             # Global styles
│   │   ├── tailwind.config.js    # Tailwind v4 config
│   │   └── animations.css        # Custom animations
│   │
│   ├── app.js                    # Main vanilla app (refactored)
│   └── main.vue.js               # Vue.js entry (Phase 4+)
│
├── server.js                      # Express.js static server
├── package.json
├── tailwind.config.js
└── vite.config.js                # Build config (Phase 4+)
```

---

## SECTION 3: STATE MANAGEMENT STRATEGY

### Phase 1-3: Custom State Machine (Vanilla)

Instead of a full library, implement a lightweight state management pattern:

```javascript
// src/core/state.js
class StateManager {
  constructor() {
    this.state = {
      // Global app state
      industry: 'agency',
      selectedModules: new Set(),
      scenarios: {},           // New: multiple scenarios
      currentScenario: 'default',
      localSettings: {},
      exportConfig: {},
      
      // View state
      sidebarCollapsed: false,
      activeTab: 'overview',
      selectedStakeholder: null,
    };
    
    this.subscribers = new Map();
  }
  
  // Immutable state updates
  setState(key, value) {
    const oldValue = this.state[key];
    this.state[key] = value;
    this.notify(key, value, oldValue);
  }
  
  // Subscribe to state changes
  subscribe(key, callback) {
    if (!this.subscribers.has(key)) {
      this.subscribers.set(key, []);
    }
    this.subscribers.get(key).push(callback);
  }
  
  notify(key, newValue, oldValue) {
    this.subscribers.get(key)?.forEach(cb => cb(newValue, oldValue));
  }
  
  // Scenario management
  createScenario(name, baseState) {
    this.state.scenarios[name] = JSON.parse(JSON.stringify(baseState));
  }
  
  switchScenario(name) {
    this.setState('currentScenario', name);
    // Merge scenario state into main state
  }
}

export const stateManager = new StateManager();
```

### Phase 4+: Migrate to Pinia (Vue.js)

```javascript
// src/stores/appStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useAppStore = defineStore('app', () => {
  // State
  const industry = ref('agency');
  const scenarios = ref({});
  const currentScenario = ref('default');
  
  // Computed
  const activeScenario = computed(() => scenarios.value[currentScenario.value]);
  
  // Actions
  function createScenario(name, baseState) {
    scenarios.value[name] = baseState;
  }
  
  function switchScenario(name) {
    currentScenario.value = name;
  }
  
  return { industry, scenarios, currentScenario, activeScenario, createScenario, switchScenario };
});
```

---

## SECTION 4: DATA PERSISTENCE STRATEGY

### localStorage Orchestration

```javascript
// src/core/storage.js
class StorageManager {
  constructor() {
    this.key = 'fpa_app_state';
    this.scenarioKey = 'fpa_scenarios';
    this.settingsKey = 'fpa_settings';
  }
  
  // Save entire scenario to localStorage
  saveScenario(name, scenarioData) {
    const scenarios = this.loadAllScenarios();
    scenarios[name] = {
      data: scenarioData,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    localStorage.setItem(this.scenarioKey, JSON.stringify(scenarios));
  }
  
  // Load scenario from localStorage
  loadScenario(name) {
    const scenarios = JSON.parse(localStorage.getItem(this.scenarioKey) || '{}');
    return scenarios[name];
  }
  
  // Sync to backend (opt-in)
  async syncToBackend(userId) {
    const scenarios = JSON.parse(localStorage.getItem(this.scenarioKey));
    await fetch('/api/scenarios/sync', {
      method: 'POST',
      body: JSON.stringify({ userId, scenarios })
    });
  }
  
  // Auto-save on state changes
  autoSave(stateManager) {
    stateManager.subscribe('selectedModules', () => {
      this.saveSnapshot('auto-save', stateManager.state);
    });
  }
}

export const storageManager = new StorageManager();
```

### Backend Support (Optional, Phase 4)

Add simple endpoints for multi-device sync:

```javascript
// server.js additions
app.post('/api/scenarios/save', (req, res) => {
  const { userId, scenarioId, data } = req.body;
  // Store in database
  db.scenarios.insertOne({ userId, scenarioId, data, timestamp: new Date() });
  res.json({ success: true });
});

app.get('/api/scenarios/:userId', (req, res) => {
  const scenarios = db.scenarios.find({ userId: req.params.userId }).toArray();
  res.json(scenarios);
});
```

---

## SECTION 5: VISUALIZATION ARCHITECTURE

### Lightweight Multi-Library Approach

**Phase 1-2:** Chart.js only (simple charts, timeline)
**Phase 3:** Add D3.js for custom visualizations
**Phase 4+:** Consider Plotly.js for interactive dashboards

```javascript
// src/services/visualization.js
class VisualizationManager {
  constructor() {
    this.charts = new Map();
  }
  
  // Simple bar/line charts
  createChart(containerId, type, data, config) {
    const ctx = document.getElementById(containerId).getContext('2d');
    const chart = new Chart(ctx, { type, data, options: config });
    this.charts.set(containerId, chart);
    return chart;
  }
  
  // Custom D3 visualization (Phase 3+)
  createDependencyMap(containerId, dependencyData) {
    const svg = d3.select(`#${containerId}`).append('svg');
    // D3 implementation here
  }
  
  // Timeline visualization
  createTimeline(containerId, phaseData) {
    // Chart.js Gantt or custom SVG timeline
  }
}

export const vizManager = new VisualizationManager();
```

---

## SECTION 6: EXPORT & PDF GENERATION

### Multi-Format Export Strategy

```javascript
// src/services/export.js
class ExportService {
  // Excel export using SheetJS
  async exportToExcel(data, filename) {
    const workbook = XLSX.utils.json_to_sheet(data);
    XLSX.writeFile(workbook, filename);
  }
  
  // PDF export using jsPDF + html2pdf
  async exportToPDF(htmlElement, filename) {
    const pdf = new jsPDF();
    const canvas = await html2canvas(htmlElement);
    pdf.addImage(canvas, 'PNG', 0, 0);
    pdf.save(filename);
  }
  
  // CSV export
  async exportToCSV(data, filename) {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  }
  
  // AI-generated narrative (Phase 4)
  async generateAIProposal(scenarioData, apiKey) {
    const response = await fetch('/api/generate-proposal', {
      method: 'POST',
      body: JSON.stringify({ scenarioData, apiKey })
    });
    return response.json();
  }
}

export const exportService = new ExportService();
```

---

## SECTION 7: CLAUDE API INTEGRATION (PHASE 4)

### Backend Wrapper Pattern

```javascript
// server.js
const Anthropic = require('@anthropic-ai/sdk');

app.post('/api/generate-proposal', async (req, res) => {
  const { scenarioData } = req.body;
  
  const client = new Anthropic({
    apiKey: process.env.CLAUDE_API_KEY
  });
  
  const prompt = buildProposalPrompt(scenarioData);
  
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 4096,
    messages: [
      { role: "user", content: prompt }
    ]
  });
  
  res.json({ 
    narrative: message.content[0].text,
    usage: message.usage
  });
});

function buildProposalPrompt(scenarioData) {
  return `
    Generate a professional FP&A proposal based on this configuration:
    - Industry: ${scenarioData.industry}
    - Modules Selected: ${scenarioData.modules.join(', ')}
    - Team Size: ${scenarioData.teamSize}
    - Duration: ${scenarioData.duration} months
    
    Include sections on:
    1. Executive Summary
    2. Business Opportunity
    3. Solution Architecture
    4. Implementation Timeline
    5. Expected Outcomes & ROI
  `;
}
```

---

## SECTION 8: CODE ORGANIZATION & BUILD STRATEGY

### For Phases 1-3 (Vanilla + Tailwind v4)

**No build step required.** Use file:// imports in HTML:

```html
<script type="module">
  import { stateManager } from './src/core/state.js';
  import { storageManager } from './src/core/storage.js';
  import { vizManager } from './src/services/visualization.js';
  
  window.app = { stateManager, storageManager, vizManager };
</script>
```

**Tailwind v4 config file (already in place):**
```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.js'],
  theme: { extend: { /* ... */ } }
}
```

Build Tailwind locally:
```bash
npm run build:css
# Input: src/styles/index.css
# Output: public/styles.min.css
```

### For Phases 4-5 (Vue.js + Vite)

**Build setup for Phase 4:**

```javascript
// vite.config.js
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'esnext',
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'pinia'],
          'visualization': ['chart.js', 'd3']
        }
      }
    }
  }
})
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "vite",
    "build:css": "tailwindcss -i ./src/styles/index.css -o ./public/styles.css",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "pinia": "^2.1.0",
    "chart.js": "^4.4.0",
    "d3": "^7.8.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## SECTION 9: MIGRATION PATH (MINIMAL REFACTORING)

### Week 1-2: Restructure Vanilla JS

**Current state (app.js):** 1,216 LOC, monolithic  
**Target state:** Modular files with event-based updates

1. Extract `state.js` → Initialize stateManager
2. Create `modules/phase1/*.js` → Separate sidebar, views, costs
3. Create `services/visualization.js` → Centralize chart logic
4. Add `core/events.js` → Replace direct DOM manipulation with subscriptions

**Estimated additions:** +400 LOC (refactoring)

### Week 3: Phase 1 Features (Vanilla)

1. Implement persistent sidebar with stateManager
2. Build stakeholder view cards with localStorage
3. Add cost transparency module
4. Mobile redesign with Tailwind v4 configs

**Estimated additions:** +600 LOC

### Week 4-6: Phases 2-3 (Vanilla + D3)

1. Comparison matrix (data transformation + table UI)
2. Scenario management (localStorage orchestration)
3. Risk framework visualization (D3.js)
4. Interactive timeline (Chart.js or custom SVG)

**Estimated additions:** +800 LOC

### Week 7-8: Phase 4 Preparation (Vue.js Setup)

1. Create `vite.config.js`
2. Build AI Generator form component (Vue.js)
3. Set up Pinia stores
4. Integrate Claude API wrapper

**Estimated additions:** +500 LOC (Vue)

### Week 9-10: Phase 4 Features (Vue.js)

1. AI proposal generator form
2. Integrations marketplace UI
3. Case studies gallery
4. Export template selector

**Estimated additions:** +700 LOC (Vue)

### Week 11-12: Phase 5 Polish

1. Mobile optimization (Tailwind v4 breakpoints)
2. Performance optimization (lazy loading, code splitting)
3. Accessibility audit + fixes (ARIA labels, keyboard nav)

**Estimated additions:** +300 LOC

---

## SECTION 10: PHASE-BY-PHASE CODE BUDGET

| Phase | Vanilla LOC | Vue LOC | Services LOC | Total New LOC | Total Project LOC |
|-------|------------|---------|--------------|--------------|------------------|
| Current | 1,216 | 0 | 1,794 | — | 3,010 |
| Phase 1 | +600 | 0 | +300 | +900 | 3,910 |
| Phase 2 | +400 | 0 | +400 | +800 | 4,710 |
| Phase 3 | +500 | 0 | +500 | +1,000 | 5,710 |
| Phase 4 | +300 | +700 | +400 | +1,400 | 7,110 |
| Phase 5 | +200 | +200 | +100 | +500 | 7,610 |

---

## SECTION 11: LIBRARY RECOMMENDATIONS

### Phase 1-3 (Vanilla Focus)

| Library | Purpose | Size | Priority |
|---------|---------|------|----------|
| **Tailwind CSS v4** | Styling | 4KB | ✅ Already used |
| **Chart.js** | Bar/line/pie charts | 60KB | ✅ High |
| **D3.js v7** | Custom visualizations | 200KB (full) | ⚠️ Phase 3 |
| **SheetJS** | Excel export | 150KB | ✅ Phase 2 |
| **jsPDF + html2canvas** | PDF generation | 100KB combined | ✅ Phase 3 |

### Phase 4-5 (Vue.js)

| Library | Purpose | Size | Priority |
|---------|---------|------|----------|
| **Vue.js 3** | Component framework | 34KB | ✅ Phase 4 |
| **Pinia** | State management | 15KB | ✅ Phase 4 |
| **Vite** | Build tool | — | ✅ Phase 4 |
| **Plotly.js** | Advanced dashboards | 200KB | ⚠️ Optional Phase 5 |

### Avoid Adding
- Redux (too much for this scope)
- Material-UI (conflicts with custom Tailwind design)
- TypeScript (adds compilation step, not necessary yet)

---

## SECTION 12: IMPLEMENTATION PRIORITIES

### Priority 1 (Minimum Viable)
1. Refactor app.js into modules (state + services)
2. Phase 1 features (sidebar, stakeholder views, costs, mobile)
3. localStorage scenario management

### Priority 2 (High Value)
1. Chart.js visualizations for Phase 2-3
2. Scenario comparison matrix
3. Risk framework D3 visualization

### Priority 3 (Nice-to-Have)
1. Vue.js for Phase 4 (can stay vanilla if schedule tight)
2. Claude API integration
3. Advanced PDF export templates

---

## SECTION 13: DEPLOYMENT & PERFORMANCE

### Recommended Deploy Strategy

**Phases 1-3:** Static hosting (Vercel, Netlify, AWS S3 + CloudFront)
- No build step needed
- Push index.html + /src + /public

**Phase 4+:** Node.js + CDN
- Build Vue with Vite
- Deploy to Render, Railway, or AWS Lambda + API Gateway
- CloudFront for static assets

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| FCP | < 1.5s | Optimized HTML + inline critical CSS |
| LCP | < 2.5s | Lazy-load visualizations |
| TTI | < 3s | Defer non-critical JS |
| Core Web Vitals | All Green | Tailwind v4 built-in optimizations |

### Code Splitting Strategy (Phase 4+)

```javascript
// main.js
// Route-based code splitting
const Phase4 = import('./modules/phase4/AIGenerator.vue');
const Phase5 = import('./modules/phase5/Dashboard.vue');

// Visualization splitting
const ChartLibs = import('chart.js');
const D3Libs = import('d3');
```

---

## SECTION 14: TESTING & QA STRATEGY

### Unit Testing (Optional but Recommended)

```javascript
// Install vitest (lightweight)
npm install --save-dev vitest

// src/core/__tests__/state.test.js
import { describe, it, expect } from 'vitest';
import { stateManager } from '../state.js';

describe('StateManager', () => {
  it('should update state immutably', () => {
    stateManager.setState('industry', 'publisher');
    expect(stateManager.state.industry).toBe('publisher');
  });
});
```

### Integration Testing

Test scenario saving/loading and export functions with simple Cypress tests.

### Manual Testing Checklist (by Phase)

**Phase 1:** Sidebar persistence, mobile layouts, cost updates  
**Phase 2:** Scenario comparison, educational content rendering  
**Phase 3:** Risk visualization, timeline accuracy  
**Phase 4:** Claude API latency, export quality  
**Phase 5:** Mobile interactions, accessibility compliance  

---

## SECTION 15: RISK MITIGATION

### Risk 1: State Management Complexity
**Mitigation:** Implement custom state manager early (Week 1-2). Test with 5+ scenarios before Phase 4.

### Risk 2: Visualization Library Conflicts
**Mitigation:** Test D3 + Chart.js together in Phase 2. Isolate D3 in separate `<div>` containers.

### Risk 3: localStorage Quota Exceeded
**Mitigation:** Limit scenario storage to 5MB. Implement compression for large datasets. Provide "cloud sync" option.

### Risk 4: Vue.js Migration Friction (Phase 4)
**Mitigation:** Build Vue components in isolation. Keep vanilla JS + Vue.js coexisting until Phase 4 fully stable. Use Custom Elements if needed.

### Risk 5: Claude API Rate Limits
**Mitigation:** Implement client-side caching. Add queue mechanism for concurrent requests. Use lower token limits for early iterations.

---

## SECTION 16: FINAL RECOMMENDATIONS

### Go/No-Go Decision Matrix

| Decision | Recommendation | Rationale |
|----------|---|---|
| **Framework upgrade?** | Vue.js for Phases 4-5 only | Minimal disruption, maximum benefit |
| **Build tool?** | Skip until Phase 4, use Vite then | No build step = faster iteration Phases 1-3 |
| **State library?** | Custom manager (not Redux) | Tailored to scenario + export requirements |
| **Styling?** | Stick with Tailwind CDN for Phases 1-3 | Already working, no overhead |
| **Visualization?** | Chart.js (Phase 2) + D3 (Phase 3) | Light + flexible combination |
| **Data persistence?** | localStorage + optional backend (Phase 4) | Offline-first, scalable to multi-device |
| **TypeScript?** | Skip (not needed for this scope) | Adds compilation step, minimal safety benefit |

### Tech Stack Summary

```
┌─────────────────────────────────────────────────────────┐
│ PHASES 1-3: Vanilla + Tailwind + Service Layer          │
├─────────────────────────────────────────────────────────┤
│ HTML5 + Vanilla JS (refactored modules)                 │
│ Tailwind CSS v4 (config file + CDN optional)            │
│ State Manager (custom, 300 LOC)                         │
│ Services: visualization, export, storage, events        │
│ Libraries: Chart.js, SheetJS, jsPDF, D3                 │
│ Hosting: Static (Vercel, Netlify, S3+CF)               │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│ PHASES 4-5: Add Vue.js + Build Pipeline                 │
├─────────────────────────────────────────────────────────┤
│ Vue.js 3 (Pinia state management)                       │
│ Vite (build + dev server)                               │
│ AI Generator + Integrations (Vue components)            │
│ Claude API integration (Express wrapper)                │
│ Express.js (static server + API routes)                 │
│ Hosting: Node.js container (Render, Railway)            │
└─────────────────────────────────────────────────────────┘
```

---

## APPENDIX A: CODE EXAMPLES

### Example 1: Refactored App Initialization

```javascript
// src/app.js (refactored, Phase 1)
import { stateManager } from './core/state.js';
import { storageManager } from './core/storage.js';
import { vizManager } from './services/visualization.js';
import { eventBus } from './core/events.js';
import * as Phase1 from './modules/phase1/index.js';

document.addEventListener('DOMContentLoaded', () => {
  // Initialize
  stateManager.init();
  storageManager.restore();
  
  // Load previous scenario if exists
  const lastScenario = storageManager.loadScenario('last-active');
  if (lastScenario) {
    stateManager.restoreState(lastScenario);
  }
  
  // Render Phase 1 components
  Phase1.renderSidebar();
  Phase1.renderStakeholderViews();
  Phase1.renderCostTransparency();
  Phase1.renderMobileLayout();
  
  // Subscribe to state changes
  eventBus.on('scenario:changed', () => {
    Phase1.updateAllViews();
    storageManager.saveScenario('last-active', stateManager.state);
  });
});
```

### Example 2: Phase 2 Scenario Comparison

```javascript
// src/modules/phase2/scenario-mgmt.js
export function compareScenarios(scenario1Id, scenario2Id) {
  const s1 = stateManager.state.scenarios[scenario1Id];
  const s2 = stateManager.state.scenarios[scenario2Id];
  
  const comparison = {
    modules: {
      only_in_s1: s1.modules.filter(m => !s2.modules.includes(m)),
      only_in_s2: s2.modules.filter(m => !s1.modules.includes(m)),
      common: s1.modules.filter(m => s2.modules.includes(m))
    },
    costs: {
      s1_total: calculateCosts(s1),
      s2_total: calculateCosts(s2),
      difference: calculateCosts(s2) - calculateCosts(s1)
    },
    duration: {
      s1: s1.duration,
      s2: s2.duration
    }
  };
  
  renderComparisonMatrix(comparison);
  return comparison;
}
```

### Example 3: Phase 4 Claude API Integration

```javascript
// src/services/claudeAPI.js
export async function generateProposal(scenarioConfig) {
  const response = await fetch('/api/generate-proposal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      scenario: scenarioConfig,
      maxTokens: 2048
    })
  });
  
  const data = await response.json();
  
  // Cache result
  storageManager.saveProposal(scenarioConfig.id, data);
  
  return data;
}

// Phase 4 Vue.js component
<template>
  <form @submit.prevent="generateProposal">
    <input v-model="scenario.title" placeholder="Proposal Title" />
    <button type="submit" :disabled="loading">
      {{ loading ? 'Generating...' : 'Generate Proposal' }}
    </button>
    <div v-if="result" class="prose">
      {{ result.narrative }}
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { generateProposal } from '@/services/claudeAPI.js';

const scenario = ref({});
const loading = ref(false);
const result = ref(null);

async function generateProposal() {
  loading.value = true;
  result.value = await generateProposal(scenario.value);
  loading.value = false;
}
</script>
```

---

## CONCLUSION

This architecture provides:

✅ **Minimal disruption** to current codebase (Phases 1-3 stay vanilla)  
✅ **Scalability** for complex state + multiple scenarios  
✅ **Flexibility** to adopt Vue.js when needed (Phase 4)  
✅ **Performance** through lazy loading and code splitting  
✅ **Maintainability** via modular file structure  
✅ **Cost efficiency** no unnecessary dependencies  

**Recommended next step:** Begin refactoring app.js into modules (Week 1-2) while building Phase 1 features in parallel.

