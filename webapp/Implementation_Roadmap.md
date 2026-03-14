# FP&A Automation — Implementation Roadmap (12-Week Sprint)

## PHASE-BY-PHASE EXECUTION PLAN

### WEEK 1-2: Foundation Refactoring (Vanilla JS Restructuring)

**Goal:** Convert monolithic app.js into modular architecture without changing functionality.

**Tasks:**
1. Create directory structure: `src/core`, `src/modules`, `src/services`, `src/components`, `src/utils`
2. Extract state management → `src/core/state.js` (300 LOC)
3. Extract event system → `src/core/events.js` (150 LOC)
4. Extract storage → `src/core/storage.js` (200 LOC)
5. Extract API layer → `src/core/api.js` (100 LOC)
6. Create `src/services/visualization.js` (initial setup, 100 LOC)
7. Move `data.js` to `src/data.js`
8. Update `index.html` to import modular JS
9. Test all existing functionality works

**Deliverable:** Same app.js behavior, now modularized. All Phase 1 features ready for development.

**New LOC:** +400 (net change ~0, just reorganization + scaffolding)

---

### WEEK 3: Phase 1 Development (440 hours → 110 hours)

**Features:**
1. **Persistent Sidebar** (80 hours)
   - Location: `src/modules/phase1/sidebar.js`
   - State: `sidebarCollapsed`, `sidebarWidth`, `expandedSection`
   - localStorage key: `fpa_sidebar_state`
   - Implementation: Toggle button + CSS transitions (already in Tailwind)

2. **Stakeholder Views** (90 hours)
   - Location: `src/modules/phase1/stakeholder-views.js`
   - Create filter tabs: Finance, Operations, Executive
   - Customizable dashboard cards per stakeholder
   - localStorage: `fpa_stakeholder_prefs`

3. **Cost Transparency Module** (100 hours)
   - Location: `src/modules/phase1/cost-transparency.js`
   - Breakdown: team costs, tools, infrastructure, contingency
   - Real-time calculator (no visualization yet)
   - localStorage: `fpa_cost_config`

4. **Mobile Redesign** (90 hours)
   - Use Tailwind v4 responsive utilities (`md:`, `lg:`, `sm:`)
   - Touch-friendly buttons (44px minimum)
   - Collapsible sections for narrow screens
   - Test on 375px, 768px, 1280px breakpoints

**New LOC:** +600

**Test Checklist:**
- Sidebar persists on page reload
- Stakeholder view switches without data loss
- Cost updates trigger all dependent views
- Mobile layout responsive at 375px

---

### WEEK 4-5: Phase 2 Development (210 hours → 50 hours)

**Features:**

1. **Comparison Matrix** (100 hours)
   - Location: `src/modules/phase2/comparison-matrix.js`
   - Compare up to 3 scenarios side-by-side
   - Table UI: modules, costs, duration, risks, resources
   - localStorage: `fpa_scenarios`

2. **Scenario Management** (70 hours)
   - Location: `src/modules/phase2/scenario-mgmt.js`
   - Create/load/save/delete scenarios
   - Clone existing scenario
   - Export scenario as JSON
   - stateManager integration: `createScenario()`, `switchScenario()`, `deleteScenario()`

3. **Educational Content** (40 hours)
   - Location: `src/modules/phase2/educational-content.js`
   - Inline tooltips for each module (hover/click)
   - "Why this matters" cards for cost/risk/timeline
   - Collapsible "Learn More" sections

**New LOC:** +400 (scenario mgmt logic)

**State additions:**
```javascript
state.scenarios = {
  'default': { modules: [], costs: {}, ...},
  'user-scenario-1': {...}
};
state.currentScenario = 'default';
```

---

### WEEK 6-7: Phase 3 Development (320 hours → 80 hours)

**Features:**

1. **Risk Framework** (100 hours)
   - Location: `src/modules/phase3/risk-framework.js`
   - Risk matrix: likelihood vs. impact
   - Risk library per scenario (schedule, budget, scope, resource, integration)
   - Risk mitigation suggestions

2. **Architecture Visualization** (110 hours)
   - Location: `src/modules/phase3/visualization.js`
   - Add Chart.js for initial dashboard (bar charts, KPIs)
   - Timeline visualization (Gantt-style, HTML table + CSS)
   - Dependency map (D3.js, Phase 3b → Week 6.5)

3. **Interactive Timeline** (110 hours)
   - Gantt chart: phases, milestones, dependencies
   - Hover to see phase details
   - Scroll-dependent highlight (current phase)
   - Export timeline as image

**Library additions:**
```bash
npm install chart.js html2canvas jspdf
npm install --save-dev d3  # Phase 3b only
```

**New LOC:** +500 (viz logic + D3 utilities)

**Test Checklist:**
- Chart.js renders without errors
- D3 dependency map loads correctly
- Timeline updates when scenario changes

---

### WEEK 8: Phase 4 Preparation (400 hours → 50 hours setup)

**Setup Tasks:**
1. Initialize Vite + Vue.js
2. Create `vite.config.js`
3. Set up `src/main.vue.js` entry point
4. Create Pinia store structure: `src/stores/appStore.js`
5. Verify vanilla JS + Vue.js can coexist
6. Add Claude API secret to `.env`

**package.json updates:**
```json
{
  "dependencies": {
    "vue": "^3.4.0",
    "pinia": "^2.1.0",
    "@anthropic-ai/sdk": "^0.24.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.0.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

**New LOC:** +500 (boilerplate + config)

---

### WEEK 9: Phase 4 Features Part 1 (400 hours → 100 hours)

**Features:**

1. **AI Proposal Generator** (120 hours)
   - Location: `src/modules/phase4-vue/AIGenerator.vue`
   - Form inputs: scenario selection, tone, focus areas
   - Server endpoint: `POST /api/generate-proposal`
   - Stream response (Claude API) to textarea
   - Cache results in localStorage + backend (optional)

2. **Integrations Marketplace** (60 hours)
   - Location: `src/modules/phase4-vue/IntegrationsHub.vue`
   - Integration cards: data source, API endpoint, setup instructions
   - Demo: 5-10 pre-configured integrations
   - (Actual API connections: Phase 5)

**Backend additions** (server.js):
```javascript
const Anthropic = require('@anthropic-ai/sdk');
const client = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });

app.post('/api/generate-proposal', async (req, res) => {
  const { scenario } = req.body;
  const prompt = buildProposalPrompt(scenario);
  const message = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2048,
    messages: [{ role: "user", content: prompt }]
  });
  res.json({ narrative: message.content[0].text, tokens: message.usage });
});
```

**New LOC:** +400 (Vue components + API routes)

---

### WEEK 10: Phase 4 Features Part 2 (400 hours → 100 hours)

**Features:**

1. **Case Studies Gallery** (70 hours)
   - Location: `src/modules/phase4-vue/CaseStudies.vue`
   - Grid of case studies: industry, challenge, solution, results
   - Modal for detail view
   - Filter by industry (Agency/Publisher)
   - localStorage: `fpa_case_studies_viewed`

2. **Export Templates** (80 hours)
   - Location: `src/modules/phase4-vue/ExportTemplates.vue`
   - Template selector: executive summary, detailed proposal, data sheet
   - PDF generation (jsPDF + html2canvas)
   - Excel export (SheetJS) with formatted tables

**Services update** (src/services/export.js):
```javascript
async function exportProposalPDF(scenario, template) {
  const html = generateProposalHTML(scenario, template);
  const canvas = await html2canvas(document.querySelector('#export-container'));
  const pdf = new jsPDF();
  pdf.addImage(canvas, 'PNG', 0, 0);
  pdf.save(`Proposal-${scenario.name}.pdf`);
}
```

**New LOC:** +300 (Vue templates + export logic)

---

### WEEK 11: Phase 5 - Polish & Performance (200 hours → 50 hours)

**Features:**

1. **Mobile Optimization** (60 hours)
   - Fine-tune touch interactions (hover → click)
   - Optimize modal/drawer sizes for mobile
   - Test on Safari iOS, Chrome Android
   - Fix any Tailwind v4 responsive issues

2. **Performance** (50 hours)
   - Lazy-load Chart.js, D3.js, jsPDF only when needed
   - Code split by phase in Vite
   - Cache API responses (5-minute TTL)
   - Optimize images/SVGs

3. **Accessibility** (40 hours)
   - Add ARIA labels to all interactive elements
   - Keyboard navigation: Tab, Enter, Esc, Arrow keys
   - Color contrast check (WCAG AA minimum)
   - Screen reader testing

**Code splitting (vite.config.js):**
```javascript
rollupOptions: {
  output: {
    manualChunks: {
      'phase1': ['./src/modules/phase1/index.js'],
      'phase2': ['./src/modules/phase2/index.js'],
      'phase3': ['./src/modules/phase3/index.js'],
      'phase4': ['./src/modules/phase4-vue/index.js'],
      'viz': ['chart.js', 'd3'],
      'export': ['jspdf', 'html2canvas']
    }
  }
}
```

**New LOC:** +300 (a11y fixes, perf hooks)

---

### WEEK 12: Integration & QA (200 hours → 50 hours)

**Tasks:**
1. End-to-end testing: all phases working together
2. Cross-browser testing (Chrome, Firefox, Safari)
3. Mobile testing (iOS + Android)
4. Performance audit (Lighthouse)
5. Fix bugs from QA
6. Prepare demo

**Performance Targets:**
- Lighthouse Performance: 85+
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1

---

## SUMMARY TABLE

| Week | Phase | Feature | Hours | Vanilla LOC | Vue LOC | Services LOC | Total LOC |
|------|-------|---------|-------|-------------|---------|--------------|-----------|
| 1-2 | Setup | Refactor architecture | 80 | +400 | 0 | 0 | 3,410 |
| 3 | 1 | Sidebar, stakeholder, costs, mobile | 110 | +600 | 0 | +300 | 4,310 |
| 4-5 | 2 | Comparison, scenarios, education | 50 | +400 | 0 | +400 | 5,110 |
| 6-7 | 3 | Risk, visualization, timeline | 80 | +500 | 0 | +500 | 6,110 |
| 8 | 4 Setup | Vue + Vite + Pinia + API | 50 | 0 | +300 | +200 | 6,660 |
| 9 | 4a | AI generator, integrations | 100 | 0 | +400 | +300 | 7,360 |
| 10 | 4b | Case studies, exports | 100 | 0 | +300 | +200 | 7,860 |
| 11 | 5 | Mobile, perf, a11y | 50 | +200 | +200 | +100 | 8,360 |
| 12 | QA | Testing & polish | 50 | 0 | 0 | 0 | 8,360 |
| **TOTAL** | | | **670 hrs** | **+2,100** | **+1,200** | **+2,000** | **8,360** |

---

## KEY MILESTONES

✅ **Week 2 EOD:** Modular architecture complete, app.js refactored  
✅ **Week 5 EOD:** Phases 1-2 complete with all core features  
✅ **Week 7 EOD:** Phase 3 visualizations working (Chart.js + D3)  
✅ **Week 8 EOD:** Vue.js + Vite + Pinia working alongside vanilla  
✅ **Week 10 EOD:** Phase 4 AI generator + exports working  
✅ **Week 12 EOD:** All phases polished, accessible, performant, ready for production

---

## DEPLOYMENT CHECKLIST

- [ ] Environment variables configured (.env)
- [ ] Claude API key secured
- [ ] localStorage quota tested (5+ large scenarios)
- [ ] Mobile tested on real devices
- [ ] Performance audit passed (Lighthouse 85+)
- [ ] Accessibility audit passed (WCAG AA)
- [ ] Cross-browser tested
- [ ] Error handling tested
- [ ] Rate limiting configured
- [ ] Staging environment mirrors production

---

## ESTIMATED EFFORT vs. YOUR 1,570 HOURS

**Actual work:** ~670 hours (refactoring + features + testing)  
**Buffer/contingency:** ~400 hours (30% buffer)  
**Optional enhancements:** ~500 hours (advanced features, polish, edge cases)

**You have:** 1,570 hours  
**Planned use:** 670 hours  
**Available for:** Advanced features, integrations, custom visualizations, training, deployment

