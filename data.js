// ============================================================
// FP&A AUTOMATION — COMPLETE DATA MODEL
// ============================================================

const DATA = {
    // ----------------------------------------------------------
    // INDUSTRY CONTEXT
    // ----------------------------------------------------------
    context: {
        agency: {
            heroText: "Agency FP&A",
            heroSubtitle: "End-to-end automation for financial planning, forecasting, and analysis — purpose-built for agencies managing complex client portfolios, multi-entity operations, and project-based revenue models.",
            contextItems: [
                { icon: "📊", label: "Revenue Model", value: "Retainer + Project-Based + Performance Fees" },
                { icon: "👥", label: "Entity Structure", value: "Multi-brand holding company with shared services" },
                { icon: "⏱", label: "Close Cycle", value: "Monthly client reporting + quarterly forecasts" },
                { icon: "🔗", label: "Key Systems", value: "ERP, Billing/Time Tracking, CRM, Project Mgmt" }
            ]
        },
        publisher: {
            heroText: "Publisher FP&A",
            heroSubtitle: "Intelligent automation for revenue forecasting, yield optimization, and content monetization analytics — designed for publishers navigating multi-stream digital revenue models.",
            contextItems: [
                { icon: "📊", label: "Revenue Model", value: "Advertising (Programmatic + Direct) + Subscriptions + Licensing" },
                { icon: "👥", label: "Entity Structure", value: "Multi-title portfolio with shared ad operations" },
                { icon: "⏱", label: "Close Cycle", value: "Daily yield reporting + monthly close + quarterly guidance" },
                { icon: "🔗", label: "Key Systems", value: "Ad Server, DMP/CDP, CMS, Subscription Platform, ERP" }
            ]
        }
    },

    // ----------------------------------------------------------
    // BUSINESS USE CASES
    // ----------------------------------------------------------
    useCases: {
        agency: [
            {
                id: "rev-forecast",
                title: "Revenue Forecasting",
                icon: "📈",
                description: "Automated revenue forecasting across client accounts, service lines, and geographies with rolling 12-18 month projections.",
                painPoints: [
                    "Manual spreadsheet consolidation across 20+ entities",
                    "Inconsistent forecast methodologies across teams",
                    "2-3 week lag in revenue visibility"
                ],
                automationValue: [
                    "Real-time pipeline-to-revenue conversion modeling",
                    "ML-based forecast with 95%+ accuracy",
                    "Automated scenario planning (best/base/worst)"
                ],
                kpis: ["Forecast accuracy ↑ 30%", "Close cycle ↓ 60%", "Revenue leakage ↓ 15%"],
                complexity: "high"
            },
            {
                id: "resource-util",
                title: "Resource & Utilization Planning",
                icon: "👥",
                description: "Optimize staffing and utilization rates across client engagements with demand-driven capacity planning.",
                painPoints: [
                    "Over/under-staffing on client accounts",
                    "No visibility into forward utilization",
                    "Manual resource allocation in spreadsheets"
                ],
                automationValue: [
                    "Demand forecasting tied to pipeline and contracts",
                    "Automated utilization dashboards by role/team/office",
                    "Bench optimization and redeployment alerts"
                ],
                kpis: ["Utilization ↑ 8-12%", "Bench cost ↓ 25%", "Staffing time ↓ 50%"],
                complexity: "high"
            },
            {
                id: "client-profit",
                title: "Client Profitability Analysis",
                icon: "💰",
                description: "Granular P&L visibility at the client, project, and campaign level with automated cost allocation.",
                painPoints: [
                    "Indirect costs allocated by gut feel, not data",
                    "Profitability known only at quarter-end",
                    "No real-time margin alerts"
                ],
                automationValue: [
                    "Activity-based costing with automated allocation",
                    "Real-time client margin dashboards",
                    "Automated alerts when margins fall below threshold"
                ],
                kpis: ["Margin visibility from quarterly → daily", "Unprofitable client actions ↑ 40%", "Average margin ↑ 3-5pp"],
                complexity: "medium"
            },
            {
                id: "cash-flow",
                title: "Cash Flow Management",
                icon: "💵",
                description: "Automated cash flow forecasting incorporating retainer billing cycles, project milestones, and vendor payments.",
                painPoints: [
                    "Unpredictable cash position due to mixed billing",
                    "Manual AR/AP reconciliation",
                    "Media pass-through timing mismatches"
                ],
                automationValue: [
                    "13-week rolling cash flow forecast",
                    "Automated AR aging alerts and collection triggers",
                    "Media float optimization engine"
                ],
                kpis: ["Cash forecast accuracy ↑ 40%", "DSO ↓ 8-12 days", "Working capital ↑ 15%"],
                complexity: "medium"
            },
            {
                id: "budget-variance",
                title: "Budget vs. Actual Variance",
                icon: "📊",
                description: "Automated BvA reporting with drill-down capabilities from consolidated to entity to client level.",
                painPoints: [
                    "3+ weeks to produce monthly BvA reports",
                    "No root-cause drill-down capability",
                    "Inconsistent chart of accounts across entities"
                ],
                automationValue: [
                    "Real-time BvA dashboards with auto-commentary",
                    "Automated variance explanation using AI/NLP",
                    "Standardized COA mapping across entities"
                ],
                kpis: ["BvA report time ↓ 80%", "Variance resolution ↓ 50%", "COA consistency 100%"],
                complexity: "medium"
            },
            {
                id: "consolidation",
                title: "Multi-Entity Consolidation",
                icon: "🏢",
                description: "Automated intercompany eliminations, currency translation, and consolidation across holding company entities.",
                painPoints: [
                    "Manual intercompany reconciliation taking 5+ days",
                    "Currency translation errors",
                    "Consolidation adjustments tracked in offline spreadsheets"
                ],
                automationValue: [
                    "Automated IC matching and elimination",
                    "Real-time currency translation with rate feeds",
                    "Audit-ready consolidation trail"
                ],
                kpis: ["Consolidation time ↓ 70%", "IC exceptions ↓ 90%", "Audit prep ↓ 50%"],
                complexity: "high"
            },
            {
                id: "commission",
                title: "Commission & Incentive Comp",
                icon: "🎯",
                description: "Automated commission calculations tied to revenue recognition, client retention, and performance metrics.",
                painPoints: [
                    "Manual commission spreadsheets with frequent errors",
                    "Disputes due to lack of transparency",
                    "No real-time visibility into earned commissions"
                ],
                automationValue: [
                    "Rule-based commission engine with audit trail",
                    "Self-service portal for reps to track earnings",
                    "Automated accrual calculations"
                ],
                kpis: ["Calc errors ↓ 95%", "Disputes ↓ 80%", "Processing time ↓ 70%"],
                complexity: "low"
            },
            {
                id: "scenario-plan",
                title: "Scenario & Strategic Planning",
                icon: "🔮",
                description: "Driver-based financial modeling with Monte Carlo simulation for strategic decision support.",
                painPoints: [
                    "Scenario analysis limited to 2-3 manual cases",
                    "No linkage between operational and financial plans",
                    "Board decks take weeks to prepare"
                ],
                automationValue: [
                    "1000+ scenario Monte Carlo simulation",
                    "Driver-based models linked to operational KPIs",
                    "Automated board-ready output generation"
                ],
                kpis: ["Scenarios per cycle ↑ 100x", "Planning cycle ↓ 40%", "Decision speed ↑ 3x"],
                complexity: "high"
            }
        ],
        publisher: [
            {
                id: "ad-rev-forecast",
                title: "Ad Revenue Forecasting",
                icon: "📈",
                description: "ML-driven ad revenue forecasting across programmatic, direct-sold, and sponsored content with yield optimization signals.",
                painPoints: [
                    "Programmatic revenue highly volatile and hard to predict",
                    "Direct-sold pipeline not integrated with finance forecasts",
                    "Seasonality and market shifts cause 20%+ forecast misses"
                ],
                automationValue: [
                    "ML models trained on historical fill rates, CPM trends, and seasonality",
                    "Pipeline integration for direct-sold booking signals",
                    "Real-time pacing dashboards with variance alerts"
                ],
                kpis: ["Forecast accuracy ↑ 35%", "Revenue leakage ↓ 12%", "Pacing visibility from weekly → real-time"],
                complexity: "high"
            },
            {
                id: "sub-revenue",
                title: "Subscription Revenue Modeling",
                icon: "🔄",
                description: "Cohort-based subscription analytics with churn prediction, LTV modeling, and renewal forecasting.",
                painPoints: [
                    "No cohort-level visibility into subscriber behavior",
                    "Churn detected after the fact, not predicted",
                    "Revenue recognition complex across tiers and promotions"
                ],
                automationValue: [
                    "Automated cohort analysis with behavioral segmentation",
                    "ML churn prediction model with intervention triggers",
                    "Rev rec automation per ASC 606 / IFRS 15"
                ],
                kpis: ["Churn prediction ↑ 40%", "LTV accuracy ↑ 25%", "Rev rec close ↓ 3 days"],
                complexity: "high"
            },
            {
                id: "content-roi",
                title: "Content ROI Analysis",
                icon: "📝",
                description: "Measure financial return on content investment by linking production costs to monetization outcomes.",
                painPoints: [
                    "Content costs tracked in production systems, revenue in ad systems",
                    "No financial attribution at the content-piece level",
                    "Editorial decisions made without financial context"
                ],
                automationValue: [
                    "Automated cost-to-revenue attribution per content piece",
                    "Real-time content P&L dashboards",
                    "AI-powered content investment recommendations"
                ],
                kpis: ["Content ROI visibility from 0% → 100%", "Underperforming content ↓ 30%", "Revenue per content ↑ 20%"],
                complexity: "medium"
            },
            {
                id: "audience-monetize",
                title: "Audience Monetization Planning",
                icon: "👁",
                description: "Unified audience value analytics across advertising, subscriptions, and commerce with segment-level monetization.",
                painPoints: [
                    "Audience data siloed across ad, sub, and commerce systems",
                    "No unified view of audience value",
                    "Monetization strategy decisions based on incomplete data"
                ],
                automationValue: [
                    "Unified audience value scoring across revenue streams",
                    "Segment-level ARPU and monetization mix optimization",
                    "Automated data clean room integration for audience insights"
                ],
                kpis: ["ARPU ↑ 15-20%", "Cross-sell revenue ↑ 25%", "Audience insight latency ↓ 80%"],
                complexity: "high"
            },
            {
                id: "yield-opt",
                title: "Yield Optimization",
                icon: "⚡",
                description: "Real-time ad yield optimization with automated floor price management and demand partner evaluation.",
                painPoints: [
                    "Floor prices managed manually across hundreds of placements",
                    "No financial model for demand partner selection",
                    "Yield optimization disconnected from finance forecasts"
                ],
                automationValue: [
                    "Dynamic floor price optimization using ML",
                    "Automated demand partner ROI analysis",
                    "Yield-to-forecast integration for real-time financial impact"
                ],
                kpis: ["eCPM ↑ 10-15%", "Fill rate optimization ↑ 8%", "Floor price updates from weekly → real-time"],
                complexity: "medium"
            },
            {
                id: "multi-platform",
                title: "Multi-Platform Revenue Consolidation",
                icon: "🏢",
                description: "Automated revenue consolidation across web, mobile, OTT, social, and syndication platforms.",
                painPoints: [
                    "Revenue data scattered across 10+ platforms",
                    "Manual reconciliation takes 5+ days per close",
                    "Inconsistent revenue classification across platforms"
                ],
                automationValue: [
                    "Automated data ingestion from all platform APIs",
                    "Standardized revenue taxonomy and mapping",
                    "Real-time cross-platform revenue dashboards"
                ],
                kpis: ["Consolidation time ↓ 75%", "Data accuracy ↑ 99%", "Platform coverage 100%"],
                complexity: "medium"
            },
            {
                id: "adv-churn",
                title: "Advertiser Churn Prediction",
                icon: "🎯",
                description: "Predict advertiser churn and lifetime value to prioritize retention and optimize sales strategy.",
                painPoints: [
                    "Advertiser churn discovered at renewal time",
                    "No data-driven retention prioritization",
                    "Sales team reactive, not proactive"
                ],
                automationValue: [
                    "ML churn prediction with 90-day lead time",
                    "Automated health scoring for advertiser accounts",
                    "Proactive retention playbook triggers"
                ],
                kpis: ["Advertiser retention ↑ 15%", "Churn prediction accuracy 85%+", "Sales response time ↓ 60%"],
                complexity: "medium"
            },
            {
                id: "pub-scenario",
                title: "Scenario & Strategic Planning",
                icon: "🔮",
                description: "Driver-based models linking audience growth, ad market conditions, and subscription trends to financial outcomes.",
                painPoints: [
                    "Planning disconnected from audience and market data",
                    "Limited ability to model regulatory impacts (cookie deprecation, privacy)",
                    "Annual planning cycle too slow for digital media"
                ],
                automationValue: [
                    "Monte Carlo simulation across key revenue drivers",
                    "Market scenario library (cookie changes, AI, regulation)",
                    "Continuous planning with monthly reforecast automation"
                ],
                kpis: ["Planning cycle from annual → continuous", "Scenario capacity ↑ 50x", "Strategic decision speed ↑ 3x"],
                complexity: "high"
            }
        ]
    },

    // ----------------------------------------------------------
    // ARCHITECTURE
    // ----------------------------------------------------------
    architecture: {
        agency: {
            sources: [
                { name: "ERP", sub: "SAP / Oracle / NetSuite" },
                { name: "Time & Billing", sub: "Workday / Maconomy" },
                { name: "CRM", sub: "Salesforce / HubSpot" },
                { name: "Project Mgmt", sub: "Workfront / Monday" },
                { name: "HRIS", sub: "Workday / ADP" },
                { name: "Media Buying", sub: "Mediaocean / Prisma" }
            ],
            platform: [
                { name: "Data Warehouse", sub: "Snowflake / BigQuery" },
                { name: "Data Lake", sub: "S3 / Azure Data Lake" },
                { name: "ETL Engine", sub: "dbt / Fivetran / Airflow" },
                { name: "Data Quality", sub: "Great Expectations / Monte Carlo" }
            ],
            apps: [
                { name: "Forecast Engine", sub: "Prophet / Custom ML" },
                { name: "Planning Hub", sub: "Anaplan / Pigment" },
                { name: "Allocation Engine", sub: "Custom Rules Engine" },
                { name: "Workflow Automation", sub: "Power Automate / Airflow" }
            ],
            outputs: [
                { name: "Executive Dashboards", sub: "Tableau / Power BI" },
                { name: "Client P&L Reports", sub: "Automated Report Gen" },
                { name: "Board Packs", sub: "Automated Narratives" },
                { name: "API Layer", sub: "REST / GraphQL" }
            ]
        },
        publisher: {
            sources: [
                { name: "Ad Server", sub: "GAM / SpringServe" },
                { name: "SSP / Exchange", sub: "Prebid / Index / Magnite" },
                { name: "DMP / CDP", sub: "Permutive / Segment" },
                { name: "CMS", sub: "WordPress / Arc / Chorus" },
                { name: "Subscription Platform", sub: "Piano / Zuora" },
                { name: "ERP", sub: "SAP / Oracle / NetSuite" }
            ],
            platform: [
                { name: "Data Warehouse", sub: "Snowflake / BigQuery" },
                { name: "Real-Time Pipeline", sub: "Kafka / Pub/Sub" },
                { name: "ETL Engine", sub: "dbt / Fivetran / Airflow" },
                { name: "Data Quality", sub: "Great Expectations / Monte Carlo" }
            ],
            apps: [
                { name: "Revenue Forecast", sub: "Prophet / Custom ML" },
                { name: "Yield Optimizer", sub: "Custom ML Models" },
                { name: "Audience Analytics", sub: "Custom / Amplitude" },
                { name: "Churn Prediction", sub: "Custom ML Pipeline" }
            ],
            outputs: [
                { name: "Revenue Dashboards", sub: "Tableau / Looker" },
                { name: "Yield Reports", sub: "Real-Time Monitors" },
                { name: "Investor Packs", sub: "Automated Narratives" },
                { name: "API Layer", sub: "REST / GraphQL" }
            ]
        }
    },

    // ----------------------------------------------------------
    // TECHNOLOGY STACK
    // ----------------------------------------------------------
    techStack: [
        { category: "Cloud Platform", options: ["AWS", "Azure", "GCP"], recommended: "Snowflake + AWS/GCP" },
        { category: "Data Ingestion", options: ["Fivetran", "Airbyte", "Stitch"], recommended: "Fivetran" },
        { category: "Transformation", options: ["dbt", "Dataform", "Matillion"], recommended: "dbt Core / Cloud" },
        { category: "Orchestration", options: ["Airflow", "Dagster", "Prefect"], recommended: "Airflow / Dagster" },
        { category: "ML / AI", options: ["Python/scikit", "Prophet", "Vertex AI"], recommended: "Prophet + Custom Python" },
        { category: "Visualization", options: ["Tableau", "Power BI", "Looker"], recommended: "Tableau / Power BI" },
        { category: "Planning Tool", options: ["Anaplan", "Pigment", "Planful"], recommended: "Anaplan / Pigment" },
        { category: "Data Quality", options: ["Monte Carlo", "Great Expectations", "Soda"], recommended: "Monte Carlo" }
    ],

    // ----------------------------------------------------------
    // SCOPE MODULES
    // ----------------------------------------------------------
    scopeModules: {
        agency: [
            { id: "data-foundation", name: "Data Foundation & Integration", description: "Unified data model, source integrations, ETL pipelines, data quality framework", effort: 8, integrations: 6, phase: 1, category: "core" },
            { id: "rev-forecast-mod", name: "Revenue Forecasting Engine", description: "ML-based forecasting with pipeline integration, scenario modeling, rolling forecasts", effort: 10, integrations: 4, phase: 2, category: "core" },
            { id: "bva-reporting", name: "BvA & Management Reporting", description: "Automated budget vs actual, variance analysis, executive dashboards", effort: 6, integrations: 3, phase: 1, category: "core" },
            { id: "client-profitability", name: "Client Profitability Module", description: "Activity-based costing, real-time margin tracking, profitability alerts", effort: 8, integrations: 5, phase: 2, category: "analytics" },
            { id: "resource-planning", name: "Resource & Capacity Planning", description: "Utilization tracking, demand forecasting, bench optimization", effort: 7, integrations: 4, phase: 2, category: "analytics" },
            { id: "cash-mgmt", name: "Cash Flow Management", description: "13-week cash forecast, AR/AP automation, working capital optimization", effort: 6, integrations: 3, phase: 2, category: "analytics" },
            { id: "consolidation-mod", name: "Multi-Entity Consolidation", description: "IC elimination, currency translation, consolidation automation", effort: 9, integrations: 4, phase: 3, category: "advanced" },
            { id: "commission-engine", name: "Commission & Incentive Engine", description: "Rule-based commission calc, self-service portal, accrual automation", effort: 5, integrations: 3, phase: 3, category: "advanced" },
            { id: "scenario-planning", name: "Scenario & Strategic Planning", description: "Monte Carlo simulation, driver-based models, board pack automation", effort: 9, integrations: 3, phase: 3, category: "advanced" },
            { id: "ai-narratives", name: "AI-Powered Narratives", description: "Auto-generated commentary, variance explanations, executive summaries", effort: 6, integrations: 2, phase: 3, category: "advanced" }
        ],
        publisher: [
            { id: "data-foundation", name: "Data Foundation & Integration", description: "Unified data model, ad tech + subscription integrations, real-time pipelines", effort: 9, integrations: 8, phase: 1, category: "core" },
            { id: "ad-rev-engine", name: "Ad Revenue Forecast Engine", description: "ML-based programmatic + direct-sold forecasting, pacing dashboards", effort: 10, integrations: 5, phase: 2, category: "core" },
            { id: "yield-module", name: "Yield Optimization Module", description: "Dynamic floor pricing, demand partner analysis, fill rate optimization", effort: 8, integrations: 4, phase: 2, category: "core" },
            { id: "sub-analytics", name: "Subscription Analytics", description: "Cohort analysis, churn prediction, LTV modeling, rev rec automation", effort: 8, integrations: 4, phase: 2, category: "analytics" },
            { id: "content-roi-mod", name: "Content ROI Engine", description: "Content-level P&L, production cost attribution, investment optimization", effort: 7, integrations: 4, phase: 2, category: "analytics" },
            { id: "audience-value", name: "Audience Monetization Analytics", description: "Unified audience value, segment ARPU, cross-stream monetization", effort: 8, integrations: 5, phase: 2, category: "analytics" },
            { id: "platform-consol", name: "Multi-Platform Consolidation", description: "Cross-platform revenue consolidation, taxonomy standardization", effort: 7, integrations: 6, phase: 1, category: "core" },
            { id: "adv-churn-mod", name: "Advertiser Churn Prediction", description: "ML health scoring, retention triggers, sales prioritization", effort: 6, integrations: 3, phase: 3, category: "advanced" },
            { id: "pub-scenario", name: "Scenario & Strategic Planning", description: "Market scenario models, privacy impact analysis, continuous planning", effort: 9, integrations: 3, phase: 3, category: "advanced" },
            { id: "ai-narratives", name: "AI-Powered Narratives", description: "Auto-generated revenue commentary, investor narrative automation", effort: 6, integrations: 2, phase: 3, category: "advanced" }
        ]
    },

    // ----------------------------------------------------------
    // TEAM ROLES
    // ----------------------------------------------------------
    teamRoles: {
        small: [
            { role: "Project Lead / Engagement Manager", count: 1, rate: 275, category: "leadership", responsibilities: "Overall delivery, client relationship, scope management" },
            { role: "FP&A Domain Consultant", count: 1, rate: 250, category: "domain", responsibilities: "Business requirements, process design, domain expertise" },
            { role: "Data Engineer", count: 1, rate: 200, category: "technical", responsibilities: "ETL pipelines, data modeling, integration development" },
            { role: "Analytics / ML Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Forecast models, ML pipeline, analytics development" },
            { role: "BI Developer", count: 1, rate: 185, category: "technical", responsibilities: "Dashboards, reporting, visualization development" },
            { role: "Change Management Lead", count: 0.5, rate: 200, category: "change", responsibilities: "Training, adoption, stakeholder communication" }
        ],
        medium: [
            { role: "Engagement Director", count: 1, rate: 350, category: "leadership", responsibilities: "Executive sponsorship, strategic direction, escalation" },
            { role: "Project Manager", count: 1, rate: 225, category: "leadership", responsibilities: "Day-to-day delivery, sprint management, risk tracking" },
            { role: "FP&A Domain Lead", count: 1, rate: 275, category: "domain", responsibilities: "Business architecture, process redesign, requirements" },
            { role: "FP&A Business Analyst", count: 1, rate: 175, category: "domain", responsibilities: "Requirements documentation, testing, UAT coordination" },
            { role: "Lead Data Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Data architecture, pipeline design, technical leadership" },
            { role: "Data Engineer", count: 2, rate: 200, category: "technical", responsibilities: "ETL development, integration, data quality" },
            { role: "ML Engineer", count: 1, rate: 250, category: "technical", responsibilities: "ML model development, training, deployment" },
            { role: "BI Developer", count: 1, rate: 185, category: "technical", responsibilities: "Dashboard and report development" },
            { role: "Solution Architect", count: 0.5, rate: 300, category: "technical", responsibilities: "Technical architecture, vendor evaluation, design reviews" },
            { role: "Change Management Lead", count: 1, rate: 200, category: "change", responsibilities: "Training program, change strategy, adoption tracking" },
            { role: "QA / Test Lead", count: 1, rate: 175, category: "technical", responsibilities: "Test strategy, automation, quality assurance" }
        ],
        large: [
            { role: "Engagement Director", count: 1, rate: 375, category: "leadership", responsibilities: "Executive sponsorship, C-suite relationship, strategic oversight" },
            { role: "Program Manager", count: 1, rate: 275, category: "leadership", responsibilities: "Cross-workstream coordination, governance, reporting" },
            { role: "Project Manager (x2 workstreams)", count: 2, rate: 225, category: "leadership", responsibilities: "Workstream delivery, sprint management" },
            { role: "FP&A Domain Lead", count: 1, rate: 300, category: "domain", responsibilities: "Enterprise business architecture, process transformation" },
            { role: "FP&A Senior Consultant", count: 2, rate: 250, category: "domain", responsibilities: "Workstream business design, stakeholder management" },
            { role: "FP&A Business Analyst", count: 2, rate: 175, category: "domain", responsibilities: "Requirements, process mapping, testing" },
            { role: "Lead Data Architect", count: 1, rate: 275, category: "technical", responsibilities: "Enterprise data architecture, governance framework" },
            { role: "Lead Data Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Pipeline architecture, performance, reliability" },
            { role: "Data Engineer", count: 3, rate: 200, category: "technical", responsibilities: "ETL/ELT development, integration, data quality" },
            { role: "Senior ML Engineer", count: 1, rate: 275, category: "technical", responsibilities: "ML architecture, model strategy, MLOps" },
            { role: "ML Engineer", count: 1, rate: 225, category: "technical", responsibilities: "Model development, training, feature engineering" },
            { role: "BI Developer", count: 2, rate: 185, category: "technical", responsibilities: "Dashboard and report development, self-service BI" },
            { role: "Solution Architect", count: 1, rate: 325, category: "technical", responsibilities: "Enterprise architecture, security, compliance" },
            { role: "DevOps / Platform Engineer", count: 1, rate: 210, category: "technical", responsibilities: "CI/CD, infrastructure, monitoring, MLOps" },
            { role: "Change Management Director", count: 1, rate: 250, category: "change", responsibilities: "Enterprise change strategy, executive alignment" },
            { role: "Training Lead", count: 1, rate: 175, category: "change", responsibilities: "Training curriculum, delivery, adoption metrics" },
            { role: "QA Lead", count: 1, rate: 185, category: "technical", responsibilities: "Test strategy, automation, performance testing" }
        ]
    },

    // ----------------------------------------------------------
    // COST MULTIPLIERS
    // ----------------------------------------------------------
    costMultipliers: {
        delivery: { onshore: 1.0, hybrid: 0.72, offshore: 0.45 },
        license: {
            saas: { base: 15000, perModule: 8000, label: "Monthly SaaS" },
            onprem: { base: 250000, perModule: 75000, label: "Perpetual License" },
            hybrid: { base: 20000, perModule: 10000, label: "Hybrid Cloud Monthly" }
        }
    },

    // ----------------------------------------------------------
    // TIMELINE PHASES
    // ----------------------------------------------------------
    phases: {
        agency: [
            {
                name: "Phase 1 — Foundation",
                duration: "Months 1-3",
                color: "#3b82f6",
                deliverables: [
                    { name: "Current State Assessment", description: "Document existing FP&A processes, systems, pain points, and data flows", howTo: "Conduct stakeholder interviews (CFO, Controllers, FP&A leads), process mining workshops, system inventory audit. Produce process maps, gap analysis, and maturity assessment.", weeks: 3 },
                    { name: "Data Architecture Design", description: "Design unified data model, source-to-target mappings, integration architecture", howTo: "Map all source systems, define conformed dimensions (clients, entities, accounts), design star/snowflake schema in warehouse. Peer review with data governance team.", weeks: 3 },
                    { name: "ETL Pipeline Development", description: "Build core data pipelines from ERP, billing, and CRM systems", howTo: "Configure Fivetran connectors for source extraction, build dbt transformation models, implement data quality checks with Great Expectations. Deploy to staging environment.", weeks: 4 },
                    { name: "BvA Reporting MVP", description: "Deploy automated budget vs actual dashboards at consolidated level", howTo: "Build Tableau/Power BI dashboards connected to warehouse, implement variance calculation logic in dbt, configure automated refresh schedules. UAT with finance team.", weeks: 3 }
                ]
            },
            {
                name: "Phase 2 — Core Analytics",
                duration: "Months 4-6",
                color: "#8b5cf6",
                deliverables: [
                    { name: "Revenue Forecast Model", description: "Deploy ML-based revenue forecasting with pipeline integration", howTo: "Train Prophet/custom models on 3+ years of historical revenue data. Integrate CRM pipeline as leading indicator. Build backtesting framework to validate accuracy. Deploy to production with automated retraining.", weeks: 4 },
                    { name: "Client Profitability Engine", description: "Implement activity-based costing and real-time margin tracking", howTo: "Define cost allocation methodology with FP&A team. Build allocation rules engine (direct costs, time-based, revenue-based). Create client P&L data model. Deploy margin dashboards with alerting.", weeks: 4 },
                    { name: "Resource Utilization Module", description: "Build utilization tracking and demand forecasting capabilities", howTo: "Integrate time tracking system data. Build utilization calculations by role/team/office. Develop demand forecast model tied to pipeline. Create capacity planning dashboards.", weeks: 3 },
                    { name: "Cash Flow Automation", description: "Deploy 13-week cash flow forecast with AR/AP integration", howTo: "Build cash flow model incorporating billing schedules, payment terms, and historical patterns. Integrate AR aging data. Implement automated collection alerts. Validate against actual cash positions.", weeks: 3 }
                ]
            },
            {
                name: "Phase 3 — Advanced Capabilities",
                duration: "Months 7-9",
                color: "#ec4899",
                deliverables: [
                    { name: "Multi-Entity Consolidation", description: "Automate IC eliminations, currency translation, and group consolidation", howTo: "Map intercompany transaction flows. Build IC matching engine with tolerance rules. Implement multi-currency translation using live rate feeds. Create consolidation hierarchy and elimination rules. Test against prior period actuals.", weeks: 4 },
                    { name: "Scenario Planning Platform", description: "Deploy driver-based models with Monte Carlo simulation", howTo: "Identify key business drivers with executive team. Build driver-based financial model in Anaplan/Pigment. Implement Monte Carlo simulation engine. Create scenario library (M&A, market downturn, growth). Build board-ready output templates.", weeks: 4 },
                    { name: "AI Narrative Generation", description: "Implement automated commentary and variance explanations", howTo: "Fine-tune LLM on financial commentary patterns. Build variance-to-narrative pipeline. Implement quality checks and human-in-the-loop review. Deploy for monthly management reporting.", weeks: 3 },
                    { name: "UAT & Hypercare", description: "Full system testing, training, and production go-live", howTo: "Execute comprehensive test plan covering all modules. Run parallel processing vs legacy for one full close cycle. Conduct role-based training for all users. Establish hypercare support model for first 3 months post-launch.", weeks: 3 }
                ]
            }
        ],
        publisher: [
            {
                name: "Phase 1 — Foundation",
                duration: "Months 1-3",
                color: "#3b82f6",
                deliverables: [
                    { name: "Current State Assessment", description: "Audit existing revenue ops, ad tech stack, and financial processes", howTo: "Interview Revenue Ops, Ad Ops, FP&A, and Subscription teams. Map data flows from ad server to GL. Document monetization strategies per platform. Identify integration gaps and data quality issues.", weeks: 3 },
                    { name: "Data Architecture Design", description: "Design unified revenue data model spanning ad, subscription, and content", howTo: "Map all ad tech and subscription platform data models. Design unified revenue taxonomy (impressions → revenue). Build conformed dimension model for audience, content, and advertiser. Establish real-time pipeline architecture.", weeks: 3 },
                    { name: "ETL Pipeline Development", description: "Build data pipelines from ad server, SSPs, subscription platform, and CMS", howTo: "Configure API connectors for GAM, SSP reporting APIs, subscription platform. Build real-time ingestion for programmatic data via Kafka. Transform and standardize in dbt. Implement data freshness monitoring.", weeks: 5 },
                    { name: "Cross-Platform Revenue Dashboard", description: "Deploy unified revenue view across all platforms and streams", howTo: "Build Looker/Tableau dashboards showing revenue by platform, stream, and format. Implement daily automated reconciliation checks. Create drill-down from consolidated to platform-level. UAT with Revenue Ops team.", weeks: 3 }
                ]
            },
            {
                name: "Phase 2 — Revenue Intelligence",
                duration: "Months 4-7",
                color: "#8b5cf6",
                deliverables: [
                    { name: "Ad Revenue Forecast Model", description: "Deploy ML-based ad revenue forecasting with pacing dashboards", howTo: "Train models on historical impression, fill rate, and CPM data. Incorporate seasonality, market indices, and pipeline data. Build pacing dashboards comparing forecast to actual in real-time. Implement automated alerting for pacing variances.", weeks: 5 },
                    { name: "Yield Optimization Engine", description: "Build dynamic floor pricing and demand partner optimization", howTo: "Develop ML models for optimal floor pricing per placement/geo/device. Build A/B testing framework for price optimization. Create demand partner evaluation scorecard. Integrate yield signals into revenue forecast.", weeks: 4 },
                    { name: "Subscription Analytics Module", description: "Deploy cohort analysis, churn prediction, and LTV modeling", howTo: "Build subscriber cohort tracking infrastructure. Train churn prediction model on behavioral + payment data. Implement LTV calculation engine with discount rate methodology. Create subscription health dashboards with intervention triggers.", weeks: 4 },
                    { name: "Content ROI Engine", description: "Link content production costs to monetization outcomes", howTo: "Integrate CMS content metadata with production cost data. Build attribution model mapping content to ad + sub revenue. Create content P&L dashboards. Implement content investment scoring for editorial planning.", weeks: 4 }
                ]
            },
            {
                name: "Phase 3 — Strategic Capabilities",
                duration: "Months 8-10",
                color: "#ec4899",
                deliverables: [
                    { name: "Audience Value Platform", description: "Unified audience monetization analytics with segment-level insights", howTo: "Integrate first-party data from CDP with revenue data from all streams. Build audience value scoring model. Create segment-level ARPU dashboards. Implement monetization mix optimizer. Connect to clean room for privacy-safe enrichment.", weeks: 4 },
                    { name: "Advertiser Health & Churn", description: "Deploy ML-based advertiser health scoring and retention system", howTo: "Build advertiser health score using spend trends, engagement, and contract data. Train churn prediction model with 90-day horizon. Create automated alert and retention playbook system. Integrate with CRM for sales team action.", weeks: 3 },
                    { name: "Scenario Planning Platform", description: "Driver-based planning with market scenario modeling", howTo: "Build models linking audience growth, ad market conditions, and sub trends to financials. Create scenario library for privacy regulation, AI disruption, market changes. Implement continuous planning with monthly automated reforecast.", weeks: 4 },
                    { name: "UAT & Hypercare", description: "Full system testing, parallel run, training, and production launch", howTo: "Execute end-to-end testing across all modules. Run parallel processing alongside existing tools for one full month. Role-based training for Ad Ops, Rev Ops, FP&A, and Executive users. 90-day hypercare with dedicated support team.", weeks: 3 }
                ]
            }
        ]
    },

    // ----------------------------------------------------------
    // PRESET CONFIGURATIONS
    // ----------------------------------------------------------
    presets: {
        mvp: { modules: [0, 1, 2], teamSize: "small", duration: 6, label: "MVP — Core FP&A" },
        standard: { modules: [0, 1, 2, 3, 4, 5, 6], teamSize: "medium", duration: 9, label: "Standard — Full Suite" },
        enterprise: { modules: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], teamSize: "large", duration: 12, label: "Enterprise — All Modules" }
    }
};
