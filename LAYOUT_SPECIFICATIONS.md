# FP&A Automation Platform: Layout & Wireframe Specifications

## Phase 1 Layout Designs (Tier 1 Priority)

### 1. Desktop Layout - Current State
```
┌─────────────────────────────────────────────────────────────┐
│ FP&A Logo   | Use Cases | Architecture | Cost | Proposal     │ (Navigation)
│ Industry Toggle [Agency|Publisher]         Get Quote CTA    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│                  [Page Content - Full Width]                 │
│                  (Linear scrolling: Hero → Context →         │
│                   Use Cases → Architecture → Scope/Team →   │
│                   Tech → Cost → Timeline → Summary/Proposal) │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 2. Desktop Layout - Proposed (Phase 1)
```
┌───────────────────────────────────────────────────────────────────┐
│ FP&A Logo | [Minimize Sidebar]                  [Get Quote CTA]   │
├────────────┬────────────────────────────────────────────────────┤
│ SIDEBAR    │                                                     │
│ (280px)    │            MAIN CONTENT AREA                        │
│            │                                                     │
│ NAVIGATION │  [Hero Section with Context]                       │
│ ✓ Use Cases│                                                     │
│ ✓ Arch     │  [Selected Content Based on View Mode]             │
│ ✓ Scope    │  (Executive | Technical | Financial)              │
│ ✓ Cost     │                                                     │
│ ✓ Timeline │  [Current State Summary]                            │
│ ✓ Tech     │  Industry: Agency | Team: Medium | Duration: 9mo   │
│ ✓ Summary  │  Cost: $225K | Timeline: 12 weeks                  │
│            │                                                     │
│ STATE      │  [Page Content - Responsive]                       │
│ ─────────  │                                                     │
│ Industry   │                                                     │
│  ○ Agency  │                                                     │
│  ○ Pub     │                                                     │
│            │                                                     │
│ Team Size  │                                                     │
│  ○ Small   │                                                     │
│  ○ Medium  │                                                     │
│  ○ Large   │                                                     │
│            │                                                     │
│ Duration   │  [References Panel - Sticky]                       │
│  [Slider]  │  (Cost Summary | Quick Stats | Next Steps)        │
│  9 months  │                                                     │
│            │                                                     │
│ SCENARIOS  │                                                     │
│ ─────────  │                                                     │
│ Save Cfg   │                                                     │
│ Load Cfg   │                                                     │
│ Compare    │                                                     │
│            │                                                     │
│ EXPORT     │                                                     │
│ ─────────  │                                                     │
│ Gamma PDF  │                                                     │
│ JSON       │                                                     │
│ Cost Sheet │                                                     │
│            │                                                     │
│ SETTINGS   │                                                     │
│ ─────────  │                                                     │
│ ○ Light    │                                                     │
│ ○ Dark     │                                                     │
│            │                                                     │
└────────────┴────────────────────────────────────────────────────┘
```

### 3. Tablet Layout (640-1024px)
```
┌─────────────────────────────────────────┐
│ [Menu] FP&A         [Get Quote]         │
├─────────────────────────────────────────┤
│                                          │
│    [Main Content - Full Width]           │
│                                          │
│    [Sidebar Collapsed, Drawer on Menu]   │
│                                          │
│    Sections:                             │
│    [Use Cases Grid - 2 Column]           │
│    [Cost Summary - Sticky Bottom]        │
│    [Architecture - Accordion]            │
│                                          │
└─────────────────────────────────────────┘

[Menu Drawer (on click)]
┌──────────────────┐
│ ✓ Use Cases      │
│ ✓ Architecture   │
│ ✓ Scope          │
│ ✓ Cost           │
│ ✓ Timeline       │
│ ✓ Tech           │
│ ✓ Summary        │
│                  │
│ Scenarios        │
│  [Save Config]   │
│  [Load Config]   │
│                  │
│ Export           │
│  [PDF]           │
│  [JSON]          │
│                  │
│ Settings         │
│  ☀ Light / Dark  │
└──────────────────┘
```

### 4. Mobile Layout (< 640px)
```
┌────────────────────┐
│ ☰  FP&A    [Quote] │
├────────────────────┤
│ [Industry Toggle]  │
│ Agencies|Publishers│
├────────────────────┤
│   QUICK ACTIONS    │
│ ┌──────┐ ┌──────┐  │
│ │  📋  │ │  ⚙️   │ │
│ │Cases │ │Config │ │
│ └──────┘ └──────┘  │
│ ┌──────┐ ┌──────┐  │
│ │  💰  │ │  📤  │ │
│ │ Cost │ │Export│ │
│ └──────┘ └──────┘  │
├────────────────────┤
│  [Floating Cost    │
│   Summary Sticky]  │
│  $225K | 12 weeks  │
│  [Expand ▼]        │
├────────────────────┤
│ [Page Content]     │
│ (Stacked, Wizard)  │
│                    │
│ ═════════════════  │
│ Use Cases          │
│ [Card 1]           │
│ [Card 2]           │
│ [Card 3]           │
│ ═════════════════  │
│ [More Content...]  │
│                    │
└────────────────────┘

[Hamburger Menu Expanded]
┌────────────────────┐
│ ✕                  │
├────────────────────┤
│ Use Cases          │
│ Architecture       │
│ Scope & Team       │
│ Cost & Timeline    │
│ Tech Stack         │
│ Summary & Proposal │
├────────────────────┤
│ Scenarios          │
│  Save Configuration│
│  Load Configuration│
│  Compare Scenarios │
├────────────────────┤
│ Export             │
│  Gamma PDF         │
│  JSON Config       │
│  Cost Spreadsheet  │
├────────────────────┤
│ Settings           │
│  ☀ Light / Dark    │
└────────────────────┘
```

---

## Stakeholder View Layout (Phase 1)

### Executive View (5-page PDF)
```
PAGE 1: HERO SECTION
┌─────────────────────────────────────┐
│ FP&A Automation for Agencies         │
│ Unlock $15M+ in Annual Savings       │
│ 60% Faster Forecasting              │
│ [Background: Gradient, Icons]        │
│ ────────────────────────────────────│
│ [Key Stats]                          │
│ ROI: 340% | Payback: 8 months       │
│ Team Impact: 70% FP&A time freed    │
└─────────────────────────────────────┘

PAGE 2: STRATEGIC CONTEXT & VALUE PROPOSITION
┌─────────────────────────────────────┐
│ The Challenge                        │
│ • Manual consolidation: 3-5 weeks   │
│ • FP&A teams on data collection     │
│ • No real-time visibility           │
│ • Strategic decisions on stale data │
│                                      │
│ The Opportunity                      │
│ • Real-time consolidated FP&A       │
│ • Automated variance detection      │
│ • Forward-looking forecast agents   │
│ • Board-ready insights in hours     │
└─────────────────────────────────────┘

PAGE 3: FINANCIAL IMPACT
┌─────────────────────────────────────┐
│ Year 1 Investment: $225K             │
│                                      │
│ Year 1 Benefits:                     │
│ • FP&A Labor Savings: $480K         │
│ • Faster Decisions: $200K value     │
│ • Other Benefits: $150K              │
│ Total Year 1: $830K                 │
│                                      │
│ [Timeline Chart: Investment vs      │
│  Benefits across 36 months]          │
│                                      │
│ Payback Period: 8 months             │
│ 3-Year NPV: $2.1M (at 10% discount) │
└─────────────────────────────────────┘

PAGE 4: IMPLEMENTATION TIMELINE & KEY RISKS
┌─────────────────────────────────────┐
│ 4-Phase Implementation               │
│                                      │
│ Phase 1: Assess & Design (Weeks 1-2)│
│ Phase 2: Build & Integrate (Weeks 3-8)
│ Phase 3: Test & Deploy (Weeks 9-11) │
│ Phase 4: Optimize & Support (Weeks12+)
│                                      │
│ Key Risks & Mitigation:              │
│ ⚠️ Data Quality (HIGH)               │
│    → Conduct data audit in Phase 1  │
│    → Establish data governance      │
│                                      │
│ ⚠️ Change Management (MEDIUM)        │
│    → Appoint change sponsor         │
│    → Training program in Phase 3    │
│                                      │
│ ✓ Technical Integration (MEDIUM)     │
│    → API-first integration approach │
│    → Mock environments for testing  │
└─────────────────────────────────────┘

PAGE 5: NEXT STEPS & CTA
┌─────────────────────────────────────┐
│ Recommended Actions                  │
│                                      │
│ 1. Schedule 30-min kickoff call      │
│    (align on scope, team, timeline) │
│                                      │
│ 2. Data readiness assessment        │
│    (understand current systems,     │
│     data quality, dependencies)     │
│                                      │
│ 3. Executive steering committee     │
│    (monthly oversight, decisions)   │
│                                      │
│ Investment: $225K | Timeline: 12 wks│
│ Expected Payback: 8 months          │
│                                      │
│ [Approve Implementation] [Schedule] │
└─────────────────────────────────────┘
```

### Technical View (8-page PDF)
```
PAGE 1-2: ARCHITECTURE DIAGRAM
┌─────────────────────────────────────┐
│ SOLUTION ARCHITECTURE                │
│                                      │
│ ┌────────────────────────────────┐  │
│ │ DATA SOURCES LAYER             │  │
│ │ ├─ ERP (SAP/NetSuite)         │  │
│ │ ├─ Billing System              │  │
│ │ ├─ Reporting Tools             │  │
│ │ └─ External APIs               │  │
│ └────────────────────────────────┘  │
│           ↓ (Data Pipelines)        │
│ ┌────────────────────────────────┐  │
│ │ DATA PLATFORM LAYER            │  │
│ │ ├─ Data Warehouse (Snowflake)  │  │
│ │ ├─ Data Lake (S3)              │  │
│ │ ├─ Transform Layer (dbt)       │  │
│ │ └─ Governance (Collibra)       │  │
│ └────────────────────────────────┘  │
│           ↓ (APIs)                  │
│ ┌────────────────────────────────┐  │
│ │ APPLICATION LAYER              │  │
│ │ ├─ FP&A Dashboard              │  │
│ │ ├─ Reporting Engine            │  │
│ │ ├─ Analytics Platform          │  │
│ │ └─ AI Agents                   │  │
│ └────────────────────────────────┘  │
│           ↓ (API Gateway)           │
│ ┌────────────────────────────────┐  │
│ │ OUTPUT LAYER                   │  │
│ │ ├─ Executive Dashboard         │  │
│ │ ├─ Board Reports               │  │
│ │ ├─ Mobile App                  │  │
│ │ └─ Third-party Integrations    │  │
│ └────────────────────────────────┘  │
└─────────────────────────────────────┘

PAGE 3: INTEGRATION COMPLEXITY MATRIX
┌─────────────────────────────────────┐
│ SYSTEM INTEGRATION REQUIREMENTS      │
│                                      │
│ SAP ERP:                             │
│ │ ✓ Direct API (OData)             │
│ │ ✓ Real-time data sync            │
│ │ Effort: 2 weeks                  │
│ │ Risk: LOW                         │
│                                      │
│ NetSuite:                            │
│ │ ✓ RESTful API                    │
│ │ ✓ Standard connectors available  │
│ │ Effort: 2 weeks                  │
│ │ Risk: LOW                         │
│                                      │
│ Custom Billing System:               │
│ │ → Requires ETL development       │
│ │ → Batch processes (nightly)      │
│ │ Effort: 4 weeks                  │
│ │ Risk: MEDIUM                     │
│                                      │
│ Legacy ERP:                          │
│ │ → Custom EDI/flat file imports   │
│ │ → Reconciliation required        │
│ │ Effort: 6 weeks                  │
│ │ Risk: MEDIUM-HIGH                │
└─────────────────────────────────────┘

PAGE 4: DATA MODEL (ER DIAGRAM)
┌─────────────────────────────────────┐
│ KEY ENTITIES & RELATIONSHIPS         │
│                                      │
│ Companies                             │
│  ├─ Entities                        │
│  ├─ Cost Centers                    │
│  └─ Departments                     │
│                                      │
│ GL Accounts                          │
│  ├─ Chart of Accounts               │
│  ├─ Hierarchies                     │
│  └─ Dimensions                      │
│                                      │
│ Transactions                         │
│  ├─ GL Entries                      │
│  ├─ Intercompany                    │
│  └─ Currency Conversions            │
│                                      │
│ Projects / Clients                   │
│  ├─ Profitability                   │
│  ├─ Time Tracking                   │
│  └─ Billing                         │
│                                      │
│ [Relationship Diagram with          │
│  1:N, M:M relationships shown]      │
└─────────────────────────────────────┘

PAGE 5: TECHNOLOGY STACK RATIONALE
┌─────────────────────────────────────┐
│ RECOMMENDED TECHNOLOGIES & WHY       │
│                                      │
│ Data Warehouse: Snowflake            │
│ ✓ Enterprise FP&A use cases         │
│ ✓ Scales to terabyte data volumes   │
│ ✓ 95% adoption in F2000 (benchmark) │
│ ✓ Cost-effective (per-compute)      │
│                                      │
│ Transform: dbt (Data Build Tool)     │
│ ✓ Version-controlled SQL pipelines  │
│ ✓ Lineage & documentation auto      │
│ ✓ Testing framework built-in        │
│                                      │
│ Orchestration: Airflow               │
│ ✓ Complex DAGs for multi-system     │
│ ✓ Monitoring & alerting             │
│ ✓ Retry logic for failures          │
│                                      │
│ API Gateway: Kong                    │
│ ✓ Rate limiting & security          │
│ ✓ API versioning                    │
│ ✓ Logging & monitoring              │
│                                      │
│ [Rationale for each tech stack      │
│  component: features, costs, risk]  │
└─────────────────────────────────────┘

PAGE 6: SECURITY & COMPLIANCE
┌─────────────────────────────────────┐
│ DATA GOVERNANCE & SECURITY           │
│                                      │
│ Access Control:                      │
│ • Role-based access (RBAC)          │
│ • Row-level security (RLS)          │
│ • Audit logging (all queries)       │
│                                      │
│ Data Protection:                     │
│ • Encryption at rest (AES-256)      │
│ • Encryption in transit (TLS 1.3)   │
│ • Tokenization of sensitive data    │
│                                      │
│ Compliance:                          │
│ • SOX 404 audit logging             │
│ • GDPR data deletion capability     │
│ • HIPAA if applicable               │
│                                      │
│ Disaster Recovery:                   │
│ • Multi-region replication          │
│ • 99.9% uptime SLA                  │
│ • RTO: 1 hour | RPO: 15 minutes    │
└─────────────────────────────────────┘

PAGE 7: IMPLEMENTATION TECHNICAL PHASES
┌─────────────────────────────────────┐
│ PHASE 1: ASSESS & DESIGN (2 weeks)  │
│ • Current system assessment         │
│ • Data mapping & transformation     │
│ • Architecture & design review      │
│ • Identify APIs vs. ETL needs       │
│                                      │
│ PHASE 2: BUILD & INTEGRATE (6 weeks)│
│ • Snowflake environment setup       │
│ • API connectors (SAP, NetSuite)   │
│ • ETL pipelines (legacy systems)   │
│ • Data quality rules & testing     │
│                                      │
│ PHASE 3: TEST & VALIDATE (2 weeks)  │
│ • Reconciliation & balance checks  │
│ • User acceptance testing (UAT)    │
│ • Security & compliance review     │
│ • Performance optimization          │
│                                      │
│ PHASE 4: DEPLOY & MONITOR (Ongoing) │
│ • Production deployment             │
│ • Monitoring setup (alerting)       │
│ • Team training & handoff          │
│ • Optimization & support           │
└─────────────────────────────────────┘

PAGE 8: TECHNICAL RISKS & MITIGATION
┌─────────────────────────────────────┐
│ RISK ASSESSMENT MATRIX               │
│                                      │
│ HIGH: Data Quality Issues            │
│ Likelihood: HIGH | Impact: HIGH      │
│ Mitigation:                          │
│ • Week 1 audit of source data       │
│ • Establish data quality KPIs       │
│ • Automated validation rules         │
│                                      │
│ MEDIUM: API Integration Complexity  │
│ Likelihood: MEDIUM | Impact: MEDIUM │
│ Mitigation:                          │
│ • Use managed connectors (Talend)   │
│ • Test APIs in staging first        │
│ • Rate limit planning                │
│                                      │
│ MEDIUM: Performance at Scale         │
│ Likelihood: MEDIUM | Impact: MEDIUM │
│ Mitigation:                          │
│ • Load testing before production    │
│ • Incremental data migration        │
│ • Query optimization in Phase 4     │
│                                      │
│ LOW: Staff Knowledge Gaps            │
│ Likelihood: LOW | Impact: MEDIUM    │
│ Mitigation:                          │
│ • Vendor training (2 days)          │
│ • Documentation & runbooks          │
│ • Vendor support (first 6 months)   │
└─────────────────────────────────────┘
```

### Financial View (6-page PDF + Excel Model)
```
PAGE 1: COST BREAKDOWN WATERFALL
┌─────────────────────────────────────┐
│ IMPLEMENTATION COST BREAKDOWN        │
│                                      │
│ Fixed Costs:                         │
│ ├─ Platform Setup & License: $50K   │
│ ├─ Infrastructure: $25K              │
│ └─ Tools & Utilities: $15K           │
│ Subtotal Fixed: $90K                │
│                                      │
│ Variable Costs (Team):               │
│ ├─ Project Manager (200 hrs): $20K  │
│ ├─ Solutions Architect (150 hrs):$22K
│ ├─ Data Engineers (400 hrs): $48K   │
│ ├─ Data Analysts (200 hrs): $18K    │
│ ├─ QA/Testing (100 hrs): $9K        │
│ └─ Training/Change Mgmt (100hrs):$10K
│ Subtotal Variable: $127K             │
│                                      │
│ TOTAL IMPLEMENTATION: $217K          │
│                                      │
│ + Change Management Overhead: $32K   │
│ + Contingency (15%): $33K            │
│ ────────────────────────────────     │
│ TOTAL BUDGET RECOMMENDATION: $282K   │
└─────────────────────────────────────┘

PAGE 2: ANNUAL OPERATING COSTS
┌─────────────────────────────────────┐
│ 3-YEAR TOTAL COST OF OWNERSHIP       │
│                                      │
│ Year 1:                              │
│ • Implementation (amortized): $94K   │
│ • Platform Licenses: $60K            │
│ • Infrastructure: $40K               │
│ • Support & Maintenance: $30K        │
│ Year 1 Total: $224K                 │
│                                      │
│ Year 2:                              │
│ • Platform Licenses: $62K (growth)   │
│ • Infrastructure: $45K               │
│ • Support & Maintenance: $35K        │
│ Year 2 Total: $142K                 │
│                                      │
│ Year 3:                              │
│ • Platform Licenses: $65K            │
│ • Infrastructure: $50K               │
│ • Support & Maintenance: $40K        │
│ Year 3 Total: $155K                 │
│                                      │
│ 3-Year TCO: $521K                   │
└─────────────────────────────────────┘

PAGE 3: BENEFIT REALIZATION TIMELINE
┌─────────────────────────────────────┐
│ FP&A LABOR HOUR SAVINGS              │
│                                      │
│ Current State:                       │
│ • Manual consolidation: 120 hrs/mo  │
│ • Variance analysis: 80 hrs/mo      │
│ • Other analytics: 60 hrs/mo        │
│ Total: 260 hrs/month                │
│ = 3,120 hours/year @ $120/hr        │
│ = $374,400 annual cost              │
│                                      │
│ Future State (Y1):                   │
│ • Automated consolidation: 30 hrs/mo│
│ • Automated variance detection:     │
│   40 hrs/mo                          │
│ • AI-enhanced analytics: 50 hrs/mo  │
│ Total: 120 hrs/month (54% reduction)│
│ = 1,440 hours/year @ $120/hr        │
│ = $172,800 annual cost              │
│ = $201,600 SAVINGS Year 1           │
│                                      │
│ [Timeline chart showing month-by-    │
│  month FTE reduction from implementation]
│                                      │
│ Additional Benefits (Year 1):        │
│ • Faster Decision-Making: $150K     │
│ • Improved Forecast Accuracy: $75K  │
│ • Reduced Close Cycle Days: $40K    │
│ Total Year 1 Benefits: $466,600     │
└─────────────────────────────────────┘

PAGE 4: 3-YEAR FINANCIAL PROFILE
┌─────────────────────────────────────┐
│ INVESTMENT vs BENEFITS               │
│                                      │
│ Year 1:                              │
│ Investment: $224K                   │
│ Benefits: $466K (75% realization)   │
│ Net Year 1: $242K                   │
│ ROI: 108%                            │
│                                      │
│ Year 2:                              │
│ Investment: $142K                   │
│ Benefits: $580K (85% realization)   │
│ Net Year 2: $438K                   │
│ Cumulative: $680K                   │
│                                      │
│ Year 3:                              │
│ Investment: $155K                   │
│ Benefits: $620K (90% realization)   │
│ Net Year 3: $465K                   │
│ Cumulative 3-Year: $1.145M          │
│                                      │
│ Key Metrics:                         │
│ • Payback Period: 6 months          │
│ • 3-Year NPV (10% discount): $784K  │
│ • IRR: 165%                          │
│ • Breakeven: Month 6                │
└─────────────────────────────────────┘

PAGE 5: HEADCOUNT & RESOURCE IMPACT
┌─────────────────────────────────────┐
│ FP&A TEAM REDEPLOYMENT               │
│                                      │
│ Current FP&A Team: 8 FTE             │
│ • Director: 1.0 FTE                 │
│ • Senior Analyst: 2.0 FTE           │
│ • Analyst: 3.0 FTE                  │
│ • Data Coordinator: 2.0 FTE         │
│ Total: 8.0 FTE                      │
│                                      │
│ Year 1 After Automation:             │
│ • Director: 1.0 FTE (unchanged)    │
│ • Senior Analyst: 2.0 FTE           │
│ (focus: strategy vs. execution)     │
│ • Analyst: 1.5 FTE (automation)    │
│ (data quality, model refinement)    │
│ • Data Coordinator: 0.5 FTE         │
│ (system maintenance only)           │
│ Total: 5.0 FTE                      │
│                                      │
│ Redeployment Opportunities:          │
│ • 3.0 FTE → Finance Business        │
│   Partners (strategic analytics)    │
│ • Cost savings or FTE retention:    │
│   $360K/year                        │
│                                      │
│ Recommended Approach:                │
│ Year 1: Keep 8 FTE (reposition)    │
│ Year 2: Natural attrition to 6 FTE │
│ Year 3: Stabilize at 5 FTE with    │
│  expanded capabilities             │
└─────────────────────────────────────┘

PAGE 6: SCENARIO ANALYSIS (Sensitivity)
┌─────────────────────────────────────┐
│ FINANCIAL SENSITIVITY ANALYSIS       │
│                                      │
│ SCENARIO 1: CONSERVATIVE             │
│ Implementation Cost: +20% ($269K)    │
│ Benefit Realization: 65% (vs. 75%)   │
│ Payback Period: 9 months             │
│ 3-Year NPV: $512K                    │
│ Probability: 20%                     │
│                                      │
│ SCENARIO 2: BASE CASE                │
│ Implementation Cost: $224K           │
│ Benefit Realization: 75%             │
│ Payback Period: 6 months             │
│ 3-Year NPV: $784K                    │
│ Probability: 50%                     │
│                                      │
│ SCENARIO 3: AGGRESSIVE               │
│ Implementation Cost: -10% ($202K)    │
│ Benefit Realization: 90% (early)     │
│ Payback Period: 4 months             │
│ 3-Year NPV: $1.2M                    │
│ Probability: 30%                     │
│                                      │
│ Expected Value:                      │
│ (20% × $512K) + (50% × $784K) +     │
│ (30% × $1.2M) = $876K (3-year NPV)  │
│                                      │
│ Downside Scenario (10% probability): │
│ Implementation delays, low adoption  │
│ Payback: 15 months                   │
│ 3-Year NPV: $120K (still positive)   │
└─────────────────────────────────────┘

EXCEL MODEL ATTACHED:
- Monthly cash flow projections (36 months)
- Sensitivity tables (cost ±20%, benefits ±20%)
- Break-even analysis
- IRR/NPV calculations
- What-if scenarios (adoption rate, timeline)
- Headcount ramp assumptions
- Licensing cost escalation
```

---

## Component-Level Wireframes (Phase 1)

### Cost Panel Component (Sidebar)
```
┌─────────────────────────────────┐
│ 💰 COST SUMMARY                 │
├─────────────────────────────────┤
│                                  │
│ Total Implementation: $225K      │
│                                  │
│ [Expandable Waterfall]           │
│ ├─ Base Cost: $50K              │
│ ├─ Team Cost: $120K             │
│ ├─ Tech/Tools: $30K             │
│ └─ Contingency: $25K            │
│                                  │
│ [+ Hidden Costs Estimated]       │
│ Change Mgmt (+15%): $34K        │
│ Contingency (+10%): $23K        │
│ ────────────────────────────────│
│ Budget Recommendation: $282K     │
│                                  │
│ [ROI CALCULATOR]                 │
│ Year 1 Benefit: $466K           │
│ Payback Period: 6 months        │
│ 3-Year Cumulative: $1.1M        │
│                                  │
│ [✓ View Full Cost Detail]       │
│ [✓ Compare Scenarios]            │
│ [✓ Download Excel Model]        │
│                                  │
└─────────────────────────────────┘
```

### Use Case Comparison Modal
```
┌────────────────────────────────────────────────┐
│ COMPARE USE CASES                              │
│ [Select up to 4 use cases to compare]         │
├────────────────────────────────────────────────┤
│                                                 │
│ ☑️ Revenue Forecasting                         │
│ ☑️ Client Profitability                        │
│ ☑️ Cash Flow Mgmt                              │
│ ☑️ Campaign Billing                            │
│                                                 │
│ [GENERATE COMPARISON]                          │
│                                                 │
├────────────────────────────────────────────────┤
│ COMPARISON TABLE                               │
├────────────────────────────────────────────────┤
│                 │RF │CP │CF │CB               │
│ ───────────────┼───┼───┼───┼─────────────     │
│ Complexity     │⚠️│ ⚠️│✓ │⚠️ (High|High|Med│
│ Timeline (wks) │12 │8  │6  │11                │
│ Cost ($K)      │250│220│180│280               │
│ Team Size      │Med│Sm │Sm │Med              │
│ Payback (mo)   │8  │9  │6  │10                │
│ Dependencies   │2  │1  │1  │3                 │
│                                                 │
│ [📊 View Full Comparison] [➕ Add to Project]  │
│                                                 │
└────────────────────────────────────────────────┘
```

### Timeline Editor View
```
PHASE GANTT TIMELINE
┌─────────────────────────────────────────────────┐
│ MONTHS: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |...│
├──────────────────────────────────────────────────┤
│ Phase 1: ASSESS & DESIGN                         │
│ ├─ ■■ (Week 1-2) ────────────                    │
│ │ Deliverables: Architecture, team plan        │
│ └─ Milestones: ◇ Kickoff | ◇ Design approval  │
│                                                  │
│ Phase 2: BUILD & INTEGRATE                       │
│ ├─ ■■■■■ (Week 3-8) ──────────────────────     │
│ │ Deliverables: Data pipelines, APIs           │
│ └─ Milestones: ◇ API ready | ◇ Data loaded    │
│                                                  │
│ Phase 3: TEST & VALIDATE                         │
│ ├─ ■■■ (Week 9-11) ───────────                 │
│ │ Deliverables: Test results, UAT sign-off    │
│ └─ Milestones: ◇ UAT complete | ◇ Go-live     │
│                                                  │
│ Phase 4: OPTIMIZE & SUPPORT                      │
│ ├─ ■■■■ (Week 12+) ────────────────────        │
│ │ Deliverables: Performance tuning, docs       │
│ └─ Milestones: ◇ SLA met | ◇ Support handed   │
│                                                  │
│ [📊 Resource View] [⚠️ Risk View] [✏️ Edit]    │
└──────────────────────────────────────────────────┘

RESOURCE UTILIZATION VIEW
┌─────────────────────────────────────────────────┐
│ % ALLOCATION BY ROLE                             │
│ MONTHS: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9│     │
├──────────────────────────────────────────────────┤
│ Project Manager    │████░░░░│░░░░░░░░░░░░░│40%│
│ Solutions Arch     │████░░░░│░░░░░░░░░░░░░│30%│
│ Data Engineers (2) │████████│████░░░░░░░│80%│
│ Data Analysts (2)  │░░░░░░░░│████░░░░░░░│50%│
│ QA/Testing        │░░░░░░░░│░░░░████░░░│40%│
│                                                  │
│ GREEN: 30-70% (healthy)                        │
│ YELLOW: 70-90% (at capacity)                   │
│ RED: >90% (overallocated risk) ⚠️              │
│                                                  │
│ [✏️ Adjust Timeline] [⬇️ Defer Modules]        │
└──────────────────────────────────────────────────┘
```

---

## Mobile Wizard Flow (Phase 1)

### Step 1: Select Use Cases
```
┌────────────────────┐
│ Configuration      │
│ Step 1 of 4        │
├────────────────────┤
│ SELECT USE CASES   │
│ (Max 8)            │
│                    │
│ ☐ Revenue          │
│   Forecasting      │
│ ☑️ Campaign Billing│
│ ☑️ Client Profit   │
│ ☐ Cash Flow Mgmt   │
│ ☐ Supply Path      │
│ ☐ Consolidation    │
│ ☐ AP/AR Optim      │
│ ☐ Commission       │
│                    │
│ Selected: 2 of 8   │
│                    │
│ [CONTINUE >]       │
│ [< BACK]           │
└────────────────────┘
```

### Step 2: Team Size
```
┌────────────────────┐
│ Configuration      │
│ Step 2 of 4        │
├────────────────────┤
│ TEAM SIZE          │
│                    │
│ ○ Small            │
│   (Project Mgr +   │
│    1-2 Eng)        │
│                    │
│ ◉ Medium           │
│   (PM + 3-5 Eng +  │
│    Analyst)        │
│                    │
│ ○ Large            │
│   (PM + Arch +     │
│    6-8 Eng +       │
│    Analyst + QA)   │
│                    │
│ [CONTINUE >]       │
│ [< BACK]           │
└────────────────────┘
```

### Step 3: Duration
```
┌────────────────────┐
│ Configuration      │
│ Step 3 of 4        │
├────────────────────┤
│ DURATION (months)  │
│                    │
│ [═════●════] 9     │
│ Min: 6  Max: 18    │
│                    │
│ Impacts:           │
│ Cost: $225K        │
│ Phases: 4          │
│ Team: Medium       │
│                    │
│ Quick Win Option:  │
│ ☐ Compress to 6    │
│   (Cost +$30K)     │
│                    │
│ [CONTINUE >]       │
│ [< BACK]           │
└────────────────────┘
```

### Step 4: Review
```
┌────────────────────┐
│ Configuration      │
│ Step 4 of 4        │
├────────────────────┤
│ REVIEW & CONFIRM   │
│                    │
│ ✓ Use Cases: 2     │
│   • Campaign       │
│   • Client Profit  │
│                    │
│ ✓ Team: Medium     │
│   • PM, 5 Engineers│
│   • Analyst, QA    │
│                    │
│ ✓ Duration: 9 mo   │
│   • 4 phases       │
│   • Start: Now     │
│                    │
│ ✓ Cost: $225K      │
│   • Payback: 6 mo  │
│   • ROI: 108%      │
│                    │
│ [SAVE & EXPORT]    │
│ [← BACK TO EDIT]   │
└────────────────────┘
```

---

## Color & Typography Specifications

### Dark Theme (Current)
```
Background Colors:
- Primary BG: #0f172a (slate-950)
- Secondary BG: #1e293b (slate-900)
- Tertiary BG: #334155 (slate-700)
- Card BG: #1e1b4b (indigo-950)

Text Colors:
- Primary: #f1f5f9 (slate-100)
- Secondary: #cbd5e1 (slate-300)
- Tertiary: #94a3b8 (slate-400)
- Muted: #64748b (slate-500)

Accent Colors:
- Primary: #6366f1 (indigo-500)
- Secondary: #8b5cf6 (violet-500)
- Success: #10b981 (emerald-500)
- Warning: #f59e0b (amber-500)
- Danger: #ef4444 (red-500)
- Info: #0ea5e9 (sky-500)

Borders:
- Primary: #334155 (slate-700)
- Subtle: #1e293b (slate-900)
```

### Typography Hierarchy
```
Display Large (Hero): 48px / 60px (3rem / 3.75rem) - Bold
Display Medium (Page Title): 36px / 44px (2.25rem / 2.75rem) - Bold
Heading Large (Section): 30px / 36px (1.875rem / 2.25rem) - Semibold
Heading Medium (Card Title): 24px / 28px (1.5rem / 1.75rem) - Semibold
Heading Small: 20px / 24px (1.25rem / 1.5rem) - Semibold
Body: 16px / 24px (1rem / 1.5rem) - Regular
Body Emphasized: 16px / 24px (1rem / 1.5rem) - Semibold
Small: 14px / 20px (0.875rem / 1.25rem) - Regular
Tiny: 12px / 16px (0.75rem / 1rem) - Regular
```

### Spacing Scale
```
xs: 2px
sm: 4px
md: 8px
lg: 16px
xl: 24px
2xl: 32px
3xl: 48px
4xl: 64px
```

---

## Interaction & Motion Specs

### Transitions
- Page fade-in: 0.3s ease-in
- Modal slide-up: 0.4s ease-out
- Hover effects: 0.2s ease
- State changes: 0.15s ease

### Animations
- Accordion expand: 0.3s ease
- Scroll reveal: 0.4s ease-out (staggered)
- Cost waterfall build: 0.8s ease-out (staggered by segment)
- Loading spinner: 1s linear infinite

---

**End of Layout Specifications**

Document for Development Team Kickoff
Ready for Design Tool Implementation (Figma, Adobe XD, or Penpot)
